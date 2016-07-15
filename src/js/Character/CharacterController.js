var Backbone = require('backbone');

var CharacterModel = require('./CharacterModel');
var CharacterDetailsView = require('./CharacterDetailsView');

module.exports = {

	popupCharacter: function (id) {
		var model = new CharacterModel({ id: id });
		
		// Does a GET request and loads the response into the attributes
		model.fetch({
			success: function () {
				var view = new CharacterDetailsView({ model: model });
				Backbone.trigger('modal:show', view);
			}
		});
	},

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