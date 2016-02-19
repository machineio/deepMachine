fun.views.redeem = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.redeem = this.$el;
    },
    
    /*
    * Render the redeem view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.redeem));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    },

});
