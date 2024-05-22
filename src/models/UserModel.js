const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    uniqueId:{
        type:Number,
    },
    name : {
        type: String,
        trim:true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique:true
    },
    phone_number : {
        type: String,
        trim:true,
        unique:true
    },
    password : {
        type: String,
        trim:true,
    },
    nid_Number: {
        type:String,
    },
    specialist :{
        type: String,
    },
    rating:{
        type: Number,
        default:0
    },
    totalReview:{
        type: Number,
        default:0
    },
    avater:{
        type: String,
    },
    cover_photo:{
        type: String,
    },
    social_media:{
        facebook: {type:String},
        instagram: {type:String},
        twitter: {type:String},
    },
    dateOfBirth:{
        type: String,
        default:"-/-",
    },
    isMarried:{
        type: Boolean,
        default:false,
    },
    blood_group:{
        type: String,
        default:"-/-",
    },
    gender:{
        type: String,
        default:"-/-",
    },
    role: {
        type: String,
        default: "User",
        enum:['Patient',"Doctor","Admin","Labs","Reciption","Support"]
    },
    weeklyHoliday: {
        type: Array,
        default:['Friday']
    },
    isHoliday: {
        holiday: {
            type: Boolean,
        },
        startDate: {
            type: String,
        },
        endDate: {
            type: String,
        },
    },
    nationality: {
        type: String,
        default: "Bangladesh"
    },
    shortDescription: { type: String},
    totalPatients: { type: Number, default:0},
    visite:{
        amount: Number,
        discount: Number,
    },
    chamber_no: {
        type: String,
    },
},{ timestamps:true })

const User = model("User", userSchema);

module.exports = User;