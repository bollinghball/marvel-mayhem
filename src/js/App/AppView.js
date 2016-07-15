var Backbone = require('backbone');
var NavView = require('../Nav/NavView');

var AppView = Backbone.View.extend({

	initialize: function () {
		// listen for some event on the Backbone object
		// so that anything, anywhere can swap out the
		// contents of the page-region.
		this.navView = new NavView()
	},

	render: function () {
		//render NavView
		this.$el.html(this.template());
		this.navView.render();
		this.$('.nav-region').append(this.navView.$el);
	},

	template: function () {
		return `
			<div class="nav-region"></div>
		`; 
	},

	showView: function(view) {

	}

});

module.exports = AppView;