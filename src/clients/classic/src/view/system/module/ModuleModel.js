Ext.define('Docucrm.view.system.module.ModuleModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.modulelist',
	stores: {
		allModules: {
			type: 'modulestore'
		},
		subModules:{
			type: 'submodulestore'
		},
		detailModule: ""
	}
});
