var Backbone = require('backbone');
var $ = require('jquery');

var BattleModel = require('./BattleModel');

var BattleLogView = Backbone.View.extend({

	initialize: function (options) {
		this.left = options.left;
		this.right = options.right;
	},

	render: function () {
		this.$el.html(this.template());
	},

	template: function () {
		return `
			<div class="tabs cf">
				<button class="log-button">Log</button>
				<button class="results-button">Results</button>
			</div>
			<div class="tab active log"></div>
			<div class="tab results">
				<ul></ul>
			</div>
				
		`;
	},

	start: function () {
		var results = BattleManager.narrativeBattle(this.left.stats.toJSON(), this.right.stats.toJSON());
		var winner = results.winner.id;

		console.log(results);

		var battle = new BattleModel({
			left: this.left.get('id'),
			right: this.right.get('id'),
			winner: winner
		});

		battle.save();

		var _this = this;
		var healthbars = $('.health');
		console.log(healthbars);

		var x = -1;
		var battleInterval = window.setInterval(function(){
			x++;
			if(x>results.fightData.length-2){
				clearInterval(battleInterval);
			}
			var li = $('<li/>');
			li.text(results.fightData[x].message);
			if(results.fightData[x].attackerName === _this.left.attributes.name){
				healthbars[0].innerText = parseInt(results.fightData[x].attackerWounds);
				healthbars[1].innerText = parseInt(results.fightData[x].defenderWounds);
			} else {
				healthbars[1].innerText = parseInt(results.fightData[x].attackerWounds);
				healthbars[0].innerText = parseInt(results.fightData[x].defenderWounds);
			};
			$('.results ul').append(li);
		}, 1000);
	}

});

module.exports = BattleLogView;