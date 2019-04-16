Ext.define('Docucrm.store.system.Languages', {
	extend: 'Ext.data.Store',

	alias: 'store.systemlanguages',

	model: 'Docucrm.model.system.Languages',

	proxy: {
		type: 'ajax',
		url: '/api/system/navigation',
		reader: {
			type: 'json',
			rootProperty: 'data',
			idProperty: 'id',
			messageProperty: 'msg'
		},
	},

	autoLoad: 'true',

	sorters: {
		direction: 'ASC',
		property: 'fullname'
	}
});