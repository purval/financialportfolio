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
	client.keys(query.toLowerCase(), function(err, reply) {
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
		  console.log("winners sucess");
		  var temp = body.toString().split('<div');
		  var response = "<div";
		  for(i=0; i<temp.length; i++){
			  var patt = new RegExp(/(^ id="yfitp")/);
			  if(patt.test(temp[i])){
				  response = response + temp[i];
				  response = response.replace("<table", "<table id='gainersTable'");
				  res.send(response);
			  }
		  }
	  }else{
		  console.log(error);		  
	  }
	});
};

exports.getLosers = function(req, res){
	var request = require('request');
	request('https://ca.finance.yahoo.com/losers?e=to', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		  console.log("losers sucess");
		  var temp = body.toString().split('<div');
		  var response = "<div";
		  for(i=0; i<temp.length; i++){
			  var patt = new RegExp(/(^ id="yfitp")/);
			  if(patt.test(temp[i])){
				  response = response + temp[i];
				  response = response.replace("<table", "<table id='loosersTable'");
				  res.send(response);
			  }
		  }
	  }else{
		  console.log(error);		  
	  }
	});
};

exports.todaysdata = function(req,res){
	var request = require('request');
	var stockName = req.param("stocksymbol").toLowerCase();
	console.log(stockName);
	client.get(stockName, function(err, stockSymbol) {
		if(!err){
			console.log(stockSymbol);
			var d = new Date();
			var m = d.getMonth()+1;
			var y = d.getFullYear();
			var n = d.getDate();
			if(m < 10){
				m = "0"+m.toString();
			}
			if(n < 10){
				n = "0"+n.toString();
			}
			var date = y.toString() + m.toString() + n.toString();
			var urlStr = "http://hopey.netfonds.no/tradedump.php?date="+ date + "&paper="+ stockSymbol + ".O&csv_format=txt";
			console.log(urlStr);
			request(urlStr, function (error, response, body) {
			  var finalObj = [];
			  if (!error && response.statusCode == 200) {
			  var newLineSplit = body.split("\n");
			  if(newLineSplit.length<=1){
				  res.send("none");
			  }
				  for(i=0;i<newLineSplit.length-1;i++){
					  if(i == 0){
						  
					  }else{ 
						  var commaSplit = newLineSplit[i].split("\t");
						  var timeSplit = commaSplit[0].split("T");
						  var hrs = parseInt(timeSplit[1].substring(0, 2))-14;
						  //console.log(timeSplit[1].substring(0, 2)+" "+timeSplit[1].substring(2, 4)+" "+timeSplit[1].substring(4, 6));
						  var d = new Date(y, m-1, n, hrs, timeSplit[1].substring(2, 4), timeSplit[1].substring(4, 6));
						  //console.log(d);
						  var objData = [d.getTime(), parseFloat(commaSplit[1])];
							
						  finalObj.push(objData);
					  }
				  }
			  }else{
				  console.log(error);
			  }
			  res.send(JSON.parse(JSON.stringify(finalObj)));
			});
		}	
	});
};

exports.todaysdata1 = function(req,res){
	var request = require('request');
	var stockSymbol = req.param("stocksymbol");
	
			var d = new Date();
			var m = d.getMonth()+1;
			var y = d.getFullYear();
			var n = d.getDate()-1;
			var date = y.toString() + '0' +m.toString() + n.toString();
			var urlStr = "http://hopey.netfonds.no/tradedump.php?date="+ date + "&paper="+ stockSymbol + ".O&csv_format=txt";
			
			request(urlStr, function (error, response, body) 
					{
			  var finalObj = [];
			  if (!error && response.statusCode === 200) {
			  var newLineSplit = body.split("\n");
			  if(newLineSplit.length<=1){
				  res.send("none");
			  }
				  for(var i=0;i<newLineSplit.length-1;i++){
					  if(i === 0){
						  
					  }else{ 
						  var commaSplit = newLineSplit[i].split("\t");
						  var timeSplit = commaSplit[0].split("T");
						  var hrs = parseInt(timeSplit[1].substring(0, 2))-14;
						  //console.log(timeSplit[1].substring(0, 2)+" "+timeSplit[1].substring(2, 4)+" "+timeSplit[1].substring(4, 6));
						  var d = new Date(y, m-1, n, hrs, timeSplit[1].substring(2, 4), timeSplit[1].substring(4, 6));
						  //console.log(d);
						  var objData = [d.getTime(), parseFloat(commaSplit[1])];
							
						  finalObj.push(objData);
					  }
				  }
			  }else{
				  console.log(error);
			  }
			  res.send(JSON.parse(JSON.stringify(finalObj)));
			});	
};