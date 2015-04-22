var dbConn = require('../dbconnectivity/dbConnection');
var client = dbConn.getRedisConnection();

exports.gethomepage = function(req, res){
  res.render('homepage');
};

exports.liveticker = function(message, callback){
  console.log(message);
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