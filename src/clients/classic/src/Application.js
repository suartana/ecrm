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
    launch: function () {
        var me = this,
            route = window.route;
        // If the user not loggedin, we display the login window,
        // otherwise, we display the main view
        if(route !== 'reset' && Helpers.apiTokens() ) {
            Ext.Ajax.request({
                headers: Helpers.apiHeaders(),
                url: '/api/users/status',
                scope: this,
                method: 'GET',
                success: function (response) {
                    var obj = Ext.decode(response.responseText),
                        cardView = obj.data.id && obj.success && obj.data.emp ? true : false;
                    localStorage.setItem("profile", JSON.stringify(obj.data));
                    me.redirectTo(cardView ? "dasboard" : "login",true);
                },
                failure: function (response) {
                    Helpers.removeTokens();
                    me.setMainView('Docucrm.view.authentication.Login');
                    me.redirectTo('login', true);
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
