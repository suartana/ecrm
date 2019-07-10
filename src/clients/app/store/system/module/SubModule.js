Ext.define('Docucrm.store.system.module.SubModule', {
	extend: 'Ext.data.Store',
	alias: 'store.submodulestore',
	storeId:'submodulestoreId',
	model: 'Docucrm.model.system.module.SubModule',
	autoLoad: false,
	remoteSort: true,
	proxy: {
		type: 'api',
		url: '/api/system/submodule',
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
