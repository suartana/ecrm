Ext.define('Docucrm.view.system.module.SubModuleForm', {
	extend: 'Ext.window.Window',
	xtype: 'submodule-form-window',
	reference: 'submodulePopupWindow',
	minWidth: 300,
	minHeight: 380,
	layout: 'fit',
	resizable: false,
	maximizable:false,
	modal: true,
	defaultFocus: 'descr',
	closeAction: 'hide',
	profiles: {
		classic: {
			height: 480
		},
		neptune: {
			height: 480
		}
	},
	defaultButtonUI:'wizard-soft-green',
	width: 600,
	itemId: 'submodulePopupWindow',
	bind: {
		title: '{title}'
	},
	items: [{
		xtype: 'form',
		itemId:'windowSubModuleForm',
		reference: 'windowSubModuleForm',
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		border: false,
		bodyPadding: 10,
		defaultType: 'textfield',
		fieldDefaults: {
			msgTarget: 'side',
			labelAlign: 'left',
			labelWidth: 100,
			width:350,
			labelStyle: 'font-weight:bold'
		},

		items: [
			{
				xtype: 'fieldcontainer',
				//fieldLabel: 'Module Formular',
				labelStyle: 'font-weight:bold;padding:0;',
				layout: 'hbox',
				defaultType: 'numberfield',

				fieldDefaults: {
					labelAlign: 'top'
				},

				items: [{
					xtype:'textfield',
					flex: 2,
					name: 'descr',
					hiddenName:'descr',
					itemId: 'descr',
					afterLabelTextTpl: [
						'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
					],
					fieldLabel: Translate.label("SubmoduleName"),
					allowBlank: false,
					bind:'{theSubModule.descr}'
				},
				{
					xtype:'textfield',
					flex: 1,
					name: 'code',
					hiddenName:'code',
					itemId: 'code',
					afterLabelTextTpl: [
						'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
					],
					margin: '0 0 0 5',
					fieldLabel: Translate.label("Code"),
					allowBlank: false,
					bind:'{theSubModule.code}'
				},
				{
					flex: 1,
					name: 'seq',
					minValue: 1,
					itemId: 'seq',
					maxValue: 100,
					afterLabelTextTpl: [
						'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
					],
					fieldLabel: 'Sequence',
					allowBlank: false,
					margin: '0 0 0 5',
					bind:'{theSubModule.seq}'
				}]
			},
			{
				name: 'descr_en',
				itemId: 'descr_en',
				width:250,
				afterLabelTextTpl: [
					'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
				],
				fieldLabel: 'English',
				allowBlank: false,
				bind:'{theSubModule.languages.en.text}'
			},
			{
				width:250,
				name: 'descr_de',
				itemId: 'descr_de',
				afterLabelTextTpl: [
					'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
				],
				fieldLabel: 'Deutsch',
				allowBlank: false,
				bind:'{theSubModule.languages.de.text}'
			},
			{
				width:250,
				name: 'descr_fr',
				itemId: 'descr_fr',
				afterLabelTextTpl: [
					'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
				],
				fieldLabel: 'Française',
				allowBlank: false,
				bind:'{theSubModule.languages.fr.text}'
			},
			{
				width:250,
				name: 'descr_it',
				itemId: 'descr_it',
				afterLabelTextTpl: [
					'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
				],
				fieldLabel: 'Italiano',
				allowBlank: false,
				bind:'{theSubModule.languages.it.text}'
			},
			{	xtype: 'textfield',
				name:'id',
				bind: '{theSubModule.id}',
				inputType: 'hidden',
				style:"visibility:hidden;"
			},
			{	xtype: 'textfield',
				name: 'descr_en_id',
				itemId: 'descr_en_id',
				bind: '{theSubModule.languages.en.id}',
				inputType: 'hidden',
				style:"visibility:hidden;"
			},
			{	xtype: 'textfield',
				name: 'descr_de_id',
				itemId: 'descr_de_id',
				bind: '{theSubModule.languages.de.id}',
				inputType: 'hidden',
				style:"visibility:hidden;"
			},
			{	xtype: 'textfield',
				name: 'descr_fr_id',
				itemId: 'descr_fr_id',
				bind: '{theSubModule.languages.fr.id}',
				inputType: 'hidden',
				style:"visibility:hidden;"
			},
			{	xtype: 'textfield',
				name: 'descr_it_id',
				itemId: 'descr_it_id',
				bind: '{theSubModule.languages.it.id}',
				inputType: 'hidden',
				style:"visibility:hidden;"
			}
		],

		buttons: [
			{
				text: 'Cancel',
				iconCls:'x-fa fa-times-circle',
				handler: 'onSubModuleFormCancel'
			}, {
				text: 'Save',
				ui: 'soft-green',
				iconCls:'x-fa fa-floppy-o',
				handler: 'onSubModuleFormSubmit'
			}
		]
	}]
});