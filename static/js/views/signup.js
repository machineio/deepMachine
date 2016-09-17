fun.views.signup = Backbone.View.extend({

    /*
     * Bind the events functions to the different HTML elements
     */
    events : {
        'click #login-btn': 'login',
        'click #signup-btn': 'signup'
        'click #about-btn': 'about'
    },
    
    /*
     * Class constructor
     */
    initialize : function(options) {
        fun.containers.signup = this.$el;
    },
    
    /*
     * Renders the signup view
     */
    render : function(){
        'use strict';
        var template;
        if (!this.$el.html()){
            $.getScript( "/static/js/scripts.js", function(data,textStatus,jqxhr){});
            template = _.template(fun.utils.getTemplate(fun.conf.templates.signup));
            this.$el.html(template);
            $.getScript( "/static/js/scripts.js", function(data,textStatus,jqxhr){});
            fun.utils.templateStart();
            fun.utils.startSlider();

            // Cache the DOM stuff
            this.signupError = this.$('#signup-alert');
            // Form inputs
            this.account = this.$('#signup_username');
            this.newAccount = this.account;
            this.email = this.$('#signup_email');
            this.password = this.$('#signup_password');
            this.confirmPassword = this.$('#signup_confirm_password');
        }
        this.$el.removeClass("hide").addClass("show");
    },
    
    /*
     * login event
     */
    login: function() {
        window.location = fun.conf.hash.login;
    },
    
    /*
     * signup event
     */
    signup: function(event){
        'use strict';
        var signupError,
            account,
            password,
            confirmPassword,
            email,
            view,
            rules,
            validationRules,
            callbacks,
            validForm;
        event.preventDefault();
        signupError = this.signupError;
        account = $('#signup-account').val();
        password = $('#signup-password').val();
        confirmPassword = password;
        email = $('#signup-email').val();
        console.log('OVER HERE 2!!!!',account,password,confirmPassword, email);
        if(fun.utils.validateFormHome('signup',{username:account,password:password,email:email})){
            // check if this view stuff is really needed
            view = this;
            
            // new user account callbacks
            callbacks = {
                success: function(){
                    // Clear the stuff from the inputs ;)
                    view.$('#signup_username').val('');
                    view.$('#signup_email').val('');
                    view.$('#signup_password').val('');
                    view.$('#signup_confirm_password').val('');
                    signupError.hide();
                    // login the created user
                    fun.utils.login(account, password,
                        {
                            success : function(xhr, status){
                                fun.utils.redirect(fun.conf.hash.profile);
                            },
                            error : function(xhr, status, error){
                                switch(xhr.status) {
                                    case 403:
                                        var message = fun.utils.translate("usernameOrPasswordError");
                                        signupError.find('p').html(message);
                                        signupError.removeClass("hide").addClass("show");
                                        break;
                                    case 200:
                                        // Check browser support
                                        if (typeof(Storage) != "undefined") {
                                            // Store
                                            localStorage.setItem("username", account);
                                        }
                                        fun.utils.redirect(fun.conf.hash.login);
                                        break;
                                    default:
                                        console.log('the monkey is down');
                                        break;
                                }
                            }
                        }
                    );
                },

                error: function(model, error){
                    // Catch duplicate errors or some random stuff
                    signupError.removeClass("hide").addClass("show");
                    // TODO: on error add class error and label to the input field
                    if (error.responseText.indexOf('account') != -1){
                        signupError.find('p').html('Username is already taken.');
                    }
                    else if (error.responseText.indexOf('email') != -1){
                        signupError.find('p').html('Email is invalid or already taken.');
                    }
                    else {
                        signupError.find('p').html('what daa!?');
                    }
                }
            };
            this.model = new fun.models.Account();
            this.model.save(
                {
                    account: account,
                    password: password,
                    email: email
                },
                callbacks
            );
        }
    }
});