fun.views.profile = Backbone.View.extend({

    /**
    * Bind the event functions to the different HTML elements
    */
    events: {
        'click #act_1': 'oneDay',
        'click #act_2': 'threeDays',
        'click #act_3': 'oneWeek',
        'click #act_4': 'oneMonth',
        'click #profile-first-trade-put': 'firstTradePut',
        'click #profile-first-trade-call': 'firstTradeCall',
        'change #profile_first_asset': 'assetTypeChange',
    },

    /**
    * Class constructor
    */
    initialize: function(options){
        fun.containers.profile = this.$el;
    },

    /**
    * Render view
    */
    render: function(){
        console.log('render profile view');
        var template,
            startDate,
            startTimestamp,
            i,
            total,
            results;

        template = _.template(fun.utils.getTemplate(fun.conf.templates.profile));

        this.$el.html(template);
        this.$el.removeClass("hide").addClass("show");

        // Form inputs
        this.asset = this.$('#profile_first_asset');
        this.expiry = this.$('#profile_first_expiry');
        this.amount = this.$('#profile_first_amount');
        
        //this.renderBinaryGraph();
        this.renderTickGraph();

        $('#clock').countdown('2020/10/10', function(event) {
            $(this).html(event.strftime('%H:%M:%S'));
        });       
    },

    renderTimeLineChart: function(summary){
        // Render today activity chart
        // This hole summary can be parsed in a single requests
        // directly to the flot.js library.
        'use strict';
        var data = [],
            ticks = [],
            seconds = [],
            minutes = [],
            records = [],
            x,
            template,
            timeLineChart;

        // check if response from the server
        if(summary){
            this.summary = summary;
            this.minutes = summary.get('minutes');
            this.records = summary.get('records');
        }


        // push the minutes
        for (x in this.minutes){
            minutes.push([Number(x), this.minutes[x]]);
        }

        // push the records
        for (x in this.records){
            records.push([Number(x), this.records[x]]);
        }

        data.push({
            data: minutes,
            label: 'Minutes'
        });

        data.push({
            data: records,
            label: 'Records',
            points: {show: false},
            lines: {lineWidth: 2, fill: false}
        });

        // html template
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.timeLineChart)
        )(data);

        timeLineChart = this.$('#fun-time-line-chart');
        timeLineChart.html(template);

        // clean charts
        Charts.line('#fun-time-line-chart', data);
        setTimeout(function () {
            $('.xAxis').children('.flot-tick-label').css('padding-top', '10px');
            $('.yAxis').children('.flot-tick-label').css('margin-left','-10px');
        }, 2);
    },

    assetTypeChange: function(event){
        'use strict';
        var element, strUser;

        element = document.getElementById("profile_first_asset");
       
        strUser = element.options[element.selectedIndex].value;

    },

    renderTickGraph: function(){
        'use strict';
        var ws = new WebSocket("ws://" + location.host + "/ws/alerts"),
            placeholder = $('#binary_first_trade'),
            datalen = 100,
            plot = null,
            series,
            data,
            has_message,
            message,
            firstElement,
            firstAsset;


        // so if we have a binary_fist_trade id then we have a dropdown menu with the asset for this tick.

        // let try that out.

        series = {
            label: "Tick",
            lines: { 
                show: true,
                fill: true,
                shadowSize: 25
            },
            points: {
                show:true
            },
            data: []
        };

        ws.onmessage = function(event) {


            data = $.parseJSON(event.data);

            has_message = _.has(data, 'message');

            if(has_message){

                message = data['message'];

                if (_.has(message, 'instrument')){

                    firstElement = document.getElementById("profile_first_asset");
                    firstAsset = firstElement.options[firstElement.selectedIndex].value;

                    if (firstAsset === message['instrument']){

                        $('#first-tick-feed').html(message.bid);

                        series.data.push([moment.unix(Number(message.time)).format('x'), message.bid]);
                        while (series.data.length > datalen) {
                            series.data.shift();
                        }
                        if(plot) {
                            plot.setData([series]);
                            plot.setupGrid();
                            plot.draw();
                        } else { // if(series.data.length > 10)
                            plot = $.plot($('#binary_first_trade'), [series], {
                                xaxis:{
                                    mode: "time",
                                    timeformat: "%H:%M:%S",
                                    minTickSize: [2, "second"],
                                }
                            });
                            plot.draw();
                        }
                    }
                }

            }

              
        }
        ws.onopen = function(event) {
            $('#conn_status').html('<b>Connected</b>');
        }
        ws.onerror = function(event) {
            $('#conn_status').html('<b>Error</b>');
        }
        ws.onclose = function(event) {
            $('#conn_status').html('<b>Closed</b>');
        }
    },

    firstTradeCall: function(event){
        console.log('first trade call');
    },

    signup: function(event){
        'use strict';
        var signupError,
            account,
            password,
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
                landing_username: {
                    minlength: 2,
                    required: true
                },
                landing_email: {
                    required: true,
                    email: true
                },
                landing_password: {
                    minlength: 8,
                    required: true
                }
            }
        }
        validationRules = $.extend(rules, fun.utils.validationRules);

        $('#langing-signup-form').validate(validationRules);
        
        // new user account callbacks
        callbacks = {
            success: function(){
                // Clear the stuff from the inputs ;)
                view.$('#landing_username').val('');
                view.$('#landing_email').val('');
                view.$('#landing_password').val('');
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
        validForm = $('#langing-signup-form').valid();
        if (validForm){
            //event.preventDefault();
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
    },

    firstTradePut: function(event){
        console.log('first trade put');
        'use strict';
        var signupError,
            asset,
            expiry,
            amount,
            view,
            rules,
            validationRules,
            callbacks,
            validForm;
        event.preventDefault();
        
        signupError = this.signupError;
        asset = this.asset.val();
        expiry = this.expiry.val();
        amount = this.amount.val();

        console.log(asset, expiry, amount);
        // check if this view stuff is really needed
        view = this;
        


        $("#signupForm").validate({
            rules: {
                asset: "required",
                expiry: "required",
                username: {
                    required: true,
                    minlength: 2
                },
                password: {
                    required: true,
                    minlength: 5
                },
                confirm_password: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                },
                email: {
                    required: true,
                    email: true
                },
                agree: "required"
            },
            messages: {
                asset: "Please select your instrument",
                expiry: "Please enter your expiry time",
                username: {
                    required: "Please enter a username",
                    minlength: "Your username must consist of at least 2 characters"
                },
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                confirm_password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long",
                    equalTo: "Please enter the same password as above"
                },
                email: "Please enter a valid email address",
                agree: "Please accept our policy"
            },
            errorElement: "em",
            errorPlacement: function ( error, element ) {
                // Add the `help-block` class to the error element
                error.addClass( "help-block" );
                if ( element.prop( "type" ) === "checkbox" ) {
                    error.insertAfter( element.parent( "label" ) );
                } else {
                    error.insertAfter( element );
                }
            },
            highlight: function ( element, errorClass, validClass ) {
                $( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
            },
            unhighlight: function (element, errorClass, validClass) {
                $( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
            }
        });


        // check for a valid form and create the new user account
        validForm = $('#signupForm').valid();
        if (validForm){
            //event.preventDefault();
            console.log('yeah!');
        } else {
          console.log('nooo!');
        }
    },

    oneDay: function(event){
        console.log('one day event');
    },

    threeDays: function(event){
        console.log('three days event');
    },

    oneWeek: function(event){
        console.log('one week event');
    },

    oneMonth: function(event){
        console.log('one month event');
    }
});