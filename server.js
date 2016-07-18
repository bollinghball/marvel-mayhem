var express = require('express');
var stats = require('battlemanager/data/characters.json');
var bodyParser = require('body-parser');

var app = express();

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

app.post('/battles', function(req, res) {
	console.log(req.body);
	res.send(500);
});

app.listen(8000);