Ext.define('Docucrm.model.faq.Category', {
    extend: 'Docucrm.model.Base',

    fields: [
        {
            type: 'string',
            name: 'name'
        }
    ],

    hasMany: {
        name: 'questions',
        model: 'faq.Question'
    }
});
