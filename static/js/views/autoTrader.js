fun.views.autoTrader = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.autoTrader = this.$el;
    },
    
    /*
    * Render the auto-trader view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.autoTrader));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    }

});
