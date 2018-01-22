jQuery.sap.require("sap/m/MessageToast")
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("vendorregistration.util.Formatter")
sap.ui.controller("vendorregistration.view.termscondition", {

    onSelectionChange: function (oEvent) {
        var selection = oEvent.mParameters.selected;
        var nextBtn = this.getView().byId("next")
        if (selection) {
            nextBtn.setEnabled(true);
        } else {
            nextBtn.setEnabled(false);
        }
    },
    onAgreePress: function () {

        var detail = sap.ui.getCore().byId("details");
        if (typeof (detail) !== 'undefined') {
            sap.ui.getCore().getElementById("details").invalidate();
        }
        var oApp = sap.ui.getCore().byId("app");
        oApp.to("details");
    }
});