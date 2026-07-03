const User = require("../models/index")


const createUser = async (req , res) => {
  try{
    let user = req.body ;
    let u = User.find();
    let a = u.length + 1 ;
    user.id = "u"+a ;
    await User.create(user) ;
  }catch{
    console.log("Error in creating the user");
  }
}


const getAllUsers = async (req,res) => {
  try{
    let users = await User.find();
    return res.status(200).send(users) ;
  }catch{
    res.status(500).send("Internal Server Error");
  }
}

const connect = async (req,res) => {
  try{
    let user1 = req.headers("current_user_id")
    let u2 = req.body;
    
    if(!u2.toUserId){
      return res.status(400).send("toUserId is required")
    }
    let user2 = await User.findById(u2.toUserId) ;


    if(!user2){
      return res.status(404).send("No user found with id u2"); 
    }
    //  connect the user1 with the user2 

    if(user1 === u2.toUserId){
      return res.status(400).send("user cannot connect with the themself") ; 
    }
    let connections = await UserConnect.findById(user1);
    for(let i = 0 ; i<connections.length ; i++){
        if(connections[i].toUserId === u2.toUserId){
          return "user1 and user2 are already connected" ;
        }
    }
    let conn = await UserConnect.find();
    let a = conn.length + 1 ;
    let i = "c"+a ; 
    await UserConnect.save({
      "id" : i, 
      "fromUserId" : user1 , 
      "toUserId" : u2.toUserId,
      "status" : "PENDING"
    });

    return {
      "id" : i ,
      "fromUser" : user1 ,
      "toUser" : u2.toUserId
    }

  }catch{
    res.status(500).send("Internal server error" )
  }
}

const connectRespond = async (req,res) => {
  try{
    let u1 = req.headers("user_id");
    let c1 = req.body ; 
    
    if(!c1.connectionId || !c1.action){
      return res.status(400).send("ConnectionId and action are required")
    }
    if(c1.action != "ACCEPT" || c1.action != "REJECT"){
      return res.status(400).send("action must be either ACCEPT or REJECT");
    }


    let c = await UserConnect.findById(c1.connectionId);
    if(!c){
      return res.status(403).send("No connection request found with id c1")
    }
    if(c.action != "PENDING"){
      return res.status(400).send("Only pending connection requests can be responded to")
    }

    if(c1.action === "ACCEPT"){
      c.status = "ACCEPT" ;
    }else if(c1.action === "REJECT"){
      c.status = "REJECT" ;
    }

    await UserConnect.updateOne(c.id , c);
    return res.status(200).send(c) ;

  }catch{
    res.status(500).send("Internel server error");
  }
}

const createRates = async (req,res) => {
  try{
    let u1 = req.headers("user_id")
    let rates = req.body ; 

    if(rates.type != "BUY" || rates.type != "SELL"){
      return res.status(400).send("type must be either BUY or SELL")
    }

    if(rates.price < 0){
      return res.status(400).send("price must be greater then 0");
    }

    if(rates.transitDays < 0){
      return res.status(400).send("transitDays must be greater than 0");
    }
    await RateHandler.save(req.body);

    return {
      "success" : true ,
      "message" : "Rate created successfully"
    }
  }catch{
    res.status(500).send("Something went wrong, please try again");
  }
}

const ratesSearch = async (req,res) => {
  try{
    let q = req.body ;
  }catch{

  }
}

module.exports = {createUser , getAllUsers , connect , connectRespond , createRates};
