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

exports.getGainers = function(req, res){
	var request = require('request');
	request('https://ca.finance.yahoo.com/gainers?e=O', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		  var temp = body.toString().split('<div');
		  var response = "<div";
		  for(i=0; i<temp.length; i++){
			  var patt = new RegExp(/(^ id="yfitp")/);
			  if(patt.test(temp[i])){
				  response = response + temp[i];
				  res.send(response);
			  }
		  }
	  }
	});
};

exports.getGainers = function(req, res){
	var request = require('request');
	request('https://ca.finance.yahoo.com/gainers?e=O', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		  var temp = body.toString().split('<div');
		  var response = "<div";
		  for(i=0; i<temp.length; i++){
			  var patt = new RegExp(/(^ id="yfitp")/);
			  if(patt.test(temp[i])){
				  response = response + temp[i];
				  res.send(response);
			  }
		  }
	  }
	});
};

exports.getLosers = function(req, res){
	var request = require('request');
	request('https://ca.finance.yahoo.com/losers?e=to', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		  var temp = body.toString().split('<div');
		  var response = "<div";
		  for(i=0; i<temp.length; i++){
			  var patt = new RegExp(/(^ id="yfitp")/);
			  if(patt.test(temp[i])){
				  response = response + temp[i];
				  res.send(response);
			  }
		  }
	  }
	});
};