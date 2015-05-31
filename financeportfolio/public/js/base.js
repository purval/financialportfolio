$(function () {
	
	
	$('.subnavbar').find ('li').each (function (i) {
	
		var mod = i % 3;
		
		if (mod === 2) {
			$(this).addClass ('subnavbar-open-right');
		}
		
	});
	
	
	
});
$(document).ready(function(){
	$('.carousel').carousel({
		  interval: 3000
	});
	
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
	
	//nasdaq table
	$.ajax({
	      type: "GET",
	      url: "/quotes/stocksymbol/^IXIC",
	      contentType: "application/json; charset=UTF-8",
	      dataType: 'json',
	      crossDomain : true,
	      success: function( d ) {
	         console.log(d); 
	         if(d.change<0){
	        	 $("#change").css('color', 'red');
	        	 $("#change").append(d.change);

	        	 $('#change').append($('<img>',{id:'change_img',src:'../img/redarrow.gif',alt:'down',height:"20" ,width:"15"}));

	        	 $("#change_img").css('margin-bottom',4);
	        	 $("#change_img").css('margin-left',8);
	         }
	         else{
	        	 $("#change").css('color', 'green');
	        	 $("#change").append(d.change);
	        	 $('#change').append($('<img>',{id:'change_img',src:'../img/greenarrow.png',alt:'up',height:"20" ,width:"15"}));
	        	 $("#change_img").css('margin-bottom',10);
	        	 $("#change_img").css('margin-left',8);
	          }
	         $("#currentvalue").append(d.Index);
	         $("#currentvalue").css('color','blue');
	        
	         $("#high").append(d.DaysHigh);
	         $("#high").css('color','green');
	         $("#low").append(d.DaysLow);
	         $("#low").css('color','red');
	      },
	      error :function(err){	
	    	 
	      }
	});
	
	
	$.ajax({
		  type: "GET",
       url: "/twitterfeeds",
       contentType: "application/json; charset=UTF-8",
       crossDomain : true,
       success: function( d ) {
       	  for(i=0;i<5;i++){           	  	
			    	 var html = "";
			    	 if(i===0){
			    		 html += "<div class='active item'>";
			    		 html += "<div id='row'>";
			    		 html += "<img src='"+d[i].profile_url+"' alt='' class='img-circle'>";
				            html += "<div>"+d[i].text+"</div>";
				            html += "<div>"+d[i].created+"</div>";
				         html += "</div>";
			    		 html += "</div>";
			    	 }else{
			    		 html += "<div class='item'>";
			    		 html += "<div id='row'>";
			    		 html += "<img src='"+d[i].profile_url+"' alt='' class='img-circle'>";
				            html += "<div>"+d[i].text+"</div>";
				            html += "<div>"+d[i].created+"</div>";
				         html += "</div>";
			    		 html += "</div>";
			    	 }
			          $('#carTweets').append(html);
       	  }
       	  /*Draggable.create("#carTweets", {type:"scrollTop", edgeResistance:0, lockAxis:true});*/
       }
	});
	
	 
	 $("#cName").autocomplete({
			delay: 500,
			minLength: 3,
			source: function(request, response) {
				console.log($("#cName").val());
				var autocompleteQuery = {
			    	query : $("#cName").val()
	    	    };
	    	    console.log(autocompleteQuery);
				$.ajax({
		    		  type: "POST",
		              url: "/autocompletelist",
		              contentType: "application/json; charset=UTF-8",
		              data: JSON.stringify(autocompleteQuery),
		              crossDomain : true,
		              success: function( d ) {
		              	  console.log(d);
		            	  response(d);
		              }
		    	 });
			},
			focus: function(event, ui) {
				event.preventDefault();
			},
			select: function(event, ui) {
				event.preventDefault();
				
				var urlStr = '/todaysdata/'+ui.item.value;
				$("#cName").val("");
				$('#containerr').html(" ");
				var html = "";
				html += "<div id='progess-sec' class='progress'>";
				html += "<div class='progress-bar progress-bar-striped active' role='progressbar'";
				html += " aria-valuenow='65' aria-valuemin='0' aria-valuemax='100' style='width:100%'>";
				html += " Loading </div> </div>";
				  
				$('#containerr').append(html);
								
				$.getJSON(urlStr, function (data) {
					$('#progess-sec').remove();
			        // Create the chart
			        $('#containerr').highcharts('StockChart', {

			            rangeSelector : {
			                selected : 1
			            },

			            title : {
			                text : ui.item.value+' Stock Price'
			            },

			            series : [{
			                name : ui.item.value+' Stock Price',
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
			                }
			            }]
			        });
			    });
			}
		});	 
});