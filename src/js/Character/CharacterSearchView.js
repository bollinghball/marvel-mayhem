var Backbone = require('backbone');

var CharacterCollection = require('./CharacterCollection');
var CharacterListView = require('./CharacterListView');

var CharacterSearchView = Backbone.View.extend({

	className: 'search',

	events: {
		'click .search-button': 'handleSearchClick',
		'keyup :input': 'logKey'
	},

	initialize: function (options) {
		this.onItemClick = options.onItemClick;
		this.collection = new CharacterCollection();
		this.listView =  new CharacterListView({
			collection: this.collection,
			onItemClick: this.onItemClick
		});
	},

	render: function () {
		this.$el.html(this.template());
		this.$('.list-region').append(this.listView.$el);
	},

	template: function () {
		return `
			<input type="text" class="search-input">
			<button class="search-button">Search</button>
			<div class="list-region"></div>
		`;
	},

	show: function () {
		this.$el.removeClass('hidden');
	},

	hide: function () {
		this.$el.addClass('hidden');
	},

	handleSearchClick: function () {
		this.collection.fetch({
			data: {
				nameStartsWith: this.$('.search-input').val()
			}
		});
	},

	logKey: function (e) {
		var val = this.$('.search-input').val();
		if (e.keyCode === 13 && val.length > 0) {
			this.collection.fetch({
				data: {
					nameStartsWith: val
				}
			});
		
		this.$('.search-input').val('')
		}
	}

});

module.exports = CharacterSearchView;