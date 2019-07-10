Ext.define('Docucrm.store.NavigationTree', {
	extend: 'Ext.data.TreeStore',
	storeId: 'storeNavigationTreeId',
	alias:'store.navigationtree',
	autoLoad:true,
	fields: [{
		name: 'text'
	}],
	root: {
		expanded: true,
		id: 0,
		name : 'Root',
		loaded: true
	},
	lazyFill: true,
	rootVisible: true,
	proxy: {
		type: 'ajax',
		url: '/api/system/treelist',
		reader: {
			type: 'json',
			rootProperty: 'data',
			idProperty: 'id',
			totalProperty:'recordCount',
			successProperty: 'success'
		},
		headers: Helpers.storeHeaders()
	}
});
