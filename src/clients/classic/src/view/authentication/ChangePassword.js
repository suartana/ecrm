Ext.define('Docucrm.view.authentication.ChangePassword', {
    extend: 'Docucrm.view.authentication.LockingWindow',
    xtype: 'changepassword',

    requires: [
        'Docucrm.view.authentication.Dialog',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text'
    ],
    itemId:'resetpassword',
    title: '<h1>Create new password</h1>',
    defaultFocus: 'authdialog',  // Focus the Auth Form to force field focus as well

    items: [
        {
            xtype: 'authdialog',
            bodyPadding: '20 20',
            width: 455,
            reference : 'authDialog',

            defaultButton : 'submitButton',
            autoComplete: true,
            cls: 'auth-dialog-register',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults : {
                margin: '10 0',
                selectOnFocus : true

            },
            items: [
                {
                    padding: '5 0 0 0',
                    xtype:'container',
                    html:'<img src="resources/images/login_logo.png" width="160px">'
                },
                {
                    xtype: 'label',
                    text: Docucrm.util.Translate.label('E-Mail Address')
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    name: 'email',
                    emptyText: 'user@example.com',
                    vtype: 'email',
                    bind: '',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-envelope-trigger'
                        }
                    }
                },
                {
                    xtype: 'label',
                    cls: 'lock-screen-top-label',
                    text: Docucrm.util.Translate.label('Enter new password')
                },
                {
                    xtype: 'passwordstrength',
                    cls: 'auth-textbox',
                    height: 55,
                    inputType: 'password',
                    hideLabel: true,
                    allowBlank : false,
                    emptyText: 'Password',
                    name: 'password',
                    itemId: 'password',
                    minLength: 8,
                    minLengthText: Docucrm.util.Translate.label('The password must be at least 8 characters long.'),
                    msgTarget: 'under',
                    strengthMeterId: 'userPasswordStrengthMeter',
                    listeners: {
                        validitychange: 'validateField',
                        blur: 'validateField'
                    },
                    triggers: {
                        glyphed: {
                            cls: 'auth-password-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'password_confirmation',
                    vtype: 'password',
                    allowBlank : false,
                    inputType: 'password',
                    emptyText: 'Confirm Password',
                    initialPassField: 'password',
                    msgTarget: 'under',
                    triggers: {
                        glyphed: {
                            cls: 'auth-password-trigger'
                        }
                    }
                },
                {
                    xtype: 'container',
                    name: 'strengthMeter',
                    cls:'form-strengthmeter-scorebar',
                    items: [{
                        xtype: 'container',
                        itemId: 'userPasswordStrengthMeter',
                        value: '&nbsp;',
                        width: 415,
                        minHeight: 11,
                        labelWidth: 415
                    }]
                },
                {
                    xtype: 'button',
                    scale: 'large',
                    ui: 'soft-blue',
                    formBind: true,
                    reference: 'submitButton',
                    bind: false,
                    margin: '5 0',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Change Password',
                    handler: 'onChangePasswordButtonClick'
                },
				{	xtype: 'textfield',
					name:'cib_id',
					name:'token',
                    value: window.params,
					inputType: 'hidden',
					style:"visibility:hidden;"
				},
                {
                    xtype: 'component',
                    html: '<div style="text-align:right">' +
                        '<a href="#login" class="link-forgot-password">'+
                            'Back to Log In</a>' +
                        '</div>',
                    listeners: {
                        click: {
                            element: 'el', //bind to the underlying el property on the panel
                            fn: 'loginWindow'
                        }
                    }
                }
            ]
        }
    ]
});
