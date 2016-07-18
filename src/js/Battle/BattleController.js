var Backbone = require('backbone');

var CharacterModel = require('../Character/CharacterModel');
var BattleView = require('./BattleView');

module.exports = {

	battleView: null,

	showBattlePage: function () {
		this.battleView = new BattleView();

		Backbone.trigger('app:showView', this.battleView);
	},

	selectLeft: function (id) {
		var _this = this;
		var model = new CharacterModel({ id: id });

		model.fetch({
			success: function () {
				_this.battleView.left.setCharacter(model);
				_this.battleView.checkReady();
			}
		});
	},

	selectRight: function (id) {
		var _this = this;
		var model = new CharacterModel({ id: id });

		model.fetch({
			success: function () {
				_this.battleView.right.setCharacter(model);
				_this.battleView.checkReady();
			}
		});
	},

	createBattle: function (left, right, winner) {
		var battle = new BattleModel({
			left: left,
			right: right,
			winner: winner
		});

		battle.save();
	}

};