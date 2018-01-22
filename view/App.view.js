sap.ui.jsview("vendorregistration.view.App", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf masterlist_shell.app
	*/ 
	getControllerName : function() {
		return "vendorregistration.view.App";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf masterlist_shell.app
	*/ 
	createContent : function(oController) {
			var app = new sap.m.App("app",{
				backgroundImage : "image/backgroundlogo.jpg"
			
			})

			var oDetailPage1 = new sap.ui.view({
				id:"terms",
				viewName:"vendorregistration.view.termscondition", 
				type:sap.ui.core.mvc.ViewType.XML
			});
		

			app.addPage(oDetailPage1)
		
			var oDetailPage2 = new sap.ui.view({
				id:"details",
				viewName:"vendorregistration.view.details", 
				type:sap.ui.core.mvc.ViewType.XML
			});

			app.addPage(oDetailPage2)
		    return new sap.m.Shell("Shell", {
			title : "Process Order Stock Transfer",
			showLogout : false,
			app : app
			});
	}

});