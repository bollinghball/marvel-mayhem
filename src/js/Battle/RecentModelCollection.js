var Backbone = require('backbone');

var RecentBattleModel = require('./RecentBattleModel'); 

var RecentModelCollection = Backbone.Collection.extend({
	model: RecentBattleModel
});

module.exports = RecentModelCollection;