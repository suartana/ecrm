/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Docucrm.Application', {
    extend: 'Ext.app.Application',

    name: 'Docucrm',

    defaultToken : 'dashboard',

    mainView: 'Docucrm.view.main.Main',

    profiles: [
        'Phone',
        'Tablet'
    ],

    stores: [
        'NavigationTree'
    ]
});
