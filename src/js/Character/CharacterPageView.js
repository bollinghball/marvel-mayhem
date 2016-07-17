// Gets passed a CharacterCollection
// Has a banner, some text, and a place for the search view
// Renders a CharacterSearchView with the collection

var Backbone = require('backbone');

var battleController = require('../Battle/BattleController');
var CharacterSearchView = require('./CharacterSearchView');
var CharacterDetailsView = require('./CharacterDetailsView');

var CharacterPageView = Backbone.View.extend({

	initialize: function () {
		this.searchView = new CharacterSearchView({
			collection: this.collection,
			onItemClick: function (model) {
				var detailView = new CharacterDetailsView({
					model: model,
					onSendToBattleClick: function () {
						// Show the battle page
						battleController.showBattlePage();
						// Populate the left slot
						battleController.selectLeft(model.get('id'));
						// Update the URL manually
						Backbone.history.navigate('battle/' + model.get('id'));
						// Hide the modal
						Backbone.trigger('modal:hide');
					}
				});
				// Show the modal with the corresponding view
				Backbone.trigger('modal:show', detailView);
			}
		});
	},

	

	render: function () {
		this.$el.html(this.template());
		this.searchView.render();
		this.$('.search-region').append(this.searchView.$el);

	},

	template: function () {
		return `
			<h3>Find A Character To Battle</h3>
			<div class="search-region"></div>
		`;
	}

});

module.exports = CharacterPageView;