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
			}
		});
	},

	selectRight: function (id) {
		var _this = this;
		var model = new CharacterModel({ id: id });

		model.fetch({
			success: function () {
				_this.battleView.right.setCharacter(model);
			}
		});
	}

};