fun.views.beginner = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.beginner = this.$el;
    },
    
    /*
    * Render the beginner view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.beginner));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    }

});
