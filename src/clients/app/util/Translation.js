/**
 * @version    	$Id: Translation.js gsuartana $
 *
 * @class
 * Utility for the language Storage translation
 * Storing the json data in to the browser local database (Client-side storage)
 *
 * @author 		Gede Suartana <gede.suartana@docu.ch>
 */
Ext.define('Docucrm.util.Translation', {
	singleton: true,
	alternateClassName: ['Translation'],
	id: 'translation',
	constructor: function() {
		this.callParent(arguments);
		//load the json data once time
		//@todo remove helpers api token and create a new function in user dashboard reload translation
		!Helpers.apiTokens() ? this.loadJsonTranslation() : false;
	},
	/**
	 * Storing the json data in to the browser local database (Client-side storage)
	 *
	 * @param data
	 */
	storeDb:function(data){
		return ExtStorage.setItem("languages", JSON.stringify(data),86400); //86065
	},
	/**
	 * Get the json object from the server side
	 */
	loadJsonTranslation:function(){
		var me = this;
		ExtStorage.isExpired("languages") ?
		Ext.Ajax.request({
			method: "GET",
			url: "/translation/jstranslations",
			//async: false,
			// wait for completion!!
			//disableCaching: true,
			scope: this,
			success: function(response, opts) {
				var obj = Ext.JSON.decode(response.responseText);
				me.storeDb(obj);
			},
			failure: function(response) {
				Translate.error("ReportAdmin");
			}
		}) : false;
	}
});