
/*
 * GET users listing.
 */
var yql = require('yqlp');

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.getQuotes = function(req,res){
//	var stockSymbol = req.body.stocksymbol;
	var stockSymbol = req.param("stocksymbol");
	console.log(stockSymbol);
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
}