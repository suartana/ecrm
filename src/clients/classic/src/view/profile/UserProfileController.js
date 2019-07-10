
Ext.define('Docucrm.view.profile.UserProfileController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.userprofile',
	alternateClassName: ['UserProfileController'],
	validateField: function(field) {
		field.next().validate();
	},
	/**
	 * Change / Update user password
	 *
	 * @param button
	 */
	onPasswordChangeClick:function(button){
		var me = this,
			view = me.getView(),
			form = view.down("#passwordChangeFormId").getForm();

		if(form.isValid()) {
			try {
				form.submit({
					headers : Helpers.apiPostHeaders(),
					url: 'api/users/changepassword',
					scope: this,
					method: 'POST',
					clientValidation:true,
					waitTitle: Translate.title( 'SavingData' ),
					waitMsg : Translate.label( 'PleaseWait' )+"...",
					clientValidation: true,
					success: function (form, action) {
						var response = action.response,
							obj = Ext.decode(response.responseText);
						//inform user
						Message.infoBox("Info", obj.message);
						//clear form
						obj.update === true ? false : form.reset();
						//reload grid store
						store.reload();
					},
					failure: function (form, action) {
						var response = action.response,
							obj = Ext.decode(response.responseText);
						Message.infoBox("Error", obj.error.message);
					}
				});
			}  catch (exception) {
				Message.infoBox("Error",Translate.error("ReportAdmin"));
			}
		}
	},
	onProfileFormSubmitClick:function (button) {

	}
});
