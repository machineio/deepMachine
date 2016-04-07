fun.views.about = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.about = this.$el;
    },
    
    /*
    * Render the about view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.about));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    }

});
