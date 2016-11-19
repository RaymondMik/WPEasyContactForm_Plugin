
<div class="wrap">
    
    <div id="icon-options-general" class="icon32"></div>
    <h2>Simple Contact Form</h2>
    
    <div id="poststuff">
        
        <div id="post-body" class="metabox-holder columns-3">

            <!-- main content -->
            <div id="post-body-content">
                <div class="meta-box-sortables ui-sortable">
                    <div class="postbox">
                        <h2 class="hndle"><?php echo __(Settings); ?></h2>
                        <div class="inside">
                            <form name="simple_contactform_form_elements" method="post" action="">
                                <!--create a hidden field to tell when the form has been submitted-->
                                <input type="hidden" name="simple_contactform_form_submitted" value="Y">
                                <h4>
                                <?php echo __( 'Select what fields you want to display in your form. For each field you need to assign a label too', 'simple-contactform-plugin'); ?>
                                </h4>
                                <div id="simple-contactform-selectform-container">
                                    <label for="simple_contactform_label"><b>Choose input label</b></label>
                                    <input type="text" id="simple_contactform_select_label" name="simple_contactform_label" value="" placeholder="Type label here">
                                    
                                    <label for="simple_contactform_element"><b>Choose input type</b></label>
                                    <select id="simple_contactform_select_element" name="simple_contactform_element" required> 
                                        <option value="text"><?php echo esc_html_e( 'Single Text Line', 'simple-contactform-plugin' ); ?></option>
                                        <option value="email"><?php echo esc_html_e( 'Email', 'simple-contactform-plugin' ); ?></option>
                                        <option value="tel"><?php echo esc_html_e( 'Phone number', 'simple-contactform-plugin' ); ?></option>
                                        <option value="checkbox"><?php echo esc_html_e( 'Checkbox', 'simple-contactform-plugin' ); ?></option>
                                         <!--<option value="radio"><?php //echo esc_html_e( 'Radio Button', 'simple-contactform-plugin' ); ?></option>-->
                                        <option value="textarea"><?php echo esc_html_e( 'Text Box', 'simple-contactform-plugin' ); ?></option>
                                    </select>
                                    <input type="checkbox" id="simple_contactform_required" name="simple_contactform_required" value="required"> Required
                                    <button id="simple_contactform_add_element" class="button-primary"><?php echo __('Add'); ?></button>
                                </div>
                                <div>
                                    <div>
                                        <label for="simple_contactform_recipient"><?php echo __('Recipient e-mail') ?></label>
                                        <input type="email" name="simple_contactform_recipient" value="<?php echo isset($selected_form_recipient) ? $selected_form_recipient : ''; ?>" required>
                                    </div>
                                    
                                    <div>
                                        <label for="simple_contactform_recipient"><?php echo __('Text for send button') ?></label>
                                        <input type="text" name="simple_contactform_send_button" value="<?php echo isset($selected_send_button_text) ? $selected_send_button_text : ''; ?>" required>
                                    </div>
                                </div>
                                <div id="simple-contactform-container">
                                    <?php if ( $selected_form_fields[0][0] != '' ) : ?>

                                        <?php simple_contactform_show_form($selected_form_fields, $selected_send_button_text, true); ?>

                                    <?php else: ?>
                                    
                                        <?php echo '<h4 id="simple-contactform-noform-message">There is not form yet!</h4>'; ?>
                                    
                                    <?php endif; ?>
                                </div>
                                <input class="button-primary panel_button" type="submit" name="page_select_submit" value="<?php echo __('Save'); ?>">

                            </form>
                            
                        </div><!-- .inside -->
                    </div><!-- .postbox -->
                </div><!-- .meta-box-sortables .ui-sortable -->
            </div><!-- post-body-content -->
        </div><!-- #post-body .metabox-holder .columns-2 -->
        <br class="clear">
        
        <?php require('simple-contactform-edit-modal.php'); ?>

    </div><!-- #poststuff -->
</div><!-- .wrap -->

<!--
1) Once the form gets submitted
2) check in our main option page function that the hidden form is set in a value equals Y.
3) As with all form data, we will make sure that we properly sanitize and escape the data to prevent the user from entering malicious code.
4) We can then test the user has filled in the username and sanitize that content as well.

If either the username has not been submitted or profile page is not exist for that user, we will then reload the form and display a relevant message. -->