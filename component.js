jQuery.sap.declare("vendorregistration.Component");

sap.ui.core.UIComponent.extend("vendorregistration.Component", {
	metadata: {
		includes: ["style/style.css"]
	},
	createContent: function () {

		// create root view
		var oView = sap.ui.view({
			id: "mainView",
			viewName: "vendorregistration.view.App",
			type: "JS",

		});

		var oModel = new sap.ui.model.json.JSONModel();
		var aData = jQuery.ajax({
			type: "GET",
			url: "https://10.53.14.171:4302/test/portalPost.xsjs",
			dataType: "text",
			success: function (data, textStatus, jqXHR) {
				var json = JSON.parse(data);
				if(json.d.EvJson.length > 2){
				var jsonObj = JSON.parse(json.d.EvJson);
				 oModel.setData(jsonObj);
				 oView.setModel(oModel,'f4help')
				 console.log(jsonObj)
				}
			},
			error: function (data, textStatus, jqXHR) {
				//alert("error");
			}
		});
		return oView;
	}
});