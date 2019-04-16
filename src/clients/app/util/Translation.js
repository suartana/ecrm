
Ext.define('Docucrm.util.Translation', {
	singleton: true,
	alternateClassName: ['Translation'],
	id: 'translation',
	constructor: function() {
		this.callParent(arguments);
		this.loadJsonTranslation();
	},
	storeDb:function(data){
		return localStorage.setItem("languages", JSON.stringify(data));
	},
	/**
	 * Set the default main View
	 *
	 * @returns {string}
	 */
	loadJsonTranslation:function(){
		var me = this;
		Ext.Ajax.request({
			method: "GET",
			url: "/translation/jstranslations",
			async: false,
			// wait for completion!!
			disableCaching: true,
			scope: this,
			success: function(response, opts) {
				var obj = Ext.JSON.decode(response.responseText);
				me.storeDb(obj);
			},
			failure: function(response) {
				Docucrm.util.Translate.infoBox("Error","Something went wrong, Please contact your administrator.");
			}
		});
	}
});