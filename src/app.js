const express = require("express");
const app = express();
const path=require('path');
const port =process.env.PORT || 3000;
require("./db/conn");






const Register = require("./models/registrations");
//const Register2 = require("./models/registrations");


const static_path=path.join(__dirname,"../views");
app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","hbs");
//console.log(path.join(__dirname,"../calorie_page/calorimetermain.html"));

app.get("/",(req,res) =>
{
    res.render("index.hbs");
});

app.get("/register",(req,res)=>
{
    res.render("register");
});
app.get("/caloriemeter",(req,res)=>
{
    res.render("caloriemeter");
});


app.post("/register",async(req,res)=>
{
    try{
      const registeruser = new Register({
          username:req.body.username,
          password:req.body.password,
          mail:req.body.mail,
          gender:req.body.gender,
      })
        const registered=await registeruser.save();
        res.status(201).render("index");
    }
    catch(error){
        res.status(400).send(error);

    }
});

app.post("/",async(req,res) =>
{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({mail:email});
        if(useremail.password==password){
            res.status(201).render("caloriemeter" ,
            {data:useremail.username,
            })
            };


            
           
        
        }
        //res.send(useremail);
        //console.log(useremail);
    
     catch (error) {
        res.status(400).send("invalid email")
    }
});
app.post("caloriemeter",async(req,res) =>
{
    try {

        const totalcalories = req.body.resulthere;
        const user = req.body.usernamemongo;
        const username = await Register.findOne({username:user});
        console.log("1");
        const data=data2;
        Register.updateOne({"username ":"t"},{$set:{"calorie":totalcalories}})

        
           // res.status(201).render("caloriemeter" ,
            //{datacal:data2})
            

        }
      
    
     catch (error) {
        res.status(400).send("invalid email")
    }
});



module.exports=app;

app.listen(port,()=>{
    console.log('server is running at port no '+ port);
})

