const express = require('express');
const bodyParser = require('body-parser');
const cookieParse = require('cookie-parser');

const app = express();
// mongoose
const mongoose = require('mongoose');
require('dotenv').config();

// to set up mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE)

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParse());

//    Models //
const { User } = require('./models/user');

//============
//    USERS  
//============
// Register a user
app.post('/api/users/register', (req, res)=> {
    
    // new model
    const user = new User(req.body);

    user.save((err, doc)=> {
        if(err) return res.json({success:false, err});
        res.status(200).json({
            success: true,
            userdata: doc 
        })
    })
})


app.post('/api/users/login', (res, req) => {

    // 1. find email
    User.findOne({'email': req.body.email}, (err, user)=> {
        if(!user) return res.json({loginSuccess: false, message:'Auth failes, email NOT found'});
    // 2. check password matching(make a reference to compare password)
        user.comparePassword(req.body.password, (err, isMatch)=> {
            if(!isMatch) return res.json({loginSuccess: false, message: 'Wrong Password'})
        
             // 3. generate a new token
            user.generateToken(()=> {

            })        
        })   
    })   
})


const port = process.env.PORT || 3002;

app.listen(port, ()=> {
    console.log(`Server Running at ${port}`)
});