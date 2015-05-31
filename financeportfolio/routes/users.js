/*
* User CRUD operation - Author: Sanket Patel
*/

var ejs= require('ejs');
var mysql = require('mysql');

function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'cmpe280.cc7bquhhcd3t.us-east-1.rds.amazonaws.com',
	    user     : 'root',
	    password : 'cmpe_280',
	    database : 'cmpe280',
	    multipleStatements: true
	});
	return connection;
}

/*Login Authentication. */
var row_main;
exports.loginAuthentication = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	var connection=getConnection();
	var sqlQuery = "SELECT * FROM user WHERE email = '"+input.email+"' ";
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err)
        {   console.log("Error Selecting : %s ",err );}
     
        else if(rows.length === 0)
        	{
        	 res.render('login',{page_title:"Customers - Node.js",error:"username or password is not correct"});
        	}
        else
        	{
        	if(rows[0].password === input.password)
        		{
        		row_main = rows;
             res.render('userhome',{page_title:"Customers - Node.js",data:rows, error:""});
        		}
        	else
        		{
        		res.render('login',{page_title:"Customers - Node.js",error:"password is not correct"});
        		}
        	}    
	});
};

exports.loginAuthentication1 = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	var connection=getConnection();
	var sqlQuery = "SELECT * FROM user WHERE email = '"+input.email+"' ";
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err)
        {   console.log("Error Selecting : %s ",err );}
     
        else if(rows.length === 0)
        	{
        	 res.render('login',{page_title:"Customers - Node.js",error:"username or password is not correct"});
        	}
        else
        	{
        	if(rows[0].password === input.password)
        		{
        		row_main = rows;
             res.render('userhome',{page_title:"Customers - Node.js",data:rows, error:""});
        		}
        	else
        		{
        		res.render('login',{page_title:"Customers - Node.js",error:"password is not correct"});
        		}
        	}    
	});
};

exports.loginAuthentication2 = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	var connection=getConnection();
	var sqlQuery = "SELECT * FROM user WHERE email = '"+input.email+"' ";
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err)
        {   console.log("Error Selecting : %s ",err );}
     
        else if(rows.length === 0)
        	{
        	 res.render('login',{page_title:"Customers - Node.js",error:"username or password is not correct"});
        	}
        else
        	{
        	if(rows[0].password === input.password)
        		{
        		row_main = rows;
             res.render('landing',{page_title:"Customers - Node.js",data:rows, error:""});
        		}
        	else
        		{
        		res.render('login',{page_title:"Customers - Node.js",error:"password is not correct"});
        		}
        	}    
	});
};

exports.userhome = function(req,res){
	res.render('userhome');
};
exports.hindi = function(req,res){
	res.render('hindi');
};
exports.german = function(req,res){
	res.render('german');
};
exports.spanish = function(req,res){
	res.render('spanish');
};
/*Signup the user*/
exports.signup = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
   
	var sqlQuery = "INSERT INTO user (firstname,lastname,email,password) values ('"+input.firstname+"','"+input.lastname+"','"+input.email+"','"+input.password+"')";
	
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
			res.render('signup',{error : "user already exist"});
		}
		else 
		{	// return err or result
			res.render('login',{error : "user is successfully created. Please Log in to continue!"});
		}
	});
};

/*Edit the user*/

exports.add = function(req, res){
  res.render('add_customer',{page_title:"Add Customers - Node.js"});
};

exports.edit = function(req, res){
    
    var email = req.params.email;
    var sqlQuery = "SELECT * FROM user WHERE email = '"+email+"'";
	var connection=getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		  if(err)
          {   console.log("Error Selecting : %s ",err );
               res.render('error',{error:err});
          }
          else{
          res.render('edit_user',{page_title:"Edit Customers - Node.js",data:rows,error:""});
          }
	});
};

/*Save changes int the user*/

