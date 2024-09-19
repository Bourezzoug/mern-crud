const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true,
    }
}, {timestamps : true})


// Create static sign up method (must not be an arrow function)
userSchema.statics.signup = async function( email, password ) {
    const exists = await this.findOne({ email });

    // Validation
    if(!email || !password) {
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    if(exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash( password, salt )

    const user = await this.create({ email, password: hash })

    return user
}

// Create static login method (must not be an arrow function)
userSchema.statics.login = async function( email, password ) {
    const user = await this.findOne({ email });

    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    if(!user) {
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect Password')
    }

    return user
}

module.exports = mongoose.model('User',userSchema)


// To connect to an application we use JWT which json web token => These tokens are typically used for authentication and authorization, as they can contain information that verifies the identity of a user, and their permissions.
// The JWT are made of Header => Contain the algo used for JWT, Payload => Contains non-sensitive user data(eg: id), Signature => Used to verify the token by the server
