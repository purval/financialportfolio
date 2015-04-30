var mysql = require('mysql2');
var redis = require("redis");
var client = redis.createClient(6379,"127.0.0.1");

function getRedisConnection(){
	return client;
}

exports.getPoolInstance = function(){
	
	if(pool != null){
		return pool;
	}
	else
	{
		pool  = mysql.createPool({

			host     : 'cmpe282lab.cckbiaous4u7.us-west-1.rds.amazonaws.com',

			user     : 'CMPE282',

			password : 'cmpe282shim',

			port : '3306',

			database : 'busi_soc_net'

		});
		return pool;
	}	
};

exports.getRedisConnection = getRedisConnection;