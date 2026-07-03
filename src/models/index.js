import { model, Schema } from "mongoose";

const userSchema = new Schema({
  id : {
    type : String
  } ,
  name: {
    type : String ,
    required : true
  } , 
  email : {
    type : String ,
    required : true , 
    unique : true 
  },
});

const connectionSchema = new Schema({
  id : {
    type : String
  },
  fromUserId : String , 
  toUserId : String ,
  status : {
    type : String , 
    enum : ["ACCEPT","REJECT","PENDING"]
  }
})

const RatesSchema = new Schema({
  type : {
    type : String ,
    enum : ["BUY" , "SELL"]
  } ,
  fromLocation : String ,
  toLocation : String ,
  validFrom : Date , 
  validTo : Date, 
  price : Number , 
  currency : String , 
  transitDays : Number
})

const RateHandler = model('RateHandler' , RatesSchema)

const UserConnect = model('UserConnect' , connectionSchema) ; 

const User = model('User', userSchema);

module.exports = {RateHandler , UserConnect , User} ; 