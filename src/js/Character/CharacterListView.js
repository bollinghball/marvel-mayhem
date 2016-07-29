var Backbone = require('backbone');
var CharacterListItemView = require('./CharacterListItemView');

var CharacterListView = Backbone.View.extend({

	tagName: 'ul',

	className: 'character-list',

	initialize: function (options) {
		this.onItemClick = options.onItemClick;
		this.collection.on('update reset add', this.render.bind(this));
	},

	render: function () {
		var _this = this;

		// Remove the previous views
		if (this.childViews) {
			this.childViews.forEach(function (view){
				view.remove();
			});
		}

		// Create the views
		this.childViews = this.collection.map(function (character) {
			var listItemView = new CharacterListItemView({
				model: character,
				onClick: _this.onItemClick
			});
			return listItemView;
		});

		// Render/append the views
		this.childViews.forEach(function (view) {
			view.render();
			_this.$el.append(view.$el);
		});
	}

});

module.exports = CharacterListView;