/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Docucrm.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    stores:{
        user:{
            type:'userstore'
        }
    },
    data: {
        name: 'Docucrm',
        currentView: null,
        fullname:null,
        profile:null,
        profileimagepath:null,
        gender:null,
        isAdminBackend: false,
    },
    formulas: {
        profile:{
            get:function (get) {
                return this.getData();
            }
        },
        profileimagepath:{
            get:function () {
                return "/storage/images/"+this.getData().img;
            }
        },
        fullname:{
            get:function () {
                var data = this.getData(),
                    fname = data.firstname;
                return fname.substring(0, 1) + ". " + data.lastname;
            }
        },
        gender:function () {
            var data = this.getData();

            return data.anrede === 1 ? '' : '' ;
        }
    },
    getData(){
        return JSON.parse(localStorage.getItem("profile"));
    }
});
