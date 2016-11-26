//Custom Form BackEnd JS

// Print form Preview
jQuery(document).ready(function() {
    
    function printFormElement(labelValue, inputType, inputName, inputRequired, button) {
        
        var required = inputRequired == 'required' ? 'required' : '';
        var requiredSymbol = inputRequired == 'required' ? '<span class="required-symbol">*</span>' : '';
        
        var printHtml = '<div><div><label for="' + inputName + '">' + labelValue + ' </label><br>';
        if ( inputType == 'textarea') {
            printHtml += '<textarea name="' + inputName + '" class="simple-contactform-preview-element" rows="5" cols="50" value="" ></textarea>' + requiredSymbol;
        } else {
            printHtml += '<input type="' + inputType + '" name="' + inputName + '" class="simple-contactform-preview-element" value="" >' + requiredSymbol;
        }
        printHtml +=  '<input type="hidden" name="simple_contactform_form_element" value="' + labelValue + ',' + inputType + ',' + inputName + ',' + inputRequired + '">';
        printHtml += '</div>';
        if (button === true) {
            printHtml += '<button id="simple-contactform-button-delete" class="button-primary panel_button" name="">Delete</button>';
        }
        printHtml += '</div>';
        
        return printHtml;
        
    }
    
    var formElements = [];
    var sendToServer = [];
    var formContainer = jQuery('#simple-contactform-container');
    var formElementCounter = 1;
    
    // Get form elements already saved in the DB
    jQuery('input[type="hidden"]').each(function(index) {
        if (index >= 1) {
            formElementCounter++;
        }
    });
    
    // ADD ELEMENT IN PREVIEW
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
        
        var getFormElement = printFormElement(labelValue, inputType, inputName, inputRequired, true);
        
        // Show element
        noFormMessage.hide();
        jQuery(getFormElement).appendTo(formContainer).hide().fadeIn('fast');
        
        // Reset form fields
        labelElement.val('');
        requiredElement.prop('checked', false);
  
        // Delete element
        jQuery('button#simple-contactform-button-delete').on('click', function(el){
           e.preventDefault();
           jQuery(this).parent().remove();
         });
        
    });
    
    // DELETE SAVED ELEMENT
    jQuery('button#simple-contactform-button-delete-saved-item').on('click', function(e){
       e.preventDefault();
       jQuery(this).parent().remove();
    });
    
    // EDIT SAVED ELEMENT
    jQuery('button#simple-contactform-button-edit-saved-item').on('click', function(e){
        e.preventDefault();
        jQuery('#simple-contactform-modal').modal('show');
        var thisHiddenItem = jQuery(this).siblings('div').find('input[type="hidden"]');
        var itemsHiddenInput = thisHiddenItem.val().split(',');
        
        var thisSiblingsContainer = jQuery(this).siblings('div');
        var thisItemLabel = jQuery(this).siblings('div').find('label');
        var thisItemInput = jQuery(this).siblings('div').find('.simple-contactform-preview-element');

        jQuery('#simple_contactform_modal_select_label').val(thisItemLabel.text());
        jQuery('#simple_contactform_modal_select_element').val(thisItemInput.attr('type'));
        
        // Replace element features with those selected in the modal
        jQuery('button#simple-contactform-button-replace-saved-item').on('click', function(e){
            e.preventDefault();
            var newLabelElement = jQuery('#simple_contactform_modal_select_label').val();
            var newLabelValue = newLabelElement != '' ? newLabelElement : '';
            var newInputType = jQuery('#simple_contactform_modal_select_element').val();
            var newRequiredElement = jQuery('#simple-contactform-modal-content').find('#simple_contactform_required:checked')
            var newInputRequired = newRequiredElement.is(':checked') ? 'required' : '';

            var newStringVal = newLabelValue + ',' + newInputType + ',' + itemsHiddenInput[2] + ',' + newInputRequired;
            thisHiddenItem.val(newStringVal);
            
            var getNewFormElement = printFormElement(newLabelValue, newInputType, itemsHiddenInput[2], newInputRequired, false);
            thisSiblingsContainer.replaceWith(getNewFormElement);
            
            jQuery('#simple-contactform-modal').modal('hide');
        
        });
        
    });
    
    // SAVE FORM ELEMENTS
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
    
    // TO DO 
    // FORM FRONT END
    // ADD PLACEHOLDER IF TEXT, MAIL, URL, ECC.
    // MAKE CUSTOM MODAL
    // MAKE LABEL BOLD IN CSS + STYLING
    
});