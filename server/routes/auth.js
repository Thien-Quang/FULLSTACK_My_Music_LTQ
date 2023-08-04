const router = require("express").Router();

const admin = require("../config/firebase.config");

const user = require("../models/user");

router.get("/login", async(req,res) =>{
    if(!req.headers.authorization){
        return res.status(500).send({message : "Invalid Token"});
    }

    const token = req.headers.authorization.split(" ")[1];
    try{
        const decodeValue = await admin.auth().verifyIdToken(token);
        if(!decodeValue){
            return res.status(505).json({message : "Un Authorized"})
        }else{
            //kiem tra nguoi dung co ton tai hay khong
            const userExists = await user.findOne({"user_id" : decodeValue.user_id})
            if(!userExists){
               newUserData(decodeValue,req,res)
            }else {
                return updateNewUserData(decodeValue,req,res)

            }

        }
    }catch(error){
        console.log(error);
        return res.status(505).json({message : error})
    }
})

const newUserData = async (decodeValue,req,res)=>{
    const newUser =new user({
        name : decodeValue.name,
        email : decodeValue.email,
        imageURL : decodeValue.picture,
        user_id : decodeValue.user_id,
        email_verified : decodeValue.email_verified,
        role :"member",
        auth_time : decodeValue.auth_time
    })
    try{
        const saveUser = await newUser.save();
        return  res.status(200).send({user : saveUser})
    }catch(error){
        return res.status(400).send({success : false , msg : error});
    }
}
const updateNewUserData = async (decodeValue, req, res) =>{
    const filter = {user_id : decodeValue.user_id};

    const options = {
        upsert : true,
        new : true
    };

    try {
        const result = await user.findOneAndUpdate(
            filter,
            {auth_time : decodeValue.auth_time},
            options
        );
       return res.status(200).send({user : result})
    }catch(error){
       return res.status(400).send({success : false , msg : error});
    }

}

router.get("/getUsers", async (req, res) =>{
    const options ={
        sort : {
            createdAt : 1
        },
    };

    const cursor = await user.find({},null,options);

    if(cursor){
        return res.status(200).send({success : true, data : cursor});

    }else{
        return res.status(400).send({success : false, msg: "Data not found"});

    }
})
router.get("/getUser/:userId", async (req, res) => {
    const filter = { _id: req.params.userId };
  
    const userExists = await user.findOne({ _id: filter });
    if (!userExists)
      return res.status(400).send({ success: false, msg: "Invalid User ID" });
    if (userExists.favourites) {
      res.status(200).send({ success: true, data: userExists });
    } else {
      res.status(200).send({ success: false, data: null });
    }
  });

  router.put("/updateRole/:userId", async ( req, res)=>{
    const filter = {_id : req.params.userId};
    const role = req.body.data.role;

   
    try {
        const result = await user.findOneAndUpdate(filter,{role : role });
        res.status(200).send({user: result})
    } catch (error) {
        return res.status(400).send({success : false, msg : error});
        
    }
  })

  router.delete("/deleteUser/:userId", async ( req, res) =>{
    const filter = {_id: req.params.userId};

    const result = await user.deleteOne(filter);

    if(result.deletedCount === 1){
        res.status(200).send({success : true , msg: "User Remover"})
    }else{
        res.status(500).send({success: false , msg: " user not found"})
    }


  } )
 
module.exports = router;