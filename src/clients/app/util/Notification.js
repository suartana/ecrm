/**
 * @version    	$Id: Notification.js gsuartana $
 * @class
 * A collection of tools and functions used in various places in Docucrm
 *
 * @author 		Gede Suartana <gede.suartana@docu.ch>
 */
Ext.define('Docucrm.util.Notification', {
	extend: 'Ext.window.Toast',
	xtype: 'toast',
	tpl: '<span>{message}</span><br><span>{data}</span>',
	align: 'tr',
	width: 350,
	cls:'ux-notification-light',
	bodyStyle: {
		background: '#ffc',
		padding: '10 10',
	},
	config: {
		message: '',
		title: '',
		someData: []
	},

	initComponent: function() {
		var me = this;

		me.callParent();

		me.setData({
			message: me.getMessage(),
			data: me.getSomeData()
		});
	}
});

