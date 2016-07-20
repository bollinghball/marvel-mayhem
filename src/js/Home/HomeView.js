// Has a banner, some text and a RecentBattlesView.

var Backbone = require('backbone');

var TopWinnersView = require('../Battle/TopWinnersView');
var CharacterDetailsView = require('../Character/CharacterDetailsView');

var battle = require('../Battle/controller');

var HomeView = Backbone.View.extend({

	render: function () {
		this.$el.html(this.template());
	},

	template: function () {
		return `
			<div class="home">
				<div class="home-banner"></div>
				<h2 class="headline">Battle your favorite Marvel characters in a head-to-head showdown</h2>
				<h3>Recent Battles</h3>
			</div>
		`;
	}

});

module.exports = HomeView;