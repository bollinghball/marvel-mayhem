// You'll probably have one instance of this view created by AppView. It then listens 
// for some event on the mediator/dispatcher like "modal:show" that is passed a view.
// The view passed with the event will be rendered inside of the ModalView and it will
// add a class to itself so that it appears on the screen.
// 
// e.g. ListItemView on click:
// 
// Backbone.trigger('modal:show', new DetailView({ model: this.model }));

var $ = require('jquery');
var Backbone = require('backbone');

var ModalView = Backbone.View.extend({

	events: {
		'click': 'handleClick'
	},

	className: 'modal',

	initialize: function () {
		var _this = this;

		Backbone.on('modal:show', this.show.bind(this));
		Backbone.on('modal:hide', this.hide.bind(this));
	},

	render: function () {
		this.$el.html(this.template());
	},

	template: function () {
		return `
			<div class="view-region"></div>
		`;
	},

	show: function (view) {
		if (this.view) {
			this.view.remove();
		}

		this.view = view;

		view.render();

		this.$('.view-region').append(view.$el)
		this.$el.addClass('visible');
	},

	hide: function () {
		this.$el.removeClass('visible');
	},

	handleClick: function (e) {
		if ($(e.target).is('.modal')) {
			this.hide();
		}
	}

});

module.exports = ModalView;