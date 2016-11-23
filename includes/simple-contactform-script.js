//Custom Form BackEnd JS

// Print form Preview
jQuery(document).ready(function() {
    
    function printFormElement(labelValue, inputType, inputName, inputRequired) {
        
        var required = inputRequired == 'required' ? 'required' : '';
        var requiredSymbol = inputRequired == 'required' ? '<span class="required-symbol">*</span>' : '';
        var fieldType = '';
        
        if ( inputType == 'textarea') {
            fieldType += '<textarea name="' + inputName + '" class="simple-contactform-preview-element" rows="5" cols="50" value="" ></textarea>' + requiredSymbol;
        } else {
            fieldType += '<input type="' + inputType + ' name="' + inputName + '" class="simple-contactform-preview-element" value="" >' + requiredSymbol;
        }
        fieldType += '<button id="simple-contactform-button-delete" class="button-primary panel_button" name="">Delete</button>';
        
        var printHtml = '<label for="' + inputName + '">' + labelValue + ' </label>' + fieldType;
        return printHtml;
        
    }
    
    var formContainer = jQuery('#simple-contactform-container');
    var formElements = [];
    var sendToServer = [];
    var formElementCounter = 1;
    
    // Get form elements already saved in the DB
    jQuery('input[type="hidden"]').each(function(index) {
        if (index >= 1) {
            formElementCounter++;
        }
    });
    
    jQuery('#simple_contactform_add_element').on('click', function(e){
        e.preventDefault();
        
        var labelElement = jQuery('#simple_contactform_select_label');
        var labelValue = labelElement.val() != '' ? labelElement.val() : '';
        var inputType = jQuery('#simple_contactform_select_element').val();
        var inputName = 'simple-contactform-element-' + formElementCounter;
        var requiredElement = jQuery('#simple_contactform_required:checked')
        var inputRequired = requiredElement.is(':checked') ? 'required' : '';
        var noFormMessage = jQuery('#simple-contactform-noform-message');
        formElementCounter++;
        
        var getFormElements = printFormElement(labelValue, inputType, inputName, inputRequired);
        var formPreviewElement = '<div>' + getFormElements + '</div>';
         
        //sendToServer.push(labelValue, inputType, inputName, inputRequired);
        
        // Add element with data for DB
        var formSendElement = '<input type="hidden" name="simple_contactform_form_element" value="' + labelValue + ',' + inputType + ',' + inputName + ',' + inputRequired + '">';
       
        noFormMessage.hide();
        jQuery(formPreviewElement + formSendElement).appendTo(formContainer).hide().fadeIn('fast');
        
        // Reset add preview element fields
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
        var thisHiddenItem = jQuery(this).siblings('input[type="hidden"]');
        var items = thisHiddenItem.val().split(',');
        
        var thisItemLabel = jQuery(this).siblings('label');
        var thisItemInput = jQuery(this).siblings('.simple-contactform-preview-element');

        jQuery('#simple_contactform_modal_select_label').val(thisItemLabel.text());
        jQuery('#simple_contactform_modal_select_element').val(thisItemInput.attr('type'));
        
        // Replace input element with the one selected in the modal
        jQuery('button#simple-contactform-button-replace-saved-item').on('click', function(e){
            e.preventDefault();
            var newLabelElement = jQuery('#simple_contactform_modal_select_label').val();
            var newLabelValue = newLabelElement != '' ? newLabelElement : '';
            var newInputType = jQuery('#simple_contactform_modal_select_element').val();
            var newRequiredElement = jQuery('#simple-contactform-modal-content').find('#simple_contactform_required:checked')
            var newInputRequired = newRequiredElement.is(':checked') ? 'required' : '';
            var editData = {
                label: newLabelValue,
                inputType: newInputType,
                inputRequired: newInputRequired
            };
            items[0] = editData.label;
            items[1] = editData.inputType;
            items[3] = editData.inputRequired;
            var newStringVal = items[0] + ',' + items[1] + ',' + items[2] + ',' + items[3];
            thisHiddenItem.val(newStringVal);
            thisItemLabel.text(editData.label + ':');
            thisItemInput.prop('type', editData.inputType);
            jQuery('#simple-contactform-modal').modal('hide');
            // TO DO 
            // FILL MODAL FORM WITH VALUE OF SELECTED INPUT ELEMENT
            // MAKE LABEL BOLD IN CSS
            // HANDLE TEXTAREA CASE
            // HANDLE RADIO CASE
            // HANDLE PLACEHOLDER
        });
        
    });
    
    // Get form elements when saving form
    jQuery('input#simple-contactform-save').on('click', function(e){
        var sendToServer = [];
        jQuery('input[type="hidden"]').each(function(index) {
            if (index >= 1) {
                sendToServer.push(jQuery( this ).val());
            }
        });
        var formSendElements = '<input type="hidden" name="simple_contactform_form_elements" value="' + sendToServer + '">';
        jQuery(formSendElements).appendTo(formContainer);
    });
    
});