/**
 * @version    	$Id: Login.js gsuartana $
 * @copyright  	Copyright (c) 2019 by Docu Media Schweiz GmbH, Switzerland
 *
 * @class
 * View definition for Authentication Login View.
 *
 * @author  Gede Suartana <gede.suartana@reussprivate.com>
 */
Ext.define('Docucrm.view.authentication.Login', {
    extend: 'Docucrm.view.authentication.LockingWindow',
    xtype: 'login',
    requires: [
        'Docucrm.view.authentication.Dialog',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],
    itemId:'authlogin',
    title: '<h1><span class="slogan">"Changes for the Better..."</span> Docu Media ERP & CRM</h1>',
    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well
    items: [
        {
            xtype: 'authdialog',
            defaultButton : 'loginButton',
            autoComplete: true,
            bodyPadding: '20 20',
            cls: 'auth-dialog-login',
            header: false,
            width: 415,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            defaults : {
                margin : '5 0'
            },

            items: [
				{
					padding: '5 0 0 0',
					xtype:'container',
					html:'<img src="resources/images/login_logo.png" width="225px">'
				},

                {
                    xtype: 'label',
                    text: 'Sign into your account'
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    name: 'email',
                    itemId:'email',
                    bind: '',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    emptyText: 'Benutzername',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    itemId:'password',
                    hideLabel: true,
                    emptyText: 'Password',
                    inputType: 'password',
                    name: 'password',
                    bind: '',
                    allowBlank : false,
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-password-trigger'
                        }
                    }
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            flex : 1,
                            cls: 'form-panel-font-color rememberMeCheckbox',
                            height: 30,
                            bind: '',
                            itemId:'rememberme',
                            name: 'rememberme',
                            boxLabel: 'Remember me'
                        },
                        {
                            xtype: 'container',
                            html: '<a href="#passwordreset" class="link-forgot-password"> Forgot Password ?</a>',
                            listeners: {
                                click: {
                                    element: 'el', //bind to the underlying el property on the panel
                                    fn: 'forgetPasswordWindow'
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'button',
                    reference: 'loginButton',
                    scale: 'large',
                    ui: 'soft-green',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Login',
                    formBind: true,
                    listeners: {
                        click: 'onLoginButton'
                    }
                }
            ]
        }
    ],

    initComponent: function() {
        this.addCls('user-login-register-container');
        this.callParent(arguments);
    }
});
