var dbConn = require('../dbconnectivity/dbConnection');
var client = dbConn.getRedisConnection();

exports.gethomepage = function(req, res){
  res.render('homepage');
};

exports.liveticker = function(message, callback){
  callback("error", "success reply");
};

exports.searchsymbol = function(req, res){
	console.log(req.body);
	var query = req.body.query+"*";
	console.log(query);
	client.keys(query, function(err, reply) {
	    console.log(reply);
		res.send(reply);
	});
};

exports.getstockprice = function(req, res){
  console.log(req.params.stocksymbol);
};

exports.getGainersLosers = function(req, res){
	var request = require('request');
	request('https://ca.finance.yahoo.com/gainers?e=O', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    console.log(body);
	  }
	});
};