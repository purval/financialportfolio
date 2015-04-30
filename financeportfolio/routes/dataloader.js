/**
 * loads symbol-stock name data into redis
 */
var basicCSV = require("basic-csv");
var dbConn = require('../dbconnectivity/dbConnection');
var client = dbConn.getRedisConnection();

exports.loadData = function(req, res){
	console.log("here");
	basicCSV.readCSV("companylist.csv", {
	  dropHeader: true
	}, function (error, rows) {
	  console.log(rows.length);
	  rows.forEach(function(item){
		  console.log(item[1]+" "+ item[0]);
		  //var redis = require("redis");
		  //var client = redis.createClient(6379,"127.0.0.1");
		  var key = '"'+item[1]+'"';
		  client.set(item[1].toLowerCase(), item[0]);
		  client.get(item[1].toLowerCase(), function(err, reply) {
			    console.log(reply);
			});
		 // client.end();
	  });
	});
};
