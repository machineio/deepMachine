fun.views.about = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {
        'click #about-signup-btn': 'signup',
        'click #about-signin-btn': 'signin',
        'click #makeSubscribeButton' : 'makeSubscription'
    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.about = this.$el;
    },
    
    /*
    * Render the about view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.about));
            this.$el.html(template);
            $.getScript( "/static/js/scripts.js", function(data,textStatus,jqxhr){});
            this.signupError = this.$('#about-alert');
            // Form inputs
            this.account = this.$('#about_username');
            this.newAccount = this.account;
            this.email = this.$('#about_email');
            this.password = this.$('#about_password');
            fun.utils.templateStart();
            fun.utils.startSlider();
        }
        this.$el.removeClass("hide").addClass("show");
    },

    signin: function(event){
        'use strict';
        event.preventDefault();
        fun.utils.redirect(fun.conf.hash.login);
    
    },

    signup: function(event){
        'use strict';
        var signupError,
            account,
            password,
            location = window.location.hostname,
            email,
            view,
            rules,
            validationRules,
            callbacks,
            validForm;
        event.preventDefault();
        signupError = this.signupError;
        account = this.account.val();
        password = this.password.val();
        email = this.email.val();
        // check if this view stuff is really needed
        view = this;
        // form validation rules
        rules = {
            rules: {
                about_username: {
                    minlength: 2,
                    required: true
                },
                about_email: {
                    required: true,
                    email: true
                },
                about_password: {
                    minlength: 8,
                    required: true
                }
            }
        }
        validationRules = $.extend(rules, fun.utils.validationRules);
        $('#about-signup-form').validate(validationRules);
        // new user account callbacks
        callbacks = {
            success: function(){
                // Clear the stuff from the inputs ;)
                view.$('#about_username').val('');
                view.$('#about_email').val('');
                view.$('#about_password').val('');
                signupError.hide();
                // login the created user
                fun.utils.login(account, password,
                    {
                        success : function(xhr, status){

                            // currently this success call is never executed
                            // the success stuff is going on case 200 of the error function.
                            // Why? well... I really don't fucking know...

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

        // check for a valid form and create the new user account
        validForm = $('#about-signup-form').valid();
        if (validForm){
            //event.preventDefault();
            this.model = new fun.models.Account();
            this.model.save(
                {
                    account: account,
                    password: password,
                    email: email,

                    // here we put the location from where this user is made.
                    location:location,
                },
                callbacks
            );
        }
    },

    makeSubscription: function(event){
        'use strict';
        event.preventDefault();
        var name,lastname,title,description,label,taskModel,task;
        var fullname = $('#subscribe-name-input').val();
        var email = $('#subscribe-email-input').val();

        if(fullname.split(' ')[0]){
            name = $scope.viewdata.fullname.split(' ')[0].capitalizeFirstLetter();
        } else {
            name = '';
        }

        if(fullname.split(' ')[1] && fullname.split(' ')[2]){
            lastname = fullname.split(' ')[1].capitalizeFirstLetter() + fullname.split(' ')[2];
        } else {
            lastname = '';
        }

        taskModel = {
            first_name: name,
            last_name: lastname,
            title: 'Subscription',
            description: fullname + ' - ' + email,
            label: 'deepmachine',
            email: email,
        };
        console.log('SAVING TASK!!!!',taskModel);

        task = new fun.models.Task(taskModel);
        task.save();

        swal('Thank you!','Please check your email for more info','success');

    },

    subscribe: function(event){
        'use strict';
        event.preventDefault();
        var email = this.$('#subscribe-email').val();
        fun.utils.subscribe(email, {
            success : function(jqXHR, textStatus){
                this.$('#subscribe-email').val('');
            },
            error : function(jqXHR, textStatus, errorThrown) {
                console.log('subscribe error');
            }
        });
    }

});