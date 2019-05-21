/*
 * This file is responsible for launching the application. Application logic should be
 * placed in the Docucrm.Application class.
 */
//Make sure strict mode is on
'use strict';
Ext.application({
    name: 'Docucrm',

    extend: 'Docucrm.Application',

    // Simply require all classes in the application. This is sufficient to ensure
    // that all Docucrm classes will be included in the application build. If classes
    // have specific requirements on each other, you may need to still require them
    // explicitly.
    //
    requires: [
        'Docucrm.*'
    ],
    launch: function () {
        var file = '/ext/classic/locale/overrides/'+window.locale +'/ext-locale-'+window.locale +'.js';
        Ext.Loader.loadScript({
            url: Ext.util.Format.format(file),
            scope: this
        });
    },
});
