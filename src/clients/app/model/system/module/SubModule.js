Ext.define('Docucrm.model.system.module.SubModule', {
	extend: 'Docucrm.model.Base',
	alias:'model.submodules',
	fields: [
		{
			name: 'id',
			type: 'int'
		},
		{
			name: 'modcode',
			type: 'int'
		},
		{
			name: 'code',
			type: 'int'
		},
		{
			name: 'transtext',
			type: 'string'
		},
		{
			name: 'moduletranstext',
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
		}

	]
});
