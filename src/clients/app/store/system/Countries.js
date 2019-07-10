Ext.define('Docucrm.store.system.Countries', {
	extend: 'Ext.data.Store',
	alias: 'store.systemcountries',
	storeId: 'systemcountriesStoreId',
	model: 'Docucrm.model.system.Countries',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: '/api/system/countries',
		reader: {
			type: 'json',
			rootProperty: 'data'
		},
		headers: Helpers.storeHeaders()
	}
});