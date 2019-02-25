Ext.define('Docucrm.model.ChatMessages', {
    extend: 'Docucrm.model.Base',

    fields: [
        {
            type: 'string',
            name: 'message'
        },
        {
            type: 'string',
            defaultValue: 'user',
            name: 'sender'
        }
    ]
});
