fun.views.about = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {
        'click #call-now': 'callNow',
        'click #one-month-signup': 'signupOneMonths',
        'click #three-months-signup': 'signupThreeMonths',
        'click #one-year-signup': 'signupOneYear',
        'click #about-signup-btn': 'signup',
        'click #about-signin-btn': 'signin',
        'click #makeSubscribeButton' : 'makeSubscription',
        'click #selectDiners': 'selectDiners',
        'click #selectMC': 'selectMasterCard',
        'click #selectAmerican': 'selectAmericanExpress',
        'click #selectVisa': 'selectVisa',
        'click #selectDiscover': 'selectDiscover',
        'click .cancel': 'cancelPayment',
        'click #success-continue': 'successContinue',
        'click #close-continue': 'closeContinue',
        'click #diners-pay-btn': 'payDiners',
        'click #discover-pay-btn': 'payDiscover',
        'click #master-pay-btn': 'payMaster',
        'click #visa-pay-btn': 'payVisa',
        'click #amex-pay-btn': 'payAmex',
        'click #my-account-btn': 'showMembership'
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

        if(fun.utils.loggedIn()){
            $('#logoutWrapper').removeClass('hide').addClass('show');
            $('#loginSignupWrapper').removeClass('show').addClass('hide');

            $('#my-account-btn').html(localStorage.getItem("username"));

            /*var order = sessionStorage.getItem("order");

            if(order === 'one-month'){
                $('#processOrder').modal('show');
                $('#current-order').html('$44.95');
            } 

            else if(order === 'three-months'){
                $('#processOrder').modal('show');
                $('#current-order').html('$119.97');
            }

            else if(order === 'one-year'){
                $('#processOrder').modal('show');
                $('#current-order').html('$399.99');
            }

            else {
                console.log('no orders');
            }*/

        } else {
            console.log("we're outside the techsupport site, please login or select your order");
        }
        this.$el.removeClass("hide").addClass("show");
        fun.utils.renderBlogTrainning();
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

    showMembership: function(event){
        console.log('show membership');
        //$('#memberInfo').modal({'show':true, 'backdrop': false, 'keyboard': false});
    },

    signupOneMonths: function(event){
        console.log('testing one month with chuma');
        sessionStorage.setItem("order", 'one-month');
        $('#packagesModal').on('hidden.bs.modal', function(e){
            $('#current-order').html('$44.95');
            $('#processOrder').modal({'show':true, 'backdrop': false, 'keyboard': false});
        });
        $('#packagesModal').modal('hide');
        $('#processOrder').on('hidden.bs.modal', function(e){

            // here if sessionStorage
            var accountId = sessionStorage.getItem('occenture');

            if (accountId){
                fun.utils.redirect('#signup');
            }
           
        });
    },

    cancelPayment: function(event){
        console.log('cancel payment');
        $('#processOrder').modal('hide');
    },

    signupThreeMonths: function(event){
        console.log('test three month');
        sessionStorage.setItem("order", 'three-months');
        $('#packagesModal').on('hidden.bs.modal', function(e){
            $('#current-order').html('$119.97');
            $('#processOrder').modal({'show':true, 'backdrop': false, 'keyboard': false});
        });
        $('#packagesModal').modal('hide');
        $('#processOrder').on('hidden.bs.modal', function(e){
            // here if sessionStorage
            var accountId = sessionStorage.getItem('occenture');

            if (accountId){
                fun.utils.redirect('#signup');
            }
        });
    },

    signupOneYear: function(event){
        console.log('test one year');
        sessionStorage.setItem("order", 'one-year');
        
        $('#packagesModal').on('hidden.bs.modal', function(e){
            $('#current-order').html('$399.99');
            $('#processOrder').modal({'show':true, 'backdrop': false, 'keyboard': false});
        });
        $('#packagesModal').modal('hide');
        $('#processOrder').on('hidden.bs.modal', function(e){
            // here if sessionStorage
            var accountId = sessionStorage.getItem('occenture');

            if (accountId){
                fun.utils.redirect('#signup');
            }
        });
    },

    makeSubscription: function(event){
        'use strict';
        event.preventDefault();
        var name,lastname,title,description,label,taskModel,task;
        var fullname = $('#subscribe-name-input').val();
        var email = $('#subscribe-email-input').val();

        if(fullname.split(' ')[0]){
            console.log('IN HERE!!!!',fullname.split(' '),fullname.split(' ')[0]);
            name = fullname.split(' ')[0]
        } else {
            name = '';
        }

        if(fullname.split(' ')[1]){
            lastname = fullname.split(' ')[1] + fullname.split(' ')[2];
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
    },

    selectDiners: function(event){
        console.log('Diners Club');
        $('#cc-1').removeClass('hide').addClass('show');
        $('#cc-2').removeClass('show').addClass('hide');
        $('#cc-3').removeClass('show').addClass('hide');
        $('#cc-4').removeClass('show').addClass('hide');
        $('#cc-5').removeClass('show').addClass('hide');
    },

    selectDiscover: function(event){
        console.log('Discover');
        $('#cc-1').removeClass('show').addClass('hide');
        $('#cc-2').removeClass('hide').addClass('show');
        $('#cc-3').removeClass('show').addClass('hide');
        $('#cc-4').removeClass('show').addClass('hide');
        $('#cc-5').removeClass('show').addClass('hide');
    },

    selectMasterCard: function(event){
        console.log('Master Card');
        $('#cc-1').removeClass('show').addClass('hide');
        $('#cc-2').removeClass('show').addClass('hide');
        $('#cc-3').removeClass('hide').addClass('show');
        $('#cc-4').removeClass('show').addClass('hide');
        $('#cc-5').removeClass('show').addClass('hide');
    },

    selectVisa: function(event){
        console.log('Visa');
        $('#cc-1').removeClass('show').addClass('hide');
        $('#cc-2').removeClass('show').addClass('hide');
        $('#cc-3').removeClass('show').addClass('hide');
        $('#cc-4').removeClass('hide').addClass('show');
        $('#cc-5').removeClass('show').addClass('hide');
    },

    selectAmericanExpress: function(event){
        console.log('American Express');
        $('#cc-1').removeClass('show').addClass('hide');
        $('#cc-2').removeClass('show').addClass('hide');
        $('#cc-3').removeClass('show').addClass('hide');
        $('#cc-4').removeClass('show').addClass('hide');
        $('#cc-5').removeClass('hide').addClass('show');
    },

    successContinue: function(event){
        $('#successTrans').on('hidden.bs.modal', function(e){
            $('#memberInfo').modal({'show':true, 'backdrop': false, 'keyboard': false});
        });

        $('#successTrans').modal('hide');
    },

    closeContinue: function(event){
        $('#memberInfo').modal('hide');
    },

    payAmex: function(event){
        console.log('pay amex');

    },
    payVisa: function(event){
        console.log('pay visa');
    },
    payMaster: function(event){
        console.log('pay master');

    },
    payDiscover: function(event){
        console.log('pay discover');

    },
    payDiners: function(event){ 
        console.log('pay diners');

        var stuff, address, phone, email, card, month, year, cvc, name, location, callbacks, message;

        location = window.location.hostname;

        username = $('#diners-username'); 

        password = $('#diners-password'); 

        address = $('#diners-address'); 
        
        phone = $('#diners-phone');

        email = $('#diners-email');

        card = $('#diners-cc-number');

        month = $('#diners-exp-month');

        year = $('#diners-exp-year');

        cvc = $('#diners-cc-cvc');

        name = $('#diners-cc-name');

        stuff = {
            "account": username.val(),
            "password": password.val(),
            "first_name": "Tech",
            "last_name":"Support",
            "address_one":address.val(),
            "address_two":"24-7",
            "city":"test",
            "state":"FL",
            "zip_code":"50685",
            "email": email.val(),
            "country": "US",
            "date_of_birth": "23/05/1988",
            "last_4_ssn": "2222",
            "phone_number": phone.val(),
            "card_type": "Visa",
            "amount": "1",
            "name_on_cc": name.val(),
            "card_number": card.val(),
            "exp_month": month.val(),
            "exp_year": year.val(),
            "cvv": cvc.val(),
            "reference": chance.natural().toString()
        };

        callbacks = {
            success: function(response){

                message = response['attributes']['message'];

                sessionStorage.setItem('membership', response['attributes']['membership']);
                
                if (message.indexOf('Approved') != -1) {

                    var order = sessionStorage.getItem("order");

                    if (order === 'three-months'){
                        $('#trans-amount').html('$119.97');
                        $('#period-trans').html('3 MONTHS');
                    }

                    else if (order === 'one-year'){
                        $('#trans-amount').html('$399.99');
                        $('#period-trans').html('Annual');
                    }

                    else if (order === 'one-month'){
                        console.log('one-month');
                        $('#trans-amount').html('$44.95');
                        $('#period-trans').html('30 Days');
                    }
                    
                    $('#processOrder').on('hidden.bs.modal', function(e){
                        $('#successTrans').modal({'show':true, 'backdrop': false, 'keyboard': false});
                    });
                    
                    /*$('#successTrans').on('hidden.bs.modal', function(e){
                        fun.utils.redirect(fun.conf.hash.signup);
                    });*/

                    callbackx = {
                        success: function(){
                            
                            // login the created user
                            fun.utils.login(stuff['account'], stuff['password'],
                                {
                                    success : function(xhr, status){

                                        // currently this success call is never executed
                                        // the success stuff is going on case 200 of the error function.
                                        // Why? well... I really don't fucking know...

                                        fun.utils.redirect(fun.conf.hash.home);
                                    },
                                    error : function(xhr, status, error){

                                        switch(xhr.status) {
                                            case 403:
                                                var message = fun.utils.translate("usernameOrPasswordError");
                                                break;
                                            case 200:
                                                // Check browser support
                                                if (typeof(Storage) != "undefined") {
                                                    // Store
                                                    localStorage.setItem("username", stuff['account']);
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
                    
                    //event.preventDefault();
                    account = new fun.models.Account();
                    account.save(
                        {
                            account: stuff['account'],
                            password: stuff['password'],
                            email: stuff['email'],

                            // here we put the location from where this user is made.
                            location: location,

                            // occenture memberid
                            membership: sessionStorage.getItem('membership')
                        },
                        callbackx
                    );

                    $('#processOrder').modal('hide');
                }

                else {
                    console.log('error!');
                }
            },

            error: function(model, error){
                console.log(error);
            }
        };
        trans = new fun.models.Transaction();
        trans.save(stuff, callbacks);

    }, 

    
    callNow: function(event){
        console.log('call now');
        var phone_number = $('#phone-number').val();

        var struct = {
            'account': localStorage.getItem('username'),
            'extension': 7000,
            'caller_id': 18883847935,
            'phone_number': phone_number
        };

        call = new fun.models.Outbound(struct);
        call.save();
    }

});