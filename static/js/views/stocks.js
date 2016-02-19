fun.views.stocks = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.stocks = this.$el;
    },
    
    /*
    * Render the stocks view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.stocks));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    }

});
