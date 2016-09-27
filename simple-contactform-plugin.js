//Custom Form BackEnd JS
jQuery(document).ready(function() {
    
    function printFormElement(labelValue, inputType, inputName, inputRequired) {
        var printHtml = '<label for="' + inputName + '">' + labelValue + '</label> <input type="' + inputType + '" name="' + inputName + '" value="" ' + inputRequired + ' >';
        return printHtml
    }
    
    jQuery('#simple_contactform_add_element').click(function(e){
        e.preventDefault();
        var labelValue = jQuery('#simple_contactform_label').val();
        var inputType = jQuery('#simple_contactform_select_element').val();
        var inputName = 'simple_contactform_' + jQuery('#simple_contactform_select_element').val() + '_field';
        var inputRequired = jQuery('#simple_contactform_required:checked').is(':checked') ? 'required' : '';
        var formPreviewContainer = jQuery('#simple_contactform_preview');
        
        formPreviewContainer.append( '<div>' + printFormElement(labelValue, inputType, inputName, inputRequired) + '</div>' );
    });
    
});