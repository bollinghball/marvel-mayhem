var Backbone = require('backbone');
var $ = require('jquery');
var TopWinnersView = require('./TopWinnersView');
var CharacterDetailsView = require('../Character/CharacterDetailsView');
var CharacterSearchView = require('../Character/CharacterSearchView');
var BattleSlotView = require('./BattleSlotView');
var BattleLogView = require('./BattleLogView');

var BattleView = Backbone.View.extend({

	className: 'battle',

	events: {
		'click .battle-button': 'handleBattleClick',
		'click .battle-again': 'handleBattleAgainClick'
	},

	initialize: function (options) {
		var _this = this;

		var battles = options.battles;

		this.topWinnersView = new TopWinnersView({
			collection: battles,
			onItemClick: function (model) {
				var detailView = new CharacterDetailsView({
					model: model,
					onSendToBattleClick: function () {
						_this.addToSlot(model);
						Backbone.trigger('modal:hide');
					}
				});

				// Show the modal with the corresponding view
				Backbone.trigger('modal:show', detailView);

				$(".send").click(function() {
    				$('html, body').animate({
        				scrollTop: $(".battle-button").offset().top
    				}, 500);
				});
			}
		});

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

				$(".send").click(function() {
    				$('html, body').animate({
        				scrollTop: $(".battle-button").offset().top
    				}, 500);
				});
			}
		});
		this.left = new BattleSlotView({
			onRemove: this.checkReadyAndUpdateURL.bind(this)
		});
		this.right = new BattleSlotView({
			onRemove: this.checkReadyAndUpdateURL.bind(this)
		});
		this.listenTo(this.left, 'remove', this.removeBattle);
		this.listenTo(this.right, 'remove', this.removeBattle);
	},

	removeBattle: function() {
		$('.battle-again').removeClass('active');
		this.$('.log-region').empty();
	},

	render: function () {
		this.$el.html(this.template());

		this.left.render();
		this.right.render();
		this.searchView.render();
		this.topWinnersView.render();

		this.$('.battle-slots-region')
			.append(this.left.$el)
			.append(this.right.$el);

		this.$('.search-region')
			.append(this.searchView.$el);

		this.$('.top-winners-region')
			.append(this.topWinnersView.$el);
	},

	template: function () {
		return `
			<div class="battle-slots-region cf"></div>
			<h3 class="title">Find A Character To Battle</h3>
			<div class="search-region"></div>
			<h3 id="top-title">Top Battlers</h3>
			<div class="top-winners-region"></div>
			<button class="battle-button">LET'S BATTLE!</button>
			<div class="log-region"></div>
			<button class="battle-again">LET'S DO ANOTHER BATTLE!</button>
		`;
	},

	addToSlot: function (model) {
		if (!this.left.model) {
			this.left.setCharacter(model);
		} else if (!this.right.model) {
			this.right.setCharacter(model);
		}

		this.checkReadyAndUpdateURL();
	},

	checkReadyAndUpdateURL: function () {
		this.updateURL();
		this.checkReady();
	},

	checkReady: function () {
		var _this = this;
		if (this.left.model && this.right.model) {
			setTimeout(function () {
				_this.searchView.hide();
			}, 500);
			this.$('.battle-button').addClass('active');
			this.hideTopWinners();
		} else {
			setTimeout(function () {
				_this.searchView.show();
			}, 500);
			this.$('.battle-button').removeClass('active');
			this.showTopWinners();
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

	toggleActive: function (){
		var _this = this;
		_this.left.toggleActive();
		_this.right.toggleActive();
	},

	handleBattleAgainClick: function () {
		var _this = this;
		_this.left.removeCharacter();
		_this.right.removeCharacter();
		$('.list-region').empty();
		this.showTopWinners();
	},

	showTopWinners: function () {
		this.$('h3').removeClass('inactive');
		this.$('.top-winners').removeClass('inactive');
	},

	hideTopWinners: function () {
		this.$('h3').addClass('inactive');
		this.$('.top-winners').addClass('inactive');
	},

	handleBattleClick: function () {

		var _this = this;

		_this.removeBattle();
		_this.toggleActive();

		var left = this.left.model;
		var right = this.right.model;

		var battleLog = new BattleLogView({
			left: left,
			right: right
		});

		battleLog.render();

		this.$('.log-region').empty();

		this.$('.battle-button').removeClass('active');

		this.$('.log-region')
			.append(battleLog.$el);

		battleLog.bindEvents();

		this.listenTo(battleLog, 'finished', this.toggleActive)
		this.listenTo(battleLog, 'finished', function(){
			$('.battle-again').addClass('active');
		})

		function fetchLeft () {
			left.stats.fetch({
				success: function () {
					fetchRight();
				}
			});
		}

		function fetchRight () {
			right.stats.fetch({
				success: function () {
					battleLog.start();
				}
			});
		}

		fetchLeft();
	}

});

module.exports = BattleView;