var dbConn = require('../dbconnectivity/dbConnection');
var client = dbConn.getRedisConnection();
var xyz = require('http');
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

<<<<<<< HEAD
exports.todaysdata = function(req,res){
	var request = require('request');
	var parser= require('babyparse');
	var stockSymbol = req.param("stocksymbol");
	var d = new Date();
	var m = d.getMonth()+1;
	var y = d.getFullYear();
	var n = d.getDate();
	var date = y.toString() + '0' +m.toString() + n.toString();
	request("http://hopey.netfonds.no/tradedump.php?date='"+ date + "'&paper='"+ stockSymbol + "'+.O&csv_format=txt", function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var parsed= parser.parse(body);
	    console.log(parsed.data);
	    res.send(parsed.data);
	  }else{
		  console.log(error);
	  }
	})
=======
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
>>>>>>> origin/master
};