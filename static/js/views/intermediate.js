fun.views.intermediate = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.intermediate = this.$el;
    },
    
    /*
    * Render the intermediate view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.intermediate));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    }

});
