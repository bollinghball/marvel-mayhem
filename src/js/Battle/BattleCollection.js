var Backbone = require('backbone');

var BattleModel = require('./BattleModel');

var BattleCollection = Backbone.Collection.extend({
	model: BattleModel,
	url: '/battles'
});

module.exports = BattleCollection;
