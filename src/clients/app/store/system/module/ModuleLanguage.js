Ext.define('Docucrm.store.system.module.ModuleLanguage', {
	extend: 'Ext.data.Store',
	alias: 'store.modulelangstore',
	model: 'Docucrm.model.system.module.ModuleLanguage',
	autoLoad: true,
	proxy: {
		type: 'api',
		url: '/api/system/modulelang/',
		reader: {
			type: 'json',
			rootProperty: 'data',
			idProperty: 'id',
		},
		headers: Helpers.storeHeaders()
	}
});
