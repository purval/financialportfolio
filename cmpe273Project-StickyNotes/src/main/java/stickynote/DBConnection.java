package stickynote;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.mongodb.WriteConcern;
import java.net.UnknownHostException;
import java.util.Arrays;

//create mongolab connection
public class DBConnection {

	//create collection object
	public static DBCollection coll;
	//get collection
	public static DBCollection getConnection() throws UnknownHostException
	{
		//create credentials for mongolab
		MongoCredential credential = MongoCredential.createMongoCRCredential("sanket2407", "stickynote","notenote".toCharArray());
    	//assign credentials to MongoClient
		MongoClient mongoClient = new MongoClient(new ServerAddress("ds047940.mongolab.com",47940), Arrays.asList(credential));
		//get database
		DB db = mongoClient.getDB( "stickynote" );	
		//provide write concern
		mongoClient.setWriteConcern(WriteConcern.JOURNALED);
		//create or get collection
		coll = db.getCollection("new");
		return coll;
	}	
}
	

