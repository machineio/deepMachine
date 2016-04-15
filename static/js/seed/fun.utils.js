/*
* Fun namespace container
*/
var fun = {
    account: {}, 
    utils: {},
    views: {},
    instances: {},
    containers: {},
    models: {},
    strings: {},
    conf: {},
    session: {}, //account and context maybe?
    cache: {templates : {}},
    omnibus: _.extend({}, Backbone.Events)
};


fun.utils.hideAccountsHistory = function(){
    'use strict';
    // test this stuff up
    $('#all-history-trades').removeClass('hide').addClass('show');
    // list of active and demo accounts
    $('#wipe-the-house').removeClass("show").addClass('hide');
    $('#wipe-the-incakid').removeClass('show').addClass('hide');
    $('#wipe-crazy-tracy').removeClass('show').addClass('hide');
    $('#wipe-ron-jones').removeClass('show').addClass('hide');
    $('#wipe-affiliate').removeClass('show').addClass('hide');
    $('#wipe-irene').removeClass('show').addClass('hide');
    $('#wipe-oilmanreed').removeClass('show').addClass('hide');
    $('#wipe-village').removeClass('show').addClass('hide');
    $('#wipe-todd').removeClass('show').addClass('hide');
    $('#wipe-vwoodard').removeClass('show').addClass('hide');
    $('#wipe-mredd').removeClass('show').addClass('hide');
    $('#wipe-drkno').removeClass('show').addClass('hide');
    $('#wipe-imcy').removeClass('show').addClass('hide');
    $('#wipe-minaran').removeClass('show').addClass('hide');
    $('#wipe-paul').removeClass('show').addClass('hide');
    $('#wipe-winnerscircle').removeClass('show').addClass('hide');
    $('#wipe-ashanabey').removeClass('show').addClass('hide');
    $('#wipe-greatsavings').removeClass('show').addClass('hide');
    $('#wipe-chris').removeClass('show').addClass('hide');
    $('#wipe-khut').removeClass('show').addClass('hide');
    $('#wipe-tntnitro').removeClass('show').addClass('hide');
    $('#wipe-oscara').removeClass('show').addClass('hide');
    $('#wipe-khern').removeClass('show').addClass('hide');
    $('#wipe-mark-carter').removeClass('show').addClass('hide');
    $('#wipe-chuma-luanne').removeClass('show').addClass('hide');
    $('#wipe-curtis').removeClass('show').addClass('hide');
    $('#wipe-papilindo').removeClass('show').addClass('hide');
    $('#wipe-sabco').removeClass('show').addClass('hide');
    $('#wipe-desertmann').removeClass('show').addClass('hide');
    $('#wipe-lwellszero').removeClass('show').addClass('hide');
    $('#wipe-youngpaul').removeClass('show').addClass('hide');
    $('#wipe-larostr').removeClass('show').addClass('hide');
    $('#wipe-thomaswswetz').removeClass('show').addClass('hide');
    $('#wipe-delightfulnita').removeClass('show').addClass('hide');
    $('#wipe-ahmedrehman').removeClass('show').addClass('hide');
    $('#wipe-teamline').removeClass('show').addClass('hide');
    $('#wipe-easyclick').removeClass('show').addClass('hide');
    $('#wipe-aparikh').removeClass('show').addClass('hide');
    $('#wipe-dmcmproperties').removeClass('show').addClass('hide');
    $('#wipe-jubair-toha').removeClass('show').addClass('hide');
    $('#wipe-eljosmith').removeClass('show').addClass('hide');
    $('#wipe-ashleymarielove').removeClass('show').addClass('hide');
    $('#wipe-johnsontilldeath').removeClass('show').addClass('hide');
    $('#wipe-rjs-productions').removeClass('show').addClass('hide');
    $('#wipe-ashrafmalak').removeClass('show').addClass('hide');
    $('#wipe-lilustreci').removeClass('show').addClass('hide');
    $('#wipe-trader').removeClass('show').addClass('hide');
    $('#wipe-benniecurrey').removeClass('show').addClass('hide');
    $('#wipe-annjosuccess').removeClass('show').addClass('hide');
    $('#wipe-christopherruxer').removeClass('show').addClass('hide');
};


