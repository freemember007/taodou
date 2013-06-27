define([
  'backbone',
  'views/MainView',
], function(Backbone, MainView) {
  
  var MainRouter = Backbone.Router.extend({

    routes: {
      'projects': 'showProjects',      
      '*actions': 'defaultAction'
    },

    showProjects: function() {
      alert('a')
    },

    defaultAction: function() {
      var mainView = new MainView();
      mainView.render();
    }
    
  });
  
  var init = function(){
    var mainRouter = new MainRouter;
    Backbone.history.start();
  };

  return { 
    init: init
  };

});
