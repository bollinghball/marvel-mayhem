var Backbone = require('backbone');

var BattleModel = require('./BattleModel');

var BattleCollection = Backbone.Collection.extend({
	model: BattleModel,
	url: 'http://localhost:8000/battles'
});

module.exports = BattleCollection;