fun.utils.hideAmounts = function(){
    'use strict';
    $('#current-budget').removeClass('show').addClass('hide');
    $('#current-250').removeClass('show').addClass('hide');
    $('#current-150').removeClass('show').addClass('hide');
    $('#current-475').removeClass('show').addClass('hide');
    $('#current-825').removeClass('show').addClass('hide');
    $('#current-500').removeClass('show').addClass('hide');
    $('#current-945').removeClass('show').addClass('hide');
    $('#current-645').removeClass('show').addClass('hide');
    $('#current-850').removeClass('show').addClass('hide');
    $('#current-384').removeClass('show').addClass('hide');
    $('#current-384b').removeClass('show').addClass('hide');
    $('#current-380').removeClass('show').addClass('hide');
    $('#current-344').removeClass('show').addClass('hide');
    $('#current-625').removeClass('show').addClass('hide');
    $('#current-471').removeClass('show').addClass('hide');
    $('#current-367').removeClass('show').addClass('hide');
    $('#current-111').removeClass('show').addClass('hide');
    $('#current-7539').removeClass('show').addClass('hide');
    $('#current-2599').removeClass('show').addClass('hide');
    $('#current-2218').removeClass('show').addClass('hide');
    $('#current-8191').removeClass('show').addClass('hide');
    $('#current-9249').removeClass('show').addClass('hide');
    $('#current-10118').removeClass('show').addClass('hide');
    $('#current-11163').removeClass('show').addClass('hide');
    $('#current-10879').removeClass('show').addClass('hide');
    $('#current-750').removeClass('show').addClass('hide');
    $('#current-1418').removeClass('show').addClass('hide');
    $('#current-2772').removeClass('show').addClass('hide');
    $('#current-3079').removeClass('show').addClass('hide');
    $('#current-1878').removeClass('show').addClass('hide');
    $('#current-1284').removeClass('show').addClass('hide');
    $('#current-6025').removeClass('show').addClass('hide');
    $('#current-666').removeClass('show').addClass('hide');
    $('#current-5130').removeClass('show').addClass('hide');
    $('#current-1126').removeClass('show').addClass('hide');
    $('#current-6986').removeClass('show').addClass('hide');
    $('#current-7704').removeClass('show').addClass('hide');
    $('#current-2718').removeClass('show').addClass('hide');
    $('#current-4257').removeClass('show').addClass('hide');
    $('#current-602').removeClass('show').addClass('hide');
    $('#current-674').removeClass('show').addClass('hide');
    $('#current-652').removeClass('show').addClass('hide');
    $('#current-879').removeClass('show').addClass('hide');
    $('#current-2534').removeClass('show').addClass('hide');
    $('#current-945').removeClass('show').addClass('hide');
    $('#current-1718').removeClass('show').addClass('hide');
    $('#current-5502').removeClass('show').addClass('hide');
    $('#current-8293').removeClass('show').addClass('hide');
    $('#current-342').removeClass('show').addClass('hide');
    $('#current-567').removeClass('show').addClass('hide');
    $('#current-2250').removeClass('show').addClass('hide');
    $('#current-6402').removeClass('show').addClass('hide');
    $('#current-6752').removeClass('show').addClass('hide');
    $('#current-428').removeClass('show').addClass('hide');
    $('#current-10435').removeClass('show').addClass('hide');
    $('#current-3164').removeClass('show').addClass('hide');
    $('#current-2233').removeClass('show').addClass('hide');
    $('#current-275').removeClass('show').addClass('hide');
    $('#current-319').removeClass('show').addClass('hide');
    $('#current-4670').removeClass('show').addClass('hide');
    $('#current-3918').removeClass('show').addClass('hide');
    $('#current-10770').removeClass('show').addClass('hide');
    $('#current-3923').removeClass('show').addClass('hide');
    $('#current-421').removeClass('show').addClass('hide');
};




/*
* Updater deals with websocket stuff
*/
fun.utils.updater = {
    socket: null,

    start: function() {
        var url = "ws://" + location.host + "/ws/alerts";
        fun.utils.updater.socket = new WebSocket(url);
        fun.utils.updater.socket.onmessage = function(event) {
            fun.utils.updater.processMessage(JSON.parse(event.data));
        }
    },

    processMessage: function(message){
        if (message['message'] !== 'heartbeat'){
            sessionStorage.setItem("obelix", message['message']);
            fun.omnibus.trigger("obelix:message");
        }
    }
};


/*
* Updater deals with websocket stuff
*/
fun.utils.getExpiryMinutes = function(expiry) {
    'use strict';
    var expiry, times;
    times = {
        '0':5,
        '1':10,
        '2':15,
        '3':20,
        '4':30,
        '5':60,
        '6':120,
        '7':150
    };
    return times[expiry];
};


/*
* Fetches the session from it's container (cookie)
* @return Object: Session data
*/
fun.utils.getSession = function() {
    var session = null;
    
    if ($.cookie){
        session = $.cookie('username');
    }
    return session;
};


/**
 * Tells whether the session has been created or not.
 * @return boolean
 */
fun.utils.loggedIn = function() {
    var session = this.getSession();
    fun.session = session;
    return (session != null);
};


/**
 * Logs the user into the system
 * @param string account: account
 * @param string password: password
 * @param object callbacks: object with success and error callback
 * @return boolean
 */
