// Gets passed a CharacterCollection
// Has a banner, some text, and a place for the search view
// Renders a CharacterSearchView with the collection

var Backbone = require('backbone');

var battle = require('../Battle/controller');
var CharacterSearchView = require('./CharacterSearchView');
var CharacterDetailsView = require('./CharacterDetailsView');
var TopWinnersView = require('../Battle/TopWinnersView');

var CharacterPageView = Backbone.View.extend({

	initialize: function (options) {
		var battles = options.battles;

		this.topWinnersView = new TopWinnersView({
			collection: battles,
			onItemClick: function (model) {
				var detailView = new CharacterDetailsView({
					model: model,
					onSendToBattleClick: function () {
						// Show the battle page with the left slot populated
						battle.showBattlePage(model.get('id'));
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

		this.searchView = new CharacterSearchView({
			collection: this.collection,
			onItemClick: function (model) {
				var detailView = new CharacterDetailsView({
					model: model,
					onSendToBattleClick: function () {
						// Show the battle page with the left slot populated
						battle.showBattlePage(model.get('id'));
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
		this.topWinnersView.render();
		this.$('.search-region').append(this.searchView.$el);
		this.$('.top-winners-region').append(this.topWinnersView.$el);

	},

	template: function () {
		return `
			<h3>Find A Character To Battle</h3>
			<div class="search-region"></div>
			<h3>Top Battlers</h3>
			<div class="top-winners-region"></div>
		`;
	}

});

module.exports = CharacterPageView;