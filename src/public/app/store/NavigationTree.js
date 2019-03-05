Ext.define('Docucrm.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',
    storeId: 'NavigationTree',
	autoload:false,
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
	},
	listeners: {
		load: function(tree, records, successful, operation, node, eOpts) {
			console.log("treelist",tree.data)
		}
	}
});
