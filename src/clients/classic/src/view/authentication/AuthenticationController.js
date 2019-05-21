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
            try {
                view.mask(Translate.submit('PleaseWait')+"...");
                form.submit({
                        url: '/api/crm/login',
                        scope: this,
                        method:'POST',
                        clientValidation:true,
                        success: function(form,action) {
                            var response = action.response,
                                status = response.statusText,
                                obj = action.result,
                                fullname = obj.user,
                                token = obj.token,
                                data = obj.data,
                                success = obj.success;
                            if(status === 'OK' && success){
                                ExtStorage.setItem("tokens", token);
                                ExtStorage.setItem("profile", JSON.stringify(data));
                                Message.infoBox("Info", Translate.label( "Wellcome") + " - "+fullname ,Ext.MessageBox.INFO);
                                ExtStorage.isExists(ExtStorage.getItem("profile"))  ? window.location.href = "/user/#dashboard" : false ;
                                view.unmask();
                            }
                        },
                        failure: function(form,action) {
                            var response = action.response,
                                obj = Ext.decode(response.responseText),
                                message = obj.error.message;
                                Message.infoBox("Error",message);
                                view.unmask();
                        }
                });

            } catch (exception) {
                Message.infoBox("Error",Translate.error("ReportAdmin"));
            }
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
            try {
                view.mask(Translate.submit('PleaseWait')+"...");
                form.submit({
                    url: 'api/crm/changepassword',
                    scope: this,
                    method: 'POST',
                    clientValidation: true,
                    success: function (form, action) {
                        var response = action.response,
                            status = response.statusText,
                            obj = action.result,
                            token = obj.token,
                            data = obj.data;
                        if (obj.success) {
                            ExtStorage.setItem("tokens", token.accessToken);
                            ExtStorage.setItem("profile", JSON.stringify(data));
                            Message.infoBox("Info",obj.msg);
                            ExtStorage.isExists(ExtStorage.getItem("profile"))  ? window.location.href = "/user/#dashboard" : false ;
                            view.unmask();
                         }
                    },
                    failure: function (form, action) {
                        var response = action.response,
                            obj = Ext.decode(response.responseText);
                        Message.infoBox("Error", obj.error.message);
                        view.unmask();
                    }
                });
            } catch (exception) {
                Message.infoBox("Error",Translate.error("ReportAdmin"));
            }
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
            try {
                view.mask(Translate.submit('PleaseWait')+"...");
                form.submit({
                    url: 'api/crm/resetpassword',
                    scope: this,
                    method: 'POST',
                    clientValidation: true,
                    success: function (form, action) {
                        var response = action.response,
                            status = response.statusText,
                            obj = action.result;
                        //if the status OK
                        status === 'OK' && obj.success ? Message.infoBox("Info", obj.msg) : "";
                        view.unmask();
                    },
                    failure: function (form, action) {
                        var response = action.response,
                            obj = Ext.decode(response.responseText);
                        Message.infoBox("Error", obj.error.message);
                        view.unmask();
                    }
                });
            } catch (exception) {
                Message.infoBox("Error",Translate.error("ReportAdmin"));
            }
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
    /**
     * Change user application language
     *
     * @param element
     */
    onLanguageChange:function(element){
        var me = this,
            view = this.getView();
        try {
            //mask the view
            view.mask(Translate.submit('PleaseWait')+"...");
            Ext.Ajax.request({
                method: "GET",
                url: "/setlang",
                async: true,
                params:{lang:element.getItemId()},
                // wait for completion!!
                disableCaching: true,
                scope: this,
                success: function(response, opts) {
                    var obj = Ext.JSON.decode(response.responseText),title;
                    title = obj.success ? "Info" : "Error" ;
                    ExtStorage.clear();
                    ExtStorage.setItem("locale", element.getItemId());
                    ExtStorage.setItem("languages", JSON.stringify(obj.datalang));
                    Message.infoBox(title,obj.message);
                    ExtStorage.isExists("languages") ? window.location.href = "/user/#login" : false;
                    view.unmask();
                },
                failure: function(response) {
                    Message.infoBox("Error",Translate.error("ReportAdmin"));
                    view.unmask();
                }
            });
        } catch (exception) {
            Message.infoBox("Error",Translate.error("ReportAdmin"));
        }
    }
});