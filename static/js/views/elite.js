fun.views.elite = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.elite = this.$el;
    },
    
    /*
    * Render the elite view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.elite));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    }

});
