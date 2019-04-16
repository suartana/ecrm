Ext.define('Docucrm.store.user.Users', {
	extend: 'Ext.data.Store',
	model: 'Docucrm.model.user.Users',
	alias: 'store.userstore',
	storeId : 'usersStore',
	autoLoad: false,
	proxy: {
		type: 'api',
		headers: Docucrm.util.Helpers.storeHeaders(),
		url    :'/api/users/list',
		reader: {
			type: 'json',
			successProperty: 'success',
			rootProperty: 'data',
			implicitIncludes: true,
			messageProperty: 'message'
		}
	}
});