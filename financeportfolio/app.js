

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , yahooFinance = require('yahoo-finance')
  , http = require('http')
  , path = require('path')
  , finance = require('./routes/finance');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
app.get('/', function(req,res){
	yahooFinance.historical({
	  symbol: 'AAPL',
	  from: '2015-04-01',
	  to: '2015-04-15' 
	}, function (err, quotes) {
		console.log(quotes);
	});
});

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/quotes/stocksymbol/:stocksymbol',finance.getQuotes);
app.get('/quotes/monthlyQuotes/:stocksymbol' ,finance.getMonthlyQuotes);
app.get('/quotes/dailyQuotes/:stocksymbol' ,finance.getDailyQuotes);


/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , liveprice = require('./routes/liveprice')
  , http = require('http')
  , path = require('path')
  , finance = require('./routes/finance');

var WebSocketServer = require('websocket').server;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/quotes/stocksymbol/:stocksymbol',finance.getQuotes);
app.get('/quotes/timeperiod/:stocksymbol' ,finance.getMonthlyQuotes);
app.get('/homepage',liveprice.gethomepage);
app.get('/autocompletelist', liveprice.searchsymbol);
app.get('/getstock/:stocksymbol', liveprice.getstockprice);

var server = http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});

var wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
        liveprice.liveticker(message, function(err, reply){
        	connection.send(reply);
        });
    });

    connection.on('close', function(connection) {     
    });
});

