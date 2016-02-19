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

        console.log(strUser);

    },

    renderTickGraph: function(){
        'use strict';
        var ws = new WebSocket("ws://" + location.host + "/ws/alerts"),
            placeholder = $('#binary_first_trade'),
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

                firstElement = document.getElementById("profile_first_asset");
                firstAsset = firstElement.options[firstElement.selectedIndex].value;

                if (firstAsset === message['instrument']){

                    $('#ws-tick-feed').html(message.bid);

                    series.data.push([moment.unix(Number(message.time)).format('x'), message.bid]);
                    while (series.data.length > datalen) {
                        series.data.shift();
                    }
                    if(plot) {
                        plot.setData([series]);
                        plot.setupGrid();
                        plot.draw();
                    } else { // if(series.data.length > 10)
                        plot = $.plot(placeholder, [series], {
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

    firstTradeCall: function(event){
        console.log('first trade call');
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
        // form validation rules
        rules = {
            rules: {
                profile_first_asset: {
                    required: true
                },
                profile_first_amount: {
                    required: true,
                    minlength: 3,
                    email: true
                },
                profile_first_expiry: {
                    //minlength: 8,
                    required: true
                }
            }
        }
        validationRules = $.extend(rules, fun.utils.validationRules);

        $('#profile-first-trade-form').validate(validationRules);
        console.log('despues q?');

        // check for a valid form and create the new user account
        validForm = $('#profile-first-trade-form').valid();
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