// Has a banner, some text and a RecentBattlesView.

var Backbone = require('backbone');

var RecentBattlesView = require('../Battle/RecentBattlesView');

var HomeView = Backbone.View.extend({
	
	initialize: function () {
		this.recentBattlesView = new RecentBattlesView();
	},

	render: function () {
		this.$el.html(this.template());
		this.recentBattlesView.render();
		this.$('.recent-battles').append(this.recentBattlesView.$el);

	},

	template: function () {
		return `
			<div class="home-banner"></div>
			<p>Lorem ipsum Nulla anim qui nostrud eiusmod sit reprehenderit ut irure officia irure ea occaecat pariatur nulla Ut dolore.</p>
			<div class="recent-battles"></div>
		`;
	}

});

module.exports = HomeView;