Ext.define('Docucrm.profile.Tablet', {
    extend: 'Ext.app.Profile',

    requires: [
        'Docucrm.view.tablet.*'
    ],

    // Map tablet/desktop profile views to generic xtype aliases:
    //
    views: {
        email: 'Docucrm.view.tablet.email.Email',
        inbox: 'Docucrm.view.tablet.email.Inbox',
        compose: 'Docucrm.view.tablet.email.Compose',

        searchusers: 'Docucrm.view.tablet.search.Users'
    },

    isActive: function () {
        return !Ext.platformTags.phone;
    }
});
