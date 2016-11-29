<div class="modal fade" id="simple-contactform-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel"><?php echo __('Edit'); ?></h4>
        </div>
        <div id="simple-contactform-edit-form-container" class="modal-body">
            <?php require('easy-contactform-form-builder.php'); ?>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal"><?php echo __('Close'); ?></button>
            <!-- TRIGGER JS FUNCTION TO GET DATA FROM INPUT -->
            <button type="button" id="simple-contactform-button-replace-saved-item" class="btn btn-primary"><?php echo __('Confirm'); ?></button>
        </div>
    </div>
    </div>
</div>