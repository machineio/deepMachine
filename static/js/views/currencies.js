fun.views.currencies = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.currencies = this.$el;
    },
    
    /*
    * Render the currencies view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.currencies));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    }

});
