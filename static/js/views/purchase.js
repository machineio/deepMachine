fun.views.purchase = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.purchase = this.$el;
    },
    
    /*
    * Render the purchase view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.purchase));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    }

});
