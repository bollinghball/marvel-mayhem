var Backbone = require('backbone');

var BattleCollection = require('./BattleCollection');
var CharacterModel = require('../Character/CharacterModel');
var BattleView = require('./BattleView');

module.exports = {

	showBattlePage: function (left, right) {
		var leftModel;
		var rightModel;

		var battleCollection = new BattleCollection();

		battleCollection.fetch();

		var battleView = new BattleView({ battles: battleCollection });

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