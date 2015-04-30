var mysql = require('mysql2');
var redis = require("redis");
var client = redis.createClient(6379,"127.0.0.1");

function getRedisConnection(){
	return client;
}

/*var query = "insert into users "
	+ "(firstname,lastname,email,password,user_type,lastLoggedIn)"
	+ "values (?,?,?,?,?,now());";
pool.getConnection(function(err, connection) {
connection.query(query, [ firstName, lastName, email, password,userType],
		function(regerr, rows) {

			if (regerr) {
				pool.releaseConnection(connection);
				console.log("Error regiter user : " + regerr);
			} else {
				pool.releaseConnection(connection);
				callback(regerr, rows);
			}
		});
});*/

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