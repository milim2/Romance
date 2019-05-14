const mongoose = require('mongoose');

// encrypt the password
const bcrypt = require('bcrypt');
const SALT_I = 10; // default value



const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        required: true,
        minlength: 5
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 100
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
})


userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(SALT_I, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            });
        }) 
    } else {
        next()
    }
    
})


// before adding a user the password should be a hashcode
//before save run this
//==> after hashed a password moving forward next...
userSchema.pre('save', function(next) {
    var user = this; // user: userSchema's user, not the function

    bcrypt.genSalt(SALT_I, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
            user.password = hash;
            next();
        })
    })
}) 





// equal to mongoose, create new model user => name is User
const User = mongoose.model('User', userSchema);

module.exports = { User }