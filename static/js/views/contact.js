fun.views.contact = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.contact = this.$el;
    },
    
    /*
    * Render the contact view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.contact));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    }

});
