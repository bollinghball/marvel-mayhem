var Backbone = require('backbone');

var CharacterModel = require('../Character/CharacterModel');
var BattleView = require('./BattleView');

module.exports = {

	showBattlePage: function (left, right) {
		var leftModel;
		var rightModel;

		var battleView = new BattleView();

		if (left) {
			leftModel = new CharacterModel({ id: left });
			leftModel.fetch({
				success: function () {
					battleView.left.setCharacter(leftModel);
					battleView.checkReady();
				}
			});
		}

		if (right) {
			rightModel = new CharacterModel({ id: right });
			rightModel.fetch({
				success: function () {
					battleView.right.setCharacter(rightModel);
					battleView.checkReady();
				}
			});
		}

		Backbone.trigger('app:showView', battleView);
	}

};