Ext.define('Docucrm.model.Subscription', {
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
            name: 'subscription'
        }
    ]
});
