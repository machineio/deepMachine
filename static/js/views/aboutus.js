fun.views.aboutus = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {
        // 'click #about-signup-btn': 'signup',
        // 'click #about-signin-btn': 'signin',
        // 'click #subscribe-btn' : 'subscribe'
    },

    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.packages = this.$el;
    },

    /*
    * Render the about view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.aboutus));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    }

});