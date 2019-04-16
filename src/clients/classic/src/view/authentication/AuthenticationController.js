Ext.define('Docucrm.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',
    alternateClassName: ['AuthenticationController'],
    /**
     * Login user via auth-api
     * If user login success, write locale storage with token parameter
     * Token is needed during the api connection
     *
     * @param button
     */
    onLoginButtonClick: function(button) {
        var view = this.getView(),
            form = view.getForm();
        //form is valid ?
        if(form.isValid()){
            form.submit({
                url: '/api/crm/login',
                scope: this,
                method:'POST',
                clientValidation:true,
                waitTitle: Translate.label( 'Login' )+"...",
                waitMsg : "<span class='waitmsg'>"+ Translate.label( 'Please wait' )+"...<span>",
                bodyStyle: 'background:#FFFFFF;',
                success: function(form,action) {
                    var response = action.response,
                        status = response.statusText,
                        obj = action.result,
                        fullname = obj.user,
                        token = obj.token,
                        success = obj.success;

                    if(status === 'OK' && success){
                        localStorage.setItem("tokens", token);
                        Message.infoBox("Info", Translate.label( "Wellcome ") + " - "+fullname ,Ext.MessageBox.INFO);
                        window.location.href = "/user/#dashboard";
                    }
                },
                failure: function(form,action) {
                    var response = action.response,
                        obj = Ext.decode(response.responseText),
                        message = obj.error.message;
                        Message.infoBox("Error",message);
                }
            });
        }else{
            Message.infoBox("Error","Invalid Username or Password!!");
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
     * Create new password
     *
     * @param button
     */
    onChangePasswordButtonClick:function(button){
        //set vars
        var view = this.getView(),
            form = view.getForm(),
            message;
        //is an email
        if(form.isValid()) {
            form.submit({
                url: 'api/crm/changepassword',
                scope: this,
                method: 'POST',
                clientValidation: true,
                waitTitle: Translate.label('Change Password'),
                waitMsg: "<span class='waitmsg'>" + Translate.label('Please wait') + "...<span>",
                bodyStyle: 'background:#FFFFFF;',
                success: function (form, action) {
                    var response = action.response,
                        status = response.statusText,
                        obj = action.result;

                    if (status === 'OK' && obj.success) {
                        Message.infoBox("Info", Translate.message(obj.msg));
                        window.location.href = "/user/#login";
                    }
                },
                failure: function (form, action) {
                    var response = action.response,
                        obj = Ext.decode(response.responseText);
                    Message.infoBox("Error", obj.error.message);
                }
            });
        }else{
            Message.infoBox("Error", Translate.message("Something went wrong please try again"));
        }
    },
    /**
     * On reset button clicked
     * Resset the password via api
     *
     * @param {element} [button]
     */
    onResetButtonClick: function(button) {
        //set vars
        var view = this.getView(),
            form = view.getForm();

        //validation
        if(form.isValid()) {
            form.submit({
                url: 'api/crm/resetpassword',
                scope: this,
                method: 'POST',
                clientValidation: true,
                waitTitle: Translate.label('Resetting the Password'),
                waitMsg: "<span class='waitmsg'>" + Translate.label('Please wait') + "...<span>",
                bodyStyle: 'background:#FFFFFF;',
                success: function (form, action) {
                    var response = action.response,
                        status = response.statusText,
                        obj = action.result;
                    //if the status OK
                    status === 'OK' && obj.success ? Message.infoBox("Info", Translate.message(obj.msg)) : "";
                },
                failure: function (form, action) {
                    var response = action.response,
                        obj = Ext.decode(response.responseText);

                    Message.infoBox("Error", obj.error.message);
                }
            });
        }else{
            Message.infoBox("Error", Translate.html("Something went wrong please try again"));
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
    onLanguageChange:function(element){
        console.log("lang",element.getItemId());
        var me = this;
        Ext.Ajax.request({
            method: "GET",
            url: "/setlang",
            async: false,
            params:{lang:element.getItemId()},
            // wait for completion!!
            disableCaching: true,
            scope: this,
            success: function(response, opts) {
                var obj = Ext.JSON.decode(response.responseText),title;
               console.log("obj",obj);
               title = obj.success ? "Info" : "Error" ;
               Message.infoBox(title,obj.message);
            },
            failure: function(response) {
                Message.infoBox("Error","Something went wrong, Please contact your administrator.");
            }
        });
    }
});