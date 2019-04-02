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
    init:function(application){
        console.log("route",window.route);
        console.log("params",window.params);
    },
    mainView: Docucrm.util.Helpers.appMainView(),
    launch: function () {
        var me = this,
            route = window.route;
        // If the user not loggedin, we display the login window,
        // otherwise, we display the main view
        console.log("route",route);
        if(route !== 'reset' && Docucrm.util.Helpers.apiTokens() ) {
            Ext.Ajax.request({
                headers: Docucrm.util.Helpers.apiHeaders(),
                url: '/api/userinfo',
                scope: this,
                method: 'GET',
                success: function (response) {
                    var obj = Ext.decode(response.responseText),
                        cardView = obj.status.api_token && obj.success && obj.status.emp ? true : false;
                    me.redirectTo(cardView ? "#dasboard" : "#login");
                },
                failure: function (response) {
                    me.setMainView('Docucrm.view.authentication.Login');
                }
            });
        }
    },
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
