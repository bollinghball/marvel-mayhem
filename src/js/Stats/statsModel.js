var Backbone = require('backbone');

var StatsModel = Backbone.Model.extend({

	defaults: {
		speed: 0,
		intelligence: 0,
		fighting: 0,
		energy: 0,
		durability: 0,
		strength: 0
	},

	urlRoot: 'http://localhost:8000/stats'

});

module.exports = StatsModel;