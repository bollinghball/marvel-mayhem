var Backbone = require('backbone');
var NavView = require('../Nav/NavView');
var ModalView = require('../Modal/ModalView');

var AppView = Backbone.View.extend({

	initialize: function () {
		// listen for some event on the Backbone object
		// so that anything, anywhere can swap out the
		// contents of the page-region.
		this.navView = new NavView();
		this.modalView = new ModalView();
		Backbone.on('app:showView', this.showView.bind(this));
	},

	render: function () {
		//render NavView
		this.$el.html(this.template());
		this.navView.render();
		this.modalView.render();
		this.$('.modal-region').append(this.modalView.$el);
		this.$('.nav-region').append(this.navView.$el);
		
	},

	template: function () {
		return `
			<div class="halftone-overlay"></div>
			<div class="page-content">
				<div class="nav-region"></div>
				<div class="page-region"></div>
				<div class="modal-region"></div>
				<footer></footer>
			</div>
		`; 
	},

	showView: function(view) {
		if (this.childView) {
			this.childView.remove();
		}

		this.childView = view;

		this.childView.render();

		this.$('.page-region').append(this.childView.$el);
	}

});

module.exports = AppView;