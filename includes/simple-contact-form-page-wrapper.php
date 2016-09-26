
<div class="wrap">

	<div id="icon-options-general" class="icon32"></div>
	<h2>Simple Contact Form</h2>

	<div id="poststuff">
		<div id="post-body" class="metabox-holder columns-2">

			<!-- main content -->
			<div id="post-body-content">
				<div class="meta-box-sortables ui-sortable">
					<div class="postbox">
						<h2 class="hndle">Settings</h2>
						<div class="inside">
							<form name="simple_contactform_form" method="post" action="">
                                
								<!--create a hidden field to tell when the form has been submitted-->
								<input type="hidden" name="simple_contactform_form_submitted" value="Y">
								
                                    <h4>
                                        <?php echo esc_html_e( 'Select what fields you want to add to your form', 'simple-contactform-plugin'); ?>
                                    </h4>

                                    <select name="simple_contactform_element_dropdown"> 
                                        <option value=""><?php echo esc_html_e( 'Select page' ); ?></option> 
                                        <option value="simple_contactform_text"><?php echo esc_html_e( 'Single Text', 'simple-contactform-plugin' ); ?></option>
                                        <option value="simple_contactform_email"><?php echo esc_html_e( 'Email', 'simple-contactform-plugin' ); ?></option>
                                        <option value="simple_contactform_checkbox"><?php echo esc_html_e( 'Checkbox', 'simple-contactform-plugin' ); ?></option>
                                        <option value="simple_contactform_radio"><?php echo esc_html_e( 'Radio', 'simple-contactform-plugin' ); ?></option>
                                        <option value="simple_contactform_textarea"><?php echo esc_html_e( 'Text Box', 'simple-contactform-plugin' ); ?></option>
                                    </select>
                                    <button id="simple_contactform_add_element" class="button-primary"><?php echo esc_html_e( 'Add', 'simple-contactform-plugin' ); ?></button>

                                    <label for="simple_contactform_receiver">
                                        <?php echo esc_html_e('Form Receiver', 'simple-contactform-plugin'); ?>
                                    </label>
                                    <input type="email" name="simple_contactform_receiver" value="<?php echo $form_recipient ?>">
                                      
								    <input class="button-primary panel_button" type="submit" name="page_select_submit" value="<?php echo esc_html_e('Save', 'simple-contactform-plugin'); ?>">
									
							</form>
						</div>
						<!-- .inside -->
					</div>
					<!-- .postbox -->
				</div>
				<!-- .meta-box-sortables .ui-sortable -->
			</div>
			<!-- post-body-content -->

			<!-- sidebar -->
			<div id="postbox" class="postbox-container">
				<div class="meta-box-sortables">
					<div class="postbox">
						<h2 class="hndle">Your Form:</h2>
						<div class="inside">
							<form name="custom_tooltip_form_delete" method="post" action="">
								<!--create a hidden field to tell when the form has been submitted-->
								<input type="hidden" name="custom_tooltip_form_submitted_delete" value="Y">
								<ul>
									<li>
										<h3>Form</h3>
										
                                        <?php 
                                            if ( $form_fields != '') {
                                                print_r($form_fields); 
                                            } 
                                        ?>
										
										<?php
										    if ( $form_fields != '' ) {
										    	echo '<input type="submit" name="delete_selected_page" class="button-primary" value="Remove">';
										    }
										?>
									</li>
									<li>
										<h3><?php echo __('Recipient'); ?></h3>
										<h3>
											<?php 
												if ( $form_recipient != '') {
													echo $form_recipient; 
												} 
											?>
										</h3>
										<?php
										    if ( $form_recipient != '' ) {
										    	echo '<input type="submit" name="delete_selected_post" class="button-primary" value="Remove">';
										    }
										?>
									</li>
								</ul>
							</form>
						</div><!-- .inside -->
					</div><!-- .postbox -->
				</div><!-- .meta-box-sortables -->
			</div><!-- #postbox-container-1 .postbox-container -->
		</div><!-- #post-body .metabox-holder .columns-2 -->
		<br class="clear">
	
	</div><!-- #poststuff -->
</div><!-- .wrap -->
<?php 

?>

<!--
1) Once the form gets submitted
2) check in our main option page function that the hidden form is set in a value equals Y.
3) As with all form data, we will make sure that we properly sanitize and escape the data to prevent the user from entering malicious code.
4) We can then test the user has filled in the username and sanitize that content as well.

If either the username has not been submitted or profile page is not exist for that user, we will then reload the form and display a relevant message. -->