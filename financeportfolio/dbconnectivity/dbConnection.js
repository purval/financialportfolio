
var redis = require("redis");
var client = redis.createClient(6379,"192.168.1.192");

function getRedisConnection(){
	return client;
}
exports.getRedisConnection = getRedisConnection;