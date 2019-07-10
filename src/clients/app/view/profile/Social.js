Ext.define('Docucrm.view.profile.Social', {
    extend: 'Ext.panel.Panel',
    xtype: 'profilesocial',
    itemId: 'profilesocial',
    requires: [
        'Ext.Button',
        'Ext.Container'
    ],
    layout: {
        type: 'vbox',
        align: 'middle'
    },
    viewModel: {
        type: 'userprofileview'
    },
    height: 250,

    bodyPadding: 20,

    items: [
        {
            xtype: 'image',
            cls: 'userProfilePic',
            height: 120,
            width: 120,
            alt: 'profile-picture',
            bind: {
                src: "storage/images/{userprofile.img}"
            }
        },
        {
            xtype: 'component',
            cls: 'userProfileName',
            height: '',
            bind: {
                html: "{userprofile.firstname} {userprofile.lastname}"
            }
        },
        {
            xtype: 'component',
            cls: 'userProfileDesc',
            bind: {
                html: "{userprofile.occupation}"
            }
        },
        {
            xtype: 'component',
            cls: 'userProfileDesc',
            height:15,
            html:''
        },
        {
            xtype: 'button',
            ui: 'facebook',
            width: 220,
            text: 'Upload Profile Image',
            platformConfig: {
                classic: {
                    scale: 'small'
                },
                modern: {
                    ui: 'action'
                }
            }
        }
    ]
});
