fun.views.expert = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.expert = this.$el;
    },
    
    /*
    * Render the expert view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.expert));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    }

});
