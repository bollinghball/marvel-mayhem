var Backbone = require('backbone');

var BattleCollection = require('../Battle/BattleCollection');
var StatsModel = require('../Stats/StatsModel');
var api = require('../API/marvel');

var CharacterModel = Backbone.Model.extend({

	initialize: function () {
		this.stats = new StatsModel({ 
			id: this.get('id') 
		});

		this.battles = new BattleCollection();
		this.battles.fetch({
			data: {
				characterId: this.get('id')
			}
		});
		this.stats.fetch();
	},

	url: function () {
		return api.url('characters/' + this.get('id')); // http://.../characters/5?apikey=...
	},

	parse: function (response) {
		if (this.collection) {
			return response;
		}
		return response.data.results[0];
	},

	getThumbnail: function (variant) {
		var thumbnail = this.get('thumbnail');
		var image = thumbnail.path;

		if (variant) {
			image += '/' + variant;
		}

		image += '.' + thumbnail.extension;

		return image;
	},

	getWins: function () {
		var _this = this;

		var wins = this.battles.filter(function (battle) {
			return battle.get('winner') === _this.get('id');
		});

		return wins;
	},

	getLosses: function () {
		var _this = this;

		return this.battles.filter(function (battle) {
			var winner = battle.get('winner');
			return winner !== null && winner !== _this.get('id');
		});
	}

});

module.exports = CharacterModel;