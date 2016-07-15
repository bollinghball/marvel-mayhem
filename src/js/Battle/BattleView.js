var Backbone = require('backbone');

var CharacterDetailsView = require('../Character/CharacterDetailsView');
var CharacterSearchView = require('../Character/CharacterSearchView');
var BattleSlotView = require('./BattleSlotView');

var BattleView = Backbone.View.extend({

	className: 'battle',

	initialize: function () {
		var _this = this;

		this.searchView = new CharacterSearchView({
			onItemClick: function (model) {
				var detailView = new CharacterDetailsView({
					model: model,
					onSendToBattleClick: function () {
						_this.addToSlot(model);
						Backbone.trigger('modal:hide');
					}
				});
				Backbone.trigger('modal:show', detailView);
			}
		});
		this.left = new BattleSlotView({
			onRemove: this.onDetailsRemove.bind(this)
		});
		this.right = new BattleSlotView({
			onRemove: this.onDetailsRemove.bind(this)
		});
	},

	render: function () {
		this.$el.html(this.template());

		this.left.render();
		this.right.render();
		this.searchView.render();

		this.$('.battle-slots-region')
			.append(this.left.$el)
			.append(this.right.$el);

		this.$('.search-region')
			.append(this.searchView.$el);
	},

	template: function () {
		return `
			<div class="battle-slots-region"></div>
			<div class="search-region"></div>
		`;
	},

	addToSlot: function (model) {
		if (!this.left.model) {
			this.left.setCharacter(model);
		} else if (!this.right.model) {
			this.right.setCharacter(model);
		}

		this.updateURL();

		if (this.left.model && this.right.model) {
			this.searchView.hide();
		}
	},

	updateURL: function () {
		var url = 'battle/';

		if (this.left.model) {
			url += this.left.model.get('id');
		}

		url += ',';

		if (this.right.model) {
			url += this.right.model.get('id');
		}

		Backbone.history.navigate(url);
	},

	showSearch: function () {
		this.searchView.show();
	},

	onDetailsRemove: function () {
		this.updateURL();
		this.showSearch();
	}

});

module.exports = BattleView;