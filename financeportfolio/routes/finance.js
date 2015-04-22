/**
 * New node file
 */
var yql = require('yqlp');
exports.getQuotes = function(req, res) {
	var stockSymbol = req.param("stocksymbol");
	var query = "select * from yahoo.finance.quotes where symbol = '"+ stockSymbol + "'";
	yql.exec(query, function(error, response) {
		if (error) {
			console.log('Ut oh! demo has messed up:', error);
		} else {
			var results = response.query.results;
			var output = {
				symbol : results.quote.symbol,
				bid : results.quote.bid,
				DaysLow : results.quote.DaysLow,
				DaysHigh : results.quote.DaysHigh

			};
			res.send(output);
		}
	});
};

exports.getDailyQuotes = function(req, res) {

	var stockSymbol = req.param("stocksymbol");
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();
	var yy = today.getFullYear();

	today = yy + '-' + mm + '-' + dd;
	var start = yy - 1 + '-' + mm + '-' + dd;
	var query = "select * from yahoo.finance.historicaldata where symbol = '"+ stockSymbol + "' and startDate = '" + start + "' and endDate ='"+ today + "'";
	yql.exec(query, function(error, response) {
		var responseArray = [];
		var sum = 0;
		if (error) {
			console.log('Ut oh! demo has messed up:', error);
		} else {
			var results = response.query.results;
			var length = results.quote.length;
			var output;
			for (var i = 0; i < length; i++) {
				responseArray.push({
					Symbol : results.quote[i].Symbol,
					Open : results.quote[i].Open,
					DaysHigh : results.quote[i].High,
					DaysLow : results.quote[i].Low,
					Close : results.quote[i].Close
				});

				var avgperday = parseInt(results.quote[i].High)+ parseInt(results.quote[i].Low) / 2;
				sum += avgperday;
			}
			var average = {
				"avg" : sum / length
			};
			responseArray.push(average);
			res.send(responseArray);
		}
	});
};

exports.getMonthlyQuotes = function(req, res) {

	var stockSymbol = req.param("stocksymbol");
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();
	var yy = today.getFullYear();
	mm = mm+1;
	today = yy + '-' + mm + '-' + dd;
	var start = yy - 1 + '-' + mm + '-' + dd;

	var query = "select * from yahoo.finance.historicaldata where symbol = '"+ stockSymbol + "' and startDate = '" + start + "' and endDate ='"+ today + "'";
	yql.exec(query, function(error, response) {
						if (error) {
							console.log('Ut oh! demo has messed up:', error);
						} else {
							var results = response.query.results;
							var responseArray = [];
							var year_val = results.quote[0].Date
									.substring(0, 4), current_month_val, old_month_val = parseInt(results.quote[0].Date
									.substring(5, 7));
							var max_val = -1, min_val = 4294967295;
							var length = results.quote.length;
							var monthNames = [ "", "January", "February",
									"March", "April", "May", "June", "July",
									"August", "September", "October",
									"November", "December" ];

							for (var i = 0; i < length; i++) {

								current_month_val = parseInt(results.quote[i].Date
										.substring(5, 7));

								if (current_month_val !== old_month_val) {
									var average = (parseInt(max_val) + parseInt(min_val)) / 2;
									var month_val = monthNames[parseInt(old_month_val)]+ " " + year_val;
									responseArray.push({
										Symbol : results.quote[i].Symbol,
										month : month_val,
										Max : max_val,
										Low : min_val,
										avg : average
									});

									max_val = -1;
									min_val = 4294967295;
									old_month_val = current_month_val;
								}

								
									var high = results.quote[i].High;
									if (high > max_val) {
										max_val = high;
									}
									var low = results.quote[i].Low;
									if (low < min_val) {
										min_val = low;
									}
									year_val = results.quote[i].Date.substring(
											0, 4);
								
							}
							res.send(responseArray);
						}
					});
};

exports.getWeeklyQuotes = function(req, res) {

	var stockSymbol = req.param("stocksymbol");
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();
	var yy = today.getFullYear();
	mm = mm+1;
	today = yy + '-' + mm + '-' + dd;
	var start = new Date();
	mm = mm - 3;
	if (mm < 1) {
		mm = 12 + mm;
		yy = yy - 1;
	}
	start = yy + '-' + mm + '-' + dd;
	
	var query = "select * from yahoo.finance.historicaldata where symbol = '"+ stockSymbol + "' and startDate = '" + start + "' and endDate ='"+ today + "'";
	yql.exec(query, function(error, response) {
						if (error) {
							console.log('Ut oh! demo has messed up:', error);
						} else {
							var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
							var results = response.query.results;
							var responseArray = [];
							var current_date, old_date = results.quote[0].Date ;
							var max_val = -1, min_val = 4294967295, day, count=0;
							var length = results.quote.length;

							for (var i = 0; i < length; i++) {

								current_date = results.quote[i].Date;
								var date = new Date(current_date);
								day = days[date.getDay()];
								if(day === "Sunday" && count!==0)
								{
									var average = (parseInt(max_val) + parseInt(min_val)) / 2;
									responseArray.push({
										Symbol : results.quote[i].Symbol,
										week : old_date +" to "+ current_date,
										Max : max_val,
										Low : min_val,
										avg : average
									});
									old_date = current_date;
								}
							
									var high = results.quote[i].High;
									if (high > max_val) {
										max_val = high;
									}
									var low = results.quote[i].Low;
									if (low < min_val) {
										min_val = low;
									}
									if(count===0){count = count+1;}
							}
							res.send(responseArray);
						}
					});
};
