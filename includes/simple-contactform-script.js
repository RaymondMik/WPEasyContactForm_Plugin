//Custom Form BackEnd JS

// Print form Preview
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
    
    // Get form elements already saved in the DB
    jQuery( 'input[type="hidden"]' ).each(function( index ) {
        if (index >= 1) {
            sendToServer.push(jQuery( this ).val());
            formElementCounter++;
        }
    });
    
    console.log(formElementCounter);
    //console.log(sendToServer);

    jQuery('#simple_contactform_add_element').on('click', function(e){
        e.preventDefault();
        
        var labelElement = jQuery('#simple_contactform_select_label');
        var labelValue = labelElement.val() != '' ? labelElement.val() : '';
        var inputType = jQuery('#simple_contactform_select_element').val();
        var inputName = 'simple-contactform-element-' + formElementCounter;
        var requiredElement = jQuery('#simple_contactform_required:checked')
        var inputRequired = requiredElement.is(':checked') ? true : false;
        var noFormMessage = jQuery('#simple-contactform-noform-message');
        formElementCounter++;
        
        var getFormElements = printFormElement(labelValue, inputType, inputName, inputRequired);
        var formPreviewElement = '<div>' + getFormElements.printHtml + getFormElements.inputRequired + '<button id="simple-contactform-button-delete" class="button-primary panel_button" name="">Delete</button></div>';
         
        sendToServer.push(getFormElements.labelValue, getFormElements.inputType, getFormElements.inputName, getFormElements.inputRequired);
        //console.log(sendToServer);
        
        var formSendElement = '<input type="hidden" name="simple_contactform_form_elements" value="' + sendToServer + '">';
        var formContainer = jQuery('#simple-contactform-container');
//        if (formElementCounter == 2) {
//           jQuery(formSendElement).appendTo(formContainer); 
//        }
        
        noFormMessage.hide();
        jQuery(formPreviewElement + formSendElement).appendTo(formContainer).hide().fadeIn('fast');
        
        labelElement.val('');
        requiredElement.prop('checked', false);
  
        // Delete preview element
        jQuery('button#simple-contactform-button-delete').on('click', function(el){
           el.preventDefault();
           jQuery(this).parent().fadeOut('fast');
         });
        
    });
    
    // Delete saved form element
    jQuery('button#simple-contactform-button-delete-saved-item').on('click', function(e){
       e.preventDefault();
       jQuery(this).parent().fadeOut('fast');
       jQuery(this).siblings().remove();
    });
    
    // Edit saved form element
    jQuery('button#simple-contactform-button-edit-saved-item').on('click', function(e){
        e.preventDefault();
        jQuery('#simple-contactform-modal').modal('show');
        var thisItem = jQuery(this).siblings('input:hidden');
        var items = thisItem.val().split(',');
        console.log(items);
        
        // FUNCTION TO REPLACE CURRENT INPUT ELEMENT WITH NEW ONE SELECTED IN MODAL
        jQuery('button#simple-contactform-button-replace-saved-item').on('click', function(e){
            e.preventDefault();
            var newLabelElement = jQuery('#simple-contactform-modal-content').find('#simple_contactform_select_label').val();
            var newLabelValue = newLabelElement != '' ? newLabelElement : '';
            var newInputType = jQuery('#simple-contactform-modal-content').find('#simple_contactform_select_element').val();
            var newRequiredElement = jQuery('#simple-contactform-modal-content').find('#simple_contactform_required:checked')
            var newInputRequired = newRequiredElement.is(':checked') ? true : false;
            var editData = {
                label: newLabelValue,
                inputType: newInputType,
                inputRequired: newInputRequired
            };
            items[0] = editData.label;
            items[1] = editData.inputType;
            items[3] = editData.inputRequired;
            var newStringVal = items[0] + ',' + items[1] + ',' + items[2] + ',' + items[3];
            thisItem.val(newStringVal);
            jQuery('#simple-contactform-modal').modal('hide');
            // TO DO 
            // 1) DO NOT PUSH DATA INTO A SINGLE HIDDEN INPUT
            // 2) FOR LOOP THROUG ALL HIDDEN INPUTS
            // 3) POPULATE SINGLE INPUT VALUE WITH ALL VALUES
            // 4) THE LOOP IS TRIGGERED EVERY TIME SOMETHING GOT UPDATED (DELETE, EDIT, ETC)

        });
        
    });
    

});