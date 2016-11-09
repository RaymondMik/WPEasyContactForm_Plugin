//Custom Form BackEnd JS
jQuery(document).ready(function() {
    
    function printFormElement(labelValue, inputType, inputName, inputRequired) {
        var required = inputRequired == true ? 'required' : '';
        if ( inputType == 'textarea') {
            var fieldType = '<textarea name="' + inputName + '" rows="5" cols="50" value="" ></textarea><br>';
        } else {
            var fieldType = '<input type="' + inputType + '" name="' + inputName + '" value="" ><br>';
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
    
    jQuery('#simple_contactform_add_element').click(function(e){
        e.preventDefault();
        
        var labelValue = jQuery('#simple_contactform_select_label').val() != '' ? jQuery('#simple_contactform_select_label').val() : '';
        var inputType = jQuery('#simple_contactform_select_element').val();
        var inputName = 'simple-contactform-element-' + formElementCounter;
        var inputRequired = jQuery('#simple_contactform_required:checked').is(':checked') ? true : false;
        var formPreviewContainer = jQuery('#simple_contactform_preview');
        
        formElementCounter++;
        var getFormElements = printFormElement(labelValue, inputType, inputName, inputRequired);
        var formPreviewElement = '<div>' + getFormElements.printHtml + '<b>' + getFormElements.inputRequired + '</b></div>';
         
        sendToServer.push(getFormElements.labelValue, getFormElements.inputType, getFormElements.inputName, getFormElements.inputRequired);
        var formSendElement = '<input type="hidden" name="simple_contactform_form_elements" value="' + sendToServer + '">';
        console.log(sendToServer);
        formPreviewContainer.append( 
            formPreviewElement,
            formSendElement
        );
        
    });
    
});