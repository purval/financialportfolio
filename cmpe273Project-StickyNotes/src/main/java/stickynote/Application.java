package stickynote;

import java.net.UnknownHostException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;

@RestController
@Configuration
@ComponentScan
@EnableAutoConfiguration
@RequestMapping("/stickynote")
public class Application {
	 
	 DBCollection coll; 
	 BasicDBObject doc;
	 public static void main(String[] args) 
	 {
		new DBConnection();
	    SpringApplication.run(Application.class, args);
	 }
	  
	 //welcome message
	 @RequestMapping(value = "", method = RequestMethod.GET)
	 @ResponseBody
	 public String welcomeMessage()
	 {
	   	return "Welcome to Sticky notes";    	
	 }
	 
	 //Creating user
	 @RequestMapping(value= "/users", method = RequestMethod.POST)
	 @ResponseBody
	 public ResponseEntity<Object> createUser(@Valid @RequestBody CreateUser user) throws UnknownHostException
	 {
		 coll =  DBConnection.getConnection();
		 BasicDBObject query = new BasicDBObject("email", user.getEmail()); // for eamil already exist validation
		 DBCursor cursor = coll.find(query);
		 try {
			 	if(cursor.hasNext())
			 	{	return new ResponseEntity<Object>(new Error(user.getEmail()),HttpStatus.BAD_REQUEST);
			 	}else{    		
				 doc = new BasicDBObject("userid", user.getUserid()).append("email", user.getEmail()).append("password", user.getPassword()).append("created_at", user.getCreated_at()).append("updated_at", user.getUpdated_at());
				 coll.insert(doc);
				 return new ResponseEntity<Object>(user, HttpStatus.CREATED);
			 	}
			 }
		 finally {cursor.close();}  	
	  }
	  
	 //get user details
	 @RequestMapping(value ="/users/{userid}", method = RequestMethod.GET)
	 @ResponseBody
	 public ResponseEntity<Object> getUser(@PathVariable String userid) throws UnknownHostException
	 {
	    coll =  DBConnection.getConnection();
	    BasicDBObject query = new BasicDBObject("userid", userid);
	    DBCursor cursor = coll.find(query);
	    try {
	    		if(cursor.hasNext())
	    		{	GetUser getUser = new GetUser(cursor);
	    			return new ResponseEntity<Object>(getUser, HttpStatus.OK);
	    		}
	    		else{
	    		return new ResponseEntity<Object>(new Error(userid), HttpStatus.BAD_REQUEST);
	    		}
	    	}
	    finally{cursor.close();}
	 }
	        
	 
	 //handling exceptions
	 @ExceptionHandler({MethodArgumentNotValidException.class, ServletRequestBindingException.class})
	 @ResponseStatus(HttpStatus.BAD_REQUEST)
	 public ModelMap exceptionHandler(MethodArgumentNotValidException error)
	 {
		List<FieldError> errors = error.getBindingResult().getFieldErrors();
		ModelMap errorMapping = new ModelMap();
		int error_count =1;
		for(FieldError e : errors)
		{
			errorMapping.addAttribute("error"+error_count, e.getDefaultMessage());
			error_count++;
		}
		return errorMapping;
     }
}
