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
        'click #confirm-trade-btn': 'confirmTrade',
        'click #close-trade-btn': 'cancelTrade',
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
        this.bid = this.$('#profile-first-bid');
        this.ask = this.$('#profile-first-ask');
        
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

            var comoHora, comoAhora;

            data = $.parseJSON(event.data);

            has_message = _.has(data, 'message');

            if(has_message){

                message = data['message'];

                if (_.has(message, 'instrument')){

                    firstElement = document.getElementById("profile_first_asset");
                    firstAsset = firstElement.options[firstElement.selectedIndex].value;

                    if (firstAsset === message['instrument']){


                        //this.renderTradeGraph:

                        comoHora = moment.utc().startOf('hour');
                        comoAhora = moment.utc();

                        $('#first-tick-feed').html(message.bid);
                        $('#profile-first-ask').html(message.ask);
                        $('#profile-first-bid').html(message.bid);

                        series.data.push([moment.unix(Number(message.time)).format('x'), message.bid]);
                        while (series.data.length > datalen) {
                            series.data.shift();
                        }

                        plot = $.plot($('#binary_first_trade'), [series], {
                            xaxis:{
                                mode: "time",
                                timeformat: "%H:%M:%S",
                                minTickSize: [2, "second"],
                                min: comoHora.toDate(),
                                max: comoAhora.toDate(),
                                twelveHourClock: false
                            }
                        });
                        plot.draw();
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
        'use strict';
        var asset,
            expiry,
            amount,
            ask,
            bid,
            view,
            rules,
            validationRules,
            time,
            new_trade,
            direction,
            callbacks,
            validForm;

        event.preventDefault();

        asset = this.asset.val();
        expiry = this.expiry.val();
        amount = this.amount.val();

        // check if this view stuff is really needed
        view = this;

        $("#first-trade-form").validate({
            rules: {
                asset: "required",
                expiry: "required",
                amount: {
                    number: true,
                    required: true
                },
            },
            messages: {
                asset: "Please select your instrument",
                expiry: "Please enter your expiry time",
                amount: "Please enter an amount of experience points"
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
        

        validForm = $('#first-trade-form').valid();
        if (validForm){
            asset = this.asset.val();
            ask = this.ask.html();
            bid = this.bid.html();
            expiry = this.expiry.val();
            amount = this.amount.val();
            time = moment.utc().unix();
            direction = 'call';

            new_trade  = {
                'account':localStorage.getItem("username"),
                'asset':asset,
                'amount':amount,
                'expiry':expiry,
                'time': String(time),
                'direction': direction,
                'bid': bid
            }

            this.sendNewTrade(new_trade);
        } else {
          console.log('check your random stuff');
        }
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
        'use strict';
        var asset,
            ask,
            bid,
            account,
            direction,
            expiry,
            amount,
            view,
            rules,
            tick,
            validationRules,
            new_trade,
            time,
            validForm;
        event.preventDefault();

        // check if this view stuff is really needed
        view = this;
        
        $("#first-trade-form").validate({
            rules: {
                asset: "required",
                expiry: "required",
                amount: {
                    number: true,
                    required: true
                },
            },
            messages: {
                asset: "Please select your instrument",
                expiry: "Please enter your expiry time",
                amount: "Please enter an amount of experience points"
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

        validForm = $('#first-trade-form').valid();
        if (validForm){
            asset = this.asset.val();
            ask = this.ask.html();
            bid = this.bid.html() || 0.0;
            expiry = this.expiry.val();
            amount = this.amount.val();
            time = moment.utc().unix();
            direction = 'put';

            new_trade  = {
                'account':localStorage.getItem("username"),
                'asset':asset,
                'amount':amount,
                'expiry':expiry,
                'time': String(time),
                'direction': direction,
                'bid': bid
            }

            this.sendNewTrade(new_trade);

        } else {
          console.log('check your random stuff');
        }
    },

    sendNewTrade: function(new_trade){
        'use strict';
        var direction,
            bid,
            asset,
            expiry,
            amount,
            account,
            status,
            trade,
            tradeOn,
            tradeExpiry,
            tradeTime,
            tradeExpiryTime,
            callbacks;
        direction = this.$('#trade-direction');
        bid = this.$('#trade-bid');
        asset = this.$('#trade-asset');
        expiry = this.$('#trade-expiry');
        amount = this.$('#trade-amount');
        account = this.$('#trade-account');
        status = this.$('#trade-status');
        tradeOn = this.$('#trade-timestamp');
        tradeExpiry = this.$('#trade-expiry');
        this.tradeTime = moment.utc();
        this.tradeExpiryTime = moment.utc().add(fun.utils.getExpiryMinutes(new_trade['expiry']), 'm');



        callbacks = {
            success: function(response){

                console.log('new trade success');

                sessionStorage.setItem("confirm_trade", JSON.stringify(response));

                direction.html(new_trade['direction']);
                bid.html(new_trade['bid']);
                asset.html(new_trade['asset']);
                expiry.html(new_trade['expiry']);
                account.html(new_trade['account']);
                amount.html(new_trade['amount']);
                status.html('pending');

                // lol with the time

                tradeOn.html(this.tradeTime.format('LTS'));
                tradeExpiry.html(this.tradeExpiryTime.format('LTS'));

                $('#profileTradeModal').modal({
                    'show': true
                });
            },

            error: function(model, error){
                console.log('wrong stuff on new trade');
            }
        };
        trade = new fun.models.Trade();
        trade.save(new_trade, callbacks);
    },

    confirmTrade: function(event){
        console.log('confirm trade close and start the countdown');

        var struct = JSON.parse(sessionStorage.getItem("confirm_trade"));

        console.log(struct);

        
        var coo = {
            uuid: .getItem("confirm_trade_uuid"),
            status: 'processing',
            start: String(this.tradeTime.unix()),
            end: String(this.tradeExpiryTime.unix())
        };

        trade = new fun.models.Trade();
        trade.save(coo, {patch: true});

        $('#profileTradeModal').modal('hide');

    },

    cancelTrade: function(event){
        console.log('close and remove the trade info');
        $('#profileTradeModal').modal('hide');
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