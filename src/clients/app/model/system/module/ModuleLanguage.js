Ext.define('Docucrm.model.system.module.ModuleLanguage', {
	extend: 'Docucrm.model.Base',
	alias:'model.modulelang',
	fields: [
		{
			name: 'id',
			type: 'int'
		},
		{
			name: 'code',
			type: 'string'
		},
		{
			name: 'name',
			type: 'string'
		}
	]
});
