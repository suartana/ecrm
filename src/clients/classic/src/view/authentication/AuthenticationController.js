Ext.define('Docucrm.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',
    /**
     * Login user via auth-api
     * If user login success, write locale storage with token parameter
     * Token is needed during the api connection
     *
     * @param button
     */
    onLoginButton: function(button) {
        var view = this.getView(),
            form = view.getForm();
        //form is valid ?
        if(form.isValid()){
            form.submit({
                url: '/api/crm/login',
                scope: this,
                method:'POST',
                clientValidation:true,
                waitTitle: Docucrm.util.Translate.label( 'Login' )+"...",
                waitMsg : "<span class='waitmsg'>"+Docucrm.util.Translate.label( 'Please wait' )+"...<span>",
                bodyStyle: 'background:#FFFFFF;',
                success: function(form,action) { console.log("action",action);
                    var response = action.response,
                        status = response.statusText,
                        obj = action.result,
                        fullname = obj.user.emp,
                        token = obj.token,
                        success = obj.success;

                    if(status === 'OK' && success){
                        localStorage.setItem("tokens", token);
                        Docucrm.util.Translate.infoBox("Info", Docucrm.util.Translate.label( "Wellcome ") + " - "+fullname ,Ext.MessageBox.INFO);
                        window.location.href = "/user/#dashboard";
                    }
                },
                failure: function(form,action) {
                    var response = action.response,
                        obj = Ext.decode(response.responseText),
                        message = obj.error.message;
                        Docucrm.util.Translate.infoBox("Error",message);
                }
            });
        }else{
            Docucrm.util.Translate.infoBox("Error","Invalid Username or Password!!");
        }
    },

    onLoginAsButton: function() {
        this.redirectTo('login', true);
    },

    onNewAccount: function() {
        this.redirectTo('register', true);
    },

    onSignupClick: function() {
        this.redirectTo('dashboard', true);
    },
    /**
     * On reset button clicked
     * Resset the password via api
     *
     * @param {element} [button]
     */
    onResetClick: function(button) {
        //set vars
        var view = this.getView(),
            email = view.down("#email").getValue(),
            form = view.getForm(),
            message;
        //is an email
        if(email) {
            form.submit({
                url: 'api/crm/resetpassword',
                scope: this,
                method: 'POST',
                clientValidation: true,
                waitTitle: Docucrm.util.Translate.label('Resetting the Password'),
                waitMsg: "<span class='waitmsg'>" + Docucrm.util.Translate.label('Please wait') + "...<span>",
                bodyStyle: 'background:#FFFFFF;',
                success: function (form, action) {
                    var response = action.response,
                        status = response.statusText,
                        obj = action.result;

                    if (status === 'OK' && obj.success) {
                        message = Docucrm.util.Translate.message(obj.msg);
                        Docucrm.util.Translate.infoBox("Info", message);
                    }
                },
                failure: function (form, action) {
                    var response = action.response,
                        obj = Ext.decode(response.responseText),
                        message = obj.error.message;
                        Docucrm.util.Translate.infoBox("Error", message);
                }
            });
        }else{
            message = Docucrm.util.Translate.html("<b>Es ist ein fehler aufgetreten. bitte versuche es noch einmal</b>");
            Docucrm.util.Translate.infoBox("Error", message);
        }
    },
    forgetPasswordWindow:  function() {

        Ext.create({
            xtype:'passwordreset'
        });
    },
    loginWindow: function() {
        Ext.create({
            xtype:'login'
        });
    },
    validateField: function(field) {
        field.next().validate();
    },
});