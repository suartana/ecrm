/**
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 *
 * @author <gede.suartana> gede.suartana@docu.ch
 * @version $i
 */
Ext.define('Docucrm.Application', {
    extend: 'Ext.app.Application',
    name: 'Docucrm',
    stores: [
        'NavigationTree'
    ],
    defaultToken : 'dashboard',
    mainView: Helpers.appMainView(),
    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
