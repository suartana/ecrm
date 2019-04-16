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
Ext.define('Docucrm.util.Message', {
	singleton: true,
	alternateClassName: ['Message'],
	//uses: ['System.Dialog', 'Base.view.mixins.SmartComponent'],
	/**
	 * The id of the Docucrm component.
	 */
	id: 'message',

	/**
	 * A generic dialog with a prompt field.
	 *
	 * @param {String|Object} titleOrConfig Use either for a complete configuration object or for the title of the message box.
	 * @param {String} [message] Message to be displayed. This parameter is *mandatory*, if the first parameter is just a title string.
	 * @param {Function|String[]} [functionOrArgs] Use either for supplying substitution parameters for the message or the callback function.
	 * @param {Function} [functionOrOpts] If arguments were passed in the previous parameter, the callback function is passed here.
	 * @param {String|Number} [icon] Icon to be used in the message box panel. {@link System.Dialog} icon constants can be used here.
	 * @param {Object|Number} [buttons] Buttons to be used in the message box panel. {@link System.Dialog} button constants can be used here.
	 */
	promptBox: function(titleOrConfig, message, functionOrArgs, func, icon, buttons) {
		return this.messageBox(titleOrConfig, message, functionOrArgs, func, icon, buttons, true);
	},

	/**
	 * Generic function to display a notification window. This function is not normally called directly. Rather use the specific notification functions instead.
	 *
	 * @param {String} title The title of the notification window.
	 * @param {String} [message] Message to be displayed.
	 * @param {String[]} [args] Substitution parameters for the message.
	 * @param {Boolean} [htmlToken] Pass `true` if the message is a HTML token rather than a text string.
	 * @param {Number} [hideDelay] Delay in milliseconds before the notification will hide itself. Defaults to 6000ms.
	 * @param {String|Number} [icon] Icon to be used in the notification window. The default is an icon signifiying 'informational message'.
	 * @param {String} [style] Additional CSS class to style the notification window.
	 *
	 * @return {Util.Notification} The notification window.
	 */
	notificationBox: function(message, options) {
		var config = Ext.apply({
			title: this.label(options.title ? options.title : 'Notification'),
			cls: 'ux-notification-light',
			icon: options.icon ? options.icon : 'client/resources/iconsMedium/information.png',
			message: options.htmlToken ? this.html(message, options.args) : this.label(message, options.args),
			autoHide: options.hideDelay === false ? false : true,
			autoHideDelay: options.hideDelay ? options.hideDelay : 6000,
			closable: true
		}, options);

		var notification = Ext.create('Docucrm.util.Notification', config);

		// add the notification to the Docucrm view to make sure they are using the proper zIndexManager.
		//var DocucrmView = Docucrm.getView();
		//DocucrmView.add(notification);

		notification.show();

		return notification;
	},

	/**
	 * Confirmational message box with two buttons: 'Yes' and 'No'.
	 *
	 * @param {String|Object} titleOrConfig Use either for a complete configuration object or for the title of the message box.
	 * @param {String} [message] Message to be displayed. This parameter is *mandatory*, the first parameter is just a title string.
	 * @param {Function|String[]} [functionOrArgs] Use either for supplying substitution parameters for the message or the callback function.
	 * @param {Function} [func] If arguments were passed in the previous parameter, the callback function is passed here.
	 *
	 * @return {Ext.window.Window} The dialog view.
	 */
	confirmBox: function(titleOrConfig, message, functionOrArgs, func) {
		return this.messageBox(titleOrConfig, message, functionOrArgs, func, undefined, System.Dialog.YESNO);
	},

	/**
	 * Confirmational message box with three buttons: 'Yes', 'No' and 'Cancel'.
	 *
	 * @param {String|Object} titleOrConfig Use either for a complete configuration object or for the title of the message box.
	 * @param {String} [message] Message to be displayed. This parameter is *mandatory*, the first parameter is just a title string.
	 * @param {Function|String[]} [functionOrArgs] Use either for supplying substitution parameters for the message or the callback function.
	 * @param {Function} [func] If arguments were passed in the previous parameter, the callback function is passed here.
	 *
	 * @return {Ext.window.Window} The dialog view.
	 */
	confirmBoxWithCancel: function(titleOrConfig, message, functionOrArgs, func) {
		return this.messageBox(titleOrConfig, message, functionOrArgs, func, System.Dialog.CONFIRM, System.Dialog.YESNOCANCEL);
	},
	/**
	 * Warning message box with one button: 'OK'.
	 *
	 * @param {String|Object} titleOrConfig Use either for a complete configuration object or for the title of the message box.
	 * @param {String} [message] Message to be displayed. This parameter is *mandatory*, the first parameter is just a title string.
	 * @param {Function|String[]} [functionOrArgs] Use either for supplying substitution parameters for the message or the callback function.
	 * @param {Function} [func] If arguments were passed in the previous parameter, the callback function is passed here.
	 *
	 * @return {Ext.window.Window} The dialog view.
	 */
	warningBox: function(titleOrConfig, message, functionOrArgs, func) {
		return this.messageBox(titleOrConfig, message, functionOrArgs, func, System.Dialog.WARNING, System.Dialog.OK);
	},

	/**
	 * Error message box with one button: 'OK'.
	 *
	 * @param {String|Object} titleOrConfig Use either for a complete configuration object or for the title of the message box.
	 * @param {String} [message] Message to be displayed. This parameter is *mandatory*, the first parameter is just a title string.
	 * @param {Function|String[]} [functionOrArgs] Use either for supplying substitution parameters for the message or the callback function.
	 * @param {Function} [func] If arguments were passed in the previous parameter, the callback function is passed here.
	 *
	 * @return {Ext.window.Window} The dialog view.
	 */
	errorBox: function(titleOrConfig, message, functionOrArgs, func) {
		return this.messageBox(titleOrConfig, message, functionOrArgs, func, System.Dialog.ERROR, System.Dialog.OK);
	},

	/**
	 * Informational notification with a text message.
	 *
	 * @param {String} title The title of the notification window.
	 * @param {String} [message] Message to be displayed.
	 * @param {Number} [hideDelay] Delay in milliseconds before the notification will hide itself.
	 *
	 * @return {Util.Notification} The notification window.
	 */
	infoNotification: function(message, argsOrOptions) {
		var opts = Ext.apply({
			title: "Notification",
			icon: 'client/resources/iconsMedium/information.png',
			//args: argsOrOptions,
			htmlToken: false
		}, argsOrOptions);

		return this.notificationBox(message, opts);
	},

	/**
	 * Warning notification with a text message.
	 *
	 * @param {String} title The title of the notification window.
	 * @param {String} [message] Message to be displayed.
	 * @param {Number} [hideDelay] Delay in milliseconds before the notification will hide itself.
	 *
	 * @return {Util.Notification} The notification window.
	 */
	warningNotification: function(message, argsOrOptions) {
		var opts = Ext.apply({
			title: "Warning",
			icon: 'client/resources/iconsMedium/warning.png',
			args: argsOrOptions,
			htmlToken: false
		}, argsOrOptions);

		return this.notificationBox(message, opts);
	},

	/**
	 * Error notification with a text message.
	 *
	 * @param {String} title The title of the notification window.
	 * @param {String} [message] Message to be displayed.
	 * @param {Number} [hideDelay] Delay in milliseconds before the notification will hide itself.
	 *
	 * @return {Util.Notification} The notification window.
	 */
	errorNotification: function(message, argsOrOptions) {
		var opts = Ext.apply({
			title: "Error",
			icon: 'client/resources/iconsMedium/error.png',
			args: argsOrOptions,
			htmlToken: false
		}, argsOrOptions);

		return this.notificationBox(message, opts);
	},

	/**
	 * Informational notification with a HTML token.
	 *
	 * @param {String} title The title of the notification window.
	 * @param {String} [message] Message to be displayed.
	 * @param {Number} [hideDelay] Delay in milliseconds before the notification will hide itself.
	 *
	 * @return {Util.Notification} The notification window.
	 */
	infoHtmlNotification: function(message, argsOrOptions) {
		var opts = Ext.apply({
			title: "Notification",
			icon: 'client/resources/iconsMedium/information.png',
			args: argsOrOptions,
			htmlToken: true
		}, argsOrOptions);

		return this.notificationBox(message, opts);
	},

	/**
	 * Warning notification with a HTML token.
	 *
	 * @param {String} title The title of the notification window.
	 * @param {String} [message] Message to be displayed.
	 * @param {Number} [hideDelay] Delay in milliseconds before the notification will hide itself.
	 *
	 * @return {Util.Notification} The notification window.
	 */
	warningHtmlNotification: function(message, argsOrOptions) {
		var opts = Ext.apply({
			title: "Warning",
			icon: 'client/resources/iconsMedium/warning.png',
			args: argsOrOptions,
			htmlToken: true
		}, argsOrOptions);

		return this.notificationBox(message, opts);
	},

	/**
	 * Error notification with a HTML token.
	 *
	 * @param {String} title The title of the notification window.
	 * @param {String} [message] Message to be displayed.
	 * @param {Number} [hideDelay] Delay in milliseconds before the notification will hide itself.
	 *
	 * @return {Util.Notification} The notification window.
	 */
	errorHtmlNotification: function(message, argsOrOptions) {
		var opts = Ext.apply({
			title: "Error",
			icon: 'client/resources/iconsMedium/error.png',
			args: argsOrOptions,
			htmlToken: true
		}, argsOrOptions);

		return this.notificationBox(message, opts);
	},

	/**
	 * Create a string from a number and an item description.
	 * @param  {Number} n        	The number of items.
	 * @param  {String} singular 	The item in singular (ie. 'one user')
	 * @param  {String} plural   	The item in plural (ie. '%s users')
	 * @param  {String[]} wrapTags 	An array with tags to be wrapped around the resulting string. Defaults to `['b', 'i']`.
	 * @return {String}          	The formatted string.
	 */
	makeQuantity: function(n, singular, plural, wrapTags) {
		if (wrapTags === undefined) {
			wrapTags = [];
		}

		return Util.Html.wrap(wrapTags, n == 1 ? singular : Util.Tools.format(plural, n));
	},

	/**
	 * Create a string from a number and an item description. The result wil be wrapped as bold and italic.
	 * @param  {Number} n        	The number of items.
	 * @param  {String} singular 	The item in singular (ie. 'one user')
	 * @param  {String} plural   	The item in plural (ie. '%s users')
	 * @param  {String[]} wrapTags 	An array with tags to be wrapped around the resulting string. Defaults to `['b', 'i']`.
	 */
	makeQuantityEmphasis: function(n, singular, plural) {
		return this.makeQuantity(n, singular, plural, ['b', 'i']);
	},
	/**
	 * Informational notification with a text message.info Box
	 * @param {String} [title] Title to be displayed.
	 * @param {String} [msg] Message to be displayed.
	 */
	infoBox:function( title,msg){

		if(title === 'Error'){
			msg = "<span class='error'>"+msg+"</span>";
			iconCls = 'x-fa fa-exclamation-triangle';
		}else{
			msg = "<span class='success'>"+msg+"</span>";
			iconCls = 'x-fa fa-info';
		}

		var config = Ext.apply({
				position: 'tr',
				useXAxis: true,
				cls: 'ux-notification-light',
				iconCls:iconCls,
				closable: true,
				width:350,
				height:150,
				title: title,
				margin:'100px 0px 50px 0px',
				bodyStyle: 'background:#FFFFFF;',
				html: msg,
				slideInDuration: 800,
				slideBackDuration: 1500,
				autoCloseDelay:5000,
				slideInAnimation: 'easeIn',
				slideBackAnimation: 'bounceOut'
			});

		Ext.create('Docucrm.util.Notification',config).show();
	}
});