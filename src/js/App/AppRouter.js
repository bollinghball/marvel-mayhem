var Backbone = require('backbone');

var homeController = require('../Home/HomeController');
var characterController = require('../Character/CharacterController');
var battleController = require('../Battle/BattleController');

var AppRouter = Backbone.Router.extend({

	routes: {
		'(home)': 'home',
		'characters': 'showCharacterPage',
		'battle': 'showBattle',
		'battle/(:left),(:right)': 'showBattle'
	},

	home: function () {
		homeController.showHome();
	},

	showCharacterPage: function () {
		characterController.showCharacterPage();
	},

	showBattle: function (left, right) {
		battleController.showBattlePage();

		if (left) {
			battleController.selectLeft(left);
		}

		if (right) {
			battleController.selectRight(right);
		}
	}

});

module.exports = AppRouter;