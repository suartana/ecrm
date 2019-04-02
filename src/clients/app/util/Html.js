/**
 * @version    	$Id: Html.js gsuartana $
 * @class
 * A collection of tools and functions used to deal with HTML blocks.
 *
 * @author 		Gede Suartana <gede.suartana@docu.ch>
 */
Ext.define('Docucrm.util.Html', {
	singleton: true,

	/**
	 * The id of the Docucrm component.
	 */
	id: 'utilHtml',

	/**
	 * Wrap a text within a tag with optional attributes. The text `inner` will be wrapped by the tag(s) passed in `tag` with the HTML attribues `attribs`.
	 * If `tag` is an array and `attribs` isn't, then the attributes will be used for each tag.
	 *
	 * @param {String|String[]} tag The tag to be used. If an array is passed, the inner text will be wrapped recursively.
	 * @param {String} inner The text to be wrapped.
	 * @param {Object|String} [attribs] The attributes to be used with the tag.
	 *
	 * @return {String} A HTML block with the wrapped text.
	 */
	wrap: function(tag, inner, attribs) {
		var html;
		if (Ext.isArray(tag)) {
			var n = tag.length - 1;
			html = inner;
			while (n > 0) {
				html = Util.Html.wrap(tag[n--], html);
			}

			html = Util.Html.wrap(tag[0], html, attribs);
		}
		else {
			html = '<' + tag;

			if (Ext.isSimpleObject(attribs)) {
				Ext.Object.each(attribs, function(key, value) {
					html += ' ' + key + '="' + value + '"';
				});
			}
			else if (Ext.isString(attribs)) {
				html += ' ' + attribs;
			}

			html += '>' + (Ext.isPrimitive(inner) ? inner : "") + '</' + tag + '>';
		}

		return html;
	},

	/**
	 * Wrap the contents of the array `inner` within a tag with optional attributes.
	 * If `tag` is an array and `attribs` isn't, then the attributes will be used for each tag.
	 *
	 * @param {String|String[]} tag The tag to be used. If an array is passed, the inner text will be wrapped recursively.
	 * @param {String[]} inner The text to be wrapped.
	 * @param {Object|String} [attribs] The attributes to be used with the tag.
	 *
	 * @return {String[]} A HTML block with the wrapped text.
	 */
	wrapAll: function(tag, inner, attribs) {
		if (!Ext.isArray(inner)) {
			inner = [inner];
		}

		var wrapped = [];
		Ext.Array.forEach(inner, function(i, idx) {
			wrapped[idx] = Util.Html.wrap(tag, i, attribs);
		});

		return wrapped;
	},

	/**
	 * Remove all HTML tags from a string.
	 * @param  {String} html The string to be stripped of the tags.
	 * @return {String}      The stripped string.
	 */
	stripTags: function(html) {
		return Ext.isString(html) ? html.replace(/<\/?[^>]+>/g, "") : "";
	}
});