const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true,
    },
    couponCode:{
        type:String
    },
    coins:{
        type:Number,
        default:0
    },
    reffers:[{type:Object}],
    sharesData:[
        {
           referralId:{type:String},
           isregistered:{type:Boolean}
        }
    ]
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('refferrals', UserSchema);
