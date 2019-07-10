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
							emptyText : Translate.label('Search')+"...",
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
                    tooltip: Translate.label('MyProfile'),
                    bind:{
                        text:"<b>{fullname}</b>"
                    },
                    ui:'titlebarbutton',
                    cls:'profile',
                    menu: {
                        itemId: 'mainMenu',
                        showSeparator: true,
                        items: [
                            {
                                iconCls:'x-fa fa-user myprofile',
                                tooltip: Translate.label('MyProfile'),
                                text: Translate.label('MyProfile'),
                                handler:'myProfile'
                            },
                            '-',
                            {
                                iconCls:'x-fa fa-info about',
                                tooltip: Translate.label('About'),
                                text: Translate.label('About'),
                                handler:''
                            },
                            {
                                text: Translate.label('Language'),
                                iconCls:'x-fa fa-bullhorn languages',
                                menu: {
                                    items: [
                                        // stick any markup in a menu
                                        '<b class="menu-title"></b>',
                                        {
                                            text: Translate.lang('German'),
                                            checked: Translate.getSelectedLanguages("de"),
                                            icon:'resources/images/icons/ge_flag.png',
                                            group: 'theme',
                                            value:'de',
                                            handler: 'onLanguageSelect'
                                        }, {
                                            text: Translate.lang('English'),
                                            checked: Translate.getSelectedLanguages("en"),
                                            icon:'resources/images/icons/uk_flag.png',
                                            group: 'theme',
                                            value:'en',
                                            handler: 'onLanguageSelect'
                                        }, {
                                            text: Translate.lang('French'),
                                            checked: Translate.getSelectedLanguages("fr"),
                                            icon:'resources/images/icons/fr_flag.png',
                                            group: 'theme',
                                            value:'fr',
                                            handler: 'onLanguageSelect'
                                        }, {
                                            text: Translate.lang('Italian'),
                                            checked: Translate.getSelectedLanguages("it"),
                                            icon:'resources/images/icons/it_flag.png',
                                            group: 'theme',
                                            value:'it',
                                            handler: 'onLanguageSelect'
                                        }
                                    ]
                                }
                            },
                            '-',
                            {
                                iconCls:'x-fa fa-power-off logout',
                                tooltip: Translate.label('Logout'),
                                text:  Translate.label('Logout'),
                                handler:'onLogoutClick'
                            }
                        ]
                    }
                },
                {
                    xtype: 'image',
                    cls: 'header-right-profile-image-top',
                    height: 35,
                    width: 35,
                    alt: 'current user image',
                    bind:{
                        src:"{profileimagepath}"
                    },
                    listeners: {
                        click: {
                            element: 'el',
                            fn: 'onUserProvileClick'
                        }
                    }
                }
            ]
        },
        {
            xtype: 'maincontainerwrap',
            //id: 'main-view-detail-wrap',
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
                    expanded: true,
                    singleExpand: false,
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
