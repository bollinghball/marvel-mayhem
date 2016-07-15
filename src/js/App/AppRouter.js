var Backbone = require('backbone');

var homeController = require('../Home/HomeController');
var characterController = require('../Character/CharacterController');

var AppRouter = Backbone.Router.extend({

	routes: {
		'': 'home',
		'characters/:id': 'showCharacter'
	},

	home: function () {
		homeController.showHome();
	},

	showCharacter: function (id) {
		// We only want to do both of these things when the
		// page reloads.
		characterController.showCharacterPage();
		characterController.popupCharacter(id);
	}

});

module.exports = AppRouter;