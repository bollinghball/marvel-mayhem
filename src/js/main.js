var $ = require('jquery');
var Backbone = require('backbone');
var AppView = require('./App/AppView');
var AppRouter = require('./App/AppRouter');

var appRouter = new AppRouter();
var appView = new AppView();

appView.render();

$(document.body).append(appView.$el);

Backbone.history.start();