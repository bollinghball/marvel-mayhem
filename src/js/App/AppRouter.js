var Backbone = require('backbone');

var homeController = require('../Home/HomeController');
var characterController = require('../Character/CharacterController');
var battle = require('../Battle/controller');

var AppRouter = Backbone.Router.extend({

	routes: {
		'(home)': 'home',
		'characters': 'showCharacterPage',
		'battle': 'showBattle',
		'battle/(:left),(:right)': 'showBattle',
		'battle/(:left)': 'showBattle'
	},

	home: function () {
		homeController.showHome();
	},

	showCharacterPage: function () {
		characterController.showCharacterPage();
	},

	showBattle: function (left, right) {
		battle.showBattlePage(left, right);
	}

});

module.exports = AppRouter;