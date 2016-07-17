var express = require('express');
var stats = require('battlemanager/data/characters.json');

var app = express();

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

	res.json(stat);
});

app.listen(8000);