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
        
        var labelElement = jQuery('#simple_contactform_select_label');
        var labelValue = labelElement.val() != '' ? labelElement.val() : '';
        var inputType = jQuery('#simple_contactform_select_element').val();
        var inputName = 'simple-contactform-element-' + formElementCounter;
        var requiredElement = jQuery('#simple_contactform_required:checked')
        var inputRequired = requiredElement.is(':checked') ? true : false;
        var formContainer = jQuery('#simple-contactform-container');
        var noFormMessage = jQuery('#simple-contactform-noform-message');
        
        var getFormElements = printFormElement(labelValue, inputType, inputName, inputRequired);
        var formPreviewElement = '<div>' + getFormElements.printHtml + getFormElements.inputRequired + '<button id="simple-contactform-button-delete" class="button-primary panel_button" name="">Delete</button></div>';
         
        sendToServer.push(getFormElements.labelValue, getFormElements.inputType, getFormElements.inputName, getFormElements.inputRequired);
        var formSendElement = '<input type="hidden" name="simple_contactform_form_elements" value="' + sendToServer + '">';
        console.log(sendToServer);
        
        noFormMessage.hide();
        jQuery(formPreviewElement + formSendElement).appendTo(formContainer).hide().fadeIn('fast');
        
        formElementCounter++;
        labelElement.val('');
        requiredElement.prop('checked', false);
  
        // Delete preview element
        jQuery('button#simple-contactform-button-delete').on('click', function(el){
           el.preventDefault();
           jQuery(this).parent().fadeOut('fast');
         });
        
    });
    
    // Delete saved form element
    jQuery('button#simple-contactform-button-delete-saved-item').on('click', function(el){
       el.preventDefault();
       jQuery(this).parent().fadeOut('fast');
       jQuery(this).siblings().remove();
    });
    
    
    
});