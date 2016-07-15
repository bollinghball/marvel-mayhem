var Backbone = require('backbone');

var CharacterDetailsView = Backbone.View.extend({
	initialize: function () {
		this.characterListItemView = new CharacterListItemView();
	},

	render: function () {
		this.$el.html(this.template());
		this.characterListItemView.render();
		this.$('.search').append(this.characterListItemView.$el);
	},

	template: function () {
		return `
			<div class="banner"></div>
			<h3>Find A Character To Battle</h3>
			<div class="search"></div>
		`;
	}

});

module.exports = CharacterDetailsView;
