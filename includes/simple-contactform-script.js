//Custom Form BackEnd JS
jQuery(document).ready(function() {
    
    function printFormElement(labelValue, inputType, inputName, inputRequired) {
        var required = inputRequired == true ? 'required' : '';
        if ( inputType == 'textarea') {
            var fieldType = '<textarea name="' + inputName + '" rows="5" cols="50" value="" ></textarea>';
        } else {
            var fieldType = '<input type="' + inputType + '" name="' + inputName + '" value="" >';
        }
        var returnFormElements = {
            printHtml: '<label for="' + inputName + '"><b>' + labelValue + ': </b></label>' + fieldType,
            labelValue: labelValue,
            inputType: inputType,
            inputName: inputName,
            inputRequired: required,
        }
        return returnFormElements;
    }
    
    var formElements = [];
    var sendToServer = [];
    var formElementCounter = 1;
    
    jQuery('#simple_contactform_add_element').on('click', function(e){
        e.preventDefault();
        
        var labelValue = jQuery('#simple_contactform_select_label').val() != '' ? jQuery('#simple_contactform_select_label').val() : '';
        var inputType = jQuery('#simple_contactform_select_element').val();
        var inputName = 'simple-contactform-element-' + formElementCounter;
        var inputRequired = jQuery('#simple_contactform_required:checked').is(':checked') ? true : false;
        var formContainer = jQuery('#simple-contactform-container');
        
        formElementCounter++;
        var getFormElements = printFormElement(labelValue, inputType, inputName, inputRequired);
        var formPreviewElement = '<div>' + getFormElements.printHtml + getFormElements.inputRequired + '<button id="simple-contactform-button-delete" class="button-primary panel_button" name="">Delete</button></div>';
         
        sendToServer.push(getFormElements.labelValue, getFormElements.inputType, getFormElements.inputName, getFormElements.inputRequired);
        var formSendElement = '<input type="hidden" name="simple_contactform_form_elements" value="' + sendToServer + '">';
        console.log(sendToServer);
        jQuery(formPreviewElement + formSendElement).appendTo(formContainer).hide().fadeIn('fast');
  
        // Delete preview element
        jQuery('button#simple-contactform-button-delete').on('click', function(el){
           el.preventDefault();
           jQuery(this).parent().fadeOut('fast');
         });
        
    });
    
    
    
});