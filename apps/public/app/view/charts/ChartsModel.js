Ext.define('Docucrm.view.charts.ChartsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.charts',

    stores: {
        barData: {
            model: 'Docucrm.model.DataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/marketshare/oneyear'
            }
        },

        stackedData: {
            model: 'Docucrm.model.MultiDataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/marketshare/multiyear'
            }
        },

        gaugeData: {
            data: [
                {
                    position: 40
                }
            ],

            fields: [
                {
                    name: 'position'
                }
            ]
        },

        radialData: {
            model: 'Docucrm.model.DataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/radial'
            }
        },

        lineData: {
            model: 'Docucrm.model.DataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/marketshare/oneentity'
            }
        },

        pieData: {
            model: 'Docucrm.model.DataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/pie'
            }
        },

        areaData: {
            model: 'Docucrm.model.MultiDataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/dashboard/full'
            }
        }
    }
});
