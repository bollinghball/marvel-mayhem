// Renders a character with a CharacterModel
// Takes a callback function to execute when it's clicked
// 
var Backbone = require('backbone');

var CharacterListItemView = Backbone.View.extend({

	tagName: 'li',

	events: {
		'click': 'handleClick'
	},

	initialize: function (options) {
		this.onClick = options.onClick;
	},

	render: function () {
		var thumbnail = this.model.get('thumbnail');
		this.$el.html(this.template({
			name: this.model.get('name'),
			thumbnail: thumbnail.path + '/standard_xlarge' + '.' + thumbnail.extension
		}));
	},

	template: function (data) {
		return `
			<div>${data.name}</div>
			<img src="${data.thumbnail}">
		`; 
	},

	handleClick: function () {
		this.onClick(this.model);
	}

});

module.exports = CharacterListItemView;