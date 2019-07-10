Ext.define('Docucrm.store.system.Languages', {
	extend: 'Ext.data.Store',
	alias: 'store.systemlanguages',
	storeId:'systemlanguagesStoreId',
	model: 'Docucrm.model.system.Languages',
	proxy: {
		type: 'ajax',
		url: '/api/system/languages',
		reader: {
			type: 'json',
			rootProperty: 'data'
		},
		headers: Helpers.storeHeaders()
	},
	autoLoad: true
});