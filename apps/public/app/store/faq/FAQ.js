Ext.define('Docucrm.store.faq.FAQ', {
    extend: 'Ext.data.Store',
    alias: 'store.faq',

    model: 'Docucrm.model.faq.Category',

    proxy: {
        type: 'api',
        url: '~api/faq/faq'
    }
});
