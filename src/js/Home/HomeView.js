// Has a banner, some text and a RecentBattlesView.

var Backbone = require('backbone');

var HomeView = Backbone.View.extend({
	initialize: function () {
		this.recentBattlesView = new RecentBattlesView();

	},

	render: function () {
		this.$el.html(this.template());
		this.RecentBattlesView.render();
		this.$('.search').append(this.RecentBattlesView.$el);

	},

	template: function () {
		return `
			<div class="search"></div>
		`;

	},

	showView: function(view) {

	}

});

module.exports = HomeView;