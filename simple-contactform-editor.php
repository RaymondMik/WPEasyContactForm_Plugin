
<div class="wrap">
    <div id="icon-options-general" class="icon32"></div>
    <h2>Simple Contact Form</h2>
    <div id="poststuff">
        <div id="post-body" class="metabox-holder columns-3">
            <!-- main content -->
            <div id="post-body-content">
                <div class="meta-box-sortables ui-sortable">
                    <div class="postbox">
                        <h2 class="hndle"><?php echo __('Builder'); ?></h2>
                        <div class="inside">
                            <h4>
                            <?php echo __( 'Select what fields you want to display in your form. For each field you need to assign a label too', 'simple-contactform-plugin'); ?>
                            </h4>
                            <div id="simple-contactform-add-form-container">
                                <?php require('templates/easy-contactform-form-builder.php'); ?>
                                <button id="simple_contactform_add_element" class="button-primary"><?php echo __('Add'); ?></button>
                            </div>
                            <div>
                                <label for="simple_contactform_recipient"><?php echo __('Text in send button') ?></label>
                                <input type="text" name="simple_contactform_send_button" value="<?php echo isset($selected_send_button_text) ? $selected_send_button_text : ''; ?>" required>
                            </div>
                        </div>
                        <form name="simple_contactform_form_elements" method="post" action="">
                            <div class="inside">
                                <!--create a hidden field to tell when the form has been submitted-->
                                <input type="hidden" name="simple_contactform_form_submitted" value="Y">
                                <div id="simple-contactform-container">
                                    <?php if ( $selected_form_fields[0][0] != '' ) : ?>

                                        <?php simple_contactform_show_form($selected_form_fields, $selected_send_button_text, true); ?>

                                    <?php else: ?>

                                        <?php echo '<h4 id="simple-contactform-noform-message">There is not form yet!</h4>'; ?>

                                    <?php endif; ?>
                                </div>
                            </div><!-- .inside -->
                            <h2 class="hndle"><?php echo __('Submit Message'); ?></h2>
                            <div class="inside">
                                <div>
                                    <textarea name="easy_contactform_submit_message" value="ggg" required></textarea>
                                </div> 
                            </div><!-- .inside -->
                            <h2 class="hndle"><?php echo __('Recipient'); ?></h2>
                            <div class="inside">
                                <div>
                                    <label for="easy_contactform_recipient_email"><?php echo __('Recipient e-mail') ?></label>
                                    <input type="email" name="easy_contactform_recipient_email" value="<?php echo isset($selected_form_recipient) ? $selected_form_recipient : ''; ?>" required>
                                </div> 
                            </div><!-- .inside -->
                            <h2 class="hndle"><?php echo __('Notifications'); ?></h2>
                            <div class="inside">
                                <div>
                                    <label for="easy_contactform_notifications_to"><?php echo __('To') ?></label>
                                    <input type="email" name="easy_contactform_notifications_to" value="<?php echo isset($selected_form_recipient) ? $selected_form_recipient : ''; ?>" disabled>
                                </div>
                                <div>
                                    <label for="easy_contactform_notifications_subject"><?php echo __('Subject') ?></label>
                                    <input type="text" name="easy_contactform_notifications_subject" value="ggg" required>
                                </div>
                                <div>
                                    <label for="easy_contactform_notifications_message"><?php echo __('Message') ?></label>
                                    <input type="text" name="easy_contactform_notifications_message" value="ggg" required>
                                </div> 
                            </div><!-- .inside -->
                            <input class="button" type="button" onclick="<?php ?>" value="Cancel">
                            <input id="simple-contactform-save" class="button-primary panel_button" type="submit" name="page_select_submit" value="<?php echo __('Save'); ?>">
                        </form>
                        
                </div><!-- .meta-box-sortables .ui-sortable -->
            </div><!-- post-body-content -->
        </div><!-- #post-body .metabox-holder .columns-2 -->
        <br class="clear">
    </div><!-- #poststuff -->
</div><!-- .wrap -->
<?php require('templates/easy-contactform-modal.php'); ?>

<!--
1) Once the form gets submitted
2) check in our main option page function that the hidden form is set in a value equals Y.
3) As with all form data, we will make sure that we properly sanitize and escape the data to prevent the user from entering malicious code.
4) We can then test the user has filled in the username and sanitize that content as well.

If either the username has not been submitted or profile page is not exist for that user, we will then reload the form and display a relevant message. -->