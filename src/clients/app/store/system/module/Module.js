Ext.define('Docucrm.store.system.module.Module', {
	extend: 'Ext.data.Store',
	alias: 'store.modulestore',
	model: 'Docucrm.model.system.module.Module',
	autoLoad: true,
	pageSize: 20,
	remoteSort: true,
	proxy: {
		type: 'api',
		url: '/api/system/module',
		reader: {
			type: 'json',
			rootProperty: 'data',
			idProperty: 'id',
			totalProperty:'totalCount',
			successProperty: 'success'
		},
		headers: Helpers.storeHeaders()
	},
	sorters: {
		direction: 'asc',
		property: 'id'
	}
});
