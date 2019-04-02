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
	 * Set Extjs Headers params
	 *
	 * @returns {{Authorization: string, Accept: string, "X-CSRF-TOKEN": string, "Content-Type": string}}
	 */
	apiHeaders:function(){
		var loggedIn = this.apiTokens(),
			headers = {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json',
				'Authorization' : 'Bearer '+ loggedIn,
				'X-CSRF-TOKEN': loggedIn
			};

		return headers;
	},
	/**
	 * Set the default main View
	 *
	 * @returns {string}
	 */
	appMainView:function(){
		var me = this,
			route = window.route,
			mainView;
		switch (route) {
			case 'reset':
				mainView = 'Docucrm.view.authentication.ChangePassword';
			break;
			case 'user':
				mainView = 'Docucrm.view.main.Main';
			break;
			default:
				mainView = 'Docucrm.view.authentication.Login';
			break;
		}
		return mainView = me.apiTokens ? mainView : 'Docucrm.view.authentication.Login';
	}

});