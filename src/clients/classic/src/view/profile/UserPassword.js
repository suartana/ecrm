Ext.define('Docucrm.view.profile.UserPassword', {
	extend: 'Ext.Panel',
	xtype: 'userpassword',
	itemId: 'userpassword',
	requires: [
		'Ext.Button',
		'Ext.Img',
		'Docucrm.util.PasswordStrength'
	],
	viewModel: {
		type: 'userprofileview'
	},
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	height: 250,
	cls: 'timeline-items-wrap user-profile-desc',

	items: [
		{
			xtype: 'form',
			defaultType: 'textfield',
			itemId:'passwordChangeFormId',
			height: 220,
			defaults: {
				labelWidth: 125,
				labelAlign: 'left',
				labelSeparator: ':',
				submitEmptyText: false,
				anchor: '99%',
				inputType: 'password'
			},
			items:[
				{
					xtype: 'fieldset',
					title: Translate.title("Password"),
					defaultType: 'textfield',
					defaults: {
						anchor: '100%'
					},
					items: [
						{
							xtype: 'passwordstrength',
							name: 'password',
							itemId: 'password',
							fieldLabel: Translate.label('Passwort'),
							validationEvent: "blur",
							allowBlank: false,
							maxLength: 32,
							enforceMaxLength: true,
							inputType: "password",
							labelWidth: 150,
							width: 280,
							minLength: 8,
							minLengthText: Translate.label('Das Passwort muss mindestens 8 Zeichen lang sein.'),
							msgTarget: 'side',
							emptyText:  Translate.label('Das Passwort muss mindestens 8 Zeichen lang sein'),
							strengthMeterId: 'userPasswordStrengthMeter',
							listeners: {
								validitychange: 'validateField',
								blur: 'validateField'
							}

						},
						{
							fieldLabel: 'Confirm Password',
							labelWidth: 150,
							width: 280,
							allowBlank: false,
							minLength: 8,
							minLengthText: Translate.label('Das Passwort muss mindestens 8 Zeichen lang sein.'),
							name: 'pass-cfrm',
							vtype: 'password',
							inputType: "password",
							initialPassField: 'password' // id of the initial password field
						},
						{
							xtype: 'container',
							name: 'strengthMeter',
							items: [{
								xtype: 'container',
								itemId: 'userPasswordStrengthMeter',
								cls: 'meter-content',
								value: '&nbsp;',
								margin: '0 0 0 155',
								width: 190,
								minHeight: 18,
								height: 18,
								labelWidth: 150
							}]
						}
					]
				}
			],
			// Reset and Submit buttons
			buttons: [
			{
				text: Translate.button('ChangePassword'),
				ui: 'soft-green',
				iconCls:'x-fa fa-floppy-o',
				handler: 'onPasswordChangeClick',
				formBind: true, //only enabled once the form is valid
				disabled: true
			}]
		}
	]
});
