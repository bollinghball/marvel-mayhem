module.exports = {
	
	base: 'http://gateway.marvel.com:80/v1/public/',

	apiKey: '308fd22814de579913e8b4c912e160a8',

	url: function (resource) {
		return this.base + resource + '?apikey=' + this.apiKey;
	}

};