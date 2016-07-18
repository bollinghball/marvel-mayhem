var Backbone = require('backbone');


var BattleModel = Backbone.Model.extend({

	defaults: {
		left: null,
		right: null,
		winner: null
	},

	urlRoot: "/battles"

});

module.exports = BattleModel;