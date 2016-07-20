var Backbone = require('backbone');
var $ = require('jquery');
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

				$(".send").click(function() {
    				$('html, body').animate({
        				scrollTop: $(".log-region").offset().top
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

		this.$('.battle-slots-region')
			.append(this.left.$el)
			.append(this.right.$el);

		this.$('.search-region')
			.append(this.searchView.$el);
	},

	template: function () {
		return `
			<div class="battle-slots-region cf"></div>
			<div class="search-region"></div>
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
		} else {
			setTimeout(function () {
				_this.searchView.show();
			}, 500);
			this.$('.battle-button').removeClass('active');
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