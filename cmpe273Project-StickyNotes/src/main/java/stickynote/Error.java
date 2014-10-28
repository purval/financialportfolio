package stickynote;

public class Error {

	String error="";
	//single attributed error constructor
	public Error(String input)
	{
		this.error = "Invalid "+input;
	}

	public String getError() {
		return error;
	}
	
}
