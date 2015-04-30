/**
 * loads symbol-stock name data into redis
 */
var basicCSV = require("basic-csv");
var dbConn = require('../dbconnectivity/dbConnection');
var client = dbConn.getRedisConnection();

exports.loadData = function(req, res){
	basicCSV.readCSV("companylist.csv", {
	  dropHeader: true
	}, function (error, rows) {
	  console.log(rows.length);
	  rows.forEach(function(item){
		  console.log(item[1].toLowerCase() +" "+ item[0]);
		  client.set(item[1].toLowerCase(), item[0]);
	  });
	});
};
