/**
 * @class Docucrm.view.profile.UserProfile
 */
Ext.define('Docucrm.view.profile.UserProfile', {
    extend: 'Docucrm.view.profile.UserProfileBase',
    xtype: 'profile',
    cls: 'userProfile-container',
    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],
    layout: 'responsivecolumn',
    items: [
        {
            xtype: 'profilesocial',
            // Use 50% of container when viewport is big enough, 100% otherwise
            userCls: 'big-50 small-100 shadow'
        },
        {
            xtype: 'userpassword',
            userCls: 'big-50 small-100 shadow'
        },
        {
            xtype: 'userform',
            userCls: 'big-50 small-100 shadow'
        }
    ]
});

