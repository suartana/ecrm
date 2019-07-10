/**
 * Define Tab Module grid panel
 *
 * @store: modulelist
 * @controller: module
 * @viewtype: sysmodule
 */
Ext.define('Docucrm.view.system.module.Module', {
	extend: 'Ext.tab.Panel',
	xtype: 'sysmodule',
	itemId:'sysmodule',
	stateId: 'sysmoduleStateId',
	requires: [
		'Ext.grid.Panel',
		'Ext.toolbar.Paging',
		'Ext.grid.column.Date'
	],
	controller: 'module',
	viewModel: {
		type: 'modulelist'
	},
	plugins: {
		tabreorderer: true
	},
	cls: 'shadow',
	activeTab: 0,
	margin: 20,

	items: [
		{
			xtype: 'gridpanel',
			cls: 'ext-grid',
			title: Translate.label('Module'),
			iconCls:'x-fa fa-wrench',
			reference: 'tabgridmodule',
			routeId: 'tabmodule',
			bind: '{allModules}',
			scrollable: false,
			itemId:'gridmodule',
			layout: 'fit',
			stateful: true,
			stateId: 'modulestateid',
			syncRowHeight: false,
			headerBorders: true,
			viewConfig: {
				enableTextSelection: true,
				stripeRows: true
			},
			tbar: [
			{
				xtype: 'combobox',
				reference : 'nameFilterFieldModuleLang',
				itemId:'nameFilterFieldModuleLang',
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
					select:'onModuleLanguageChange'
				}
			},
			'-',
			{
				text: Translate.button("AddNew"),
				tooltip: Translate.tooltip("AddANewRow"),
				iconCls: 'x-fa fa-plus-circle',
				handler:'onAddNewModuleClick'
			},
			'-',
			{
				text: Translate.button("Reload"),
				tooltip: Translate.button("Reload"),
				iconCls: 'x-fa fa-refresh',
				handler:'onReloadModuleClick'
			}],
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
					cls: 'content-column',
					width: 120,
					dataIndex: 'bool',
					text: Translate.column('Actions'),
					tooltip: Translate.column('Actions'),
					items: [
						{
							xtype: 'button',
							iconCls: 'x-fa fa-pencil',
							tooltip: Translate.button('Edit'),
							handler:'onEditModuleGridClick'
						},
						{
							xtype: 'button',
							iconCls: 'x-fa fa-tasks',
							tooltip: Translate.button('Submodules'),
							handler:'onAddSubmoduleGridClick'
						},
						{
							xtype: 'button',
							iconCls: 'x-fa fa-cog',
							tooltip: Translate.button('Properties'),
							handler:'onModulePropertiesGridClick'
						},
						{
							xtype: 'button',
							iconCls: 'x-fa fa-close',
							tooltip: Translate.button('Delete'),
							handler:'onDeleteModuleGridClick'
						}
					]
				}
			],
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					itemId: 'userPaginationToolbar',
					displayInfo: true,
					bind: '{allModules}'
				}
			]
		},
		{
			xtype: 'gridpanel',
			cls: 'email-inbox-panel',
			iconCls:'x-fa fa-sitemap',
			itemId: 'messagesGrid',
			stateId: 'messagesStateId',
			hideHeaders: true,
			title: 'Function',
			routeId: 'messages',
			bind: '{inboxResults}',
			scrollable: false,
			columns: [
				{
					xtype: 'gridcolumn',
					renderer: function(value) {
						if(value) {
							return '<span class="x-fa fa-heart"></span>';
						}
						return '<span class="x-fa fa-heart-o"></span>';

					},
					width: 45,
					dataIndex: 'favorite'
				},
				{
					xtype: 'gridcolumn',
					dataIndex: 'from',
					flex: 1
				},
				{
					xtype: 'gridcolumn',
					dataIndex: 'title',
					flex: 2
				},
				{
					xtype: 'gridcolumn',
					renderer: function(value) {
						return value ? '<span class="x-fa fa-paperclip"></span>' : '';
					},
					dataIndex: 'has_attachments'
				},
				{
					xtype: 'datecolumn',
					dataIndex: 'received_on'
				}
			],
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					itemId: 'pagingToolbar',
					prependButtons: true,
					bind: '{inboxResults}'
				}
			]
		}
	]
});

