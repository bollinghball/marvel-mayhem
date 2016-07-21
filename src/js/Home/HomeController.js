var Backbone = require('backbone');

var HomeView = require('./HomeView');
var BattleCollection = require('../Battle/BattleCollection');

module.exports = {

	showHome: function () {
		var battles = new BattleCollection();

		battles.fetch();

		var view = new HomeView({ battles: battles});
		// tell appView to show/render the view
		Backbone.trigger('app:showView', view);
	}

};