fun.views.training = Backbone.View.extend({

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
        fun.containers.training = this.$el;
    },

    /*
    * Render the about view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.training));
            this.$el.html(template);
            $.getScript( "/static/js/scripts.js", function(data,textStatus,jqxhr){});
            fun.utils.templateStart();
            fun.utils.renderBlogTrainning();
        }
        this.$el.removeClass("hide").addClass("show");
    }

});