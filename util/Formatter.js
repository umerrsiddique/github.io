jQuery.sap.declare("vendorregistration.util.Formatter");
//jQuery.sap.require("sap.ca.ui.model.format.FormattingLibrary");
vendorregistration.util.Formatter = {
    formatAttachmentIcon: function (sMimeType) {
        if (sMimeType === "text/plain") {
            return 'sap-icon://attachment-text-file';
        }
        else if (sMimeType === "application/pdf" ) {
            return 'sap-icon://pdf-attachment';
        }
        else if (sMimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            return 'sap-icon://doc-attachment';
        }
        else if (sMimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            return 'sap-icon://excel-attachment';
        }
    },
};