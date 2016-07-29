// Has a banner, some text and a RecentBattlesView.

var Backbone = require('backbone');

var BattleCollection = require('../Battle/BattleCollection');
var TopWinnersView = require('../Battle/TopWinnersView');
var CharacterDetailsView = require('../Character/CharacterDetailsView');
var RecentBattlesView = require('../Battle/RecentBattlesView');
var $ = require('jquery');

var battle = require('../Battle/controller');

var HomeView = Backbone.View.extend({

	render: function () {
		this.$el.html(this.template());
		var battleCollection = new BattleCollection();
		this.recentBattlesView = new RecentBattlesView({collection: battleCollection});
	},

	template: function () {
		return `
			<div class="home">
				<div class="home-banner"></div>
				<h2 class="headline">Battle your favorite Marvel characters in a head-to-head showdown</h2>
				<div class="recent-battles">
					<h3>Recent Battles</h3>
					<div class="leftresult"></div>
					<img src="assets/images/vs.png"/>
					<div class="rightresult"></div>
				</div>
			</div>
		`;
	}

});

module.exports = HomeView;