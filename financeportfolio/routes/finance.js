/**
 * New node file
 */
var yql = require('yqlp');
exports.getQuotes = function(req,res){
//	var stockSymbol = req.body.stocksymbol;
	var stockSymbol = req.param("stocksymbol");
//	console.log(stockSymbol);
	var query = "select * from yahoo.finance.quotes where symbol = '"+stockSymbol+"'";
	yql.exec(query, function(error, response) {
	    if (error) {
	        console.log('Ut oh! demo has messed up:', error);
	    } else {
	        var results = response.query.results;
	        var output =
	        	{
	         symbol:   results.quote.symbol,
	         bid:      results.quote.bid,
	         DaysLow:  results.quote.DaysLow,
	         DaysHigh: results.quote.DaysHigh
	       
	        	};
	        console.log(output);
	        res.send(output);
	    }
	});
};

exports.getMonthlyQuotes = function(req,res){

	var stockSymbol = req.param("stocksymbol");
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){
	dd='0'+dd;
	} 
	if(mm<10){
	mm='0'+mm;
	} 
	today = yyyy+'-'+mm+'-'+dd;
	var start = yyyy-1+'-'+mm+'-'+dd;
	console.log(today+ " " +start);
	var query = "select * from yahoo.finance.historicaldata where symbol = '"+stockSymbol+"' and startDate = '"+start+"' and endDate ='"+today+"'";
	yql.exec(query, function(error, response) {
		var responseArray = [];
		var sum = 0;
	    if (error) {
	        console.log('Ut oh! demo has messed up:', error);
	    } else {
	        var results = response.query.results;
	        console.log(results);
	        console.log(results.quote[0].Symbol);
	        var length=results.quote.length;
	        var output;
	        for(var i = 0;i<length;i++ ){
	        responseArray.push(
	        	{
	         Symbol:   results.quote[i].Symbol,
	         Open:      results.quote[i].Open,
	         DaysHigh:  results.quote[i].High,
	         DaysLow: results.quote[i].Low,
	         Close: results.quote[i].Close
	        	});
	        
	        var avgperday = parseInt(results.quote[i].High) + parseInt(results.quote[i].Low) / 2;
	        sum += avgperday;
	        }
	        console.log(sum/length);
	        res.send(responseArray);
	    }
	});
};
