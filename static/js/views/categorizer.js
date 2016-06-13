fun.views.categorizer = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.categorizer = this.$el;
    },
    
    /*
    * Render the categorizer view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.categorizer));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    }

});
