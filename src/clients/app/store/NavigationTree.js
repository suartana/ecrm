Ext.define('Docucrm.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',
    storeId: 'NavigationTree',
	autoload:true,
    fields: [{
        name: 'text'
    }],
	root: {
		expanded: true
	},
	proxy: {
		type: 'ajax',
		url: '/system/navigation',
		reader: {
			type: 'json',
			rootProperty: 'data',
			idProperty: 'id',
			messageProperty: 'msg'
		}
	}
});
