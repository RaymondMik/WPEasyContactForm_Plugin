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

	//make this variables available also in the require statement, hence in the options-page-wrapper.php file
	global $plugin_url;
	global $options;
    global $form_elements;
	
	//check if the form has been submitted
	if ( isset($_POST['simple_contactform_form_submitted']) ) {

		$hidden_field = esc_html($_POST['simple_contactform_form_submitted']);

		if( $hidden_field == 'Y' ) {
    
            $new_form_element = $_POST['simple_contactform_element_dropdown'];

			//$new_form_element = $_POST['simple_contactform_element_dropdown'];
			$receiver_email_address = $_POST['simple_contactform_receiver'];

			//save what is stored in the $option array in the custom_tooltip option_name field of the options table
			if ($form_elements != '') {
                array_push($form_elements, $new_form_element);
				update_option('page_selected', $form_elements);
			}

			if ($receiver_email_address != '') {
				update_option('post_selected', $receiver_email_address);
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

	$form_fields = get_option('page_selected');
	$form_recipient = get_option('post_selected');

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