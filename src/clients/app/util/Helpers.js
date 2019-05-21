/**
 * @version    	$Id: Tools.js gsuartana $
 * @copyright  	Copyright (c) 2019
 *
 * @class
 * A collection of tools and functions used in various places in Docucrm,
 * including the definition of system wide defaults for displaying and
 * validation of data fields.
 *
 * @author 		Gede Suartana <gede.suartana@docu.ch>
 */
/*jshint sub:true*/
/*jshint -W030 */
/*jshint esversion: 6 */
//jshint unused:true
//jshint laxcomma:true
Ext.define('Docucrm.util.Helpers', {
	singleton: true,
	alternateClassName: ['Helpers'],
	//uses: ['System.Dialog', 'Base.view.mixins.SmartComponent'],
	/**
	 * The id of the Docucrm component.
	 */
	id: 'helpers',
	/**
	 * Set api token
	 *
	 * @returns {string}
	 */
	apiTokens :function(){
		return localStorage.getItem("tokens");
	},
	/**
	 * Remove item tokens from local storage
	 *
	 * @return {void}
	 */
	removeTokens:function(){
		localStorage.removeItem("tokens");
	},
	/**
	 * Set Extjs Headers params
	 *
	 * @returns {{Authorization: string, Accept: string, "X-CSRF-TOKEN": string, "Content-Type": string}}
	 */
	apiHeaders:function(){
		var tokens = this.apiTokens(),
			headers = {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json',
				'Authorization' : 'Bearer '+ tokens,
				'X-CSRF-TOKEN': tokens
			};

		return headers;
	},
	/**
	 * Set Extjs Headers params
	 *
	 * @returns {{Authorization: string, Accept: string, "X-CSRF-TOKEN": string, "Content-Type": string}}
	 */
	storeHeaders:function(){
		var tokens = this.apiTokens(),
			headers = {
				Authorization : 'Bearer '+ tokens
			};
		return headers;
	},
	/**
	 * Check if locale storage are empty
	 *
	 * @param key
	 * @returns {boolean}
	 */
	isExists:function(key){
		return key === null || key === "null" || key.length < 1 ? false : true;
	},
	/**
	 * Set the default main View
	 *
	 * @returns {string}
	 */
	appMainView:function(){
		var me = this,
			route = window.route,
			mainView,
			loginView = 'Docucrm.view.authentication.Login',
			channgePassView = 'Docucrm.view.authentication.ChangePassword',
			mainView = 'Docucrm.view.main.Main',
			profile = localStorage.getItem("profile") ;

		try {
			// If the user not loggedin, we display the login window,
			// otherwise, we display the main view
			if(route !== 'reset' && me.apiTokens() ) {
				//get user status
				Ext.Ajax.request({
					headers: me.apiHeaders(),
					url: '/api/users/status',
					scope: this,
					method: 'GET',
					success: function (response) {
						var obj = Ext.decode(response.responseText);
						obj.status == 'loggedin' ? true : me.removeTokens();
					},
					failure: function (response) {
						me.removeTokens();
					}
				});
			}
		} catch (exception) {
			me.removeTokens();
			Message.infoBox("Error",Translate.error("ReportAdmin"));
		}

		switch (route) {
			case 'reset':
				mainView = channgePassView;
				break;
			case 'user':
				mainView = me.isExists(profile) ? mainView: loginView;
				break;
			default:
				mainView = me.apiTokens() && me.isExists(profile) ? mainView : loginView ;
				break;
		}

		return  me.apiTokens() || route === 'reset' ? mainView : loginView ;

	}

});