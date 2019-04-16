Ext.define('Docucrm.util.User', {
	singleton: true,
	alternateClassName: 'User',

	constructor: function() {
		if(typeof(__g) === "undefined") {
			return;
		}

		if(Ext.isDefined(__g.modules) === false)
			throw new Error(Ext.getClassName(this) + ' modules is undefined');

		if(Ext.isDefined(__g.user) === false)
			throw new Error(Ext.getClassName(this) + ' user is undefined');

		if(Ext.isDefined(__g.settings) === false)
			throw new Error(Ext.getClassName(this) + ' settings is undefined');

		if(Ext.isDefined(__g.searchmask) === false)
			throw new Error(Ext.getClassName(this) + ' searchmask is undefined');
	},

	isLoggedIn: function() {
		return (__g.loggedin === true);
	},

	isAdmin: function() {
		return (__g.isAdmin === true);
	},

	getLanguage: function() {
		return (__g.language);
	},
	getLogo: function() {
		return (__g.logo);
	},
	get: function(sName) {
		if(Ext.isDefined(__g.user[sName]) === false)
			return false;
		return __g.user[sName];
	},

	Modules: {
		isActive: function(sName) {
			return (User.Modules.get(sName, "active") === '1' ? true : false);
		},
		exists: function(sName) {
			return Ext.isDefined(__g.modules[sName]);
		},
		get: function(sModule, sProperty) {
			if(Ext.isDefined(__g.modules[sModule]) === false || Ext.isDefined(__g.modules[sModule][sProperty]) === false)
				return false;
			return __g.modules[sModule][sProperty];
		}
	},

	Settings: {
		get: function(sName) {
			if(Ext.isDefined(__g.settings[sName]) === false)
				return false;

			if(Ext.isDefined(__g.settings[sName]['uservalue']) === false)
				return __g.settings[sName]['defaultvalue'];
			else
				return __g.settings[sName]['uservalue'];
		},
		getMinValue: function(sName) {
			if(Ext.isDefined(__g.settings[sName]) === false)
				return false;
			return __g.settings[sName]['minvalue'];
		},
		getMaxValue: function(sName) {
			if(Ext.isDefined(__g.settings[sName]) === false)
				return false;
			return __g.settings[sName]['maxvalue'];
		},
		getDefaultValue: function(sName) {
			if(Ext.isDefined(__g.settings[sName]) === false)
				return false;
			return __g.settings[sName]['defaultvalue'];
		},
		getDataType: function(sName) {
			if(Ext.isDefined(__g.settings[sName]) === false)
				return false;
			return __g.settings[sName]['datatype'];
		},
		writeValue: function (sName, sValue) {
			// NOTICE: Workaround until better handling logic is implemented!
			if (Ext.isDefined(__g.settings[sName]['uservalue'])) {
				__g.settings[sName]['uservalue'] = sValue;
			}

			return false;
		}
	},

	Searchmask: {
		get: function(sName) {

			if(Ext.isDefined(__g.searchmask[sName]) === false) {
				return false;
			}

			if(Ext.isDefined(__g.searchmask[sName]) === false) {
				return __g.searchmask[sName];
			}

			return __g.searchmask[sName];
		}
	}
});