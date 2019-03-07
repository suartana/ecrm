Ext.define('Docucrm.view.authentication.PasswordReset', {
    extend: 'Docucrm.view.authentication.LockingWindow',
    xtype: 'passwordreset',

    requires: [
        'Docucrm.view.authentication.Dialog',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    title: 'Reset Password',

    defaultFocus : 'authdialog',  // Focus the Auth Form to force field focus as well

    items: [
        {
            xtype: 'authdialog',
            width: 455,
            defaultButton: 'resetPassword',
            autoComplete: true,
            bodyPadding: '20 20',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            defaults : {
                margin: '10 0'
            },

            cls: 'auth-dialog-login',
            items: [
				{
					padding: '5 0 0 0',
					xtype:'container',
					html:'<img src="resources/images/logo-corp-red.png" width="175px">'
				},
                {
                    xtype: 'label',
                    cls: 'lock-screen-top-label',
                    text: 'Enter your email address for further reset instructions'
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    name: 'email',
                    hideLabel: true,
                    allowBlank: false,
                    emptyText: 'vorname.nachname@docu.ch',
                    vtype: 'email',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'button',
                    reference: 'resetPassword',
                    scale: 'large',
                    ui: 'soft-blue',
                    formBind: true,
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Reset Password',
                    listeners: {
                        click: 'onResetClick'
                    }
                },
                {
                    xtype: 'component',
                    html: '<div style="text-align:right">' +
                        '<a href="#login" class="link-forgot-password">'+
                            'Back to Log In</a>' +
                        '</div>'
                }
            ]
        }
    ]
});