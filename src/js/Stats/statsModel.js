var Backbone = require('backbone');

var StatsModel = Backbone.Model.extend({

	initialize: function () {
		var _this = this;
		// Flag self as unloaded initially
		this.loaded = false;
		//Sync event is triggered when a fetch (GET) completes
		this.on('sync', function () {
			//flag self as loaded
			_this.loaded = true;
		})
	},
 
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