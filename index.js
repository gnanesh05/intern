$(document).ready(function(){
  $("#get-button").click(function(){
    $.ajax({
		url:'/validate',
		contentType: 'application/json',
		success: (response)=>{
			var tbody = $('tbody');
			tbody.html('');
			var rows='';
			response.learners.forEach((learner)=>{
				//console.log(learner.name);
				 rows += "<tr><td>" + learner.name + "</td><td>" + learner.certificate + "</td><td>" + learner.certification + "</td><td>" + learner.issued + "</td><td>" + learner.from + "</td></tr>";
			});
			tbody.append(rows);
		}
	});
  });
	
 $("#create-form").on('submit',(event)=>{
	 event.preventDefault();
	 
	 var check = $('#create-input');
	 console.log(check.val());
	 $.ajax({
		 url:"/valid",
		 contentType: "application/json",
		 //data: JSON.stringify({num: check.val()}),
		 data:{
		 'num': check.val(), 
		 },
		 //try commented method once
		 success: (response)=>{
			 console.log(response);
			 check.val('');
			 var result = $('#result');
			 result.html('');
			 if(response.learner !=null)
			 {var rows='';
			  result.append("<p> Name:"+ response.learner.name );
			  result.append("<br>")
			  result.append("<p> Certificate:"+ response.learner.certificate );
			  result.append("<br>")
			  result.append("<p> Certification:"+ response.learner.certification );
			  result.append("<br>")
			  result.append("<p> Name:"+ response.learner.issued );
			  result.append("<br>")
			  result.append("<p> Name:"+ response.learner.from );
			  result.append("<br>")
			  
			
			 }
			 else{
				 var error = "No such certiicate exists in our database. Try giving the exact number";
				 result.append(error);
			 }
			 
		 }
	 });
 })
	//try this one
	// $.ajax({
	// type: 'post',
	// url: '/ajax',
	// data: data,
	// dataType: 'text'
	// })
	// .done(function(data){
	// $('h1').html(data.quote);
	// });
		
});

 