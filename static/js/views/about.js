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
        'click #success-continue': 'successContinue',
        'click #close-continue': 'closeContinue',
        'click #diners-pay-btn': 'payDiners',
        'click #discover-pay-btn': 'payDiscover',
        'click #master-pay-btn': 'payMaster',
        'click #visa-pay-btn': 'payVisa',
        'click #amex-pay-btn': 'payAmex',
        'click #my-account-btn': 'showMembership',
        'click .cancel': 'cancelPayment',        
    },

    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.about = this.$el;

        fun.messages.on("show:membership", function(){
            console.log('on show membership on about');
            $("#memberInfo").modal('show');
        }, this);
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
        event.preventDefault();
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
        var accountId;
        sessionStorage.setItem("order", 'one-year');
        $('#packagesModal').on('hidden.bs.modal', function(e){
            $('#current-order').html('$399.99');
            $('#processOrder').modal({'show':true, 'backdrop': false, 'keyboard': false});
        });
        $('#packagesModal').modal('hide');
        $('#processOrder').on('hidden.bs.modal', function(e){
            // here if sessionStorage
            accountId = sessionStorage.getItem('occenture');
            // so we're on occenture with this so tell me about membership ids
            // again then, please think on why we're handle this with
            // the accountId variable... 
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
        'use strict';
        console.log('pay amex');

        var view = this, 
            rules,
            validationRules,
            validForm,
            stuff,
            account,
            username,
            password,
            address,
            phone,
            email,
            trans,
            card,
            month,
            year,
            cvc,
            name,
            location,
            callbacks,
            callbackx,
            membership,
            message;

        rules = {
            rules: {
                amex_username: {
                    minlength: 2,
                    required: true
                },
                amex_email: {
                    required: true,
                    email: true
                },
                amex_password: {
                    minlength: 8,
                    required: true
                },
                amex_address:{
                    minlength: 8,
                    required: true
                },
                amex_phone:{
                    minlength: 10,
                    required: true
                },
                amex_exp_month:{
                    minlength: 2,
                    required: true
                },
                amex_exp_year:{
                    minlength: 4,
                    required: true
                },
                amex_cc_number:{
                    minlength: 16,
                    required: true
                },
                amex_month:{
                    minlength: 2,
                    required: true
                },
                amex_year:{
                    minlength: 4,
                    required: true
                },
                amex_cc_cvc:{
                    minlength: 3,
                    required: true,
                },
                amex_cc_name:{
                    minlength: 4,
                    required: true
                },
                amex_agree_terms:{
                    required: true
                }
            }
        }
        validationRules = $.extend(rules, fun.utils.validationRules);
        $('#amex-pay-form').validate(validationRules);

        location = window.location.hostname;

        username = $('#amex_username'); 
        password = $('#amex_password'); 
        address = $('#amex_address'); 
        phone = $('#amex_phone');
        email = $('#amex_email');
        card = $('#amex_cc_number');
        month = $('#amex_exp_month');
        year = $('#amex_exp_year');
        cvc = $('#amex_cc_cvc');
        name = $('#amex_cc_name');

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
                        $('#processingTrans').modal('hide');
                        $('#successTrans').modal({'show':true, 'backdrop': false, 'keyboard': false});
                    });

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
                            $('#processingTrans').modal('hide');
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
                $('#processingTrans').modal('hide');
                console.log(error);
            }
        }

        // check for a valid form and create the new user account
        validForm = $('#amex-pay-form').valid();
        if (validForm){
            event.preventDefault();
            trans = new fun.models.Transaction();
            trans.save(stuff, callbacks);
            // no ?
            $('#amex_username').val(''); 
            $('#amex_password').val(''); 
            $('#amex_address').val(''); 
            $('#amex_phone').val('');
            $('#amex_email').val('');
            $('#amex_cc_number').val('');
            $('#amex_exp_month').val('');
            $('#amex_exp_year').val('');
            $('#amex_cc_cvc').val('');
            $('#amex_cc_name').val('');
            // awww
            $('#processingTrans').modal({'show':true, 'backdrop': false, 'keyboard': false});
        }

    },
    payVisa: function(event){
        'use strict';
        console.log('pay visa');

        var view = this, 
            rules,
            validationRules,
            validForm,
            stuff,
            account,
            username,
            password,
            address,
            phone,
            email,
            trans,
            card,
            month,
            year,
            cvc,
            name,
            location,
            callbacks,
            callbackx,
            membership,
            message;

        rules = {
            rules: {
                visa_username: {
                    minlength: 2,
                    required: true
                },
                visa_email: {
                    required: true,
                    email: true
                },
                visa_password: {
                    minlength: 8,
                    required: true
                },
                visa_address:{
                    minlength: 8,
                    required: true
                },
                visa_phone:{
                    minlength: 10,
                    required: true
                },
                visa_exp_month:{
                    minlength: 2,
                    required: true
                },
                visa_exp_year:{
                    minlength: 4,
                    required: true
                },
                visa_cc_number:{
                    minlength: 16,
                    required: true
                },
                visa_month:{
                    minlength: 2,
                    required: true
                },
                visa_year:{
                    minlength: 4,
                    required: true
                },
                visa_cc_cvc:{
                    minlength: 3,
                    required: true,
                },
                visa_cc_name:{
                    minlength: 4,
                    required: true
                },
                visa_agree_terms:{
                    required: true
                }
            }
        }
        validationRules = $.extend(rules, fun.utils.validationRules);
        $('#visa-pay-form').validate(validationRules);

        location = window.location.hostname;

        username = $('#visa_username'); 
        password = $('#visa_password'); 
        address = $('#visa_address'); 
        phone = $('#visa_phone');
        email = $('#visa_email');
        card = $('#visa_cc_number');
        month = $('#visa_exp_month');
        year = $('#visa_exp_year');
        cvc = $('#visa_cc_cvc');
        name = $('#visa_cc_name');

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
                        $('#processingTrans').modal('hide');
                        $('#successTrans').modal({'show':true, 'backdrop': false, 'keyboard': false});
                    });

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
                            $('#processingTrans').modal('hide');
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
                $('#processingTrans').modal('hide');
                console.log(error);
            }
        };

        // check for a valid form and create the new user account
        validForm = $('#visa-pay-form').valid();
        if (validForm){
            event.preventDefault();
            trans = new fun.models.Transaction();
            trans.save(stuff, callbacks);
            // no ?
            $('#visa_username').val(''); 
            $('#visa_password').val(''); 
            $('#visa_address').val(''); 
            $('#visa_phone').val('');
            $('#visa_email').val('');
            $('#visa_cc_number').val('');
            $('#visa_exp_month').val('');
            $('#visa_exp_year').val('');
            $('#visa_cc_cvc').val('');
            $('#visa_cc_name').val('');
            // awww
            $('#processingTrans').modal({'show':true, 'backdrop': false, 'keyboard': false});
        }
    },
    payMaster: function(event){
        'use strict';
        console.log('pay master');

        var view = this, 
            rules,
            validationRules,
            validForm,
            stuff,
            account,
            username,
            password,
            address,
            phone,
            email,
            trans,
            card,
            month,
            year,
            cvc,
            name,
            location,
            callbacks,
            callbackx,
            membership,
            message;

        rules = {
            rules: {
                master_username: {
                    minlength: 2,
                    required: true
                },
                master_email: {
                    required: true,
                    email: true
                },
                master_password: {
                    minlength: 8,
                    required: true
                },
                master_address:{
                    minlength: 8,
                    required: true
                },
                master_phone:{
                    minlength: 10,
                    required: true
                },
                master_exp_month:{
                    minlength: 2,
                    required: true
                },
                master_exp_year:{
                    minlength: 4,
                    required: true
                },
                master_cc_number:{
                    minlength: 16,
                    required: true
                },
                master_month:{
                    minlength: 2,
                    required: true
                },
                master_year:{
                    minlength: 4,
                    required: true
                },
                master_cc_cvc:{
                    minlength: 3,
                    required: true,
                },
                master_cc_name:{
                    minlength: 4,
                    required: true
                },
                master_agree_terms:{
                    required: true
                }
            }
        }
        validationRules = $.extend(rules, fun.utils.validationRules);
        $('#master-pay-form').validate(validationRules);

        location = window.location.hostname;

        username = $('#master_username'); 
        password = $('#master_password'); 
        address = $('#master_address'); 
        phone = $('#master_phone');
        email = $('#master_email');
        card = $('#master_cc_number');
        month = $('#master_exp_month');
        year = $('#master_exp_year');
        cvc = $('#master_cc_cvc');
        name = $('#master_cc_name');

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
                        $('#processingTrans').modal('hide');
                        $('#successTrans').modal({'show':true, 'backdrop': false, 'keyboard': false});
                    });

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
                            $('#processingTrans').modal('hide');
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
                $('#processingTrans').modal('hide');
                console.log(error);

                // aqui mae hoy 
                $('#processOrder').on('hidden.bs.modal', function(e){
                        $('#processingTrans').modal('hide');
                        $('#successTrans').modal({'show':true, 'backdrop': false, 'keyboard': false});
                    });
            }
        };

        // check for a valid form and create the new user account
        validForm = $('#master-pay-form').valid();
        if (validForm){
            event.preventDefault();
            trans = new fun.models.Transaction();
            trans.save(stuff, callbacks);
            // no ?
            $('#master_username').val(''); 
            $('#master_password').val(''); 
            $('#master_address').val(''); 
            $('#master_phone').val('');
            $('#master_email').val('');
            $('#master_cc_number').val('');
            $('#master_exp_month').val('');
            $('#master_exp_year').val('');
            $('#master_cc_cvc').val('');
            $('#master_cc_name').val('');
            // awww
            $('#processingTrans').modal({'show':true, 'backdrop': false, 'keyboard': false});
        }

    },
    payDiscover: function(event){
        'use strict';
        console.log('pay discover');

        var view = this, 
            rules,
            validationRules,
            validForm,
            stuff,
            account,
            username,
            password,
            address,
            phone,
            email,
            trans,
            card,
            month,
            year,
            cvc,
            name,
            location,
            callbacks,
            callbackx,
            membership,
            message;

        rules = {
            rules: {
                discover_username: {
                    minlength: 2,
                    required: true
                },
                discover_email: {
                    required: true,
                    email: true
                },
                discover_password: {
                    minlength: 8,
                    required: true
                },
                discover_address:{
                    minlength: 8,
                    required: true
                },
                discover_phone:{
                    minlength: 10,
                    required: true
                },
                discover_exp_month:{
                    minlength: 2,
                    required: true
                },
                discover_exp_year:{
                    minlength: 4,
                    required: true
                },
                discover_cc_number:{
                    minlength: 16,
                    required: true
                },
                discover_month:{
                    minlength: 2,
                    required: true
                },
                discover_year:{
                    minlength: 4,
                    required: true
                },
                discover_cc_cvc:{
                    minlength: 3,
                    required: true,
                },
                discover_cc_name:{
                    minlength: 4,
                    required: true
                }
            }
        }
        validationRules = $.extend(rules, fun.utils.validationRules);
        $('#discover-pay-form').validate(validationRules);

        location = window.location.hostname;

        username = $('#discover_username'); 
        password = $('#discover_password'); 
        address = $('#discover_address'); 
        phone = $('#discover_phone');
        email = $('#discover_email');
        card = $('#discover_cc_number');
        month = $('#discover_exp_month');
        year = $('#discover_exp_year');
        cvc = $('#discover_cc_cvc');
        name = $('#discover_cc_name');

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
                        $('#processingTrans').modal('hide');
                        $('#successTrans').modal({'show':true, 'backdrop': false, 'keyboard': false});
                    });

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
                            $('#processingTrans').modal('hide');
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
                $('#processingTrans').modal('hide');
                console.log(error);
            }
        };

        // check for a valid form and create the new user account
        validForm = $('#discover-pay-form').valid();
        if (validForm){
            event.preventDefault();
            trans = new fun.models.Transaction();
            trans.save(stuff, callbacks);
            // no ?
            $('#discover_username').val(''); 
            $('#discover_password').val(''); 
            $('#discover_address').val(''); 
            $('#discover_phone').val('');
            $('#discover_email').val('');
            $('#discover_cc_number').val('');
            $('#discover_exp_month').val('');
            $('#discover_exp_year').val('');
            $('#discover_cc_cvc').val('');
            $('#discover_cc_name').val('');
            // awww
            $('#processingTrans').modal({'show':true, 'backdrop': false, 'keyboard': false});
        }
    },
    payDiners: function(event){
        'use strict';
        console.log('pay diners');

        var view = this, 
            rules,
            validationRules,
            validForm,
            stuff,
            account,
            username,
            password,
            address,
            phone,
            email,
            trans,
            card,
            month,
            year,
            cvc,
            name,
            location,
            callbacks,
            callbackx,
            membership,
            message;

        rules = {
            rules: {
                diners_username: {
                    minlength: 2,
                    required: true
                },
                diners_email: {
                    required: true,
                    email: true
                },
                diners_password: {
                    minlength: 8,
                    required: true
                },
                diners_address:{
                    minlength: 8,
                    required: true
                },
                diners_phone:{
                    minlength: 10,
                    required: true
                },
                diners_exp_month:{
                    minlength: 2,
                    required: true
                },
                diners_exp_year:{
                    minlength: 4,
                    required: true
                },
                diners_cc_number:{
                    minlength: 16,
                    required: true
                },
                diners_month:{
                    minlength: 2,
                    required: true
                },
                diners_year:{
                    minlength: 4,
                    required: true
                },
                diners_cc_cvc:{
                    minlength: 3,
                    required: true,
                },
                diners_cc_name:{
                    minlength: 4,
                    required: true
                }
            }
        }
        validationRules = $.extend(rules, fun.utils.validationRules);
        $('#diners-pay-form').validate(validationRules);

        location = window.location.hostname;

        username = $('#diners_username'); 
        password = $('#diners_password'); 
        address = $('#diners_address'); 
        phone = $('#diners_phone');
        email = $('#diners_email');
        card = $('#diners_cc_number');
        month = $('#diners_exp_month');
        year = $('#diners_exp_year');
        cvc = $('#diners_cc_cvc');
        name = $('#diners_cc_name');

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
                        $('#processingTrans').modal('hide');
                        $('#successTrans').modal({'show':true, 'backdrop': false, 'keyboard': false});
                    });

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
                            $('#processingTrans').modal('hide');
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
                    $('#processOrder').on('hidden.bs.modal', function(e){
                        $('#processingTrans').modal('hide');
                        $('#deniedTrans').modal({'show':true, 'backdrop': false, 'keyboard': false});
                    });
                    $('#processOrder').modal('hide');
                }
            },

            error: function(model, error){
                
                $('#processOrder').on('hidden.bs.modal', function(e){
                        $('#processingTrans').modal('hide');
                        $('#deniedTrans').modal({'show':true, 'backdrop': false, 'keyboard': false});
                    });
                $('#processOrder').modal('hide');
                $('#processingTrans').modal('hide');
                console.log(error);
            }
        };


        // check for a valid form and create the new user account
        validForm = $('#diners-pay-form').valid();
        if (validForm){
            event.preventDefault();
            trans = new fun.models.Transaction();
            trans.save(stuff, callbacks);
            // no ?
            $('#diners_username').val(''); 
            $('#diners_password').val(''); 
            $('#diners_address').val(''); 
            $('#diners_phone').val('');
            $('#diners_email').val('');
            $('#diners_cc_number').val('');
            $('#diners_exp_month').val('');
            $('#diners_exp_year').val('');
            $('#diners_cc_cvc').val('');
            $('#diners_cc_name').val('');
            // awww
            $('#processingTrans').modal({'show':true, 'backdrop': false, 'keyboard': false});
        }
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