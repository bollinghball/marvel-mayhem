var Backbone = require('backbone');

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
			<div class="tab results"></div>
		`;
	},

	start: function () {
		var results = BattleManager.narrativeBattle(this.left.stats.toJSON(), this.right.stats.toJSON());
		console.log(results);
	}

});

module.exports = BattleLogView;