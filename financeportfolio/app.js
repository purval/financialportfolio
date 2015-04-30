/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , liveprice = require('./routes/liveprice')
  , feeds = require('./routes/twitterfeeds')
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
app.get('/quotes/dailyQuotes/:stocksymbol',finance.getDailyQuotes);
app.get('/quotes/monthlyQuotes/:stocksymbol' ,finance.getMonthlyQuotes);
app.get('/quotes/weeklyQuotes/:stocksymbol' ,finance.getWeeklyQuotes);
app.get('/homepage',liveprice.gethomepage);
app.post('/autocompletelist', liveprice.searchsymbol);
app.get('/getstock/:stocksymbol', liveprice.getstockprice);
app.get('/twitterfeeds', feeds.selectedtwitterfeeds);
app.get('/gainers', liveprice.getGainers);
app.get('/losers', liveprice.getLosers);
app.post('/dataloader', dataloader.loadData);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
    	var optionJson = JSON.parse(message.utf8Data);
    	if(optionJson.option === 'twitterfeeds'){
    		feeds.twitterfeeds(message, function(err, reply){
            	connection.send(reply);
            });
    	}else{
    		liveprice.liveticker(message, function(err, reply){
            	connection.send(reply);
            });
    	}
    });

    connection.on('close', function(connection) {     
    });
});
