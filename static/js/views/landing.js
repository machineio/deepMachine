fun.views.landing = Backbone.View.extend({

    /**
    * Bind the event functions to the different HTML elements
    */

    events : {
        'click #landing-signup-btn': 'signup'
    },
    
    /**
    * Class constructor
    */
    initialize: function(options){
        fun.containers.landing = this.$el;
    },

    /**
    * Render view
    */
    render: function(){
        'use strict';
        var template,
            templateChart,
            data = [];
        if (!this.$el.html()){
            template = _.template(fun.utils.getTemplate(fun.conf.templates.landing));
            this.$el.html(template);

            // Cache the DOM stuff
            this.signupError = this.$('#landing-alert');
            // Form inputs
            this.account = this.$('#landing_username');
            this.newAccount = this.account;
            this.email = this.$('#landing_email');
            this.password = this.$('#landing_password');

            /*templateChart = _.template(
                fun.utils.getTemplate(fun.conf.templates.landingChart)
            )(data);

            this.landingChart = this.$('#machine-landing-chart');
            this.landingChart.html(templateChart);
            */
            this.renderTickGraph();
        }
        this.$el.removeClass("hide").addClass("show");
    },

    renderTickGraph: function(){
        'use strict';
        var ws = new WebSocket("ws://" + location.host + "/ws/alerts"),
            //placeholder = $('#machine-landing-chart'),
            datalen = 100,
            plot = null,
            series,
            data,
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

            message = data['message'];

            if ("instrument" in message){

                firstElement = document.getElementById("landing_first_asset");
                firstAsset = firstElement.options[firstElement.selectedIndex].value;

                if (firstAsset === message['instrument']){

                    $('#landing-tick-feed').html(message.bid);

                    series.data.push([moment.unix(Number(message.time)).format('x'), message.bid]);
                    while (series.data.length > datalen) {
                        series.data.shift();
                    }
                    if(plot) {
                        plot.setData([series]);
                        plot.setupGrid();
                        plot.draw();
                    } else { // if(series.data.length > 10)
                        plot = $.plot($('#machine-landing-chart'), [series], {
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

    /*function line (target, data) {
        'use strict';

        var cleanToday = moment.utc().startOf('day'),
            todayPlusOne = moment.utc().startOf('day').add(1, 'day'),
            options,
            el = $(target);

        options = {
            colors: colors,
            series: {
                lines: { 
                    show: true, 
                    fill: true, 
                    lineWidth: 3, 
                    steps: false, 
                    fillColor: { colors: [{opacity: 0.4}, {opacity: 0}] } 
                },
                points: { 
                    show: true, 
                    radius: 3, 
                    fill: true
                }
            }, 
            legend: {
                position: 'ne'
            },
            tooltip: true,
            tooltipOpts: {
                content: '%s: %y'
            },

            xaxis: {
                mode: "time",
                minTickSize: [1, "hour"],
                min: cleanToday.toDate(),
                max: todayPlusOne.toDate(),
                twelveHourClock: true
            }, 
            grid: { borderWidth: 2, hoverable: true }
        };
            
        if (el.length) {
            $.plot(el, data, options );
        }
    }*/

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
    }
});