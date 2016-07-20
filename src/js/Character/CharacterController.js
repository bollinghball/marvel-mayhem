var Backbone = require('backbone');

var BattleCollection = require('../Battle/BattleCollection');
var CharacterCollection = require('./CharacterCollection');
var CharacterPageView = require('./CharacterPageView');

module.exports = {

	showCharacterPage: function () {
		var battles = new BattleCollection();
		battles.fetch();
		
		var collection = new CharacterCollection();
		var view = new CharacterPageView({
			collection: collection,
			battles: battles
		});

		Backbone.trigger('app:showView', view);
		// Generate collection here? and pass through
		// CharacterPageView into CharacterSearchView
		// which passes it deeper still into
		// CharacterListView
	}

};