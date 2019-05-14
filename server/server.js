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





const port = process.env.PORT || 3002;

app.listen(port, ()=> {
    console.log(`Server Running at ${port}`)
});