var Backbone = require('backbone');

var BattleModel = require('./BattleModel');

var BattleCollection = new Backbone.Collection.extend({
	model: BattleModel,
	url: '/battles'
});

module.exports = BattleCollection;
