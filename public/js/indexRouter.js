define([
  'backbone',
  'views/RegView',
], function(Backbone, RegView) {
  
  var IndexRouter = Backbone.Router.extend({

    routes: {
      'projects': 'showProjects',      
      '*actions': 'defaultAction'
    },

    showProjects: function() {
      alert('a')
    },

    defaultAction: function() {
      var regView = new RegView();
      regView.render();
    }
    
  });
  
  var init = function(){
    var indexRouter = new IndexRouter;
    Backbone.history.start();
  };

  return { 
    init: init
  };

});
