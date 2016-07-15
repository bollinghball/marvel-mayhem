var Backbone = require('backbone');

var CharacterModel = require('./CharacterModel');
var api = require('../API/marvel'); 

var CharacterCollection = Backbone.Collection.extend({

	model: CharacterModel,

	url: api.url('characters'),

	parse: function (response) {
		return response.data.results;
	}
	
});

module.exports = CharacterCollection;