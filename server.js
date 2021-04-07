const express =  require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


var url = "mongodb://localhost/intern";
mongoose.connect(url,(err,db)=>{
	if(err)
		console.log(err);
	else
		console.log("db started");
});

//db schema

const ValidateSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	certificate: {
		type: String,
		required: true,
		unique : true,
		dropDups: true 
	},
	certification:{
		type:String,
		required: true
	},
	issued:{
		type: Date,
		required: true
	},
	from:{
		type: String,
		required: true
	}
});


const Validate = mongoose.model('Validate', ValidateSchema);

// var learner = new Validate({
// 			 name : " Ankita Chopra",
// 			 certificate : "BP-0050-00101-0001",
// 			 certification : "Trainer for Android Development Workshop",
// 	         issued: "01-June-2020",
// 	         from: "BoredProgrammers"
// 			});
// 			learner.save();
// console.log(learner);
// var learner = new Validate({
// 			 name : " Virat Kohli",
// 			 certificate : "BP-0050-00101-0002",
// 			 certification : "Trainer for Web Development Workshop",
// 	         issued: "05-June-2020",
// 	         from: "BoredProgrammers"
// 			});
// 			learner.save();
// console.log(learner);

app.get("/",(res,req)=>{
   res.sendFile("index.html");	
});

app.get("/validate",function(req,res){
	Validate.find({},function(err,learners){
		
		if(err)
			console.log(err);
		else
			res.send({learners:learners});
		});
});

app.get("/valid",(req,res)=>{
    let num = req.query.num;	
	console.log(num);
	Validate.findOne({certificate: num},function(err,found){
		  if(err)
			  res.send("somthing went wrong");
		  else
			{
			
	         res.send({learner: found});
			}
	     })
    
});


let port = process.env.PORT || 6000;
app.listen(port, () => {
console.log(`app listening at http://localhost:${port}`)

  });