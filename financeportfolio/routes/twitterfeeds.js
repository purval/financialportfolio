/**
 * provide selected twitter feeds
 */
var Twitter = require('node-twitter');

var twitterRestClient = new Twitter.RestClient(
    'ICCJjJmGIyxkFVnaJ0HuNk5tr',
    'p8Q2xiVgNDUjflXVlYJjXwI86ztfyV7geObKN1eiHKPCt72n0l',
    '3166999940-VbbEOoTY4uyMHavoSi5h77nCPslARo1w8ZzDztS',
    'YIRijWq54ml9WaAFs6me8AuTj1EKSDbG1jaG97fRil8hg'
);

exports.twitterfeeds = function(message, callback){
	var resultfeeds = "";
	twitterRestClient.statusesHomeTimeline({}, function(error, result) {
	    if (error){
	        console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
	    }else{
	    	//console.log(result);
	    	resultfeeds = JSON.parse(JSON.stringify(result));
	    }
	    callback(error, resultfeeds);
	});
};

exports.selectedtwitterfeeds = function(req, res){
	var resultfeeds = [];
	twitterRestClient.statusesHomeTimeline({}, function(error, result) {
	    if (error){
	        console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
	    }else{
	    	for(i=0; i<result.length; i++){
		    	temp = {
		    		created : result[i].created_at,
		    		text : result[i].text,
		    		source : result[i].source,
		    		description : result[i].user.description,
		    		name : result[i].user.name,
		    		url : result[i].user.url,
		    		profile_url : result[i].user.profile_image_url
		    	};
		    	resultfeeds.push(temp);
	    	}
	    	res.send(resultfeeds);
	    }
	});
}