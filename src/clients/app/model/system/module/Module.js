Ext.define('Docucrm.model.system.module.Module', {
	extend: 'Docucrm.model.Base',
	alias:'model.modules',
	fields: [
		{
			name: 'id',
			type: 'int'
		},
		{
			name: 'transtext',
			type: 'string'
		},
		{
			name: 'descr',
			type: 'string'
		},
		{
			name: 'seq',
			type: 'int'
		},
		{
			name: 'locale',
			type: 'string'
		},
		{
			name: 'lang',
			type: 'string'
		},
		{
			name: 'created_at',
			type: 'date'
		},
		{
			name: 'createdby',
			type: 'string'
		},
		{
			name: 'updatedby',
			type: 'string'
		},
		{
			name: 'languages'
		},
		{
			name: 'properties'
		}

	]
});
