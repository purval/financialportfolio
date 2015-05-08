/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , liveprice = require('./routes/liveprice')
  , feeds = require('./routes/twitterfeeds')
  , dataloader = require('./routes/dataloader')
  , http = require('http')
  , path = require('path')
  , sm = require('sitemap')
  , finance = require('./routes/finance');

var WebSocketServer = require('websocket').server;
var users = require('./routes/users');  
var signup = require('./routes/signup');
var login = require('./routes/login');

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
app.use(function (req, res, next) {
	var str = '<?xml version="1.0" encoding="UTF-8"?>';
		str += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
		str += 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';
		str += 'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9';
		str += 'http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';

		str += '<url><loc>http://stockwatchers.me/</loc><priority>1.00</priority></url>';
		str += '<url><loc>http://stockwatchers.me/stats</loc><priority>0.80</priority></url>';
		str += '<url><loc>http://stockwatchers.me/login</loc><priority>0.80</priority></url>';
		str += '<url><loc>http://stockwatchers.me/signup</loc><priority>0.64</priority></url></urlset>';
    if ('/robots.txt' == req.url) {
        res.type('text/plain')
        res.send("User-agent: *\nDisallow: /");
    } else if('/sitemap.xml' == req.url){
    	res.type('application/xml')
        res.send(str);
    }else {
        next();
    }
});
// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

//views
app.get('/', routes.index);
app.get('/hindi', users.hindi);
app.get('/german', users.german);
app.get('/spanish', users.spanish);
app.get('/users', user.list);
app.get('/home', routes.home);
app.get('/users', user.list);
app.get('/stats',routes.stats);
app.get('/leader',routes.leaders);
app.get('/indexold',routes.indexold);
app.get('/financialadvisor',routes.advisingpage);
app.get('/aboutus',routes.aboutus);
//web services
app.get('/quotes/stocksymbol/:stocksymbol',finance.getQuotes);
app.get('/quotes/dailyQuotes/:stocksymbol',finance.getDailyQuotes);
app.get('/quotes/monthlyQuotes/:stocksymbol' ,finance.getMonthlyQuotes);
app.get('/quotes/weeklyQuotes/:stocksymbol' ,finance.getWeeklyQuotes);
app.get('/homepage',liveprice.gethomepage);
app.post('/autocompletelist', liveprice.searchsymbol);
app.get('/getstock/:stocksymbol', liveprice.getstockprice);
app.get('/todaysdata/:stocksymbol',liveprice.todaysdata);
app.get('/twitterfeeds', feeds.selectedtwitterfeeds);
app.get('/gainers', liveprice.getGainers);
app.get('/losers', liveprice.getLosers);
app.post('/dataloader', dataloader.loadData);
app.get('/todaysdata/:stocksymbol',liveprice.todaysdata);
app.get('/todaysdata_watch/:stocksymbol',liveprice.todaysdata1);

//websockets
app.get('/userhome',users.userhome);
app.get('/login', login.login);
app.get('/signup', signup.signup);
app.post('/users/signup',users.signup);
app.post('/users/login',users.loginAuthentication);
app.post('/users/edit/:email',users.edit);
app.post('/users/edit_save/:userid',users.edit_save);
app.post('/users/delete/:email',users.delete_user);
app.post('/users/add_watchlist/:userid/:symbol',users.addwatchlist);
app.post('/users/get_watchlist/:userid',users.getWatchList);
app.post('/users/landing',users.loginAuthentication1);
app.post('/users/portfolio',users.loginAuthentication2);


//websockets
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
