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
		this.recentBattlesView = new RecentBattlesView(1);
		this.$('.home').append(this.recentBattlesView.$el);
		this.recentBattlesView2 = new RecentBattlesView(2);
		this.$('.home').append(this.recentBattlesView2.$el);
		this.recentBattlesView3 = new RecentBattlesView(3);
		this.$('.home').append(this.recentBattlesView3.$el);
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