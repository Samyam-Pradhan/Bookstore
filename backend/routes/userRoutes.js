const express = require("express");
const bcrypt = require("bcrypt");
const  User = require("../models/user");
const router = express.Router();

router.post("/sign-up", async (req, res)=>{
    try {
        const {username, email, password, address} = req.body;
        
        if(username.length < 4){
            return res
            .status(400)
            .json({msg:"Username should be more than 3 character"})
        }

        const existingUsername = await User.findOne({username: username});
        if(existingUsername){
            return res
            .status(400)
            .json({msg:"Username already exists"})
        }
        const existingEmail = await User.findOne({email: email});
        if(existingEmail){
            return res
            .status(400)
            .json({msg:"Email already exists"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username:username,
            email:email,
            password:hashedPassword,
            address:address
        })

        await newUser.save()
        return res.status(200).json({msg:"SignUp sucessfull"});
    } catch (error) {
        res.status(500).json({msg:"Internal server error"})
        }
})

module.exports = router;