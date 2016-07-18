var Backbone = require('backbone');

var BattleModel = require('./BattleModel');

var BattleCollection = new Backbone.Collection.extend({
	model: BattleModel
});

module.exports = BattleCollection;
