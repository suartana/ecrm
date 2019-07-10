Ext.define('Docucrm.view.profile.UserProfileModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userprofileview',
    data:{
        userprofile:null
    },
    stores: {
        userData:{
            type:'userprofile',
            listeners: {
                load: function (store, data, success) {
                    Ext.ComponentQuery.query('#profilesocial')[0].getViewModel().set('userprofile', data[0]);
                    Ext.ComponentQuery.query('#userform')[0].getViewModel().set('userprofile', data[0]);
                }
            }
        },
        userSharedItems:{},
        userTimeline: {}
    }
});