exports.edit_save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var userid = req.params.userid;
    var sqlQuery = "UPDATE user SET firstname = '"+input.firstname+"', lastname = '"+input.lastname+"', email = '"+input.email+"', password = '"+input.password+"' WHERE userid = '"+userid+"'";
	var connection = getConnection();
	
	connection.query(sqlQuery, function(err, rows, fields) {
		if (err)
        {
      	  console.log("Error updating : %s ",err );
      	  var query = connection.query("SELECT * FROM user WHERE userid = '"+userid+"'",function(err,rows)
      		        {
      		            if(err)
      		            {   console.log("Error Selecting : %s ",err );
      		                 res.render('error',{error:err});
      		            }
      		            else{
      		            res.render('edit_user',{page_title:"Edit Customers - Node.js",data:rows,error:"user with this name already exists"});
      		            }
      		           
      		         });
        }
        else{
        res.render('login',{error : "user is successfully Edited. Please Log in to continue!"});
        }
	});
};

/*Delete User*/

exports.delete_user = function(req,res){
          
     var email = req.params.email;
     var sqlQuery = "DELETE FROM user WHERE email ='"+email+"'";
 	 var connection = getConnection();

 	connection.query(sqlQuery, function(err, rows, fields) {
            
             if(err)
             { console.log("Error deleting : %s ",err );
               res.render('error',{error:err});
             }
             else
             {
            	 res.render('signup',{error : "User"+email+" successfully deleted. Please create new account to continue."});
             }
        });
};

/*watch list User*/

exports.addwatchlist = function(req,res){
    
	var userid = req.params.userid;
	var symbol = req.params.symbol;
	var connection=getConnection();
	
	var sql1 = "select * from watchlist where userid='"+userid+"' and symbol='"+symbol+"'"; 
	connection.query(sql1, function(err, rows, fields) {
		
		if(err){
			console.log("ERROR: " + err.message);
			res.render('landing',{page_title:"Customers - Node.js",data:row_main});
		}
		else if(rows.length>0)
		{
			console.log("data already exist");
			res.render('landing',{page_title:"Customers - Node.js",data:row_main, error:"data already exist"});
		}
		else 
		{	// return err or result
			//res.render('login',{error : "user is successfully created. Please Log in to continue!"});
			console.log("successfully inserted");
	
			var sqlQuery = "INSERT INTO watchlist (userid,symbol) values ('"+userid+"','"+symbol+"')";
			connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
			console.log("ERROR: " + err.message);
			//res.render('signup',{error : "user already exist"});
			}
			else 
			{	// return err or result
			console.log("successfully inserted");
			res.render('landing',{page_title:"Customers - Node.js",data:row_main, error:"successfully added"});
			}
			});
	
		}
	});
};

/*get WatchList data*/

var yql = require('yqlp');

exports.getWatchList = function(req, res) {
	var flag = true;
	var userid = req.params.userid;
	var connection=getConnection();
	var sql1 = "select symbol from watchlist where userid='"+userid+"'";
	connection.query(sql1, function(err, rows, fields) {
		if(err){
		console.log("ERROR: " + err.message);
		//res.render('signup',{error : "user already exist"});
		}
		else if(rows.length!==0)
		{	
			var x =[];
			var count =0;
		for(var i=0; i<rows.length; i++)
			{
			//console.log(rows[i].symbol);
			var query1 = "select * from yahoo.finance.quotes where symbol = '"+rows[i].symbol+"'";
			yql.exec(query1, function(error, response) {
				if (error) {
					console.log('Ut oh! demo has messed up:', error);
				} else {
					var results = response.query.results;
					x.push( {
						symbol : results.quote.symbol,
						Name : results.quote.Name,
						LastTradePriceOnly : results.quote.LastTradePriceOnly,
						Open : results.quote.Open,
						Change : results.quote.Change,
						LastTradeDate : results.quote.LastTradeDate
					});
					count = count+1;
					//console.log(count);
					if(count == (rows.length))
					{
						res.send(x);}
					}
			});
			}
		}
		});	
};