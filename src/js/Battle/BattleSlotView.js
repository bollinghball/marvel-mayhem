// has a .load method that allows us to swap out the CharacterModel its showing

var Backbone = require('backbone');

var CharacterModel = require('../Character/CharacterModel');
var api = require('../API/marvel');

var BattleSlotView = Backbone.View.extend({

	events: {
		'click': 'removeCharacter'
	},

	initialize: function (options) {
		this.onRemove = options.onRemove;
	},

	render: function () {

		var thumbnail;
		var data;
		if (this.model) {
			thumbnail = this.model.get('thumbnail');
			data = this.model.toJSON();
			this.$el.html(this.template({
				thumbnail: this.model.getThumbnail()
			}));
		} else {
			this.$el.html(this.emptyTemplate());
		}
	},

	template: function (data) {
		return `
			<div style="background-image: url(${data.thumbnail})"></div>
		`;
	},

	emptyTemplate: function () {
		return `
			<p>You need two contestants to battle!</p>
			<p>Search for a character below or pick one of our top battlers!</p>
		`;
	},

	setCharacter: function (model) {
		this.model = model; 
		this.render();
	},

	removeCharacter: function () {
		this.model = null;
		this.render();
		this.onRemove();
	}

});

module.exports = BattleSlotView;