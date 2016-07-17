// has a .load method that allows us to swap out the CharacterModel its showing

var Backbone = require('backbone');

var BattleSlotView = Backbone.View.extend({

	events: {
		'click': 'removeCharacter'
	},

	initialize: function (options) {
		this.onRemove = options.onRemove;
	},

	render: function () {
		var data;
		if (this.model) {
			data = this.model.toJSON();
			this.$el.html(this.template(data));
		} else {
			this.$el.html(this.emptyTemplate());
		}
	},

	template: function (data) {
		return `
			<span>${data.thumbnail}</span>
		`;
	},

	emptyTemplate: function () {
		return `
			<span>Empty!</span>
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