fun.views.withdraw = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.withdraw = this.$el;
    },
    
    /*
    * Render the withdraw view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.withdraw));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    }

});