fun.utils.login = function(account, password, callbacks) {
    $.ajax({
        type: "GET",
        url: fun.conf.urls.login,
        dataType: 'json',
        beforeSend: function(xhr){
            auth = account + ':' + password;
            var words  = CryptoJS.enc.Latin1.parse(auth);
            var base64 = CryptoJS.enc.Base64.stringify(words);
            xhr.setRequestHeader("Authorization", "Basic " + base64);
        },
        success: function (data, textStatus, jqXHR){

            //$.cookie( 'account', account );

            // so... this stuff never works...

            if (_.isFunction(callbacks.success)){
                callbacks.success(data);
            }
        },
        error: function (xhr, textStatus, thrownError){
            if (_.isFunction(callbacks.error)){
                callbacks.error(xhr, textStatus, thrownError);
            }
        }
    });
};


fun.utils.sendFile = function(file) {
    var uri = "/upload";
    var request = new XMLHttpRequest();
    var fd = new FormData();
    
    request.open("POST", uri, true);
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            // Handle response.
            alert(request.responseText); // handle response.
        }
    };
    fd.append('fileUpload', file);
    // Initiate a multipart/form-data upload
    request.send(fd);
};

/*
* Subscribe
*/
fun.utils.subscribe = function(callbacks){
    'use strict';
    console.log('fun.utils.subscribe');
    var email = $("#subscribe-email").val(),
        task,
        taskPayload;

    taskPayload = {
        first_name: 'Random',
        last_name: 'Funster',
        title: 'news subscribe',
        description: 'curious and stuff',
        label: 'Home Subscribe',
        email: email,
    };

    task = new fun.models.Task(taskPayload);
    task.save();

    $("#subscribe-email").val('');
};


/**
 * Logout the account
 * @return void
 */
fun.utils.logout = function(callbacks){
    $.ajax({
        url : fun.conf.urls.logout,
        type : 'GET',
        dataType : 'json',
        success : function(data, textStatus, jqXHR) {
            // this is bananas... why? cuz it don't work anymore... 
            // Clear the html from the containers
            for (var i in fun.containers) {
                if(i !== 'login' && i !== 'footer' && i !== 'navbar' && i !== 'subheader'){
                    fun.containers[i].empty();
                }
            }
            if (_.isObject(callbacks) && _.isFunction(callbacks.success)) {
                callbacks.success();
            }
        },
        error : function(jqXHR, textStatus, errorThrown) {
            // Clear the html from the containers
            for (var i in fun.containers) {
                if(i !== 'login' && i !== 'footer' && i !== 'navbar' && i !== 'subheader'){
                    fun.containers[i].empty();
                }
            }
            if (_.isObject(callbacks) && _.isFunction(callbacks.error)) {
                callbacks.error();
            }
        }
    });

    // Clean storage outside ajax call, this way we always clean the stuff.
    if (typeof(Storage) != "undefined") {
        localStorage.removeItem('username');
        localStorage.removeItem('profile');
        sessionStorage.removeItem('context');
    }
};


/**
* Checks on the strings object for the specified key.
* If the value doesn't exist the key is returned
* @param string key for the translation requested
* @return The translated value for the specified key
*/
fun.utils.translate = function translate(key) {
    var value = key;
    if (typeof fun.strings[key] != 'undefined') {
        value = fun.strings[key];
    }

    // replace the rest of the arguments into the string
    for( var i = 1; i < arguments.length; i++) {
        value = value.replace('%' + i + '$s', args[i]);
    }

    return value;
};


/**
 * Fetches an html template
 * @return Object
 */
fun.utils.getTemplate = function(url){
    if ( !fun.cache.templates[url] ) {
        var response = $.ajax(url, {
            async : false,
            dataTypeString : 'html'
        });
        fun.cache.templates[url] = response.responseText;
    }
    return fun.cache.templates[url];
};


/**
 * Redirects to a different url #hash
 * @param string url: new location
 * @return Object
 */
fun.utils.redirect = function(url) {
    window.location = url;
};


/**
 * Hide all the UI stuff
 */
fun.utils.hideAll = function() {
    for (var i in fun.containers){
        // hide all containers including footer
        //fun.containers[i].hide();
        fun.containers[i].removeClass("show").addClass("hide");
        //if ( i != 'footer'){
        //    fun.containers[i].hide();
        //}
    }
};


/**
* check if this stuff works on empty strings
*/
fun.utils.emptyString = function(str) {
    return (!str || 0 === str.length);
};


/**
 * Rounds up a number.
 * @return Object
 */
fun.utils.round = function(number, decimals){
  if (typeof decimals === 'undefined')
  {
      var decimals = 2;
  }
  var newNumber = Math.round(number*Math.pow(10,decimals))/Math.pow(10,decimals);
  return parseFloat(newNumber);
};


