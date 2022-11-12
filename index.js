const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const User=require('./models/user.schema');
const app = express();
app.use(express.json());
//to create server Method 1 
const server = http.createServer(app);

//to create server Method 2 

app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(path.join(__dirname,'./public')));

//mongoose connection
mongoose.connect("mongodb://mongo_db:27017/node", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const dbConn = mongoose.connection;
dbConn.on("error", () => {
 console.log("Mongodb connection error");
});

dbConn.once("open", function () {
    console.log("Mongodb connected successfully");
});

//home page API
app.get('/',(req,res) => {
    res.sendFile( __dirname + "/" + "index.html" );
});

app.post('/register', async (req, res) => {
    try{
       let data=req.body;
       let saveData=await User.create(data);
       res.status('200').json({message:"User register successfully"});
    } catch{
        
    }
});

app.post('/login', async (req, res) => {
    try{
       let email=req.body.email;
       let password=req.body.password;
       const getUser=await User.findOne({email:email,password:password})
        if(getUser)
       res.status('200').json({message:"User login successfully"});
       else
       res.status('404').json({message:"Incorrect email or password"});
    } catch{
        
    }
});

server.listen(5556, function(){
    console.log("Server is listening on port: 5556");
});