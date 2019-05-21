Ext.define('Docucrm.store.NavigationTree', {
	extend: 'Ext.data.TreeStore',
	storeId: 'storeNavigationTreeId',
	alias:'store.navigationtree',
	autoLoad:true,
	fields: [{
		name: 'text'
	}],
	root: {
		expanded: true
	},
	proxy: {
		type: 'ajax',
		url: '/api/system/treelist',
		reader: {
			type: 'json',
			rootProperty: 'data',
			idProperty: 'id',
			messageProperty: 'msg'
		},
		headers: Helpers.storeHeaders()
	}
});
