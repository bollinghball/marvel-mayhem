// Has a banner, some text and a RecentBattlesView.

var Backbone = require('backbone');

var BattleCollection = require('../Battle/BattleCollection');
var TopWinnersView = require('../Battle/TopWinnersView');
var CharacterDetailsView = require('../Character/CharacterDetailsView');
var RecentBattlesView = require('../Battle/RecentBattlesView')

var battle = require('../Battle/controller');

var HomeView = Backbone.View.extend({

	render: function () {
		this.$el.html(this.template());
		this.topWinnersView.render();
		this.recentBattlesView = new RecentBattlesView({collection: this.topWinnersView.collection});
		this.$('.recent-battles').append(this.topWinnersView.$el);
	},

	template: function () {
		return `
			<div class="home">
				<div class="home-banner"></div>
				<h2 class="headline">Battle your favorite Marvel characters in a head-to-head showdown</h2>
				<div class="recent-battles">
					<div class="leftresult"></div>
					<div class="rightresult"></div>
				</div>
				<h3>Recent Battles</h3>
			</div>
		`;
	}

});

module.exports = HomeView;