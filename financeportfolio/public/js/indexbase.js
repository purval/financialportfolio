(function($) {
$.fn.jStockTicker = function(options) {
	if (typeof (options) == 'undefined') {
					options = {};
				}
				var settings = $.extend( {}, $.fn.jStockTicker.defaults, options);
				var $ticker = $(this);
				var $wrap = null;
				settings.tickerID = $ticker[0].id;
				$.fn.jStockTicker.settings[settings.tickerID] = {};
 
				if ($ticker.parent().get(0).className != 'wrap') {
	$wrap = $ticker.wrap("<div class='wrap'></div>");
				}
 
				var $tickerContainer = null;
				if ($ticker.parent().parent().get(0).className != 'container') {
	$tickerContainer = $ticker.parent().wrap(
			"<div class='container'></div>");
}

var node = $ticker[0].firstChild;
var next;
while(node) {
	next = node.nextSibling;
	if(node.nodeType == 3) {
		$ticker[0].removeChild(node);
	}
	node = next;
}

var shiftLeftAt = $ticker.children().get(0).offsetWidth;
$.fn.jStockTicker.settings[settings.tickerID].shiftLeftAt = shiftLeftAt;
$.fn.jStockTicker.settings[settings.tickerID].left = 0;
$.fn.jStockTicker.settings[settings.tickerID].runid = null;
$ticker.width(2 * screen.availWidth);

function startTicker() {
	stopTicker();
	
	var params = $.fn.jStockTicker.settings[settings.tickerID]; 
	params.left -= settings.speed;
	if(params.left <= params.shiftLeftAt * -1) {
		params.left = 0;
		$ticker.append($ticker.children().get(0));
		params.shiftLeftAt = $ticker.children().get(0).offsetWidth;
	}
	
$ticker.css('left', params.left + 'px');
					params.runId = setTimeout(arguments.callee, settings.interval);
					
					$.fn.jStockTicker.settings[settings.tickerID] = params;
				}
				
				function stopTicker() {
					var params = $.fn.jStockTicker.settings[settings.tickerID];
					if (params.runId)
						clearTimeout(params.runId);
					
					params.runId = null;
					$.fn.jStockTicker.settings[settings.tickerID] = params;
				}
				
				function updateTicker() {			
					stopTicker();
					startTicker();
				}
				
				$ticker.hover(stopTicker,startTicker);		
				startTicker();
			};
 
			$.fn.jStockTicker.settings = {};
			$.fn.jStockTicker.defaults = {
				tickerID :null,
				url :null,
				speed :1,
				interval :20
			};
		})(jQuery);

$(window).load(function () {
    StockPriceTicker();
    setInterval(function() {StockPriceTicker();} , 60000);
});
function StockPriceTicker() {
    var Symbol = "", CompName = "", Price = "", ChnageInPrice = "", PercentChnageInPrice = ""; 
    var CNames = " ^FTSE,HSBA.L,SL.L,BATS.L,BLND.L,FLG.L,RBS.L,RMG.L,VOD.L,GOOG,YHOO,MSFT,SIRI,AMAT,FB,WYNN";
    var flickerAPI = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22" + CNames + "%22)&env=store://datatables.org/alltableswithkeys";
    var StockTickerHTML = "";
    
    var StockTickerXML = $.get(flickerAPI, function(xml) {
        $(xml).find("quote").each(function () {
            Symbol = $(this).attr("symbol");
            $(this).find("Name").each(function () {
                CompName = $(this).text();
            });
            $(this).find("LastTradePriceOnly").each(function () {
                Price = $(this).text();
            });
            $(this).find("Change").each(function () {
                ChnageInPrice = $(this).text();
            });
            $(this).find("PercentChange").each(function () {
                PercentChnageInPrice = $(this).text();
            });
            
            var PriceClass = "GreenText", PriceIcon="up_green";
            if(parseFloat(ChnageInPrice) < 0) { PriceClass = "RedText"; PriceIcon="down_red"; }
            StockTickerHTML = StockTickerHTML + "<span class='" + PriceClass + "'>";
            StockTickerHTML = StockTickerHTML + "<span class='quote'>" + CompName + " (" + Symbol + ")</span> ";
            
            StockTickerHTML = StockTickerHTML + parseFloat(Price).toFixed(2) + " ";
            StockTickerHTML = StockTickerHTML + "<span class='" + PriceIcon + "'></span>" + parseFloat(Math.abs(ChnageInPrice)).toFixed(2) + " (";
            StockTickerHTML = StockTickerHTML + parseFloat( Math.abs(PercentChnageInPrice.split('%')[0])).toFixed(2) + "%)</span>";
        });
		
        $("#dvStockTicker").html(StockTickerHTML);
        $("#dvStockTicker").jStockTicker({interval: 30, speed: 3});
    });
}

$(function () {
	$('#containerr').html(" ");
	var html = "";
	html += "<div id='progess-sec' class='progress'>";
	html += "<div id='styleremove' class='progress-bar progress-bar-striped active' role='progressbar'";
	html += " aria-valuenow='65' aria-valuemin='0' aria-valuemax='100'>";
	html += " Loading </div> </div>";
	  
	$('#containerr').append(html);
	
    $.getJSON('/todaysdata/Google Inc.', function (data) {
		$('#progess-sec').remove();
        // Create the chart
        $('#containerr').highcharts('StockChart', {

            title : {
                text : 'GOOG Stock Price'
            },
			xAxis: {
                gapGridLineWidth: 0
            },
			exporting: { enabled: false },
			
            rangeSelector : {
                buttons : [{
                    type : 'hour',
                    count : 1,
                    text : '1h'
                }, {
                    type : 'day',
                    count : 1,
                    text : '1D'
                }, {
                    type : 'all',
                    count : 1,
                    text : 'All'
                }],
                selected : 1,
                inputEnabled : false
            },
            series : [{
                name : 'GOOG Stock Price',
                data : data,
                type : 'area',
                threshold : null,
                tooltip : {
                    valueDecimals : 2
                },
                fillColor : {
                    linearGradient : {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops : [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                threshold : null
            }]
        });
    });
});