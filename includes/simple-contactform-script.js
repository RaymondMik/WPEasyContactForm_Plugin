'use strict';

//CUSTOM FORM BUILDER

jQuery(document).ready(function() {
    
    // HELPER FUNCTIONS
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
    
    function getFormValues(mainContainer, needInputName, formElementCounter) {
        formElementCounter = needInputName === false && typeof formElementCounter === 'undefined' ? '' : formElementCounter;
        var labelElement = jQuery(mainContainer).find('#simple_contactform_select_label');
        var labelValue = labelElement.val() != '' ? labelElement.val() : '';
        var inputType = jQuery(mainContainer).find('#simple_contactform_select_element').val();
        var inputName = needInputName === true ? 'simple-contactform-element-' + formElementCounter : '';
        var requiredElement = jQuery(mainContainer).find('#simple_contactform_required:checked')
        var inputRequired = requiredElement.is(':checked') ? 'required' : '';
        
        var formValues = {
            labelElement: labelElement,
            labelValue: labelValue,
            inputType: inputType,
            inputName: inputName,
            requiredElement: requiredElement,
            inputRequired: inputRequired
        }
        
        return formValues;
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
        var noFormMessage = jQuery('#simple-contactform-noform-message');
        var formValues = getFormValues('#simple-contactform-add-form-container', true, formElementCounter);
        var getFormElement = printFormElement(formValues.labelValue, formValues.inputType, formValues.inputName, formValues.inputRequired, true);
        formElementCounter++;
        
        // Show element
        noFormMessage.hide();
        jQuery(getFormElement).appendTo(formContainer).hide().fadeIn('fast');
        
        // Reset form fields
        formValues.labelElement.val('');
        formValues.requiredElement.prop('checked', false);
  
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
        
        // Populate modal form with data from selected form element
        var thisItemLabel = jQuery(this).siblings('div').find('label');
        var thisItemInput = jQuery(this).siblings('div').find('.simple-contactform-preview-element');
        jQuery('#simple-contactform-edit-form-container').find('#simple_contactform_select_label').val(thisItemLabel.text());
        jQuery('#simple-contactform-edit-form-container').find('#simple_contactform_select_element').val(thisItemInput.attr('type'));
        
        // Replace element features with those selected in the modal
        jQuery('button#simple-contactform-button-replace-saved-item').on('click', function(e){
            e.preventDefault();
            var newFormValues = getFormValues('#simple-contactform-edit-form-container', false);
            var newStringVal = newFormValues.labelValue + ',' + newFormValues.InputType + ',' + itemsHiddenInput[2] + ',' + newFormValues.InputRequired;
            thisHiddenItem.val(newStringVal);
            
            var getNewFormElement = printFormElement(newFormValues.labelValue, newFormValues.inputType, itemsHiddenInput[2], newFormValues.inputRequired, false);
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