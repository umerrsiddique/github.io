jQuery.sap.require("sap/m/MessageToast")
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap/m/Text");
jQuery.sap.require("vendorregistration.util.Formatter")
sap.ui.controller("vendorregistration.view.details", {


	oItems: [],
	languageKey: "",
	countryKey: "",
	bankCountryKey: "",
	bankKey: "",
	onAfterRendering: function () {


	},
	OnAttachment: function (oEvent) {
		// create value help dialog
		if (!this.oAttachDialog) {
			this.oAttachDialog = sap.ui.xmlfragment(
				"vendorregistration.view.attachment",
				this.getView().getController()
			);
			this.getView().addDependent(this.oAttachDialog);
		}

		this.oAttachDialog.open();
	},
	onSaveAttachments: function (oEvent) {
		var _attachmentUploader = sap.ui.getCore().byId("fileUploader");
		var items = {};
		var that = this;
		var dialog = this.oAttachDialog;
		var oView = this.getView();
		sFileName = _attachmentUploader.getValue();
		if (!_attachmentUploader.getValue()) {
			sap.m.MessageToast.show("Choose a file first");
			return;
		}
		var file = jQuery.sap.domById(_attachmentUploader.getId() + "-fu").files[0]
		var base64_marker = 'data:' + file.type + ';base64,';
		var filezise
		var mimetype;
		var filename;
		filename = file.name;
		filezise = file.size / 1000;
		mimetype = file.type;
		if (filezise <= 2000) {
			if (mimetype === "text/plain" || mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || mimetype === "application/pdf") {
				var reader = new FileReader();
				var d = new Date().toLocaleDateString().split("/");
				var y = d.splice(-1)[0];
				d.splice(0, 0, y);
				var uploadDate = d.join("-");
				reader.onload = function (file) {
					base64 = reader.result;
					b64 = base64;
					if (b64) {
						items = {
							filename: filename,
							filesize: filezise,
							mimetype: mimetype,
							upload_date: uploadDate,
							base64: b64
						}
						that.oItems.push(items);
						console.log(that.oItems)
						var oItems_temp = JSON.parse(JSON.stringify(that.oItems));
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(oItems_temp);
						oView.setModel(oModel, "attachments");
						dialog.close();
						file = "";
						_attachmentUploader.setValue("");
						//console.log(base64);
					}
				}


				reader.readAsDataURL(file);
			} else {
				sap.m.MessageToast.show("File Format not supported");
			}
		} else {
			sap.m.MessageToast.show("File should not be greater then 2 MB");
		}
		//EOC read base64

	},
	handleDelete: function (oEvent) {
		var oModel = this.getView().getModel("attachments");
		var oList = oEvent.getSource();
		var oView = this.getView();
		var oModel = new sap.ui.model.json.JSONModel();
		var index;
		oItem = oEvent.getParameter("listItem"),
			sPath = oItem.getBindingContext("attachments").getPath();
		index = sPath.charAt(sPath.lastIndexOf('/') + 1);
		if (index != "-1") {
			this.oItems.splice(index, 1);
			var oItems_temp = JSON.parse(JSON.stringify(this.oItems));
			oModel.setData(oItems_temp);
			oView.setModel(oModel, "attachments");
			sap.m.MessageToast.show("Deleted");
		}
	},
	onCancelAttachments: function (oEvent) {
		var dialog = this.oAttachDialog;
		dialog.close();
	},
	//*********************************Bank Key Search Help**************************************************
	handleValueHelpBankKey: function (oEvent) {
		var sBankKeyInputValue = oEvent.getSource().getValue();

		this.inputIdBankKey = oEvent.getSource().getId();
		// create value help dialog
		if (!this._bankKeyHelpDialog) {
			this._bankKeyHelpDialog = sap.ui.xmlfragment(
				"vendorregistration.view.bankKey",
				this
			);
			this.getView().addDependent(this._bankKeyHelpDialog);
		}

		// create a filter for the binding
		this._bankKeyHelpDialog.getBinding("items").filter([new sap.ui.model.Filter(
			"banka",
			sap.ui.model.FilterOperator.Contains, sBankKeyInputValue
		)]);

		// open value help dialog filtered by the input value
		this._bankKeyHelpDialog.open(sBankKeyInputValue);

	},
	_handleValueHelpSearchBankKey: function (evt) {
		var sValue = evt.getParameter("value");
		var oFilter = new sap.ui.model.Filter(
			"banka",
			sap.ui.model.FilterOperator.Contains, sValue
		);
		evt.getSource().getBinding("items").filter([oFilter]);
	},
	_handleValueHelpCloseBankKey: function (evt) {
		var that = this;
		var oSelectedItem = evt.getParameter("selectedItem");
		if (oSelectedItem) {
			var productInput = sap.ui.getCore().byId(this.inputIdBankKey)
			productInput.setValue(evt.mParameters.selectedItem.mProperties.title);
			that.bankKey = evt.mParameters.selectedItem.mProperties.description;
		}
		evt.getSource().getBinding("items").filter([]);
	},

	suggestionItemSelectedBankKey: function (evt) {
		var that = this;
		var oItem = evt.getParameter('selectedItem'),
			oText = sap.ui.getCore().byId(evt.mParameters.id),
			sKey = oItem ? oItem.getText() : '';
		that.bankKey = oItem ? oItem.getKey() : '';

		oText.setValue(sKey);
	},
	//*********************************Country Search Help**************************************************
	handleValueHelpCountry: function (oEvent) {
		var sCountryInputValue = oEvent.getSource().getValue();

		this.inputIdCountry = oEvent.getSource().getId();
		// create value help dialog
		if (!this._countryHelpDialog) {
			this._countryHelpDialog = sap.ui.xmlfragment(
				"vendorregistration.view.country",
				this
			);
			this.getView().addDependent(this._countryHelpDialog);
		}

		// create a filter for the binding
		this._countryHelpDialog.getBinding("items").filter([new sap.ui.model.Filter(
			"landx50",
			sap.ui.model.FilterOperator.Contains, sCountryInputValue
		)]);

		// open value help dialog filtered by the input value
		this._countryHelpDialog.open(sCountryInputValue);

	},
	_handleValueHelpSearchCountry: function (evt) {
		var sValue = evt.getParameter("value");
		var oFilter = new sap.ui.model.Filter(
			"landx50",
			sap.ui.model.FilterOperator.Contains, sValue
		);
		evt.getSource().getBinding("items").filter([oFilter]);
	},
	_handleValueHelpCloseCountry: function (evt) {
		var that = this;
		var oSelectedItem = evt.getParameter("selectedItem");
		if (oSelectedItem) {
			var productInput = sap.ui.getCore().byId(this.inputIdCountry)
			productInput.setValue(evt.mParameters.selectedItem.mProperties.title);

			if (this.inputIdCountry === "details--country") {
				that.countryKey = evt.mParameters.selectedItem.mProperties.description;
			} else if (this.inputIdCountry === "details--bankcountry") {
				that.bankCountryKey = evt.mParameters.selectedItem.mProperties.description;
			}
		}
		evt.getSource().getBinding("items").filter([]);
	},

	suggestionItemSelectedCountry: function (evt) {

		var that = this;
		var oItem = evt.getParameter('selectedItem'),
			oText = sap.ui.getCore().byId(evt.mParameters.id),
			sKey = oItem ? oItem.getText() : '';
		if (this.inputIdCountry == undefined) {
			this.inputIdCountry = evt.mParameters.id;
		}
		if (this.inputIdCountry === "details--country") {
			that.countryKey = oItem ? oItem.getKey() : '';
		} else if (this.inputIdCountry === "details--bankcountry") {
			that.bankCountryKey = oItem ? oItem.getKey() : '';
		}

		oText.setValue(sKey);
	},
	//*********************************Language Search Help**************************************************
	handleValueHelpLanguage: function (oEvent) {
		var sLanguageInputValue = oEvent.getSource().getValue();

		this.inputId = oEvent.getSource().getId();
		// create value help dialog
		if (!this._valueHelpDialog) {
			this._valueHelpDialog = sap.ui.xmlfragment(
				"vendorregistration.view.language",
				this
			);
			this.getView().addDependent(this._valueHelpDialog);
		}

		// create a filter for the binding
		this._valueHelpDialog.getBinding("items").filter([new sap.ui.model.Filter(
			"sptxt",
			sap.ui.model.FilterOperator.Contains, sLanguageInputValue
		)]);

		// open value help dialog filtered by the input value
		this._valueHelpDialog.open(sLanguageInputValue);

	},
	_handleValueHelpSearchLanguage: function (evt) {
		var sValue = evt.getParameter("value");
		var oFilter = new sap.ui.model.Filter(
			"sptxt",
			sap.ui.model.FilterOperator.Contains, sValue
		);
		evt.getSource().getBinding("items").filter([oFilter]);
	},
	_handleValueHelpCloseLanguage: function (evt) {
		var that = this;
		var oSelectedItem = evt.getParameter("selectedItem");
		if (oSelectedItem) {
			var productInput = sap.ui.getCore().byId(this.inputId)
			productInput.setValue(evt.mParameters.selectedItem.mProperties.title);
			that.languageKey = evt.mParameters.selectedItem.mProperties.description;
		}
		evt.getSource().getBinding("items").filter([]);
	},

	suggestionItemSelectedLanguage: function (evt) {

		var that = this;
		var oItem = evt.getParameter('selectedItem'),
			oText = sap.ui.getCore().byId(evt.mParameters.id),
			sKey = oItem ? oItem.getText() : '';
		that.languageKey = oItem ? oItem.getKey() : '';

		oText.setValue(sKey);
	},
	refreshAddress: function () {
		var that = this.getView();
		that.byId("name").setValue("");
		that.byId("address").setValue("");
		that.byId("country").setValue("");
		this.countryKey === "";
		that.byId("city").setValue("");
		that.byId("postalcode").setValue("");
		that.byId("language").setValue("");
		this.languageKey === "";

	},
	refreshContact: function () {
		var that = this.getView();
		that.byId("mobileno").setValue("");
		that.byId("phoneno").setValue("");
		that.byId("faxno").setValue("");
		that.byId("email").setValue("");
	},
	refreshBank: function () {
		var that = this.getView();
		that.byId("bankcountry").setValue("");
		this.bankCountryKey === "";
		that.byId("bankkey").setValue("");
		this.bankKey === "";
		that.byId("address").setValue("");
		that.byId("accountno").setValue("");
		that.byId("iban").setValue("");
		that.byId("holdername").setValue("");
		that.byId("taxno").setValue("");
	},
	onSave: function () {
		var that = this.getView();
		var self = this;

	
			sap.m.MessageBox.show(
				"Are you sure you want to save", {
					icon: sap.m.MessageBox.Icon.QUESTION,
					title: "Confirmation",
					actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
					onClose: function (oAction) {
						attachments = [];
						if (oAction === sap.m.MessageBox.Action.OK) {
							for (a = 0; a < self.oItems.length; a++) {
								attachments.push(self.oItems[a].base64)
							}
						}
						var oItems_temp = JSON.stringify(self.oItems);
						var json = {
							title: that.byId("title")._getSelectedItemText(),
							name: that.byId("name").getValue(),
							address: that.byId("address").getValue(),
							city: that.byId("city").getValue(),
							postalcode: that.byId("postalcode").getValue(),
							language: that.byId("language").getSelectedKey(),
							mobileno: that.byId("mobileno").getValue(),
							phoneno: that.byId("phoneno").getValue(),
							faxno: that.byId("faxno").getValue(),
							email: that.byId("email").getValue(),
							bankcountry: that.byId("bankcountry").getSelectedKey(),
							bankkey: that.byId("bankkey").getSelectedKey(),
							accountno: that.byId("accountno").getValue(),
							iban: that.byId("iban").getValue(),
							holdername: that.byId("holdername").getValue(),
							taxno: that.byId("taxno").getValue(),
							attachment: attachments
						}
						console.log(json);
						var jsonObj = JSON.stringify(json);
						var url = 'https://10.53.14.171:4302/test/vendorPost.xsjs';
						$.ajax({
							url: url,
							//jsonpCallback : 'getJSON'
							async:	false,
							contentType: "application/json",
							cache : false,
							data: jsonObj,
							type: 'POST',
							//dataType : 'json',
							success: function (data, textStatus, jqXHR) {
								//var _return = JSON.parse(data);
								var oTxt = new sap.m.Text({
									text: 'Your request has been succesfully submitted for approval.'
								});
								var successDialog = new sap.m.Dialog({
									title: 'Submitted',
									type: 'Message',
									state: 'Success',
									content: oTxt,
									beginButton: new sap.m.Button({
										text: 'OK',
										press: function (evt2) {
											successDialog.close();
										}
									}),
									afterClose: function () {
										successDialog.destroy();
									}
								});
								successDialog.open();
								console.log(data)
							},
							error: function (data, textStatus, error) {

								var oTxt = new sap.m.Text({
									text: 'Error occured during vendor registration.Contact system administrator.'
								});
								var errorDialog = new sap.m.Dialog({
									title: 'System Error',
									type: 'Message',
									state: 'Error',
									content: oTxt,
									beginButton: new sap.m.Button({
										text: 'OK',
										press: function (evt2) {
											errorDialog.close();
										}
									}),
									afterClose: function () {
										errorDialog.destroy();
									}
								});

								errorDialog.open();
							}
						});
						console.log(json);
					}

				});
		
	}
});