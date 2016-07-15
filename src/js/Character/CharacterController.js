var Backbone = require('backbone');

var CharacterModel = require('./CharacterModel');
var CharacterCollection = require('./CharacterCollection');
var CharacterPageView = require('./CharacterPageView');
var CharacterDetailsView = require('./CharacterDetailsView');

module.exports = {

	showCharacterPage: function () {
		var collection = new CharacterCollection();
		var view = new CharacterPageView({
			collection: collection
		});

		Backbone.trigger('app:showView', view);
		// Generate collection here? and pass through
		// CharacterPageView into CharacterSearchView
		// which passes it deeper still into
		// CharacterListView
	}

};