/**
 * @version    	$Id: LockScreen.js gsuartana $
 * @copyright  	Copyright (c) 2019 by Docu Media Schweiz GmbH, Switzerland
 *
 * @class
 * View definition for Authentication Lock Screen View.
 *
 * @author  Gede Suartana <gede.suartana@reussprivate.com>
 */

Ext.define('Docucrm.view.authentication.LockScreen', {
    extend: 'Docucrm.view.authentication.LockingWindow',
    xtype: 'lockscreen',

    requires: [
        'Docucrm.view.authentication.Dialog',
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox'
    ],

    title: '<h3>Session Expired</h3>',

    defaultFocus : 'authdialog',  // Focus the Auth Form to force field focus as well

    items: [
        {
            xtype: 'authdialog',
            reference: 'authDialog',
            defaultButton : 'loginButton',
            autoComplete: false,
            width: 455,
            cls: 'auth-dialog-login',
            defaultFocus : 'textfield[inputType=password]',
            layout: {
                type  : 'vbox',
                align : 'stretch'
            },

            items: [
                {
                    xtype: 'container',
                    cls: 'auth-profile-wrap',
                    height : 120,
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'image',
                            height: 80,
                            margin: 20,
                            width: 80,
                            alt: 'lockscreen-image',
                            cls: 'lockscreen-profile-img auth-profile-img',
                            src: 'resources/images/user-profile/gede.jpg'
                        },
                        {
                            xtype: 'box',
                            html: '<div class=\'user-name-text\'> Gede Suartana </div><div class=\'user-post-text\'> Senior Developer</div>'
                        }
                    ]
                },

                {
                    xtype: 'container',
                    padding: '0 20',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },

                    defaults: {
                        margin: '10 0'
                    },

                    items: [
						{
							padding: '5 0 0 0',
							xtype:'container',
							html:'<img src="resources/images/login_logo.png" width="225px">'
						},
                        {
                            xtype: 'textfield',
                            labelAlign: 'top',
                            cls: 'lock-screen-password-textbox',
                            labelSeparator: '',
                            fieldLabel: 'It\'s been a while. please enter your password to resume',
                            emptyText: 'Password',
                            inputType: 'password',
                            allowBlank: false,
                            triggers: {
                                glyphed: {
                                    cls: 'trigger-glyph-noop password-trigger'
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            reference: 'loginButton',
                            scale: 'large',
                            ui: 'soft-blue',
                            iconAlign: 'right',
                            iconCls: 'x-fa fa-angle-right',
                            text: 'Login',
                            formBind: true,
                            listeners: {
                                click: 'onLoginButton'
                            }
                        },
                        {
                            xtype: 'component',
                            html: '<div style="text-align:right">' +
                                '<a href="#login" class="link-forgot-password">'+
                                    'or, sign in using other credentials</a>' +
                                '</div>'
                        }
                    ]
                }
            ]
        }
    ]
});
