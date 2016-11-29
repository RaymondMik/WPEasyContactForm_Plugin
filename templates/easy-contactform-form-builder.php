<label for="simple_contactform_label"><b>Choose input label</b></label>
<input type="text" id="simple_contactform_select_label" name="simple_contactform_label" value="" placeholder="Type label here">
<label for="simple_contactform_element"><b>Choose input type</b></label>
<select id="simple_contactform_select_element" name="simple_contactform_element" required> 
    <option value="text"><?php echo esc_html_e( 'Single Text Line', 'simple-contactform-plugin' ); ?></option>
    <option value="email"><?php echo esc_html_e( 'Email', 'simple-contactform-plugin' ); ?></option>
    <option value="url"><?php echo esc_html_e( 'URL', 'simple-contactform-plugin' ); ?></option>
    <option value="tel"><?php echo esc_html_e( 'Phone number', 'simple-contactform-plugin' ); ?></option>
    <option value="checkbox"><?php echo esc_html_e( 'Checkbox', 'simple-contactform-plugin' ); ?></option>
    <option value="textarea"><?php echo esc_html_e( 'Text Box', 'simple-contactform-plugin' ); ?></option>
</select>
<input type="checkbox" id="simple_contactform_required" name="simple_contactform_required" value="required"> Required