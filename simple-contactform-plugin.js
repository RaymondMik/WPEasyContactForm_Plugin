//Custom Form BackEnd JS
jQuery(document).ready(function() {
    
    function printFormElement(labelValue, inputType, inputName, inputRequired) {
        if ( inputType == 'textarea') {
            var fieldType = '<textarea name="' + inputName + '" rows="5" cols="50" value="" ' + inputRequired + '></textarea><br>';
        } else {
            var fieldType = '<input type="' + inputType + '" name="' + inputName + '" value="" ' + inputRequired + '><br>';
        }
        var returnFormElements = {
            printHtml: '<label for="' + inputName + '"><b>' + labelValue + ': </b></label>' + fieldType,
            labelValue: labelValue,
            inputType: inputType,
            inputName: inputName
        }
        return returnFormElements;
    }
    
    var formElements = [];
    
    jQuery('#simple_contactform_add_element').click(function(e){
        e.preventDefault();
        var inputName = jQuery('#simple_contactform_select_name').val();
        var labelValue = jQuery('#simple_contactform_select_label').val() != '' ? jQuery('#simple_contactform_select_label').val() : '';
        var inputType = jQuery('#simple_contactform_select_element').val();
        //var inputName = 'simple_contactform_' + jQuery('#simple_contactform_select_element').val() + '_field';
        
        var inputRequired = jQuery('#simple_contactform_required:checked').is(':checked') ? 'required' : '';
        var formPreviewContainer = jQuery('#simple_contactform_preview');
        
        var getFormElements = printFormElement(labelValue, inputType, inputName, inputRequired);
        formElements.push(getFormElements);
        console.log(formElements);
        var formPreviewElement = '<div>' + getFormElements.printHtml + '<b>' + inputRequired + '</b></div>';
        var sendToServer = [];
        for (var i = 0; i < formElements.length; i++) {
            sendToServer.push(formElements[i].labelValue, formElements[i].inputType, formElements[i].inputName);
        }
        console.log(sendToServer);
        //var sendToServer = getFormElements.labelValue + ' ' + getFormElements.inputType + ' ' + getFormElements.inputName;
        var formSendElement = '<input type="hidden" name="simple_contactform_form_elements" value="' + sendToServer + '">';
        
        formPreviewContainer.append( 
            formPreviewElement,
            formSendElement
        );
        
    });
    
});