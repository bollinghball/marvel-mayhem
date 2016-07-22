var Backbone = require('backbone');
var BattleModel = require('./BattleModel');
var BattleCollection = require('../Battle/BattleCollection');
var CharacterListView = require('../Character/CharacterListView');
var CharacterModel = require('../Character/CharacterModel');
var CharacterCollection = require('../Character/CharacterCollection');
var $ = require('jquery');

var RecentBattlesView = Backbone.View.extend({

	initialize: function (x){
		var _this = this;
		this.collection = new BattleCollection();
		this.collection.fetch({
			success: function(){
				_this.load(x);
			}
		});
	},

	load: function(x){
		var _this = this;
		var loaded = 0;
		var battle = this.collection.at(this.collection.length-x);
		if(battle){
			this.left = new CharacterModel({id: battle.get('left')});
			this.right = new CharacterModel({id: battle.get('right')});
			this.winner = battle.get('winner');
			
			function checkReady () {
				if (loaded === 2) {
					_this.render();
				}
			}

			this.left.fetch({
				success: function () {
					loaded++;
					checkReady();
				}
			});
			this.right.fetch({
				success: function () {
					loaded++;
					checkReady();
				}
			});
		}
	},

	template: function(){
		return `<div class="recent-battles">
			<div class="leftresult"></div>
			<img src="assets/images/vs.png"/>
			<div class="rightresult"></div>
		</div>`
	},

	render: function(){
		this.$el.empty();
		this.$el.html(this.template());
		var i = $('<img/>');
		i.attr("src", this.left.getThumbnail('standard_fantastic'));
		this.$('.leftresult').append(i);
		var j = $('<img/>');
		j.attr("src", this.right.getThumbnail('standard_fantastic'));
		this.$('.rightresult').append(j);

		var result = $('<div/>');
		var img = $('<img class="winnerstamp" src="assets/images/winner.png"/>')
		result.append(img);

		if(this.winner === "draw"){
			// result.text("draw");
			result.css("text-align", "center");
		} else {
			// result.text("winner");
			if (this.winner === this.left.get('name')){
				result.css("text-align", "left");
				j.attr('data-outcome', 'loser')
			} else {
				result.css("text-align", "right");
				i.attr('data-outcome', 'loser')
			}
		}
		result.css('margin', '0 15%');
		this.$('.recent-battles').append(result);

	}
});

module.exports = RecentBattlesView;