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

exports.getDailyQuotes = function(req,res){

	var stockSymbol = req.param("stocksymbol");
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();
	var yy = today.getFullYear();

	today = yy+'-'+mm+'-'+dd;
	var start = yy-1+'-'+mm+'-'+dd;
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
	        var average = {"avg":sum/length};
	        responseArray.push(average);
	        res.send(responseArray);
	    }
	});
};


exports.getMonthlyQuotes = function(req,res){

	var stockSymbol = req.param("stocksymbol");
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();
	var yy = today.getFullYear();

	today = yy+'-'+mm+'-'+dd;
	var start = yy-1+'-'+mm+'-'+dd;

	var query = "select * from yahoo.finance.historicaldata where symbol = '"+stockSymbol+"' and startDate = '"+start+"' and endDate ='"+today+"'";
	yql.exec(query, function(error, response) {
		var responseArray = [];
		var sum = 0;
		var old_mm = 0, new_mm;
		var max_val = -1;
	    if (error) {
	        console.log('Ut oh! demo has messed up:', error);
	    } else {
	        var results = response.query.results;
	        var length=results.quote.length;
	        var output;
	        for(var i = 1;i<length+1;i++ ){
	        	
	        new_mm = parseInt(results.quote[i].Date.substring(5, 7));
	        //console.log(mm_val);
	        if(new_mm != old_mm)
	        	{
	        		max_val = -1;
	        	}
	        else
	        	{var temp = parseInt(results.quote[i].High);
	        		if(temp>max_val) {max_val = temp;}
	        	}
	        	
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
