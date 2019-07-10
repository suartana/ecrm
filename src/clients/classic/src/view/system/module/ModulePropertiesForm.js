Ext.define('Docucrm.view.system.module.ModulePropertiesForm', {
	extend: 'Ext.window.Window',
	xtype: 'module-properties-form-window',
	reference: 'modulePropertiesFormWindow',
	minWidth: 300,
	minHeight: 380,
	layout: 'fit',
	resizable: false,
	maximizable:false,
	modal: true,
	defaultFocus: 'firstName',
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
	itemId: 'modulePopupWindow',
	bind: {
		title: '{title}'
	},
	items: [{
		xtype: 'form',
		itemId:'modulePropertiesFormId',
		reference: 'modulePropertiesForm',
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
				name: 'iconcls',
				itemId: 'iconcls',
				width:250,
				afterLabelTextTpl: [
					'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
				],
				fieldLabel: 'Icon-Cls',
				allowBlank: false,
				bind:'{theProperties.iconcls}'
			},
			{
				width:250,
				name: 'rowcls',
				itemId: 'rowcls',
				fieldLabel: 'Row-Cls',
				bind:'{theProperties.rowcls}'
			},
			{
				width:250,
				name: 'viewtype',
				itemId: 'viewtype',
				fieldLabel: 'View-Type',
				bind:'{theProperties.viewtype}'
			},
			{
				width:250,
				name: 'routeid',
				itemId: 'routeid',
				fieldLabel: 'Route-ID',
				bind:'{theProperties.routeid}'
			},
			{
				width:250,
				name: 'itemid',
				itemId: 'itemid',
				afterLabelTextTpl: [
					'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
				],
				fieldLabel: 'Item-ID',
				allowBlank: false,
				bind:'{theProperties.itemid}'
			},
			{
				xtype: 'checkboxfield',
				name: 'expanded',
				fieldLabel: 'Expanded',
				labelWidth : 100,
				inputValue: 'TRUE',
				uncheckedValue: '',
				boxLabel: 'True',
				bind:'{theProperties.expanded}'
			},
			{
				xtype: 'checkboxfield',
				name: 'leaf',
				labelWidth : 100,
				fieldLabel: 'Leaf',
				boxLabel: 'True',
				inputValue: 'TRUE',
				uncheckedValue: '',
				bind:'{theProperties.leaf}'
			},
			{
				xtype: 'checkboxfield',
				name: 'selectable',
				fieldLabel: 'Selectable',
				labelWidth : 100,
				boxLabel: 'True',
				inputValue: 'TRUE',
				uncheckedValue: '',
				bind:'{theProperties.selectable}'
			},
			{	xtype: 'textfield',
				name:'id',
				bind: '{theProperties.id}',
				itemId:'id',
				inputType: 'hidden',
				style:"visibility:hidden;"
			},
			{	xtype: 'textfield',
				name: 'submodulecode',
				itemId: 'submodulecode',
				bind: '{theModule.code}',
				inputType: 'hidden',
				style:"visibility:hidden;"
			},
			{	xtype: 'textfield',
				name: 'modpropertid',
				itemId: 'modpropertid',
				bind: '{theModule.id}',
				inputType: 'hidden',
				style:"visibility:hidden;"
			}
		],

		buttons: [
			{
				text: Translate.button("Remove"),
				iconCls:'x-fa fa-times',
				ui: 'soft-red',
				handler: 'onModulePropertiesFormDelete'
			},
			{
				text: Translate.button("Close"),
				iconCls:'x-fa fa-times-circle',
				handler: 'onModulePropertiesFormClose'
			}, {
				text: Translate.button("Save"),
				ui: 'soft-green',
				iconCls:'x-fa fa-floppy-o',
				handler: 'onModulePropertiesFormSubmit'
			}
		]
	}]
});