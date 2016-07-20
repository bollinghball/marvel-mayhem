var Backbone = require('backbone');
var $ = require('jquery');

var BattleModel = require('./BattleModel');

var BattleLogView = Backbone.View.extend({

	initialize: function (options) {
		this.left = options.left;
		this.right = options.right;
	},

	render: function () {
		this.$el.html(this.template());
	},

	bindEvents: function(){
		$('.log-button').click(function(){
			$('.log-button').addClass('active');
			$('.resultsbutton').removeClass('active');
			$('.log').addClass('active');
			$('.results').removeClass('active');
		})
		$('.results-button').click(function(){
			$('.log-button').removeClass('active');
			$('.results-button').addClass('active');
			$('.results').addClass('active');
			$('.log').removeClass('active');
		})
	},

	displayResults: function(res){
		var i = $('<img/>');
		i.attr("src", this.left.getThumbnail());
		$('.leftresult').append(i);
		var j = $('<img/>');
		j.attr("src", this.right.getThumbnail());
		$('.rightresult').append(j);

		var result = $('<div/>');

		if(res.winner === "draw"){
			result.text("draw");
			result.css("text-align", "center");
		} else {
			result.text("winner");
			if (res.winner.name === this.left.attributes.name){
				result.css("text-align", "left");
			} else {
				result.css("text-align", "right");
			}
		}

		result.css('margin', '0 15%');

		$('.results').append(result);
	},

	template: function () {
		return `
			<div class="tabs cf">
				<button class="log-button">Log</button>
				<button class="results-button">Results</button>
			</div>
			<div class="tab active log">
				<ul></ul>
			</div>
			<div class="tab results">
				<div class = "leftresult">
				</div>
				<div class = "rightresult">
				</div>
			</div>
				
		`;
	},

	start: function () {
		var results = BattleManager.narrativeBattle(this.left.stats.toJSON(), this.right.stats.toJSON());
		var winner = results.winner.id;
					console.log(results);

		var battle = new BattleModel({
			left: this.left.get('id'),
			right: this.right.get('id'),
			winner: winner
		});

		battle.save();

		var _this = this;
		var healthbars = $('.health');

		var x = -1;
		var battleInterval = window.setInterval(function(){
			x++;
			if(x>results.fightData.length-2){
				_this.trigger('finished');
				_this.displayResults(results);
				$('.tabs').toggleClass('active');
				clearInterval(battleInterval);
			}
			var li = $('<li/>');
			li.text(results.fightData[x].message);
			if(results.fightData[x].attackerName === _this.left.attributes.name){
				healthbars[0].setAttribute('data-health', parseInt(results.fightData[x].attackerWounds));
				healthbars[1].setAttribute('data-health', parseInt(results.fightData[x].defenderWounds));
			} else {
				healthbars[1].setAttribute('data-health', parseInt(results.fightData[x].attackerWounds));
				healthbars[0].setAttribute('data-health', parseInt(results.fightData[x].defenderWounds));
			};
			$('.log ul').prepend(li);
		}, 1000);

	}

});

module.exports = BattleLogView;