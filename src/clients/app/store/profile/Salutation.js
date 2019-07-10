Ext.define('Docucrm.store.profile.Salutation', {
	extend: 'Ext.data.Store',
	alias: 'store.salutation',
	model: 'Docucrm.model.profile.Salutation',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: '/api/users/salutation',
		reader: {
			type: 'json',
			rootProperty: 'data'
		},
		headers: Helpers.storeHeaders()
	}
});