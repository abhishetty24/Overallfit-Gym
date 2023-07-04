const express= require("express");
const app=express();
const path= require("path");
const bodyparser = require("body-parser"); 
const port=80;

const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MyGymDB');
}

// Defining Mongoose Schema 
const membershipSchema = new mongoose.Schema({
    name1: String,
    gender: String,
    age: String,
    current_weight: String,
    desired_weight: String,
    height: String,
    membership_period: String,
    phone: String,
    email: String,
    address: String,
});
const membership = mongoose.model('Membership', membershipSchema);

const carrerSchema = new mongoose.Schema({
    carrer_name: String,
    carrer_gender: String,
    carrer_age: String,
    carrer_options: String,
    carrer_phone: String,
    carrer_email: String,

});
const carrer = mongoose.model('Carrer', carrerSchema);

const feedbackSchema = new mongoose.Schema({
    feed_name: String,
    membership_No: String,
    Rating: String,
    concern: String,   

});
const feedback = mongoose.model('Feedback', feedbackSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());      // urlencoded parses incoming requests and here it is used to  display user's form input to us

// PUG SPECIFIC STUFF
app.set('view engine','pug')        // 3.2 Set the template engine for pug 
app.set('views',path.join(__dirname,'views'))   // 3.3 Set the views directory

// ENDPOINTS
app.get('/',(req,res)=>{
    const params ={};
    res.status(200).render('home.pug',params);
})
app.get('/classes',(req,res)=>{
    const params ={};
    res.status(200).render('classes.pug',params);
})
app.get('/offers',(req,res)=>{
    const params ={};
    res.status(200).render('offers.pug',params);
})
app.get('/membership',(req,res)=>{
    const params ={};
    res.status(200).render('membership.pug',params);
})
app.post('/membership',(req,res)=>{
    var myData=new membership(req.body);
    myData.save().then(()=>{
        res.send("You are Sucessfully Registered")
    }).catch(()=>{
        res.status(400).send("An Error Occured Please Try again later")
    });
})
app.get('/carrers',(req,res)=>{
    const params ={};
    res.status(200).render('carrers.pug',params);
})
app.post('/carrers',(req,res)=>{
    var myData1=new carrer(req.body);
    myData1.save().then(()=>{
        res.send("Your Application has been Submitted")
    }).catch(()=>{
        res.status(400).send("An Error Occured Please Try again later")
    });
})
app.get('/feedbacks',(req,res)=>{
    const params ={};
    res.status(200).render('feedbacks.pug',params);
})
app.post('/feedbacks',(req,res)=>{
    var myData2=new feedback(req.body);
    myData2.save().then(()=>{
        res.send("Your Feedback has been Submitted")
    }).catch(()=>{
        res.status(400).send("An Error Occured Please Try again later")
    });
})
// START THE SERVER 
app.listen(port,()=>{
    console.log(`The Application successfully started at ${port}`);
})