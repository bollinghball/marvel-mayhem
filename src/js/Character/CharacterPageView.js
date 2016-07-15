// Gets passed a CharacterCollection
// Has a banner, some text, and a place for the search view
// Renders a CharacterSearchView with the collection

var Backbone = require('backbone');

var CharacterPageView = Backbone.View.extend({

	initialize: function () {
		this.characterSearchView = new CharacterSearchView({
			collection: this.collection
		});

	},

	render: function () {
		this.$el.html(this.template());
		this.characterSearchView.render();
		this.$('.search').append(this.characterSearchView.$el);

	},

	template: function () {
		return `
			<div class="banner"></div>
			<h3>Find A Character To Battle</h3>
			<div class="search"></div>
		`;
	}

});

module.exports = CharacterPageView;