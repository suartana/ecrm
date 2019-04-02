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
    title: '<h1>Enter new password</h1>',
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
                selectOnFocus : true,
                inputType: 'password'
            },
            items: [
                {
                    xtype: 'label',
                    cls: 'lock-screen-top-label',
                    text: Docucrm.util.Translate.label('The password must be at least 8 characters long.')
                },
                {
                    xtype: 'passwordstrength',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    emptyText: 'Password',
                    name: 'password',
                    itemId: 'password',
                    minLength: 8,
                    minLengthText: Docucrm.util.Translate.label('The password must be at least 8 characters long.'),
                    msgTarget: 'side',
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
                    name: 'pass-cfrm',
                    vtype: 'password',
                    allowBlank : false,
                    emptyText: 'Confirm Password',
                    initialPassField: 'password',
                    msgTarget: 'side',
                    triggers: {
                        glyphed: {
                            cls: 'auth-password-trigger'
                        }
                    }
                },
                {
                    xtype: 'container',
                    name: 'strengthMeter',
                    itemId:'strengthMeter',
                    items: [{
                        xtype: 'container',
                        itemId: 'userPasswordStrengthMeter',
                        cls: 'form-strengthmeter-scorebar',
                        value: '&nbsp;',
                        textPoor:'Schwach',
                        width: 415,
                        minHeight: 18,
                        height: 18,
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
                    listeners: {
                        click: 'onSignupClick'
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
