var Backbone = require('backbone');
var $ = require('jquery');

var CharacterDetailsView = Backbone.View.extend({

	events: {
		'click .send': 'sendToBattle'
	},

	initialize: function (options) {
		this.onSendToBattleClick = options.onSendToBattleClick;
		// this.model.stats.on('sync', this.render.bind(this));
		// this.model.battles.on('update', this.render.bind(this));
	},

	render: function () {
		var thumbnail = this.model.get('thumbnail');
		this.$el.html(this.template({
			name: this.model.get('name'),
			thumbnail: thumbnail.path + '/standard_fantastic' + '.' + thumbnail.extension,
			description: this.model.get('description'),
			hasStats: this.model.stats.loaded,
			stats: this.model.stats.toJSON(),
			wins: this.model.getWins().length,
			losses: this.model.getLosses().length
		}));
	},

	template: function (data) {
		return `
			<img src="${data.thumbnail}">
			<div class="details">
				<h2>${data.name}</h2>
				<p>${data.description}</p>
				<div>
					<div class="wins">
						<h3>Wins</h3>
						${data.wins}
					</div>
					<div class="losses">
						<h3>Losses</h3>
						${data.losses}
					</div>
				</div>

				${data.hasStats ? '<button class="send">Send to Battle</button>' : ''}
			</div>
			<div class="stats">
				<div class="labels">
					<ul>
						<li>Durability</li>
						<li>Energy</li>
						<li>Fighting</li>
						<li>Intelligence</li>
						<li>Speed</li>
						<li>Strength</li>
					</ul>
				</div>
				<div class="stats-values">
					<div class="durability value" style="width:${data.stats.durability / 7 * 100}%"></div>
					<div class="energy value" style="width:${data.stats.energy / 7 * 100}%"></div>
					<div class="fighting value" style="width:${data.stats.fighting / 7 * 100}%"></div>
					<div class="intelligence value" style="width:${data.stats.intelligence / 7 * 100}%"></div>
					<div class="speed value" style="width:${data.stats.speed / 7 * 100}%"></div>
					<div class="strength value" style="width:${data.stats.strength / 7 * 100}%"></div>
				</div>
			</div>

			
		`;
	},

	sendToBattle: function () {

		this.onSendToBattleClick();
	}

});

module.exports = CharacterDetailsView;
