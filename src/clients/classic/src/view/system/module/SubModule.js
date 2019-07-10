Ext.define('Docucrm.view.system.module.SubModule', {
	extend: 'Ext.grid.Panel',
	xtype: 'submodule',
	controller: 'module',
	requires: [
		'Ext.grid.column.Action'
	],
	layout: 'fit',
	stateful: true,
	syncRowHeight: false,
	headerBorders: true,
	multiSelect: true,
	cls: 'ext-grid',
	store:'submodulestoreId',
	viewConfig: {
		enableTextSelection: true
	},
	tbar: [
		{
			xtype: 'combobox',
			reference : 'nameFilterFieldSubModuleLang',
			itemId:'nameFilterFieldSubModuleLang',
			publishes: 'locale',
			valueField: 'locale',
			fieldLabel:Translate.label("Language"),
			labelWidth:75,
			emptyText:Translate.label('PleaseSelect')+"...",
			displayField: 'name',
			store: {
				type: 'modulelangstore'
			},
			forceSelection: true,
			typeAhead: false,
			queryMode: 'local',
			listConfig: {
				itemTpl: [
					'<div data-qtip="{locale}: {name}">{flag} {name}</div>'
				]
			},
			listeners:{
				select:'onSubModuleLanguageChange'
			}
		},
		'-',
		{
			text: Translate.button("AddNew"),
			tooltip: Translate.tooltip("AddANewRow"),
			iconCls: 'x-fa fa-plus-circle',
			handler:'onAddNewSubModuleClick'
		},
		'-',
		{
			text: Translate.button("Reload"),
			tooltip: Translate.button("Reload"),
			iconCls: 'x-fa fa-refresh',
			handler:'onReloadSubModuleClick'
		}
	],
	columns: [
		{
			xtype: 'gridcolumn',
			width: 40,
			dataIndex: 'id',
			text: '#'
		},
		{
			xtype: 'gridcolumn',
			width: 50,
			dataIndex: 'seq',
			text: 'SEQ'
		},
		{
			xtype: 'gridcolumn',
			cls: 'content-column',
			dataIndex: 'descr',
			text: Translate.column('Name'),
			flex: 1
		},
		{
			xtype: 'gridcolumn',
			cls: 'content-column',
			dataIndex: 'transtext',
			text: Translate.column('Translation'),
			flex: 1
		},

		{
			xtype: 'gridcolumn',
			cls: 'content-column',
			dataIndex: 'locale',
			text: Translate.column('Locale'),
			width:75,
			hidden:true
		},
		{
			xtype: 'gridcolumn',
			cls: 'content-column',
			dataIndex: 'lang',
			width: 100,
			text: Translate.column('Language')
		},
		{
			xtype: 'gridcolumn',
			cls: 'content-column',
			width: 120,
			dataIndex: 'createdby',
			text: Translate.column('CreatedBy')
		},
		{
			xtype: 'gridcolumn',
			cls: 'content-column',
			width: 120,
			dataIndex: 'createdby',
			text: Translate.column('UpdatedBy'),
			hidden:true
		},
		{
			xtype: 'datecolumn',
			cls: 'content-column',
			width: 100,
			dataIndex: 'created_at',
			text: Translate.column('CreatedAt')
		},
		{
			xtype: 'datecolumn',
			cls: 'content-column',
			width: 120,
			dataIndex: 'updated_at',
			text: Translate.column('UpdatedAt'),
			hidden:true
		},
		{
			xtype: 'actioncolumn',
			align:'center',
			items: [
				{
					xtype: 'button',
					iconCls: 'x-fa fa-pencil',
					tooltip:Translate.label('Edit'),
					handler:'onEditSubmoduleGridClick'
				},
				{
					xtype: 'button',
					iconCls: 'x-fa fa-cog',
					tooltip: Translate.button('Properties'),
					handler:'onSubModulePropertiesGridClick'
				},
				{
					xtype: 'button',
					iconCls: 'x-fa fa-close',
					tooltip:'Remove',
					handler:'onDeleteSubModuleGridClick'
				},
			],

			cls: 'content-column',
			width: 120,
			dataIndex: 'bool',
			text: 'Actions',
			tooltip: 'edit '
		}
	]
});