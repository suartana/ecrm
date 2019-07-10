/**
 * Store Userprofile
 */
Ext.define('Docucrm.store.profile.UserProfile', {
	extend: 'Ext.data.Store',
	alias: 'store.userprofile',
	storeId:'suserprofileStoreId',
	model: 'Docucrm.model.profile.UserProfile',
	autoLoad: true,
	proxy: {
		type:'api',
		url: '/api/users/profile',
		reader: {
			type: 'json',
			rootProperty: 'data'
		},
		headers: Helpers.storeHeaders()
	}
});
