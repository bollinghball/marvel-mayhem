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
			<div class="home">
				<div class="home-banner"></div>
				<h2 class="headline">Battle your favorite Marvel characters in a head-to-head showdown</h2>
				<div class="recent-battles"></div>
			</div>
		`;
	}

});

module.exports = HomeView;