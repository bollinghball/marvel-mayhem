var express = require('express');
var stats = require('battlemanager/data/characters.json');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');

var app = express();

var db = {
	battles: []
};

app.use(bodyParser());
app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/public'));

app.get('/stats', function (req, res) {
	res.json(stats);
});

app.get('/stats/:id', function (req, res) {
	var id = parseInt(req.params.id);

	var stat = stats.find(function (obj) {
		return obj.id === id;
	});

	if (!stat) {
		return res.sendStatus(404);
	}

	res.json(stat);
});

app.get('/battles', function (req, res) {
	res.json(db.battles);
});

app.post('/battles', function(req, res) {
	var battle = {
		id: uuid.v4()
	};

	battle.left = parseInt(req.body.left);
	battle.right = parseInt(req.body.right);

	if (req.body.winner === null || req.body.winner === 'null') {
		battle.winner = null;
	} else {
		battle.winner = parseInt(req.body.winner);
	}

	db.battles.push(battle);

	res.json(battle);
});

app.listen(process.env.PORT || 8000);