fun.views.profile = Backbone.View.extend({

    /**
    * Bind the event functions to the different HTML elements
    */
    events: {
        'click #act_1': 'oneDay',
        'click #act_2': 'threeDays',
        'click #act_3': 'oneWeek',
        'click #act_4': 'oneMonth'
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

        startDate = new Date(2013, 6, 25);
        startTimestamp = new Date(2013, 6, 1).getTime() / 1000;

        function GAconverter(data) {
            var i, total, results = {};
            for(i = 0, total = data.length; i < total; i++) {
                results[+data[i].Hour * 3600 + startTimestamp] = +data[i].Visits;
            }
            return results;
        }

        // var cal = new CalHeatMap();
        // cal.init({
        //     //itemSelector: "#example-k",
        //     domain: "day",
        //     subDomain: "hour",
        //     rowLimit: 1,
        //     cellSize: 10,
        //     //cellSize: 21,
        //     domainGutter: 0,
        //     verticalOrientation: true,
        //     label: {
        //         position: "left",
        //         offset: {
        //             x: 20,
        //             y: 12
        //         },
        //         width: 110
        //     },
        //     //data: "google-analytics.csv",
        //     //dataType: "csv",
        //     start: startDate,
        //     //afterLoadData: GAconverter,
        //     range: 10,
        //     itemName: "visit",
        //     legend: [5, 10, 15, 20, 25, 30],
        //     legendHorizontalPosition: "right",
        //     legendColors: {
        //         empty: "#ededed",
        //         min: "#40ffd8",
        //         max: "#f20013"
        //     }
        // });
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