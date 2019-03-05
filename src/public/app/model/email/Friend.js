Ext.define('Docucrm.model.email.Friend', {
    extend: 'Docucrm.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'name'
        },
        {
            type: 'string',
            name: 'thumbnail'
        },
        {
            type: 'boolean',
            name: 'online'
        }
    ]
});
