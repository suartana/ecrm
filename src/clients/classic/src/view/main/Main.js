Ext.define('Docucrm.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'dashboard',
    requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree'
    ],
    controller: 'main',
    viewModel:{
        type: 'main'
    },
    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    plugins: 'viewport',
    listeners: {
        render: 'onMainViewRender'
    },
    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar shadow',
            height: 64,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    itemId:'documediaLogo',
                    html: '<div class="main-logo"><img class="documedia" src="resources/images/login_logo.png" width="210px" valign="center"></div>',
                    width: 250
                },
                {
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls:'x-fa fa-navicon',
                    itemId: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },
				{
					xtype: 'form',
					margin: '0 0 0 8',
					defaultType: 'textfield',
					defaults: {
						anchor: '100%',
						width:250
					},
					items:[
						{
							emptyText : 'Search....',
							triggers: {
								searchTrigger: {
									handler: function(field, trigger, e) {
										console.log('your search code');
									},
									cls: 'fa-search'
								}
							}
						}
					]
				},
				'->',
                {
                    iconCls:'x-fa fa-envelope',
                    ui: 'header',
                    href: '#email',
                    hrefTarget: '_self',
                    tooltip: 'Check your email'
                },
                {
                    iconCls:'x-fa fa-question',
                    ui: 'header',
                    href: '#faq',
                    hrefTarget: '_self',
                    tooltip: 'Help / FAQ\'s'
                },
                {
                    iconCls:'x-fa fa-th-large',
                    ui: 'header',
                    href: '#profile',
                    hrefTarget: '_self',
                    tooltip: 'See your profile'
                },
                {
                    xtype: 'image',
                    cls: 'header-right-profile-image-top',
                    height: 35,
                    width: 35,
                    alt:'current user image',
                    bind:{
                        src:"{profileimagepath}"
                    },
                    listeners: {
                        click: {
                            element: 'el',
                            fn: 'onUserProvileClick'
                        }
                    }
                },
                {
                    tooltip: 'Profile',
                    bind:{
                        text:"<b>{fullname}</b>"
                    },
                    ui:'titlebarbutton',
                    cls:'profile',
                    menu: {
                        id: 'mainMenu',
                        showSeparator: true,
                        items: [
                            {
                                iconCls:'x-fa fa-user myprofile',
                                tooltip: 'My Profile',
                                text:'My Profile',
                                handler:''
                            },
                            '-',
                            {
                                iconCls:'x-fa fa-info about',
                                tooltip: 'About',
                                text:'About',
                                handler:''
                            },
                            {
                                text: 'Languages',
                                iconCls:'x-fa fa-bullhorn languages',
                                tooltip: 'Please select your language',
                                menu: {
                                    items: [
                                        // stick any markup in a menu
                                        '<b class="menu-title"></b>',
                                        {
                                            text: 'German',
                                            checked: true,
                                            icon:'resources/images/icons/ge_flag.png',
                                            group: 'theme',
                                            checkHandler: ''
                                        }, {
                                            text: 'English',
                                            checked: false,
                                            icon:'resources/images/icons/uk_flag.png',
                                            group: 'theme',
                                            checkHandler: ''
                                        }, {
                                            text: 'France',
                                            checked: false,
                                            icon:'resources/images/icons/fr_flag.png',
                                            group: 'theme',
                                            checkHandler: ''
                                        }, {
                                            text: 'Italian',
                                            checked: false,
                                            icon:'resources/images/icons/it_flag.png',
                                            group: 'theme',
                                            checkHandler: ''
                                        }
                                    ]
                                }
                            },
                            '-',
                            {
                                iconCls:'x-fa fa-sign-out logout',
                                tooltip: 'Logout',
                                text:'Logout',
                                handler:'onLogoutClick'
                            }
                        ]
                    }
                }
            ]
        },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'navigation',
                    store: 'storeNavigationTreeId',
                    width: 250,
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }
            ]
        }
    ]
});
