/**
 * @version    	$Id: LockingWindow.js gsuartana $
 * @copyright  	Copyright (c) 2019 by Docu Media Schweiz GmbH, Switzerland
 *
 * @class
 * This class provides the modal Ext.Window support for all Authentication forms.
 * It's layout is structured to center any Authentication dialog within it's center,
 * and provides a backGround image during such operations.
 *
 * @author  Gede Suartana <gede.suartana@reussprivate.com>
 */
Ext.define('Docucrm.view.authentication.LockingWindow', {
    extend: 'Ext.window.Window',
    xtype: 'lockingwindow',

    requires: [
        'Docucrm.view.authentication.AuthenticationController',
        'Ext.layout.container.VBox'
    ],

    cls: 'auth-locked-window',
    closable: false,
    resizable: false,
    autoShow: true,
    titleAlign: 'center',
    maximized: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    controller: 'authentication'
});
