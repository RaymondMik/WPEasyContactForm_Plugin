<?php
/*
Plugin Name: Simple Contact Form Plugin
Plugin URI: http://example.com
Description: A super basic Contact Form
Version: 1.0
Author: Ramon Miklus
Author URI: http://ramonmiklus.com
Text Domain: simple-contactform-plugin
*/

$plugin_url = plugins_url() . "/simple-contactform-plugin";
$options = array();

// Create Plugin Admin Menu 
function simple_contactform_plugin_menu() {
	//add_option_page( $page_title, $menu_title, $capability, $menu-slug, $function)
	add_options_page(
		'Simple Contact Form Plugin',
		'Simple Contact Form',
		'manage_options',
		'simple-contact-form',
		'simple_contactform_plugin_options_page'
	);
}
add_action( 'admin_menu', 'simple_contactform_plugin_menu');


// Set Plugin Admin Menu Options
function simple_contactform_plugin_options_page() {

	//Check if user has the right credentials to manage_options
	if ( !current_user_can('manage_options') ) {
		wp_die('You do not have sufficient permission to access this page');
	}

    global $options;
	
	//check if the form has been submitted
	if ( isset($_POST['simple_contactform_form_submitted']) ) {
  
		$hidden_field = esc_html($_POST['simple_contactform_form_submitted']);

		if( $hidden_field == 'Y' ) {
    
            $new_form_layout_string = $_POST['simple_contactform_form_elements'];
			$recipient_email_address = $_POST['simple_contactform_recipient'];
            $send_button_text = $_POST['simple_contactform_send_button'];
            
            //echo $new_form_layout_string;
            
            $form_elements = explode("," , $new_form_layout_string);
            $form_elements_grouped = array_chunk($form_elements, 4);

            // Save form elements into DB
			if (isset($form_elements_grouped)) {
				update_option('simple_contactform_selected_form', $form_elements_grouped);
			}

			if ($recipient_email_address != '') {
				update_option('simple_contactform_selected_recipient', $recipient_email_address);
			}
            
            if ($send_button_text != '') {
				update_option('simple_contactform_send_button_text', $send_button_text);
			}
            
		}
	}
    
    // Retrieve form elements from DB
    $selected_form_fields = get_option('simple_contactform_selected_form');
    $selected_form_recipient = get_option('simple_contactform_selected_recipient');
    $selected_send_button_text = get_option('simple_contactform_send_button_text');
    
	//add Admin Menu Layout
	require('simple-contactform-editor.php');

}

// PRINT FORM TO EITHER FRONT OR BACK END
function simple_contactform_show_form($selected_form_fields, $selected_send_button_text, $is_backend_form) {
    $form_element_class = $is_backend_form === true ? 'simple-contactform-preview-element' : 'simple-contactform-element';
    $form_opening_tag = $is_backend_form !== true ? '<form action="' . esc_url( $_SERVER['REQUEST_URI'] ) . '" method="POST">' : '';
    $form_closing_tag = $is_backend_form !== true ? '</form>' : '' ;
    $disabled = $is_backend_form === true ? 'disabled' : '';
    
    echo $form_opening_tag;
    foreach ($selected_form_fields as $form_element) {
        $required_input = $is_backend_form === false ? $form_element[3] : '';
        $required_symbol = $form_element[3] === 'required' ? '*' : '';
        $pattern_html_attr = $form_element[1] !== 'email' ? 'pattern="[a-zA-Z0-9 ]+"' : '';
        
        echo '<div><div><label for="' . $form_element[2] . '">' . $form_element[0] . ' </label><br>';
            if ($form_element[1] !== 'textarea') {
                echo '<input type="' . $form_element[1] . '" name="' . $form_element[2] . '" ' . $pattern_html_attr . '" class="' . $form_element_class . '" value="' . ( isset( $_POST[$form_element[2]] ) ? esc_attr( $_POST[$form_element[2]] ) : '' ) . '" ' . $required_input .  ' size="40" >' . $required_symbol;
            } else {
                echo '<textarea name="' . $form_element[2] . '" class="' . $form_element_class . '" rows="5" cols="50" value="' . ( isset( $_POST[$form_element[2]] ) ? esc_attr( $_POST[$form_element[2]] ) : '' ) . '" ' . $required_input . '></textarea>' . $required_symbol;
            }
            if ($is_backend_form === true) {
                echo '<input type="hidden" name="simple_contactform_form_elements" value="' . $form_element[0] . ',' . $form_element[1] . ',' . $form_element[2] . ',' . $form_element[3] . '">'; 
            }
        echo '</div>';
        if ($is_backend_form === true) {
            echo '<button id="simple-contactform-button-edit-saved-item" class="button-primary panel_button" name="">' . __('Edit') .  '</button>';
            echo '<button id="simple-contactform-button-delete-saved-item" class="button-primary panel_button" name="">Delete</button>';
        }
        if ($is_backend_form === true) {echo '</div>';}

    }
    echo '<input type="submit" name="simple-contactform-submitted"' . $disabled . ' value="' . $selected_send_button_text . '" >';
    echo $form_closing_tag;
}
add_action( 'simple_contactform_loop', 'simple_contactform_show_form');


function simple_contactform_plugin_send_mail() {

    //If the submit button is clicked, send the email
    if ( isset( $_POST['simple_custom_form_submitted'] ) ) {

        // sanitize form values
        /*$name    = sanitize_text_field( $_POST["simple_custom_form_name"] );
        $email   = sanitize_email( $_POST["simple_custom_form_email"] );
        $subject = sanitize_text_field( $_POST["simple_custom_form_subject"] );
        $message = esc_textarea( $_POST["simple_custom_form_message"] );*/
        //Loop of selected form fields
        $headers = '';
        $subject = '';
        $message = '';
        //$recipient = get_option('simple_contactform_selected_recipient');
        $recipient = '';
       
        //$headers = "From: $name <$email>" . "\r\n";

        // If email has been process for sending, display a success message
        if ( wp_mail( $recipient, $subject, $message, $headers) ) {
            echo '<div>';
            echo '<p>Thanks for contacting me, expect a response soon.</p>';
            // Make message dynamic
            echo '</div>';
        } else {
            echo 'An unexpected error occurred';
        }
    }
}

function simple_contactform_plugin_shortcode() {
    $selected_form_fields = get_option('simple_contactform_selected_form');
    $selected_send_button_text = get_option('simple_contactform_send_button_text');
    
    ob_start();
    simple_contactform_plugin_send_mail();
    simple_contactform_show_form($selected_form_fields, $selected_send_button_text, false);
    return ob_get_clean();
}
add_shortcode( 'simple_contactform_plugin', 'simple_contactform_plugin_shortcode' );
//Shortcode will be [simple_contactform_plugin]


//Enqueue Backend Scripts and Styles
function simple_contactform_plugin_enqueue() {
    global $plugin_url;
    wp_enqueue_style( 'simple_contactform_plugin_bootstrap_css', ($plugin_url . '/includes/bootstrap/css/bootstrap.min.css') );
    wp_enqueue_script( 'simple_contactform_plugin_bootstrap_js', ($plugin_url . '/includes/bootstrap/js/bootstrap.min.js') );
    wp_enqueue_style( 'simple_contactform_plugin_css', ($plugin_url . '/includes/simple-contactform-style.css') );
    wp_enqueue_script( 'simple_contactform_plugin_js', ($plugin_url . '/includes/simple-contactform-script.js'), array('jquery'), '', true );
}
add_action('admin_head', 'simple_contactform_plugin_enqueue');
