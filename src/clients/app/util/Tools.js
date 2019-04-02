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
Ext.define('Docucrm.util.Tools', {
	singleton: true,
	//uses: ['System.Dialog', 'Base.view.mixins.SmartComponent'],
	/**
	 * The id of the Docucrm component.
	 */
	id: 'utilTools',

	/**
	 * A regular expression which allows to validate a string to contain only valid alpha numeric characters.
	 */
	extendedAlphaRegex: /^[a-z0-9 \&\+\-\._\*äöüáâàéêèúûùóôòç]+$/i,


	/**
	 * This regular expression is an input mask which can be used on {@link Ext.form.field.Text} elements to as input filter.
	 */
	telephoneMask: /[0-9 \+\(\)]/,

	/**
	 * A regular expression which allows to validate a string to a valid telephone number.
	 */
	telephoneRegex: /^ *[\+]*[0-9\(\) ]{4,}$/,

	/**
	 * A mask to match characters used in decimal numbers.
	 */
	decimalMask: /[\-\+0-9\.]/,

	/**
	 * A regular expression, which allows to validate a string to be a valid decimal number.
	 */
	decimalRegex: /^[\-+]{0,1}[0-9]*[.]{0,1}[0-9]*$/,

	/**
	 * A mask to match characters used in decimal numbers with exponents.
	 */
	decimalExponentialMask: /[\-\+0-9\.eE]/,

	/**
	 * A regular expression, which allows to validate a string to be a valid decimal number including exponentials.
	 */
	decimalExponentialRegex: /^[\-+]{0,1}(\.[0-9]|[0-9]+\.|[0-9])[0-9]*([eE][+-]{0,1}[0-9]+)?$/,

	/**
	 * A mask to match characters used in signed integer numbers.
	 */
	integerMask: /[\-\+0-9]/,

	/**
	 * A regular expression, which allows to validate a string to be a valid signed integer number.
	 */
	integerRegex: /^[\-+]{0,1}[0-9]*$/,

	/**
	 * A mask to match characters used in signed integer numbers.
	 */
	unsignedIntegerMask: /[0-9]/,

	/**
	 * A regular expression, which allows to validate a string to be a valid signed integer number.
	 */
	unsignedIntegerRegex: /^[0-9]*$/,

	/**
	 * A mask to match characters used in dates.
	 */
	dbDateMask: /[\-0-9: ]/,

	/**
	 * A regular expression, which allows to validate a string with a date in database format.
	 */
	dbDateRegex: /^[12][0-9]{3}-[01][0-9]-[0-3][0-9][ T][0-2][0-9]:[0-5][0-9]:[0-5][0-9]$/,

	/**
	 * Database format for dates in rpcrm
	 */
	dbDateFormat: 'Y-m-d H:i:s',

	/**
	 * Database format for timestamps in rpcrm.
	 */
	dbTimestampFormat: 'Y-m-d H:i:s.u',

	/**
	 * Default display format for dates in rpcrm.
	 */
	defaultDateFormat: 'd.m.Y',

	/**
	 * Default display format for times in rpcrm (with seconds).
	 */
	defaultTimeFormat: 'H:i:s',

	/**
	 * Default display format for times in rpcrm (without seconds).
	 */
	defaultTimeFormatShort: 'H:i',

	/**
	 * Default display format for timestamps in rpcrm.
	 */
	defaultTimestampFormat: 'd.m.Y H:i:s \\G\\M\\TO',

	/**
	 * Default display format for timestamps in rpcrm.
	 */
	defaultTimestampFormatShort: 'd.m.Y H:i:s',

	/**
	 * Default display format for timestamps in rpcrm.
	 */
	defaultDateTimeFormat: 'd.m.Y H:i',

	/**
	 * Default display format for timestamps in rpcrm.
	 */
	defaultMillisecondTimestampFormat: 'd.m.Y H:i:s.u',

	constructor: function() {
		this.callParent(arguments);

		// Ext.EventManager.addListener(window, 'beforeunload', this._beforeUnloadListener, this);
		window.addEventListener('beforeunload', this._beforeUnloadListener, this);
	},

	/**
	 * Converts a JavaScript data object to a string using the format default date format.
	 *
	 * @param {Date} date A date object.
	 *
	 * @return {String} The converted date.
	 */
	formatDate: function(date, format) {
		return Ext.Date.format(date, format ? format : this.defaultDateFormat);
	},

	/**
	 * Converts the time parts of a JavaScript data object to a string using the default time format.
	 *
	 * @param {Date} date A date object.
	 * @param {Boolean} [secs] Set to false to omit the seconds (defaults to `true`).
	 *
	 * @return {String} The converted time.
	 */
	formatTime: function(date, secs) {
		return secs || secs === undefined ? Ext.Date.format(date, this.defaultTimeFormat) : Ext.Date.format(date, this.defaultTimeFormatShort);
	},

	/**
	 * Converts a JavaScript data object to a string using the oracle format 'DD.MM.YYYY HH24:MI:SS' with optionally appended timezone.
	 *
	 * @param {Date} date A date object.
	 * @param {Boolean} [tz] Set to true to include the timezone (defaults to `false`).
	 *
	 * @return {String} The converted timestamp.
	 */
	formatTimestamp: function(date, tz) {
		return tz ? Ext.Date.format(date, this.defaultTimestampFormat) : Ext.Date.format(date, this.defaultTimestampFormatShort);
	},

	/**
	 * Converts a JavaScript data object to a string using the oracle format 'DD.MM.YYYY HH24:MI' with optionally appended seconds.
	 *
	 * @param {Date} date A date object.
	 * @param {Boolean} [secs] Set to true to include the seconds.
	 *
	 * @return {String} The converted date time.
	 */
	formatDateTime: function(date, secs) {
		return secs ? Ext.Date.format(date, this.defaultTimestampFormatShort) : Ext.Date.format(date, this.defaultDateTimeFormat);
	},

	/**
	 * Create an MD5 hash from a string. This routine has been found somewhere on the internet...
	 *
	 * @param {String} data The data to be hashed.
	 * @param {Boolean} [raw] By default the MD5 hash is returned as a string, set this flag to `true` to get it as number.
	 * @param {Boolean} [hexUpperCase] By default the hash value uses lower case hex digits, set this flag to `true` to get upper case hex digits.
	 * @param {Number} [characterSize] The character size of the data. Defaults to 8 bits which treats the string as a succession of bytes.
	 *
	 * @return {String/Number} The MD5 hash as string or as number depending on the setting of the `raw` flag.
	 */
	md5: function(s, raw, hexUpperCase, characterSize) {
		var charSize = Ext.isNumber(characterSize) ? characterSize : 8;

		function safe_add(x, y) {
			var lsw = (x & 0xFFFF) + (y & 0xFFFF);
			var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return (msw << 16) | (lsw & 0xFFFF);
		}

		function bit_rol(num, cnt) {
			return (num << cnt) | (num >>> (32 - cnt));
		}

		function md5_cmn(q, a, b, x, s, t) {
			return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
		}

		function md5_ff(a, b, c, d, x, s, t) {
			return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
		}

		function md5_gg(a, b, c, d, x, s, t) {
			return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
		}

		function md5_hh(a, b, c, d, x, s, t) {
			return md5_cmn(b ^ c ^ d, a, b, x, s, t);
		}

		function md5_ii(a, b, c, d, x, s, t) {
			return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
		}

		function core_md5(x, len) {
			x[len >> 5] |= 0x80 << ((len) % 32);
			x[(((len + 64) >>> 9) << 4) + 14] = len;
			var a = 1732584193;
			var b = -271733879;
			var c = -1732584194;
			var d = 271733878;
			for (var i = 0; i < x.length; i += 16) {
				var olda = a;
				var oldb = b;
				var oldc = c;
				var oldd = d;
				a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
				d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
				c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
				b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
				a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
				d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
				c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
				b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
				a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
				d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
				c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
				b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
				a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
				d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
				c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
				b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
				a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
				d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
				c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
				b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
				a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
				d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
				c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
				b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
				a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
				d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
				c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
				b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
				a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
				d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
				c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
				b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
				a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
				d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
				c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
				b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
				a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
				d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
				c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
				b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
				a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
				d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
				c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
				b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
				a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
				d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
				c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
				b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
				a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
				d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
				c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
				b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
				a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
				d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
				c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
				b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
				a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
				d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
				c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
				b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
				a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
				d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
				c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
				b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
				a = safe_add(a, olda);
				b = safe_add(b, oldb);
				c = safe_add(c, oldc);
				d = safe_add(d, oldd);
			}
			return [a, b, c, d];
		}

		function str2binl(str) {
			var bin = [];
			var mask = (1 << charSize) - 1;
			for (var i = 0; i < str.length * charSize; i += charSize) {
				bin[i >> 5] |= (str.charCodeAt(i / charSize) & mask) << (i % 32);
			}
			return bin;
		}

		function binl2str(bin) {
			var str = "";
			var mask = (1 << charSize) - 1;
			for (var i = 0; i < bin.length * 32; i += charSize) {
				str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
			}
			return str;
		}

		function binl2hex(binarray) {
			var hex_tab = hexUpperCase ? "0123456789ABCDEF" : "0123456789abcdef";
			var str = "";
			for (var i = 0; i < binarray.length * 4; i++) {
				str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
			}
			return str;
		}

		return s ? (raw ? binl2str(core_md5(str2binl(s), s.length * charSize)) : binl2hex(core_md5(str2binl(s), s.length * charSize))) : s;
	},

	/**
	 * This method checks if Internet Explorer is running in native mode. If so, it returns false and informs the user that this feature is not available
	 * on native Internet Explorer. The user also has then the option to install Google Chrome Frame.
	 *
	 * @return {Boolean} Returns `true` if Google Chrome Frame is installed or the user is another browser than Internet Explorer.
	 */
	featureCheck: function() {
		var available = true;
		if (Ext.isIE) {
			available = false;
			Docucrm.util.Translate.infoBox("Feature Not Available", Docucrm.util.Translate.html("IE_UNAVAILABLE"));
		} else if (!Ext.isChrome && Ext.firefoxVersion < 9) {
			Docucrm.util.Translate.infoNotification("This feature has not been tested with the current version of your browser. Please use one of the recommended browsers to achieve maximum performance.");
		}

		return available;
	},

	/**
	 * @private
	 * A help function for the page unload preventer. This function should be compatible with all current browsers.
	 *
	 * @param {Object} event The browser event.
	 */
	_beforeUnloadListener: function(event) {
		// console.log("_beforeUnloadListener", event);
		var msg;

		if (Docucrm.util.Tools._preventState) {
			msg = Docucrm.util.Translate.label("If you continue with this operation all unsaved changes in CRM will be lost!");

			if (event) {
				if (Ext.isFunction(event.stopEvent)) {
					event.stopEvent();
				}

				if (Ext.isFunction(event.preventDefault)) {
					event.preventDefault();
				}

				if (Ext.isSimpleObject(event.browserEvent)) {
					event.browserEvent.returnValue = msg;
				}

				event.returnValue = msg;
			}
		} else {
			msg = null;
		}

		return msg;
	},

	/**
	 * @private
	 * This array contains all nested calls to #preventUnload.
	 */
	_preventStack: [],

	/**
	 * @private
	 * Current unload prevention state.
	 */
	_preventState: false,

	/**
	 * Set the system so that the user gets a warning dialog if he wants to navigate away from rpcrm.
	 * @param {Boolean} state The new prevention state.
	 */
	preventUnload: function(state) {
		this._preventStack.push(this._preventState);
		this._preventState = state;
	},

	/**
	 * Set the system unload prevention state to the value it had before the last call to #preventUnload.
	 */
	restoreUnload: function(immediate) {
		// console.log("restoreUnload", immediate);
		if (immediate) {
			this._preventState = this._preventStack.length > 0 ? this._preventStack.pop() : false;
		} else {
			Ext.defer(function() {
				this.restoreUnload(true);
			}, 500, this);
		}
	},

	/**
	 * Recursively replace all variables within objects imbedded in string values. The object itself remains unchanged in this process.
	 *
	 * The parameters are needed **INSIDE THE EVAL'S** of the variable expressions which can contain references to these objects.
	 *
	 * @return {Object} The object itself.
	 */
	substituteVariables: function(obj, options, view) {
		// `viewController` may be used **INSIDE THE EVAL'S**
		var viewController = null;

		var smartConfig = Base.SmartComponent.getSmartConfig();
		if (smartConfig.options) {
			options = Ext.apply({}, options, smartConfig.options);
		}

		// view can be a simple or an extended object
		if (Ext.isObject(view)) {
			viewController = Ext.isFunction(view.getViewController) ? view.getViewController() : view.viewController;

			if (!options && view.options) {
				options = view.options;
			}
		}

		var substitutor = function(obj) {
			if (Ext.isArray(obj)) {
				var arr = obj;
				obj = [];
				Ext.Array.forEach(arr, function(value, idx) {
					obj[idx] = substitutor(value);
				});
			} else if (Ext.isSimpleObject(obj)) {
				obj = Ext.apply({}, obj);
				Ext.Object.each(obj, function(key, value) {
					obj[key] = substitutor(value);
				});
			} else if (Ext.isString(obj)) {
				var matches = obj.match(/\$\{[^}]+\}/g);
				if (matches) {
					if (matches.length > 0) {
						Ext.Array.forEach(matches, function(match) {
							var expression = match.replace(/^\$\{ */, "").replace(/ *\}$/, '');

							var result = null;
							try {
								// console.log("expression", expression, result);
								/*jshint evil:true */
								result = eval(expression); /*jshint evil:false */
							} catch (err) {
								console.debug("eval of '" + expression + "' failed.");
								console.debug(err);
							}

							if (result === undefined) {
								obj = "{undefined}";
							} else if (result === null) {
								obj = "{null}";
							} else if (Ext.isString(result) || Ext.isPrimitive(result)) {
								if (obj == match) {
									obj = result;
								} else {
									// escape the most often used chars by preceeding them with a backslash
									var regex = new RegExp(match.replace(/([\(\{\.\+\$\?\[\]\*\-\}\)])/g, '\\$1'));
									obj = obj.replace(regex, result);
								}
							} else if (Ext.isObject(result) || Ext.isDate(result)) {
								obj = result;
							} else {
								console.debug("unsupported result for '" + expression + "'", result);
							}
						});
					}
				}
			}

			return obj;
		};

		return substitutor(obj);
	},

	/**
	 * Split a string into individual words and make all first letters uppercase.
	 * The words will then be concatinated with the `joinChar`.
	 *
	 * @param {String} str The string.
	 * @param {String} joinChar The character to join with words with.
	 *
	 * @return {String} The joined uppercase words.
	 */
	ucFirstAllWords: function(str, joinChar) {
		var pieces = str.split(" ");
		for (var i = 0; i < pieces.length; i++) {
			pieces[i] = pieces[i].charAt(0).toUpperCase() + pieces[i].slice(1);
		}

		if (joinChar === undefined) {
			joinChar = " ";
		}

		return joinChar ? pieces.join(joinChar) : pieces.join("");
	},

	/**
	 * Make the first letter uppercase.
	 *
	 * @param {String} str The string.
	 *
	 * @return {String} The word with first letter in uppercase.
	 */
	ucFirst: function(str) {
		if (Ext.isString(str)) {
			str = str.charAt(0).toUpperCase() + str.slice(1);
		}

		return str;
	},

	/**
	 * Transforms an object into a query string to be used in the URL.
	 *
	 * @param {Object} The parameter object.
	 *
	 * @return {String} The query string.
	 */
	assembleQueryString: function(params) {
		var query = [];

		if (Ext.isSimpleObject(params)) {
			Ext.Object.each(params, function(key, value) {
				if (value !== undefined) {
					if (Ext.isEmpty(value)) {
						value = '';
					} else if (Ext.isDate(value)) {
						value = Ext.Date.toString(value);
					} else {
						value = String(value);
					}

					query.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
				}
			});
		}

		return query.length > 0 ? "?" + query.join('&') : "";
	},

	/**
	 * Assemble a human readable version string for the system version string.
	 *
	 * @param {String} version The system version string.
	 *
	 * @return {String} The version string.
	 */
	makeVersionString: function(version) {
		// make sure, it's a string -> this allows to pass versions also as a float
		version = "" + version;

		var parts = version.split('.');
		var result = "";
		Ext.Array.forEach(parts, function(part) {
			if (part.match(/^[0-9]$/)) {
				part = "0" + part;
			}

			if (result === "") {
				result = part;
			} else {
				result += "." + part;
			}
		});

		// console.log("version string", result);
		return result;
	},
	/**
	 * Return a time delta of a time period as a formatted string.
	 *
	 * @param {Date} startTime The start time of the period.
	 * @param {Date} endTime The end time of the period.
	 */
	countDateTime: function(startTime, endTime) {
		var result = "";
		if (startTime && endTime) {
			var time = (endTime - startTime) / 1000;

			var s = time % 60;
			s = (s < 10 ? "0" : "") + s;

			time = Math.floor(time / 60);

			var m = time % 60;
			m = (m < 10 ? "0" : "") + m;
			time = Math.floor(time / 60);

			var h = time % 24;
			h = (h < 10 ? "0" : "") + h;
			time = Math.floor(time / 24);

			var d = time;

			result = Docucrm.util.Translate.label('duration') + ": " + d + "d" + h + "h" + m + "m" + s + "s";
		}

		return result;
	},
	/**
	 * Get the range between two dates
	 *
	 * @param {start} startTime The start time of the period.
	 * @param {end} endTime The end time of the period.
	 * @return {year} int year/years
	 */
	getRangeDate:function(start,end){
		var	startDate = new Date(start),
			endDate	= new Date(end),
			inMilSec	= (60 * 60 * 24 * 365),
			range,year;
		//Returns the number of milliseconds between two dates.
		year = Ext.Date.getElapsed(endDate,startDate) / 1000;
		// get the range
		range = Math.floor(year / inMilSec);

		return range;
	},
	/**
	 * Debugging helper to log all events fired by an object to the console.
	 * @param  {Object} object Observerable object.
	 */
	debugEvents: function(object) {
		Ext.Function.interceptBefore(object, 'fireEvent', function(eventName) {
			console.log("fire " + eventName + (object.name ? " on " + object.name : ""), object);
		});
	},

	/**
	 * Get a value from an object using an string accessor in the form (.attrib1.attrib2.attrib3) or [attrib1][attrib2][attrib3])
	 * @param  {Object} object   Object to be queried.
	 * @param  {String} accessor An accessor string in either form `.attrib1.attrib2.attrib3` or `[attrib1][attrib2][attrib3]`
	 * @return {Mixed}           Value found.
	 */
	getByAccessor: function(object, accessor) {
		accessor = accessor.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
		accessor = accessor.replace(/^\./, ''); // strip a leading dot
		var accessors = accessor.split('.');
		while (accessors.length) {
			var key = accessors.shift();
			if (key in object) {
				object = object[key];
			} else {
				object = null;
				break;
			}
		}

		return object;
	},

	/**
	 * Set value in an object using an string accessor in the form (.attrib1.attrib2.attrib3) or [attrib1][attrib2][attrib3])
	 * @param  {Object} object   Object to be queried.
	 * @param  {String} accessor An accessor string in either form `.attrib1.attrib2.attrib3` or `[attrib1][attrib2][attrib3]`
	 * @param  {Mixed} value     The value to be set.
	 * @return {Mixed}           Value found.
	 */
	setByAccessor: function(object, accessor, value) {
		accessor = accessor.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
		accessor = accessor.replace(/^\./, ''); // strip a leading dot
		var accessors = accessor.split('.');
		while (accessors.length > 1) {
			var key = accessors.shift();
			if (key in object) {
				object = object[key];
			} else {
				object = null;
				break;
			}
		}

		var previous;
		if (Ext.isSimpleObject(object) && accessors.length == 1) {
			var k = accessors.shift();
			previous = object[k];
			object[k] = value;
		}

		return previous;
	},


	/**
	 * Detect the current OS.
	 * @return {String} Key for the current OS ("OSX", "LINUX", "WINDOWS" or "OTHER")
	 */
	detectOs: function() {
		var osType;
		if (Ext.isMac) {
			osType = "OSX";
		} else if (Ext.isLinux) {
			osType = "LINUX";
		} else if (Ext.isWindows) {
			osType = "WINDOWS";
		} else {
			osType = "OTHER";
		}

		return osType;
	},

	/**
	 * Detect the current browser.
	 * @return {String} Key for the current browser ("CHROME", "FIREFOX", "SAFARI", "IE" or "OTHER")
	 */
	detectBrowser: function() {
		var browser;
		if (Ext.isChrome) {
			browser = "CHROME";
		} else if (Ext.firefoxVersion > 0) {
			browser = "FIREFOX";
		} else if (Ext.safariVersion > 0) {
			browser = "SAFARI";
		} else if (Ext.ieVersion > 0) {
			browser = "IE";
		} else {
			browser = "OTHER";
		}

		return browser;
	},

	/**
	 * Transforms a camel case formatted string to an underscore formatted string (ie. 'theDayIsLong' to 'THE_DAY_IS_LONG').
	 * @param  {String} camelCaseString  The camel case formatted string.
	 * @param  {Boolean} warnFirstUpper  Flag, whether strings beginning with an uppercase letter should produce a warning. The result in any case will be 'CapitalFirst' to '_CAPITAL_FIRST'.
	 * @return {String}                  The underscore formatted string.
	 */
	camelCaseToUnderscore: function(camelCaseString, warnFirstUpper) {
		var underscoreString = "";
		for (var i = 0; i < camelCaseString.length; i++) {
			var c = camelCaseString[i];
			if (c.match(/[A-Z]/)) {
				if (warnFirstUpper && underscoreString === "") {
					if (Ext.isString(warnFirstUpper)) {
						console.warn("A camelCase string (" + camelCaseString + ") of a " + warnFirstUpper + " normally starts with a lower case letter!");
					} else {
						console.warn("A camelCase string (" + camelCaseString + ") of normally starts with a lower case letter!");
					}
				}

				underscoreString += "_" + c;
			} else {
				underscoreString += c.toUpperCase();
			}
		}

		return underscoreString;
	},

	/**
	 * Transforms an underscore formatted string to  camel case formatted string (ie. 'THE_DAY_IS_LONG' to 'theDayIsLong').
	 * @param  {String} underscoreString The underscore formatted string.
	 * @return {String}                  The camel case formatted string.
	 */
	underscoreToCamelCase: function(underscoreString) {
		var camelCaseString = "";
		var nextUpper = false;
		for (var i = 0; i < underscoreString.length; i++) {
			var c = underscoreString[i];
			if (c == "_") {
				nextUpper = true;
			} else if (nextUpper) {
				camelCaseString += c.toUpperCase();
				nextUpper = false;
			} else {
				camelCaseString += c;
			}
		}

		return camelCaseString;
	},

	/**
	 * Compare two string that can be either in camel case or in underscore formatting.
	 * @param  {String} s1 First string.
	 * @param  {String} s2 Second string.
	 * @return {Boolean}   True, if the strings are equal.
	 */
	camelCaseCompare: function(s1, s2) {
		if (Ext.isString(s1) && !s1.match(/_/)) {
			s1 = this.camelCaseToUnderScore(s1);
		}

		if (Ext.isString(s2) && !s2.match(/_/)) {
			s2 = this.camelCaseToUnderScore(s2);
		}

		return s1 === s2;
	},

	/**
	 * Compare function capable of comparing all simple types, and also dates and arrays. Created for use in overriding
	 * `isEqual` in `Ext.data.Model`, but it can of course be used anywhere.
	 *
	 * @param  {Mixed}  a1 First value to compare.
	 * @param  {Mixed}  a2 Second value to compare.
	 * @return {Boolean}    The comparison result.
	 */
	isEqual: function(a1, a2) {
		var ret = a1 === a2;

		if (!ret) {
			if (Ext.isDate(a1) && Ext.isDate(a2)) {
				ret = Ext.Date.isEqual(a1, a2);
			} else if (Ext.isArray(a1) && Ext.isArray(a2)) {
				ret = a1.length == a2.length;
				if (ret) {
					for (var i = 0, len = a1.length; i < len; i++) {
						ret = Docucrm.util.Tools.isEqual(a1[i], a2[i]);
						if (!ret) {
							break;
						}
					}
				}
			}
			// this could be extend for objects
		}

		return ret;
	},

	/**
	 * This is a replacment for a bug in Ext Js V4.1.3 where {@link Ext.data.NodeInterface#cascadeBy} doesn't exit properly when the callback function returns false.
	 *
	 * @param  {Ext.data.NodeInterface}   node   The node from which to start cascading down.
	 * @param  {Function} fn     Callback function for each node. Return `false` to stop cascading.
	 * @param  {Object}   scope  The scope to be used for the callback. Defaults to the node.
	 * @param  {Mixedπ[]}   params Parameters used for the callback instead of the node.
	 * @return {Boolean}          False, if the cascade has been stopped.
	 */
	cascadeBy: function(node, fn, scope, params) {
		var ret = fn.apply(scope || node, params || [node]);
		if (ret !== false) {
			var childNodes = node.childNodes,
				length = childNodes.length,
				i;

			for (i = 0; i < length; i++) {
				ret = Docucrm.util.Tools.cascadeBy(childNodes[i], fn, scope, params);
				if (ret === false) {
					break;
				}
			}
		}

		return ret;
	},

	/**
	 * Extension of `Ext.String.format` that in addition to {0}..{n} also allows %s as placeholder elements.
	 * @param  {String} text    The string with placeholders.
	 * @param  {Mixed[]} params The parameters for the placeholders.
	 * @return {String}         The formatted string.
	 */
	format: function(text, params) {
		var ret;

		if (arguments.length === 0) {
			ret = "";
		} else if (arguments.length == 1) {
			// use this syntax to convert text to a string, if it isn't already
			ret = "" + text;
		} else {
			ret = "" + text;

			if (ret.match(/\{[0-9]+\}/)) {
				if (Ext.isArray(params)) {
					var args = Ext.clone(params);
					args.unshift(text);

					ret = Ext.String.format.apply(Ext.String, args);
				} else {
					ret = Ext.String.format.apply(Ext.String, arguments);
				}
			}

			if (params && ret.match(/\$\{[0-9a-z_]+\}/i)) {
				if (params.isModel) {
					params = params.getData();
				}

				if (Ext.isSimpleObject(params)) {
					Ext.Object.each(params, function(param, value) {
						var regExp = new RegExp('\\$\\{' + param + '\\}', 'ig');
						ret = ret.replace(regExp, value);
					});
				}
			}

			// old style formats
			if (ret.match(/%s/)) {
				params = Ext.isArray(params) ? params : [params];
				Ext.Array.forEach(params, function(param) {
					ret = ret.replace(/%s/, param);
				});
			}
		}

		// remove any unresolved placeholders
		return ret.replace(/\{[0-9]+\}/g, "").replace(/%s/g, "");
	},

	/**
	 * Download a file to the local computer.
	 * @param  {String} url    		The URL of the file to be downloaded.
	 * @param  {String} [filename]
	 */
	download: function(url,filename){
		var URL = window.URL || window.webkitURL;
		var downloadUrl = url+filename;
		if (filename) {
			// use HTML5 a[download] attribute to specify filename
			var a = document.createElement("a");
			// safari doesn't support this yet
			a.href = downloadUrl;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
		}

		setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
	},
	/**
	 * Create a random password.
	 *
	 *  @param {Number} [options.length] Length of the password. Defaults to 12.
	 *  @param {Boolean} [options.numbers] Flag, whether to user numbers in the password. Defaults to `true`.
	 *  @param {Boolean} [options.letters] Flag, whether to user letters in the password. Defaults to `true`.
	 *  @param {Boolean} [options.special] Flag, whether to user special characters in the password. Defaults to `true`.
	 * @return {String} The random password.
	 */
	makePassword: function() {
		var opts = Ext.apply({
			length: 12,
			numbers: true,
			letters: true,
			special: true
		});

		var chars = "";
		if (opts.numbers) {
			chars += "0123456789";
		}

		if (opts.letters) {
			chars += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		}

		if (opts.special) {
			chars += "+*%&=_-!?:.";
		}

		var password = "";
		while (password.length < opts.length) {
			var idx = Ext.Number.randomInt(0, chars.length - 1);
			password += chars[idx];
		}

		return password;
	},

	/**
	 * Extension to `Ext.require`, which supervises the requirement process and checkes after a given timeout whether all required classes have
	 * actually been loaded. In case of an error a console message is printed and a failure is flagged to the callbaqck function.
	 *
	 * @param  {String|String[]}   clsName  A class name or an array of class names to be loaded,
	 * @param  {Number}   [timeout]  The time in milliseconds before checking for successfull loading. Defaults to 5000ms.
	 * @param  {String}   [message]  The message to be displayed on failure. Defaults to a generic message about the loading state.
	 * @param  {Function} [callback] A callback function to be called after the timeout. It's argument are
	 *     * `success` a flag stating the success or failure of the class require call
	 *     * `msg` the message to be displayed.
	 * @param  {Object}   [scope]    [description]
	 */
	supervisedRequire: function(clsName, timeout, message, callback, scope) {
		var loaded = false;
		Ext.require(clsName, function() {
			loaded = true;
			if (Ext.isFunction(callback)) {
				callback.call(scope || this, true, "Success");
			}
		}, this);

		if (timeout === undefined) {
			timeout = 5000;
		}

		var seconds = timeout / 1000;
		Ext.defer(function() {
			if (!loaded) {
				console.warn(Ext.isString(message) ? message : "Loading took more than " + seconds + " seconds, probable error with required components.");
				var msg;
				if (Ext.isArray(Ext.Loader.queue)) {
					msg = "";
					Ext.Array.forEach(Ext.Loader.queue, function(item) {
						var m;
						if (Ext.isArray(item.requires)) {
							m = "Error with required class '" + item.requires.join("', '") + "'.";
							msg += Docucrm.util.Html.wrap('p', m);
							// console.log(m);
						} else {
							m = "Bad item queued for loading";
							msg += Docucrm.util.Html.wrap('p', m);
							// console.log(m);
						}
					});
				} else {
					msg = Docucrm.util.Html.wrap('p', Docucrm.util.Translate.label("All classes successfully loaded"));
				}

				if (Ext.isFunction(callback)) {
					callback.call(scope || this, false, msg);
				}
			}
		}, timeout !== undefined ? timeout : 5000, this);
	},
	/**
	 * Quate Regular Expression
	 * @param {String} regExpString
	 */
	quoteRegExp: function(regExpString) {
		return regExpString.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	},
	/**
	 * Get File Extension
	 * @param {String} Filename
	 */
	getFileExtension : function (filename) {
		return typeof filename != "undefined" ? filename.substring(filename.lastIndexOf(".")+1, filename.length).toLowerCase() : false;
	},
	/**
	 * Get File Path Extension
	 * @param {String} path file
	 */
	getFilePathExtension : function (path) {
		var filename = path.split('\\').pop().split('/').pop();
		return filename.substr(( Math.max(0, filename.lastIndexOf(".")) || Infinity) + 1);
	},
	/**
	 * Clearing empty space filename
	 * @param {String} filename
	 */
	removeSpacesWithUnderscores:function(filename){
		return filename.replace(/ /g,"_");
	},
	/**
	 * Set not info box
	 */
	noteBox:function(msg, title){
		var  note;
		if(title === 'Error'){
			msg = "<span style='color:red;'>"+msg+"</span>";
			title = "<span style='color:red;'>"+title+"</span>";
		}
		title = title ? title : 'Notification';
		note = Ext.create('Docucrm.util.Notification', {
			message: msg,
			title:title,
			closable: true
		});
		note.show();
	},
	/**
	 * Check if the store is dirty
	 * @param store
	 * @return boolean
	 */
	checkIfIsDirty:function(strItemId){
		var	view = Ext.ComponentQuery.query(strItemId)[0],
			records = view.store.getRange(),
			edited = false;
		for(var i =0; i < records.length; i++){
			var rec = records[i];

			if(rec.dirty === true){
				//Save data
				edited = true;
			}
		}
		return edited;
	},
	/**
	 * Check if the file upload store  is dirty
	 * @param store
	 * @return boolean
	 */
	checkIfIsFileStoreDirty:function(store){
		var records = store.getRange(),
			edited = false;

		for(var i =0; i < records.length; i++){
			var rec = records[i];

			if(rec.dirty === true){
				//Save data
				edited = true;
			}
		}
		return edited;
	},
	/**
	 * Check if is the record been removed
	 * @param object store
	 * @return boolean removed
	 */
	checkIfRemovedRecord:function(store){
		var records = store.getRemovedRecords(),
			removed = false;

		for(var i =0; i < records.length; i++){
			var rec = records[i];
			if(rec.dropped === true){
				//Save data
				removed = true;
			}
		}
		return removed;
	},
	/**
	 * Check if form is dirty
	 *
	 */
	checkFormIsDirty:function(form,record){
		var items,i,len,c,intVal;

		form.loadRecord(record);
		items = form.getForm().getFields().items;
		i = 0;
		len = items.length;

		for(; i < len; i++) {
			c = items[i];
			intVal = typeof c.mixins.field['initValue'];
			if(c.mixins && c.mixins.field && intVal === 'function') {
				c.mixins.field.initValue.apply(c);
				c.wasDirty = false;
			}
		}
	},

	/**
	 * Check if the file upload store  is dirty
	 * @param store
	 * @return boolean
	 */
	checkIfStoreIsEmpty:function(store){
		var records = store.getCount();
		return records;
	},
	/**
	 * Download file on fly
	 *
	 */
	downloadOfFly:function(url){
		return	Ext.create('Ext.Component', {
			renderTo: Ext.getBody(),
			cls: 'x-hidden',
			autoEl: {
				tag: 'iframe',
				src: url
			}
		});

	},
	/**
	 * Regex is Integer
	 *
	 * @param val
	 * @returns {*}
	 */
	isInteger : function (val) {
		return val.match(/^[0-9]$/)
	},
	/**
	 * Set api token
	 *
	 * @returns {string}
	 */
	getTokens :function(){
		return localStorage.getItem("tokens");
	},
	/**
	 * Set Extjs Headers params
	 *
	 * @returns {{Authorization: string, Accept: string, "X-CSRF-TOKEN": string, "Content-Type": string}}
	 */
	getApiHeaders:function(){
		var loggedIn = this.getTokens(),
			headers = {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json',
				'Authorization' : 'Bearer '+ loggedIn,
				'X-CSRF-TOKEN': loggedIn
			};

		return headers;
	},
	getMainView:function(){
		var route = window.route;

	}

});