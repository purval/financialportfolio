$(function () {
	
	
	$('.subnavbar').find ('li').each (function (i) {
	
		var mod = i % 3;
		
		if (mod === 2) {
			$(this).addClass ('subnavbar-open-right');
		}
		
	});
	
	
	
});
$(document).ready(function(){
	 $.ajax({
      type: "GET",
      url: "/losers",
      contentType: "application/json; charset=UTF-8",
      dataType: 'json',
      crossDomain : true,
      success: function( d ) {
         console.log(d); 
      },
      error :function(err){	
    	  $("#loosersDiv").append(err.responseText);
    	  $( ".last" ).remove();
    	  //Draggable.create("#loosersTable", {type:"scrollTop", edgeResistance:0, lockAxis:true});
    	  $('#loosersTable').dataTable({
  	        "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]]
  	      });
    	 // setTimeout( function() {  $('#loosersTable').dataTable(); }, 5000);
      }
    });
	 
	 $.ajax({
      type: "GET",
      url: "/gainers",
      contentType: "application/json; charset=UTF-8",
      dataType: 'json',
      crossDomain : true,
      success: function( d ) {
         console.log(d);
      },
      error :function(err){	
    	  $("#gainersDiv").append(err.responseText);
    	  $( ".last" ).remove();
    	  $('#gainersTable').dataTable({
    	        "aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]]
    	  });
    	 // Draggable.create("#gainersTable", {type:"scrollTop", edgeResistance:0, lockAxis:true});
    	 // setTimeout( function() {  $('#gainersTable').dataTable(); }, 5000);
      }
    });
});