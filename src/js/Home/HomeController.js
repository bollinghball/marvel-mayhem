var Backbone = require('backbone');

var HomeView = require('./HomeView');

module.exports = {

	showHome: function () {
		var view = new HomeView();
		// tell appView to show/render the view
		Backbone.trigger('app:show', view);
	}

};