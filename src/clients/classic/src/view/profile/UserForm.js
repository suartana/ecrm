Ext.define('Docucrm.view.profile.UserForm', {
	extend: 'Ext.Panel',
	xtype: 'userform',
	itemId: 'userform',
	requires: [
		'Ext.Button',
		'Ext.Img'
	],
	viewModel: {
		type: 'userprofileview'
	},
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	cls: 'timeline-items-wrap user-profile-desc',

	items: [
		{
			xtype: 'form',
			defaultType: 'textfield',
			items:[
				{
					xtype: 'fieldset',
					title: Translate.title("Profile"),
					defaultType: 'textfield',
					defaults: {
						labelWidth: 125,
						labelAlign: 'left',
						labelSeparator: ':',
						submitEmptyText: false,
						anchor: '100%'
					},
					items: [
						{
							xtype: 'component',
							height: 15
						},
						{
							id: 'country',
							name: 'country',
							hiddenName: 'country',
							xtype: 'combo',
							fieldLabel: Translate.label("Country"),
							typeAhead: true,
							mode: 'local',
							queryMode: 'local',
							tabIndex: 1,
							triggerAction: 'all',
							valueField: 'code',
							displayField: 'descr',
							forceSelection: true,
							emptyText: Translate.label("PleaseSelect"),
							allowBlank: false,
							bind: {
								value: '{userprofile.country}',
								store: '{systemcountries}'
							},
							store: {
								type: 'systemcountries',
								autoLoad: true
							}
						},
						{
							id: 'language',
							name: 'language',
							hiddenName: 'language',
							xtype: 'combo',
							fieldLabel: Translate.label("Language"),
							typeAhead: true,
							mode: 'local',
							queryMode: 'local',
							tabIndex: 1,
							triggerAction: 'all',
							valueField: 'code',
							displayField: 'descr',
							forceSelection: true,
							emptyText: Translate.label("PleaseSelect"),
							allowBlank: false,
							bind: {
								value: '{userprofile.userlang}',
								store: '{systemlanguages}'
							},
							store: {
								type: 'systemlanguages',
								autoLoad: true
							}
						},
						{
							fieldLabel: Translate.label('Occupation'),
							emptyText: Translate.label('Occupation'),
							name: 'occupation',
							bind: '{userprofile.occupation}'
						},
						{
							id: 'salutation',
							name: 'salutation',
							hiddenName: 'salutation',
							xtype: 'combo',
							fieldLabel: Translate.label("Salutation"),
							typeAhead: true,
							mode: 'local',
							queryMode: 'local',
							tabIndex: 1,
							triggerAction: 'all',
							valueField: 'code',
							displayField: 'descr',
							forceSelection: true,
							emptyText: Translate.label("PleaseSelect"),
							allowBlank: false,
							bind: {
								value: '{userprofile.salutation}',
								store: '{salutation}'
							},
							store: {
								type: 'salutation',
								autoLoad: true
							}
						},

						{
							fieldLabel: Translate.label('Firstname'),
							emptyText: Translate.label('Firstname'),
							name: 'firstname',
							allowBlank: false,
							bind: '{userprofile.firstname}'
						},
						{
							fieldLabel: Translate.label('Lastname'),
							emptyText: Translate.label('Lastname'),
							name: 'lastname',
							allowBlank: false,
							bind: '{userprofile.lastname}'
						},
						{
							fieldLabel: Translate.label('Street') + ' / ' + Translate.label('Number'),
							emptyText: Translate.label('Street') + ' / ' + Translate.label('Number'),
							name: 'addr',
							bind: '{userprofile.addr}'
						},
						{
							fieldLabel: Translate.label('Postcode'),
							emptyText: Translate.label('Postcode'),
							name: 'postcode',
							bind: '{userprofile.postcode}'
						},
						{
							fieldLabel: Translate.label('Town'),
							emptyText: Translate.label('Town'),
							name: 'town',
							bind: '{userprofile.town}'
						},
						{
							fieldLabel: "E-Mail",
							name: 'email',
							emptyText: 'ex: me@somewhere.com',
							vtype: 'email',
							allowBlank: false,
							bind: '{userprofile.email}'
						},
						{
							fieldLabel: Translate.label('Telefon'),
							emptyText: Translate.label('Telefon'),
							name: 'phone',
							bind: '{userprofile.phone}'
						},
						{
							fieldLabel: Translate.label('Mobile'),
							emptyText: Translate.label('Mobile'),
							name: 'mobile',
							bind: '{userprofile.mobile}'
						}
					]
				}
			],
			// Reset and Submit buttons
			buttons: [
			{
				text: Translate.button('Save'),
				ui: 'soft-green',
				iconCls:'x-fa fa-floppy-o',
				handler: 'onProfileFormSubmitClick',
				formBind: true, //only enabled once the form is valid
				disabled: true
			}]
		}
	]
});
