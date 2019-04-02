/**
 * @version    	$Id: Translate.js gsuartana $
 *
 * @class
 * Utility for dynamically translating text elements, HTML tokens and languages itself.
 *
 * If the text elements contain variables (see #replaceVariables) they will be replaced by their
 * corresponding values.
 *
 * @author 		Gede Suartana <gede.suartana@docu.ch>
 */
Ext.define('Docucrm.util.Translate', {
	requires: ['Docucrm.util.Tools'],
	uses: ['Docucrm.util.Html'],
	singleton: true,

	/**
	 * The id of the Docucrm component.
	 */
	id: 'utilTranslate',

	/**
	 * @ignore
	 */
	constructor: function() {
		this.callParent(arguments);
		this.reinit();
	},

	/**
	 * @private @property {Array}
	 *
	 * Array with all translation texts loaded from the database.
	 */
	_translateTexts: null,

	/**
	 * @private
	 *
	 * Currently active language.
	 */
	_activeLanguage: 'en',

	/**
	 * Reload the translation texts from the server.
	 *  @param {Function} [callback] A function to be used as callback after the texts have been reloaded.
	 *  @param {Object} [scope] The scope to be used for the callback function.
	 */
	reinit: function(callback, scope) {
		this._translateTexts = [];

		Ext.Ajax.request({
			method: "GET",
			url: "/translation/jstranslations",
			async: false,
			// wait for completion!!
			disableCaching: true,
			scope: this,
			success: function(response) {
				this._translateTexts = Ext.JSON.decode(response.responseText);

				var fields = [{
					name: 'id',
					type: 'string'
				}, {
					name: 'text',
					type: 'string'
				}, {
					name: 'FIT_TITLE',
					type: 'text'
				}, {
					name: 'FLI_ACTIVE',
					type: 'boolean'
				}];


				/* this._faqTree = Ext.create("Ext.data.TreeStore", {
					 fields: fields,
					 root: {
						 children: this._translateTexts.faqTree
					 }
				 });*/

				if (Ext.isFunction(callback)) {
					callback.call(scope || this, true);
				}
			},
			failure: function(response) {
				if (Ext.isFunction(callback)) {
					callback.call(scope || this, false);
				}
			}
		});
	},

	/**
	 * Get all translation texts.
	 *
	 * @return {Array} Array with all translation texts.
	 */
	getTranslateTexts: function() {
		if (this._translateTexts === null) {
			this.reinit();
		}

		return this._translateTexts;
	},

	/**
	 * Get the active language.
	 *
	 * @return {String} Active language.
	 */
	getActiveLanguage: function() {
		return this._activeLanguage;
	},

	/**
	 * Set the active language.
	 *
	 * @param {String} language The new language to be used.
	 *
	 * @return {String} Active language.
	 */
	setActiveLanguage: function(language) {
		this._activeLanguage = language;
	},

	_replaceVariable: function(variable) {

	},

	/**
	 * Replace text variables in a pre-translated string.
	 *
	 * The variables have the general format `${type:name}`. They come in different flavours:
	 *     - images as `${img:path_to_image}` where the `path_to_image` is relative to the resources directory of D2i
	 *     - store values `${store:field}` will retrieve the field of the first record in a global store
	 *
	 * @param {String} text The text with variables.
	 * @param {String} [notFoundValue] A value to use if a variable cannot be replaced.
	 *
	 * @return {String} The text with all variables replaced.
	 */
	replaceVariables: function(text, notFoundValue, storeRecords, defaultLocation, defaultType) {
		var count = 0;
		var hasChange = true;
		while (hasChange && count < 5) {
			var variables = Ext.isString(text) ? text.match(/\$\{[^\}]+\}/gi) : false;
			if (variables) {
				hasChange = false;

				for (var i in variables) {
					var variable = variables[i];
					var variableWithEnclosure = new RegExp('<p>\\s*' + Util.Tools.quoteRegExp(variable) + '[\\s\\n\\r]*</p>');
					var result;
					var path;
					var infoType;

					var match;
					if ((match = variable.match(/\$\{img:([a-z0-9\.\/_\-]+)\}/i) || variable.match(/\$\{img:([a-z0-9\.\/_\-]+);([^\}]+)\}/i))) {
						hasChange = true;
						if (match[2]) {
							result = '<img style="' + match[2] + '" src="/resources/' + match[1] + '" />';
						} else {
							result = '<img src="/resources/' + match[1] + '" />';
						}
					} else if ((match = variable.match(/\$\{html:([a-z0-9_]+)\}/i))) {
						hasChange = true;
						result = Util.Translate.html(match[1].toUpperCase());
					} else if ((match = variable.match(/\$\{faq(\w*):([a-z0-9_]+)\}/i))) {
						if (!defaultLocation || !defaultType) {
							console.warn("tying to lookup " + match[2].toUpperCase() + " without default information");
						}

						defaultLocation = defaultLocation ? defaultLocation.toUpperCase() : "UNDEFINED";
						defaultType = defaultType ? defaultType.toUpperCase() : "UNDEFINED";

						infoType = match[1] === "" ? 'all' : match[1];
						path = [defaultLocation, defaultType, match[2].toUpperCase()];

						hasChange = true;
						result = Util.Translate.faqTree(path, infoType);
					} else if ((match = variable.match(/\$\{faq(\w*):([a-z0-9_]+):([a-z0-9_]+):([a-z0-9_]+)\}/i))) {
						infoType = match[1] === "" ? 'all' : match[1];
						path = Ext.Array.slice(match, 2);

						hasChange = true;
						result = Util.Translate.faqTree(path, infoType);
					} else if ((match = variable.match(/\$\{([a-z0-9_]+):([a-z0-9_]+)\}/i))) {
						hasChange = true;
						var record = null;

						var store = Database.StoreManager.getGlobalStore(match[1]);
						if (store) {
							record = store.first();
						} else if (storeRecords) {
							store = true;
							record = storeRecords[match[1].toLowerCase()];
						}

						if (store) {
							if (record) {
								var key = match[2].toUpperCase();
								if (record.isModel) {
									result = record.get(key);
								} else if (Ext.isSimpleObject(record)) {
									result = record[key];
								}

								if (result === undefined) {
									result = notFoundValue === undefined ? "${" + match[1] + ":" + match[2] + "-existing?}" : notFoundValue;
								} else if (Ext.isDate(result)) {
									if (result.getHours() || result.getMinutes() || result.getSeconds()) {
										result = Util.Tools.formatTimestamp(result);
									} else {
										result = Util.Tools.formatDate(result);
									}
								}
							} else {
								result = notFoundValue === undefined ? "${" + match[1] + "-empty?:" + match[2] + "}" : notFoundValue;
							}
						} else {
							result = notFoundValue === undefined ? "${" + match[1] + "-existing?:" + match[2] + "}" : notFoundValue;
						}
					}

					if (hasChange) {
						if (text.match(variableWithEnclosure)) {
							text = text.replace(variableWithEnclosure, result);
						}
						else {
							text = text.replace(variable, result);
						}
					}
				}
			}

			count++;
		}

		return text;
	},

	/**
	 * Generic function to retrieve a translated text element out of the translation texts. If a label cannot be translated, the label text will just be used as such.
	 * This means that labels written in English don't need an entry in the translation tables.
	 *
	 * @param {String} type Type of element ('labels', 'html' or 'languages').
	 * @param {String} code Lookup code for the element.
	 * @param {String[]} [parameters] Parameters to be used in substitutions for the translated text.
	 * @param {String} [notFoundValue] Return value if the code could not be looked up.
	 *
	 * @return {String} The translated text with all variables substituted.
	 */
	element: function(type, code, params, notFoundValue, titleTag, storeRecords) {
		var lang = this.getActiveLanguage();
		var translateTexts = this.getTranslateTexts();
		var text = code;
		var title;

		if (translateTexts[type] && translateTexts[type][code]) {
			text = translateTexts[type][code][lang];
			if (Ext.isSimpleObject(text)) {
				title = text.title;
				text = text.content;
			}
		} else if (notFoundValue !== undefined) {
			text = notFoundValue;
		} else if (type != "labels") {
			text = "[" + type + "{" + code + "}]";
		}

		if (Ext.isString(text)) {
			text = Docucrm.util.Tools.format(text, params);
		}

		if (Ext.isString(text)) {
			if (title) {
				if (titleTag === true) {
					text = title;
				} else if (titleTag !== false) {
					if (!Ext.isString(titleTag)) {
						titleTag = "h3";
					}

					text = '<' + titleTag + '>' + title + '</' + titleTag + '>' + text;
				}
			}

			text = this.replaceVariables(text, notFoundValue, storeRecords);

			if (titleTag !== true) {
				if (type == "html" || type == "faq") {
					text = '<div name="translate-token-' + code.replace(/ /g, '-') + '">' + text + '</div>';
				}
			}
		}

		return text;
	},

	/**
	 * Retrieve a label text and translate it using the subsitution parameters.
	 *
	 * @param {String} code Lookup code for the element.
	 * @param {String[]} [parameters] Parameters to be used in substitutions for the translated text.
	 * @param {String} [notFoundValue] Return value if the code could not be looked up.
	 *
	 * @return {String} The translated text with all variables substituted.
	 */
	label: function(text, params, notFoundValue, storeRecords) {
		if (Ext.isSimpleObject(text)) {
			var obj = text;
			text = "";
			Ext.Object.each(obj, function(key, value) {
				text += Util.Html.wrap('tr', Util.Html.wrap(['td', 'b'], key.charAt(0).toUpperCase() + key.slice(1) + ":&nbsp;") + Util.Html.wrap('td', value));
			});

			text = Util.Html.wrap('table', text, 'border="0" cellpadding="0" cellspacing="0"');
		}

		return this.element('labels', text, params, notFoundValue, false, storeRecords);
	},
	/**
	 * Retrieve a message text and translate it using the subsitution parameters.
	 *
	 * @param {String} code Lookup code for the element.
	 * @param {String[]} [parameters] Parameters to be used in substitutions for the translated text.
	 * @param {String} [notFoundValue] Return value if the code could not be looked up.
	 *
	 * @return {String} The translated text with all variables substituted.
	 */
	message: function(text, params, notFoundValue, storeRecords) {
		if (Ext.isSimpleObject(text)) {
			var obj = text;
			text = "";
			Ext.Object.each(obj, function(key, value) {
				text += Util.Html.wrap('tr', Util.Html.wrap(['td', 'b'], key.charAt(0).toUpperCase() + key.slice(1) + ":&nbsp;") + Util.Html.wrap('td', value));
			});

			text = Util.Html.wrap('table', text, 'border="0" cellpadding="0" cellspacing="0"');
		}

		return this.element('labels', text, params, notFoundValue, false, storeRecords);
	},

	/**
	 * Retrieve a html block and translate it using the subsitution parameters.
	 *
	 * @param {String} code Lookup code for the element.
	 * @param {String[]} [parameters] Parameters to be used in substitutions for the translated text.
	 * @param {String} [notFoundValue] Return value if the code could not be looked up.
	 *
	 * @return {String} The translated html block with all variables substituted.
	 */
	html: function(token, params, notFoundValue, storeRecords) {

		var html =  this.element('html', Ext.isString(token) ? token.toUpperCase() : token, params, notFoundValue, false, storeRecords);
		console.log("html",html);
		return html;
	},

	/**
	 * Retrieve a html block including the title of an FAQ entry and translate it using the subsitution parameters.
	 *
	 * @param {String} code Lookup code for the element.
	 * @param {String[]} [parameters] Parameters to be used in substitutions for the translated text.
	 * @param {String} [notFoundValue] Return value if the code could not be looked up.
	 *
	 * @return {String} The translated html block with all variables substituted.
	 *
	 * @obsolete	Use #faqTree instead.
	 */
	faq: function(token, params, notFoundValue, titleTag, storeRecords) {
		console.warn("call to obsolete function Util.Tranlsate.faq");
		return this.element('faq', Ext.isString(token) ? token.toUpperCase() : token, params, notFoundValue, titleTag, storeRecords);
	},

	/**
	 * Retrieve a html block of an FAQ entry and translate it using the subsitution parameters.
	 *
	 * @param {String} code Lookup code for the element.
	 * @param {String[]} [parameters] Parameters to be used in substitutions for the translated text.
	 * @param {String} [notFoundValue] Return value if the code could not be looked up.
	 *
	 * @return {String} The translated html block with all variables substituted.
	 *
	 * @obsolete	Use #faqTree instead.
	 */
	faqText: function(token, params, notFoundValue, storeRecords) {
		console.warn("call to obsolete function Util.Tranlsate.faqText");
		return this.element('faq', Ext.isString(token) ? token.toUpperCase() : token, params, notFoundValue, false, storeRecords);
	},

	/**
	 * Retrieve the title of an FAQ entry and translate it using the subsitution parameters.
	 *
	 * @param {String} code Lookup code for the element.
	 * @param {String[]} [parameters] Parameters to be used in substitutions for the translated text.
	 * @param {String} [notFoundValue] Return value if the code could not be looked up.
	 *
	 * @return {String} The translated html block with all variables substituted.
	 *
	 * @obsolete	Use #faqTree instead.
	 */
	faqTitle: function(token, params, notFoundValue, titleTag, storeRecords) {
		console.warn("call to obsolete function Util.Tranlsate.faqTitle");
		return this.element('faq', Ext.isString(token) ? token.toUpperCase() : token, params, notFoundValue, true, storeRecords);
	},

	/**
	 * Retrieve a html block of an FAQ entry and translate it using the subsitution parameters.
	 *
	 * @param {String|String[]} path Lookup code for the element.
	 * @param {String} infoType The type of information to return
	 * @param {String[]} [params] Parameters to be used in substitutions for the translated text.
	 * @param {String} [notFoundValue] Return value if the code could not be looked up.
	 *
	 * @return {String} The translated html block with all variables substituted.
	 */
	faqTree: function(path, infoType, params, notFoundValue, storeRecords) {
		if (Ext.isString(path)) {
			path = path.replace(/^\//, "").split(/\//);
		}

		infoType = infoType ? infoType.toLowerCase() : 'all';

		var child = this._faqTree.getRootNode();
		var depth = 0;
		var last = path.length;
		var anchor;
		while (child && depth < last) {
			anchor = path[depth++].toUpperCase();
			child = child.findChild("id", anchor);
		}

		var text;
		if (child) {
			if (infoType == 'all' || infoType == 'text') {
				text = child.get('text');

				if (infoType == 'all') {
					text = '<a name="' + anchor + '"></a><h3>' + child.get("FIT_TITLE") + '</h3>' + text;
				}
			}
			else {
				text = child.get("FIT_TITLE");
			}

			text = Util.Tools.format(text, params);
		}

		if (text === undefined) {
			if (notFoundValue === undefined) {
				text = "${" + path.join(":") + "-defined?}";
			}
			else {
				text = notFoundValue;
			}
		}

		return text;
	},

	/**
	 * Retrieve a translated language name.
	 *
	 * @param {String} code Lookup code for the element.
	 * @param {String} [notFoundValue] Return value if the code could not be looked up.
	 *
	 * @return {String} The translated language name.
	 */
	language: function(code, notFoundValue) {
		return this.element('languages', Ext.isString(code) ? code.toLowerCase() : code, false, notFoundValue);
	},

	/**
	 * Get the translations for all languages of a given type and optionally code.
	 *
	 * @param {String} type Type of elements ('labels', 'html' or 'languages').
	 * @param {String} [code] Lookup code for the elements.
	 *
	 * @return {String[]} Returns an array with the texts for all languages or `false` if no matching data was found.
	 */
	allTranslations: function(type, code) {
		var result = false;
		var translateTexts = this.getTranslateTexts();

		if (code) {
			if (translateTexts[type]) {
				result = translateTexts[type][code];
			}
		} else {
			result = translateTexts[type];
		}

		return result;
	},

	/**
	 * Generic function to display a message box. This function is not normally called directly. Rather use one of the specific message functions below instead.
	 *
	 * @param {String|Object} titleOrConfig Use either for a complete configuration object or for the title of the message box. The config options below are available and
	 * there are further dialog options available directly passed through to {@link System.Dialog#showDialog}, which is used by this method.
	 *  @param {String} [titleOrConfig.title] The title to be used for the dialog (will be translated before displaying it).
	 *  @param {String} [titleOrConfig.message] A display text (will be translated before displaying it). Alias is `msg`. Mutally exclusive with `html`.
	 *  @param {String} [titleOrConfig.html] A HTML token to be looked up from the CMS and used a display text. Mutually exclusive with `msg` and `message`.
	 *  @param {Number} [titleOrConfig.buttons] The button code for the buttons to display. Defaults to {@link System.Dialog#OK} for normal dialogs and to {@link System.Dialog#OKCANCEL} for dialogs with prompt section.
	 *  @param {Boolean|String} [titleOrConfig.prompt] Flag, whether to display the input prompt section.
	 *  @param {String} [titleOrConfig.promptTitle] The title text to display in front of the prompt field.
	 *  @param {String} [titleOrConfig.promptLabel] The field label of the prompt field.
	 *  @param {Function} [titleOrConfig.handler] A function to be used as callback with the button pressed.
	 *  @param {Object} [titleOrConfig.scope] The scope to be used for the callback function.
	 *
	 * @param {String} [message] Message to be displayed. This parameter is *mandatory*, if the first parameter is just a title string.
	 * @param {Function|String[]} [functionOrArgs] Use either for supplying substitution parameters for the message or the callback function.
	 * @param {Function} [functionOrOpts] If arguments were passed in the previous parameter, the callback function is passed here.
	 * @param {String|Number} [icon] Icon to be used in the message box panel. {@link System.Dialog} icon constants can be used here.
	 * @param {Object|Number} [buttons] Buttons to be used in the message box panel. {@link System.Dialog} button constants can be used here.
	 * @param {Boolean} [prompt] If true, a single line text field for user input is also displayed in the message box.
	 */
	messageBox: function(titleOrConfig, message, functionOrArgs, functionOrOpts, icon, buttons, prompt) {
		//Ext.syncRequire('System.Dialog');

		var options = {
			// cls: 'd2i-msg-floating',
			width: 400,
			prompt: prompt,
			buttons: buttons,
			icon: icon ? icon : 'client/resources/iconsMedium/information.png'
		};

		var title = titleOrConfig;
		if (Ext.isSimpleObject(titleOrConfig)) {
			options = Ext.apply(options, titleOrConfig);

			options.title = this.label(options.title, options.args);

			if (options.promptTitle) {
				options.promptTitle = this.label(options.promptTitle, options.args);
			}

			if (options.promptLabel) {
				options.promptLabel = this.label(options.promptLabel, options.args);
			}

			if (options.html) {
				options.msg = this.html(options.html, options.args);
				options.styleHtmlContent = true;
				delete options.html;

			} else if (options.msg || options.message) {
				options.msg = this.label(options.msg ? options.msg : options.message, options.args);
				delete options.message;
			}
		} else {
			if (Ext.isFunction(functionOrArgs)) {
				options.handler = functionOrArgs;
			} else if (Ext.isPrimitive(functionOrArgs) || Ext.isArray(functionOrArgs)) {
				options.args = functionOrArgs;
			} else if (Ext.isSimpleObject(functionOrArgs)) {
				Ext.apply(options, functionOrArgs);
			}

			options.title = this.label(title, options.args);
			options.msg = this.label(message, options.args);
		}

		if (options.buttons === undefined) {
			options.buttons = prompt ? System.Dialog.OKCANCEL : System.Dialog.OK;
		}

		if (Ext.isSimpleObject(functionOrOpts)) {
			options = Ext.apply(options, functionOrOpts);
		} else if (Ext.isFunction(functionOrOpts)) {
			options.fn = functionOrOpts;
		}

		var dialog = System.Dialog.showDialog(options);

		return dialog;
	},

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
			title = "<span class='error'>"+title+"</span>";
			iconCls = 'x-fa fa-exclamation-triangle';
		}else{
			msg = "<span class='success'>"+msg+"</span>";
			title = "<span class='successtitle'>"+title+"</span>";
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
			margin:10,
			bodyStyle: 'background:#FFFFFF;',
			html: msg,
			slideInDuration: 800,
			slideBackDuration: 1500,
			autoCloseDelay:6000,
			slideInAnimation: 'easeIn',
			slideBackAnimation: 'bounceOut'
		});

		Ext.create('Docucrm.util.Notification',config).show();
	}
});