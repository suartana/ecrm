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
	alternateClassName: ['Translate'],
	uses: ['Docucrm.util.Html'],
	singleton: true,
	/**
	 * The id of the Docucrm component.
	 */
	id: 'utilTranslate',

	/**
	 * @private
	 *
	 * Currently active language.
	 */
	_activeLanguage: 'en',



	/**
	 * Get the active language.
	 *
	 * @return {String} Active language.
	 */
	getActiveLanguage: function() {
		return this._activeLanguage;
	},

	/**
	 * Get Selected language
	 *
	 * @param lang
	 * @returns {boolean}
	 */
	getSelectedLanguages:function(lang){
		return window.locale === lang ? true : false;
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
	/**
	 * Search json data by key
	 *
	 * @param key
	 * @returns {*}
	 */
	getData: function(type,key) {
		var me = this,
			data = JSON.parse(localStorage.getItem("languages"));
		if(data) {
			return data.filter(
				function (data) {
					return data.type == type && data.item == key;
				}
			);
		}else{
			return key;
		}
	},

	//return an array of objects according to key, value, or key and value matching
	getObjects : function (obj, key, val) {
		var me = this, objects = [];
		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) continue;
			if (typeof obj[i] == 'object') {
				objects = objects.concat(me.getObjects(obj[i], key, val));
			} else
			//if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
			if (i == key && obj[i] == val || i == key && val == '') { //
				objects.push(obj);
			} else if (obj[i] == val && key == ''){
				//only add if the object is not already in the array
				if (objects.lastIndexOf(obj) == -1){
					objects.push(obj);
				}
			}
		}
		return objects;
	},

	//return an array of values that match on a certain key
	getValues : function (obj, key) {
		var me = this, objects = [];
		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) continue;
			if (typeof obj[i] == 'object') {
				objects = objects.concat(me.getValues(obj[i], key));
			} else if (i == key) {
				objects.push(obj[i]);
			}
		}
		return objects;
	},

	//return an array of keys that match on a certain value
	getText : function (obj, val) {
		var me = this,objects = [];
		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) continue;
			if (obj[i] == val) {
				return obj.text;
			}
		}

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
		var translateTexts = JSON.parse(localStorage.getItem("languages"));
		var text = code;
		var title;
		console.log("translateTexts",translateTexts);
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
	 * @param {String} key Lookup code for the element.
	 *
	 * @return {String} The translated text with all variables substituted.
	 */
	translateElement: function(type,key) {
		var me = this,obj, txt;
		if (Ext.isString(key)) {
			obj = me.getData(type ? type : 'label', key);
			txt = obj.length ? obj[0].text : me.splitLabel(key);
		}
		return txt;
	},
	/**
	 * Retrieve a label text and translate it using the subsitution parameters.
	 *
	 * @param {String} key Lookup code for the element.
	 *
	 * @return {String} The translated text with all variables substituted.
	 */
	lang: function(key) {
		return this.translateElement("language",key);
	},
	/**
	 * Retrieve a label text and translate it using the subsitution parameters.
	 *
	 * @param {String} key Lookup code for the element.
	 *
	 * @return {String} The translated text with all variables substituted.
	 */
	label: function(key) {
		return this.translateElement("label",key);
	},
	/**
	 * Retrieve a button text and translate it using the subsitution parameters.
	 *
	 * @param {String} key Lookup code for the element.
	 *
	 * @return {String} The translated text with all variables substituted.
	 */
	button: function(key) {
		return this.translateElement("button",key);
	},
	/**
	 * Retrieve a title text and translate it using the subsitution parameters.
	 *
	 * @param {String} key Lookup code for the element.
	 *
	 * @return {String} The translated text with all variables substituted.
	 */
	title: function(key) {
		return this.translateElement("title",key);
	},
	/**
	 * Retrieve a validation text and translate it using the subsitution parameters.
	 *
	 * @param {String} key Lookup code for the element.
	 *
	 * @return {String} The translated text with all variables substituted.
	 */
	validation: function(key) {
		return this.translateElement("validation",key);
	},
	auth: function(key) {
		return this.translateElement("auth",key);
	},
	error: function(key) {
		return this.translateElement("error",key);
	},
	submit: function(key) {
		return this.translateElement("submit",key);
	},
	info: function(key) {
		return this.translateElement("info",key);
	},
	menu: function(key) {
		return this.translateElement("menu",key);
	},
	/**
	 * Split string on UpperCase Characters
	 * This should handle the numbers as well..
	 * the join at the end results in concatenating all the array items to a sentence if that's what you looking for
	 *
	 * @param text
	 * @returns {*}
	 */
	splitLabel:function(text){
		return text.match(/[A-Z][a-z]+|[0-9]+/g).join(" ");
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
	}
});