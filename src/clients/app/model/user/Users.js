Ext.define('Docucrm.model.user.Users', {
    extend: 'Docucrm.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'fullname',
            convert: function(v, rec) {
                return rec.get('firstname') + ' ' + rec.get('lastname');
            }
        },
        {
            type: 'string',
            name: 'firstname'
        },
        {
            type: 'string',
            name: 'lastname'
        },
        {
            type: 'string',
            name: 'email'
        },
        {
            name: 'occupation_str'
        },
        {
            type: 'date',
            name: 'lastlogin'
        },
        {
            type: 'int',
            name: 'status'
        },
        {
            name: 'userlang'
        }
    ]
});
