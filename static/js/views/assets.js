fun.views.assets = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.assets = this.$el;
    },
    
    /*
    * Render the assets view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.assets));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    
        this.renderBinaryGraph(); 
    },

    renderBinaryGraph: function(){
        /*
         * Flot Interactive Chart
         * -----------------------
         */
        // We use an inline data source in the example, usually data would
        // be fetched from a server
        var data = [], totalPoints = 100;
        
        function getRandomData() {

          if (data.length > 0)
            data = data.slice(1);

          // Do a random walk
          while (data.length < totalPoints) {

            var prev = data.length > 0 ? data[data.length - 1] : 50,
                    y = prev + Math.random() * 10 - 5;

            if (y < 0) {
              y = 0;
            } else if (y > 100) {
              y = 100;
            }

            data.push(y);
          }

          // Zip the generated y values with the x values
          var res = [];
          for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]]);
          }

          return res;
        }

        var interactive_plot = $.plot("#binary_assets_first_trade", [getRandomData()], {
          grid: {
            borderColor: "#f3f3f3",
            borderWidth: 1,
            tickColor: "#f3f3f3"
          },
          series: {
            shadowSize: 0, // Drawing is faster without shadows
            color: "#3c8dbc"
          },
          lines: {
            fill: true, //Converts the line chart to area chart
            color: "#3c8dbc"
          },
          yaxis: {
            min: 0,
            max: 100,
            show: true
          },
          xaxis: {
            show: true
          }
        });


        var updateInterval = 500; //Fetch data ever x milliseconds
        var realtime = "on"; //If == to on then fetch data every x seconds. else stop fetching
        function update() {

          interactive_plot.setData([getRandomData()]);
          // Since the axes don't change, we don't need to call plot.setupGrid()
          interactive_plot.draw();

          if (realtime === "on")
            setTimeout(update, updateInterval);
        }

        //INITIALIZE REALTIME DATA FETCHING
        if (realtime === "on") {
          update();
        }
        
        /*
         * END INTERACTIVE CHART
         */


        

        /*
         * FULL WIDTH STATIC AREA CHART
         * -----------------
         */
        var areaData = [[2, 88.0], [3, 93.3], [4, 102.0], [5, 108.5], [6, 115.7], [7, 115.6],
          [8, 124.6], [9, 130.3], [10, 134.3], [11, 141.4], [12, 146.5], [13, 151.7], [14, 159.9],
          [15, 165.4], [16, 167.8], [17, 168.7], [18, 169.5], [19, 168.0]];
        $.plot("#area-chart", [areaData], {
          grid: {
            borderWidth: 0
          },
          series: {
            shadowSize: 0, // Drawing is faster without shadows
            color: "#00c0ef"
          },
          lines: {
            fill: true //Converts the line chart to area chart
          },
          yaxis: {
            show: false
          },
          xaxis: {
            show: false
          }
        });

        /* END AREA CHART */


    },

});