/**
 * validation rules
 * return custom validation rules
 */
fun.utils.validationRules = function(){
    var custom = {
        focusCleanup: false,
        wrapper: 'div',
        errorElement: 'span',
        
        highlight: function(element) {
            $(element).parents ('.control-group').removeClass ('success').addClass('error');
        },
        success: function(element) {
            $(element).parents ('.control-group').removeClass ('error').addClass('success');
            $(element).parents ('.controls:not(:has(.clean))').find ('div:last').before ('<div class="clean"></div>');
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parents ('.controls'));
        }
    };
    
    return custom;
};

/**
 * string 'join' format
 */
fun.utils.format = function(){
    'use strict';
    var args,
        initial;
    args = [].slice.call(arguments);
    initial = args.shift();

    // check if we can use {%d} instead of '%s'
    function replacer (text, replacement) {
        return text.replace('%s', replacement);
    }
    return args.reduce(replacer, initial);
};

/**
 * jQuery validator custom error messages
 * Included fun.utils after the validation plugin to override the messages
 *
 * TODO: validator.messages on fun.strings.js
 */
jQuery.extend(jQuery.validator.messages, {
    required: "This field is required.",
    remote: "Please fix this field.",
    email: "Please enter a valid email address.",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});


/**
 * Alias
 */
var translate = fun.utils.translate;
var round = fun.utils.round;


// random stuff that needs some new love

var Theme = function(){
    
    var chartColors;
    
    // Black & Orange
    //chartColors = ["#FF9900", "#333", "#777", "#BBB", "#555", "#999", "#CCC"];
    
    // Ocean Breeze
    //chartColors = ['#94BA65', '#2B4E72', '#2790B0', '#777','#555','#999','#bbb','#ccc','#eee'];
    
    // Fire Starter
    //chartColors = ['#750000', '#F90', '#777', '#555','#002646','#999','#bbb','#ccc','#eee'];
    
    // Mean Green
    chartColors = ['#5F9B43', '#DB7D1F', '#BA4139', '#777','#555','#999','#bbb','#ccc','#eee'];
    
    return { chartColors: chartColors };
    
}();


var Charts = function () {
    
    var colors = Theme.chartColors;
    
    return {
        vertical: vertical,
        horizontal: horizontal,
        pie: pie,
        donut: donut,
        line: line
    };
    
    function vertical(target, data) {
        var options = {
            colors: colors,
    
            grid: {
                hoverable: true, 
                borderWidth: 2
            }, 
            bars: {
                horizontal: false, 
                show: true, 
                align: 'center', 
                lineWidth: 0,
                fillColor: { colors: [ { opacity: 1 }, { opacity: 0.5 } ] }
            }, 
            legend: {
                show: true
            },
            
            tooltip: true,
            tooltipOpts: {
                content: '%s: %y'
            },
        };
    
        var el = $(target);
        
        if (el.length) {
            $.plot(el, data, options );
        }
    }
    
    function horizontal(target, data) {
        var options = {
                    colors: colors,

                    grid: {
                        hoverable: true, 
                        borderWidth: 2
                    }, 
                    bars: {
                        horizontal: true, 
                        show: true, 
                        align: 'center', 
                        barWidth: .2,
                        lineWidth: 0,
                        fillColor: { colors: [ { opacity: 1 }, { opacity: 1} ] }
                    }, 
                    legend: {
                        show: true
                    },
            
                    tooltip: true,
                    tooltipOpts: {
                        content: '%s: %y'
                    },
                };
            
            var el = $(target);
                
                if (el.length) {
                    $.plot(el, data, options );
                }
    }
    
    function pie(target, data) {
        var options = {
            colors: colors,
            
            series: {
                pie: {
                    show: true,  
                    innerRadius: 0, 
                    stroke: {
                        width: 4
                    }
                }
            }, 
                
            legend: {
                position: 'ne'
            }, 
            
            tooltip: true,
            tooltipOpts: {
                content: '%s: %y'
            },
            
            grid: {
                hoverable: true
            }
        };

        var el = $(target);
                
            if (el.length) {
                $.plot(el, data, options );
            }
    }
    
    function donut(target, data) {
        var options = {
            colors: colors,
            
            series: {
                pie: {
                    show: true,  
                    innerRadius: .5, 
                    stroke: {
                        width: 4
                    }
                }
            }, 
                
            legend: {
                position: 'ne'
            }, 
            
            tooltip: true,
            tooltipOpts: {
                content: '%s: %y'
            },
            
            grid: {
                hoverable: true
            }
        };
        
        var el = $(target);
                        
        if (el.length) {
            $.plot(el, data, options );
        }
    }
    
    
    /** 
    * - Please update for timezone support on charts
    */
    function line (target, data) {
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
    }
}();