Ext.define('Docucrm.view.charts.Charts', {
    extend: 'Ext.container.Container',
    xtype: 'charts',

    requires: [
        'Docucrm.view.charts.Area',
        'Docucrm.view.charts.Bar',
        'Docucrm.view.charts.ChartsModel',
        'Docucrm.view.charts.Gauge',
        'Docucrm.view.charts.Pie3D',
        'Docucrm.view.charts.Polar',
        'Docucrm.view.charts.Stacked',
        'Ext.ux.layout.ResponsiveColumn'
    ],

    viewModel: {
        type: 'charts'
    },

    layout: 'responsivecolumn',

    defaults: {
        defaults: {
            animation : !Ext.isIE9m && Ext.os.is.Desktop
        }
    },

    items: [
        {
            xtype: 'chartsareapanel',
            userCls: 'big-50 small-100'
        },
        {
            xtype: 'chartspie3dpanel',
            userCls: 'big-50 small-100'
        },
        {
            xtype: 'chartspolarpanel',
            userCls: 'big-50 small-100'
        },
        {
            xtype: 'chartsstackedpanel',
            userCls: 'big-50 small-100'
        },
        {
            xtype: 'chartsbarpanel',
            userCls: 'big-50 small-100'
        },
        {
            xtype: 'chartsgaugepanel',
            userCls: 'big-50 small-100'
        }
    ]
});
