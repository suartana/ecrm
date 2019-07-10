/**
 * Define module controller
 *
 * @version v$i
 * @author Gede Suartana <gede.suartana@docu.ch>
 */

Ext.define('Docucrm.view.system.module.ModuleController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.module',
	alternateClassName: ['ModuleController'],
	/**
	 * Set is Edited
	 */
	isEdit: Ext.emptyFn,
	dialog: Ext.emptyFn,
	/**
	 * Search module on event key enter
	 *
	 * @param searchfield
	 * @param event
	 * @param options
	 */
	onModuleGridSearch:function (searchfield, event, options) {
		if(event.getKey() == event.ENTER) {
			//set vars
			var me = this,
				view = me.getView(),
				grid = view.down("#gridmodule"),
				store = grid.getStore(),
				searchval = searchfield.getValue(),
				moduleLang = me.lookupReference('nameFilterFieldModuleLang').getValue();;
			//set store params
			store.getProxy().setExtraParams({
				searchquery: searchval,
				lang: moduleLang
			});
			//sort store
			//store.sort([{ property: 'id', direction: 'DESC' }]);
			//load store
			store.reload();
		}
	},
	/**
	 *
	 * @param record
	 */
	createModuleDialogWindow:function(record){
		var me = this,
			view = me.getView(),
			itemId = record ? 'ModuleDialogWin'+record.get('id') : 'ModuleDialogWin',
			title =  record ? 'Edit: ' + record.get('descr') : Translate.title( 'AddNewModule' );
		//if record are empty or not
		me.isEdit = !!record;
		me.dialog = view.add({
				xtype: 'module-form-window',
				viewModel: {
					data: {
						title: title,
						theModule: record ? record.getData() : null,
						itemId: itemId
					}
				}
			});
		me.dialog.show();
	},
	/**
	 *
	 * @param record
	 */
	createSubModuleDialogWindow:function(data,record){
		var me = this,
			view = me.getView(),
			itemId = record ? 'SubmoduleDialogWin'+record.get('id') : 'SubmoduleDialogWin',
			title =  record ? 'Edit: ' + record.get('descr') : Translate.title( 'AddNewSubmodule' ) + " - "+data.descr;
		//if record are empty or not
		me.isEdit = !!record;
		me.dialog = view.add({
			xtype: 'submodule-form-window',
			viewModel: {
				data: {
					title: title,
					theSubModule: record ? record.getData() : null,
					itemId: itemId
				}
			}
		});
		me.dialog.show();
	},
	/**
	 *
	 * @param record
	 */
	createModulePropertiesWindow:function(record){
		var me = this,
			view = me.getView(),
			itemId = record ? 'ModulePropertiesWin'+record.get('id') : 'ModulePropertiesWin',
			title =  record ? 'Edit: ' +Translate.title( 'Properties' ) + " - " + record.get('descr') : Translate.title( 'Properties' );
		console.log("record",record);
		//if record are empty or not
		me.isEdit = !!record;
		me.dialog = view.add({
			xtype: 'module-properties-form-window',
			parentPanelRef:record,
			parentViewRef:view,
			parentName:'moduleProperties',
			viewModel: {
				data: {
					title: title,
					theProperties: record ? record.get("properties") : null,
					theModule : record ? record.getData() : null,
					itemId: itemId
				}
			}
		});
		me.dialog.show();
	},

	/**
	 *
	 * @param record
	 */
	createSubModulePropertiesWindow:function(record){
		var me = this,
			view = me.getView(),
			itemId = record ? 'SubModulePropertiesWin'+record.get('id') : 'SubModulePropertiesWin',
			title =  record ? 'Edit: ' +Translate.title( 'Properties' ) + " - " + record.get('descr') : Translate.title( 'Properties' );
		console.log("record",record);
		//if record are empty or not
		me.isEdit = !!record;
		me.dialog = view.add({
			xtype: 'module-properties-form-window',
			parentRecordRef:record,
			parentViewRef:view,
			parentName:'submoduleProperties',
			viewModel: {
				data: {
					title: title,
					theProperties: record ? record.get("properties") : null,
					theModule : record ? record.getData() : null,
					itemId: itemId
				}
			}
		});
		me.dialog.show();
	},
	/**
	 * Open module form Window
	 *
	 * @param button
	 */
	onAddNewModuleClick:function(button){
		return this.createModuleDialogWindow(false);
	},
	/**
	 * Reload the module grid store
	 *
	 * @param button
	 * @return {store.reload()}
	 */
	onReloadModuleClick:function(button) {
		return button.up("#gridmodule").store.reload();
	},
	/**
	 * Reload the submodule grid store with own parameters
	 *
	 * @param button
	 * @return {*}
	 */
	onReloadSubModuleClick:function(button){
		return button.up("gridpanel").store.reload();
	},
	/**
	 * Reload the module store after filtering with the module language
	 *
	 * @param combo
	 */
	onModuleLanguageChange:function (combo) {
		//set vars
		var grid = combo.up("#gridmodule"),
			store = grid.getStore();
		//set store params
		store.getProxy().setExtraParams({
			lang: combo.getValue()
		});
		//load store
		store.reload();
	},
	/**
	 * Reload the module store after filtering with the module language
	 *
	 * @param combo
	 */
	onSubModuleLanguageChange:function (combo) {
		//set vars
		var grid = this.getView(),
			store = grid.getStore();
		//clone the store with own parameters
		Helpers.deepCloneStore(store);
		//set store params
		store.getProxy().setExtraParams({
			lang: combo.getValue()
		});
		//load store
		store.reload();
	},
	/**
	 * Store the module item into the database
	 *
	 * @param button
	 */
	onModuleFormSubmit:function (button) {
		var me = this,
			grid = me.lookupReference("tabgridmodule"),
			store = grid.getStore();
			form = me.lookupReference('windowModuleForm').getForm();

		if(form.isValid()){
			try {
				form.submit({
					headers : Helpers.apiPostHeaders(),
					url: 'api/system/module/save',
					scope: this,
					method: 'POST',
					clientValidation:true,
					waitTitle: Translate.title( 'SavingData' ),
					waitMsg : Translate.label( 'PleaseWait' )+"...",
					clientValidation: true,
					success: function (form, action) {
						var response = action.response,
							obj = Ext.decode(response.responseText);
						//inform user
						Message.infoBox("Info", obj.message);
						//clear form
						obj.update === true ? false : form.reset();
						//reload grid store
						store.reload();
					},
					failure: function (form, action) {
						var response = action.response,
							obj = Ext.decode(response.responseText);
						Message.infoBox("Error", obj.error.message);
					}
				});
			}  catch (exception) {
				Message.infoBox("Error",Translate.error("ReportAdmin"));
			}
		}else{
			Message.infoBox("Error",Translate.error("PleaseFillAllRequiredFields"));
		}
	},
	/**
	 * Reset the form , closing the window and reload the data grid
	 *
	 * @param button
	 */
	onModuleFormCancel:function (button) {
		var me = this,
			view = me.lookupReference("modulePopupWindow"),
			grid = me.lookupReference("tabgridmodule"),
			store = grid.getStore(),
			form = me.lookupReference('windowModuleForm').getForm();
			form.reset();
			view.close();
			store.reload();
	},
	/**
	 * Editing the module record
	 *
	 * @param view
	 * @param recIndex
	 * @param cellIndex
	 * @param item
	 * @param e
	 * @param record
	 * @return {*|void}
	 */
	onEditModuleGridClick:function (view, recIndex, cellIndex, item, e, record) {
		return this.createModuleDialogWindow(record);
	},
	/**
	 * Edit Module Properties
	 *
	 * @param view
	 * @param recIndex
	 * @param cellIndex
	 * @param item
	 * @param e
	 * @param record
	 * @return {*|void}
	 */
	onModulePropertiesGridClick:function (view, recIndex, cellIndex, item, e, record) {
		return this.createModulePropertiesWindow(record);
	},
	/**
	 * Provide Confirm Message Box
	 *
	 * @param view
	 * @param recIndex
	 * @param cellIndex
	 * @param item
	 * @param e
	 * @param record
	 */
	onDeleteModuleGridClick:function(view, recIndex, cellIndex, item, e, record){
		var me = this;
		Ext.MessageBox.confirm({
			title: Translate.title('Delete')+ ' Module',
			msg: Translate.info( 'DeleteConfirmation'),
			buttons: Ext.MessageBox.OKCANCEL,
			scope: this,
			icon: Ext.MessageBox.QUESTION,
			fn: function(btn) {
				if (btn === 'ok') {
					record.get('id') ? me.doDeleteModule(view,record.get('id')) : Message.infoBox("Error",Translate.error("ReportAdmin"));
				}
			}
		});
	},
	/**
	 * Delete record from the module table
	 *
	 * @param view
	 * @param id
	 */
	doDeleteModule:function(view,id){
		var store = view.getStore();
		view.mask(Translate.submit('PleaseWait')+"...");
		try {
			Ext.Ajax.request({
				headers : Helpers.apiHeaders(),
				method: "GET",
				url: '/api/system/module/delete',
				params:{id:id},
				scope: this,
				success: function(response, opts) {
					var obj = Ext.JSON.decode(response.responseText);
					store.reload();
					Message.infoBox("info",obj.message);
					view.unmask();
				},
				failure: function(response) {
					var obj = Ext.JSON.decode(response.responseText),
						message = obj ? obj.error.message : Translate.error("ReportAdmin");
					Message.infoBox("Error",message);
					view.unmask();
				}
			});

		}  catch (exception) {
			Message.infoBox("Error",Translate.error("ReportAdmin"));
			view.unmask();
		}
	},
	/**
	 * Loading the submodule store
	 *
	 * @param grid
	 * @param modcode
	 */
	loadSubModuleStore:function(grid,modcode){
		var store	= grid.getStore();
		//cloning the store
		Helpers.deepCloneStore(store);
		//load the store
		store.reload({
			scope: grid,
			params : {
				modcode : modcode
			}
		});
	},
	/**
	 * Create Dinamyc Tab with individual grid store parameters
	 *
	 * @param record
	 * @return {*|void|Ext.Component|(function(): *)|(function(*, *=): void)|(function(): void)}
	 */
	addTabPanel:function(record){
		var me = this,
			tabPanel = me.getView(),
			tabId = 'tabSubModuleId-'+record.get("id"),
			tab = tabPanel.down("#"+tabId),
			gridId = 'grid'+tabId;

			if(tab === null){
				tab = tabPanel.add({
					title: record.get("descr"),
					itemId: tabId,
					reference: tabId,
					iconCls:'x-fa fa-bars',
					layout:'fit',
					scrollable: true,
					closable: true,
					items:[{
						xtype:'submodule',
						itemId: gridId,
						stateId: 'subModuleStateId'+tabId,
						reference: 'tabgridsubmodule'+tabId,
						parentPanelRef: record,
						listeners: {
							afterrender: function (grid) {
								me.loadSubModuleStore(grid,record.get("id"));
							}
						}
					}]
				});
			}

		return tabPanel.setActiveTab(tab);
	},
	/**
	 * Create a new window popup
	 *
	 * @param view
	 * @param recIndex
	 * @param cellIndex
	 * @param item
	 * @param e
	 * @param record
	 */
	onAddSubmoduleGridClick:function (view, recIndex, cellIndex, item, e, record) {
		return this.addTabPanel(record);
	},
	/**
	 * Store module properties into the database table [update/add]
	 *
	 * @param button
	 */
	onModulePropertiesFormSubmit:function (button) {
		var me = this,
			view = me.getView(),
			form = me.lookupReference('modulePropertiesForm').getForm(),
			grid = view.xtype === "sysmodule" ? me.lookupReference( "tabgridmodule") : view,
			store = grid.getStore();

		console.log("view",view,"form",me.lookupReference('modulePropertiesForm'));

		if(form.isValid()){
			try {
				form.submit({
					headers : Helpers.apiPostHeaders(),
					url: 'api/system/module/properties/save',
					scope: this,
					method: 'POST',
					clientValidation:true,
					waitTitle: Translate.title( 'SavingData' ),
					waitMsg : Translate.label( 'PleaseWait' )+"...",
					clientValidation: true,
					success: function (form, action) {
						var response = action.response,
							obj = Ext.decode(response.responseText);
						//inform user
						Message.infoBox("Info", obj.message);
						//reload grid store
						store.reload();
					},
					failure: function (form, action) {
						var response = action.response,
							obj = Ext.decode(response.responseText);
						Message.infoBox("Error", obj.error.message);
					}
				});
			}  catch (exception) {
				Message.infoBox("Error",Translate.error("ReportAdmin"));
			}
		}else{
			Message.infoBox("Error",Translate.error("PleaseFillAllRequiredFields"));
		}
	},
	/**
	 * Close the module properties dialog window
	 *
	 * @param button
	 * @return {*}
	 */
	onModulePropertiesFormClose:function (button) {
		return  this.lookupReference("modulePropertiesFormWindow").close();
	},
	/**
	 * Delete Module Properties
	 *
	 * @param button
	 */
	onModulePropertiesFormDelete:function (button) {
		var me  = this,
			xtype = me.getView().getXType(),
			win = me.lookupReference("modulePropertiesFormWindow"),
			mId = win.down("#id").getValue(),
			store = xtype === 'sysmodule' ? win.up().down("#gridmodule").getStore() :  me.getView().getStore(),
			record = win.parentRecordRef;

		Ext.MessageBox.confirm({
			title: Translate.title('Delete')+ ' Module - Properties',
			msg: Translate.info( 'DeleteConfirmation'),
			buttons: Ext.MessageBox.OKCANCEL,
			scope: this,
			icon: Ext.MessageBox.QUESTION,
			fn: function(btn) {
				if (btn === 'ok') {
					mId ? me.doDeleteModuleProperties(store,win,mId) : Message.infoBox("Error",Translate.error("ReportAdmin"));
				}
			}
		});

	},
	/**
	 * Delete record from the module table
	 *
	 * @param view
	 * @param id
	 */
	doDeleteModuleProperties:function(store,win,id){
		try {
			win.mask(Translate.submit('PleaseWait')+"...");
			Ext.Ajax.request({
				headers : Helpers.apiHeaders(),
				method: "GET",
				url: '/api/system/module/properties/delete',
				params:{id:id},
				scope: this,
				success: function(response, opts) {
					var obj = Ext.JSON.decode(response.responseText);
					store.reload();
					Message.infoBox("info",obj.message);
					win.unmask();
					win.close();

				},
				failure: function(response) {
					Message.infoBox("Error",Translate.error("ReportAdmin"));
					win.unmask();
				}
			});

		}  catch (exception) {
			Message.infoBox("Error",Translate.error("ReportAdmin"));
			win.unmask();
		}
	},
	/**
	 * Create a Submodule
	 *
	 * @param button
	 * @return {*|void}
	 */
	onAddNewSubModuleClick:function(button){
		var me = this,
			view = me.getView(),
			data = view.parentPanelRef;
		return this.createSubModuleDialogWindow(data.getData(),false);
	},
	/**
	 * Edit / Update Submodule Properties
	 *
	 * @param view
	 * @param recIndex
	 * @param cellIndex
	 * @param item
	 * @param e
	 * @param record
	 * @return {*|void}
	 */
	onEditSubmoduleGridClick:function (view, recIndex, cellIndex, item, e, record) {
		var me = this,
			tabView = me.getView(),
			data = tabView.parentPanelRef;
		return this.createSubModuleDialogWindow(data.getData(),record);
	},
	/**
	 * Reload submodule store
	 *
	 * @param button
	 */
	onReloadSubModuleClick:function (button) {
		var me = this,
			view = me.getView();
			store = view.getStore();
			store.reload();
	},
	/**
	 * Save Submodule data
	 *
	 * @param button
	 */
	onSubModuleFormSubmit:function (button) {
		var me = this,
			view = me.getView(),
			record = view.parentPanelRef,
			store = view.getStore();
		form = me.lookupReference('windowSubModuleForm').getForm();
		//check if form is valid
		if(form.isValid()){
			try {
				form.submit({
					headers : Helpers.apiPostHeaders(),
					url: 'api/system/submodule/save',
					scope: this,
					method: 'POST',
					params:{
						modcode : record.id
					},
					clientValidation:true,
					waitTitle: Translate.title( 'SavingData' ),
					waitMsg : Translate.label( 'PleaseWait' )+"...",
					clientValidation: true,
					success: function (form, action) {
						var response = action.response,
							obj = Ext.decode(response.responseText);
						//inform user
						Message.infoBox("Info", obj.message);
						//clear form
						obj.update === true ? false : form.reset();
						//reload grid store
						store.reload();
					},
					failure: function (form, action) {
						var response = action.response,
							obj = Ext.decode(response.responseText);
						Message.infoBox("Error", obj.error.message);
					}
				});
			}  catch (exception) {
				Message.infoBox("Error",Translate.error("ReportAdmin"));
			}
		}else{
			Message.infoBox("Error",Translate.error("PleaseFillAllRequiredFields"));
		}
	},
	/**
	 * Edit Module Properties
	 *
	 * @param view
	 * @param recIndex
	 * @param cellIndex
	 * @param item
	 * @param e
	 * @param record
	 * @return {*|void}
	 */
	onSubModulePropertiesGridClick:function (view, recIndex, cellIndex, item, e, record) {
		return this.createSubModulePropertiesWindow(record);
	},
	/**
	 * On Submodule Delete Button click, show the messagebox comfirm
	 *
	 * @param view
	 * @param recIndex
	 * @param cellIndex
	 * @param item
	 * @param e
	 * @param record
	 * @return {*|void}
	 */
	onDeleteSubModuleGridClick:function  (view, recIndex, cellIndex, item, e, record) {
		var me = this;

		Ext.MessageBox.confirm({
			title: Translate.title('Delete')+ ' Module',
			msg: Translate.info( 'DeleteConfirmation'),
			buttons: Ext.MessageBox.OKCANCEL,
			scope: this,
			icon: Ext.MessageBox.QUESTION,
			fn: function(btn) {
				if (btn === 'ok') {
					record.get('id') ? me.doDeleteSubModule(view,record.get('id')) : Message.infoBox("Error",Translate.error("ReportAdmin"));
				}
			}
		});
	},
	/**
	 * Delete item from the submodule table
	 *
	 * @param view
	 * @param id
	 */
	doDeleteSubModule:function(view,id){
		var store = view.getStore();
		view.mask(Translate.submit('PleaseWait')+"...");
		try {
			Ext.Ajax.request({
				headers : Helpers.apiHeaders(),
				method: "GET",
				url: '/api/system/submodule/delete',
				params:{id:id},
				scope: this,
				success: function(response, opts) {
					var obj = Ext.JSON.decode(response.responseText);
					store.reload();
					Message.infoBox("info",obj.message);
					view.unmask();
				},
				failure: function(response) {
					Message.infoBox("Error",Translate.error("ReportAdmin"));
					view.unmask();
				}
			});

		}  catch (exception) {
			Message.infoBox("Error",Translate.error("ReportAdmin"));
			view.unmask();
		}
	},

});
