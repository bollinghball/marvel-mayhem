var $ = require('jquery');
var Backbone = require('backbone');

var NavView = Backbone.View.extend({

	tagName: 'ul',

	className: 'nav',

	events: {
		'click li': 'handleClick'
	},

	render: function () {
		this.$el.html(this.template());
	},

	template: function () {
		return `
			<li><button data-route="characters">CHARACTERS</button></li>
			<li data-route="home">
				<img src="images/logo.jpg">
			</li>
			<li><button data-route="battle">BATTLE</button></li>
		`;
	},

	handleClick: function (e) {
		var target = $(e.target);
		var hash = target.attr('data-route') || target.closest('[data-route]').attr('data-route');
		
		Backbone.history.navigate(hash, {
			trigger: true
		});
	}	
})

module.exports = NavView;