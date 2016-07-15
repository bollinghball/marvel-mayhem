var Backbone = require('backbone');

var CharacterDetailsView = Backbone.View.extend({

	events: {
		'click .send': 'sendToBattle'
	},

	initialize: function (options) {
		this.onSendToBattleClick = options.onSendToBattleClick;
	},

	render: function () {
		var thumbnail = this.model.get('thumbnail');
		this.$el.html(this.template({
			name: this.model.get('name'),
			thumbnail: thumbnail.path + '/portrait_uncanny' + '.' + thumbnail.extension,
			description: this.model.get('description')
		}));
	},

	template: function (data) {
		return `
			<img src="${data.thumbnail}">
			<h2>${data.name}</h2
			<p>${data.description}</p>
			<button class="send">Send to Battle</button>
			<div class="stats">
				<ul>
					<li>Durability</li>
					<li>Energy</li>
					<li>Fighting</li>
					<li>Intelligence</li>
					<li>Speed</li>
					<li>Strength</li>
				</ul>
			</div>
		`;
	},

	sendToBattle: function () {
		this.onSendToBattleClick();
	}

});

module.exports = CharacterDetailsView;
