/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Docucrm.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'Docucrm',
        currentView: null,
        fullname:"G Su",
        profile:null,
        profileimagepath:null,
        gender:null,
        isAdminBackend: false,
    },
    formulas: {
        profile:{
            get:function (get) {
                return this.getData() ? this.getData() : false;
            }
        },
        profileimagepath:{
            get:function () {
                var data = this.getData(),
                    path = '/storage/images/',
                    defImg = data.anrede === '1' ? 'man.png' : 'woman.png';
                return data.img ? path+data.img : path+defImg;
            }
        },
        fullname:{
            get:function () {
                var data = this.getData(),
                    fname = data ?  data.firstname : "";
                return data ? fname.substring(0, 1) + ". " + data.lastname : "";
            }
        },
        gender:function () {
            var data = this.getData() ? this.getData().anrede : "";
            return data === '1' ? 'm' : 'w' ;
        }
    },
    getData(){
        return ExtStorage.getItem("profile") ? JSON.parse(ExtStorage.getItem("profile")) : false;
    }
});
