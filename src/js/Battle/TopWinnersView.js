var Backbone = require('backbone');

var CharacterListView = require('../Character/CharacterListView');
var CharacterModel = require('../Character/CharacterModel');
var CharacterCollection = require('../Character/CharacterCollection');

var TopWinnersView = Backbone.View.extend({
	
	className: 'top-winners',

	initialize: function (options) {
		this.collection.on('update', this.render.bind(this));
		this.onItemClick = options.onItemClick;
	},

	render: function () {
		var topSix = this.getTopSix();
		var characterListView = new CharacterListView({
			collection: topSix,
			onItemClick: this.onItemClick
		});
		this.$el.empty();
		characterListView.render();
		this.$el.append(characterListView.$el);
	},

	getTopSix: function () {
		// Create an empty CharacterCollection
		var topSixCollection = new CharacterCollection();

		// Get an array of counts.
		// e.g.
		// 		[
		// 			{ id: 912381, wins: 3 },
		// 			{ id: 192842, wins: 16 }
		// 		
		// 		]
		var counts = this.collection.reduce(function (array, battle) {
			var winner = battle.get('winner');
			var existing = array.find(function (obj) {
				return obj.id === winner;
			});

			if (!existing) {
				array.push({ id: winner, wins: 1 });
			} else {
				existing.wins++;
			}

			return array;
		}, []);
		
		// Sort the counts by wins.
		// e.g.
		// 		[
		// 			{ id: 192842, wins: 16 },
		// 			{ id: 912381, wins: 3 }
		// 		
		// 		]
		var topSix = counts.sort(function (left, right) {
			if (left.wins < right.wins) {
				return -1;
			} else if (left.wins > right.wins) {
				return 1;
			} else {
				return 0;
			}
		});

		// Grab the six count objects with the most wins
		topSix = topSix.slice(0, 6);

		// Create a new CharacterModel with the id from the top six counts
		topSix = topSix.map(function (obj) {
			return new CharacterModel({ id: obj.id });
		});

		// Fetch each CharacterModel. After the CharacterModel is fetched,
		// add it to the topSixCollection. We do this to avoid parse()
		// issues.
		topSix.forEach(function (character) {
			character.fetch({
				success: function () {
					topSixCollection.add(character);
				}
			});
		});

		return topSixCollection;
	}

});

module.exports = TopWinnersView;