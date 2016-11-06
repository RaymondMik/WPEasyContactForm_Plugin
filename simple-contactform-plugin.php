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
$form_elements = array();


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

	global $plugin_url;
	global $options;
    global $form_elements;
	
	//check if the form has been submitted
	if ( isset($_POST['simple_contactform_form_submitted']) ) {
  
		$hidden_field = esc_html($_POST['simple_contactform_form_submitted']);

		if( $hidden_field == 'Y' ) {
    
            $new_form_layout_string = $_POST['simple_contactform_form_elements'];
			$recipient_email_address = $_POST['simple_contactform_recipient'];
            
            $form_elements = explode("," , $new_form_layout_string);
            // get array length;
            $form_strings_number = count($form_elements);
            // divide it by three
            $form_elements_number = $form_strings_number / 3;
            $form_elements_container = array();
            
            // once you get number of variables, group elements
            if ( isset($form_elements_number) ) {
                switch ($form_elements_number) {
                    case 1:
                        $element_one = array_slice($form_elements, 0, 3);
                        array_push($form_elements_container, $element_one);
                        break;
                    case 2:
                        $element_one = array_slice($form_elements, 0, 3);
                        $element_two = array_slice($form_elements, 4, 6);
                        array_push($form_elements_container, $element_one, $element_two);
                        break;
                    case 3:
                        $element_one = array_slice($form_elements, 0, 3);
                        $element_two = array_slice($form_elements, 4, 6);
                        $element_three = array_slice($form_elements, 7, 9);
                        array_push($form_elements_container, $element_one, $element_two, $element_three);
                        break;
                    case 4:
                        $element_one = array_slice($form_elements, 0, 3);
                        $element_two = array_slice($form_elements, 4, 6);
                        $element_three = array_slice($form_elements, 7, 9);
                        $element_four = array_slice($form_elements, 10, 13);
                        array_push($form_elements_container, $element_one, $element_two, $element_three, $element_four);
                        break;
                    default:
                        $element_one = array_slice($form_elements, 0, 3);
                }
            }
            
            // TO DO write function that, depending on the number of elements received, 
            // sends html input fields to the db.
            print_r($form_elements_container);
            echo '<label for="' . $element_one[0] . '"><b>' . $element_one[2] . ': </b></label><input type="' . $element_one[1] . '" name="' . $element_one[0] . '" >';
    
			//save what is stored in the $option array in the custom_tooltip option_name field of the options table
			if ($new_form_element != '') {
				update_option('simple_contactform_form_selected', $new_form_element);
			}

			if ($recipient_email_address != '') {
				update_option('simple_contactform_recipient_selected', $recipient_email_address);
			}
		}
	}

	if ( isset($_POST['custom_tooltip_form_submitted_delete']) ) { 

		$hidden_field_delete = esc_html($_POST['custom_tooltip_form_submitted_delete']);

		if ( $hidden_field_delete == 'Y' ) {
			if ( isset($_POST['delete_selected_page']) ) {
				delete_option('page_selected');
			}
			if ( isset($_POST['delete_selected_post']) ) {
				delete_option('post_selected');
			}
		}
	}

	$form_fields = get_option('simple_contactform_form_selected');
	$form_recipient = get_option('simple_contactform_recipient_selected');

	//add Admin Menu Layout
	require('includes/simple-contact-form-page-wrapper.php');

}


function simple_contactform_plugin_markup_code() { 
    
   //Form markup goes here

}


function simple_contactform_plugin_send_mail() {

    //If the submit button is clicked, send the email
    if ( isset( $_POST['simple_custom_form_submitted'] ) ) {

        // sanitize form values
        /*$name    = sanitize_text_field( $_POST["simple_custom_form_name"] );
        $email   = sanitize_email( $_POST["simple_custom_form_email"] );
        $subject = sanitize_text_field( $_POST["simple_custom_form_subject"] );
        $message = esc_textarea( $_POST["simple_custom_form_message"] );*/
        //Loop of selected form fields

        // get the blog administrator's email address
        $to = get_option( 'admin_email' );
        
        $headers = "From: $name <$email>" . "\r\n";

        // If email has been process for sending, display a success message
        if ( wp_mail( $to, $subject, $message, $headers ) ) {
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
    ob_start();
    simple_form_send_mail();
    simple_form_markup_code();
    return ob_get_clean();
}
add_shortcode( 'simple_contactform_plugin', 'simple_contactform_plugin_shortcode' );
//[simple_contactform_plugin]


//Enqueue Backend Scripts and Styles
function simple_contactform_plugin_enqueue() {
    global $plugin_url;
    wp_enqueue_script( 'simple_contactform_plugin_js', ($plugin_url . '/simple-contactform-plugin.js'), array('jquery'), '', true );
}
add_action('admin_head', 'simple_contactform_plugin_enqueue');
