//Custom Form BackEnd JS
jQuery(document).ready(function() {
    
    function printFormElement(labelValue, inputType, inputName, inputRequired) {
        var fieldType = (inputType == 'textarea') ? '<textarea name="' + inputName + '" rows="5" cols="50" value="" ' + inputRequired + '></textarea>' : '<input type="' + inputType + '" name="' + inputName + '" value="" ' + inputRequired + ' >';
        var printHtml = '<label for="' + inputName + '"><b>' + labelValue + ':</b> </label>' + fieldType;
        return printHtml
    }
    
    jQuery('#simple_contactform_add_element').click(function(e){
        e.preventDefault();
        var labelValue = jQuery('#simple_contactform_label').val();
        var inputType = jQuery('#simple_contactform_select_element').val();
        var inputName = 'simple_contactform_' + jQuery('#simple_contactform_select_element').val() + '_field';
        var inputRequired = jQuery('#simple_contactform_required:checked').is(':checked') ? 'required' : '';
        var formPreviewContainer = jQuery('#simple_contactform_preview');
        
        formPreviewContainer.append( '<div>' + printFormElement(labelValue, inputType, inputName, inputRequired) + ' <b>' + inputRequired + '</b></div>' );
    });
    
});