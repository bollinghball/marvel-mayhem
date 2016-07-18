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
			<button>Log</button>
			<button>Results</button>
			<div class="tab active log"></div>
			<div class="tab results"><ul></ul></div>
		`;
	},

	start: function () {
		var results = BattleManager.narrativeBattle(this.left.stats.toJSON(), this.right.stats.toJSON());
		var winner = results.winner.id;

		var battle = new BattleModel({
			left: this.left.get('id'),
			right: this.right.get('id'),
			winner: winner
		});

		battle.save();

		var x = -1;
		var battleInterval = window.setInterval(function(){
			x++;
			if(x>results.fightData.length){
				clearInterval(battleInterval);
			}
			var li = $('<li/>');
			li.text(results.fightData[x].message);
			$('.results ul').append(li);
		}, 1000);
	}

});

module.exports = BattleLogView;