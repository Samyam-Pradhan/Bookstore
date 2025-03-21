const bcrypt = require("bcrypt");
const  User = require("../models/user");
const jwt = require("jsonwebtoken");
const register = async(req, res) =>{
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
        return res.status(200).json({msg:"Register sucessfull"});
    } catch (error) {
        res.status(500).json({msg:"Internal server error"})
        }
}

const login = async(req, res)=>{
    try {
        const {username, password} = req.body;

        const existingUser = await User.findOne({username});
        if(!existingUser){
            res.status(400).json({msg:"Invalid credentials"});
        }

         bcrypt.compare(password,existingUser.password, (err, data)=>{
            if(data){
                const authClaims = [{name: existingUser.name}, {role:existingUser.role}];
                const token = jwt.sign({authClaims},"EBOOKSTORE",{expiresIn:"30d"});
                res.status(200).json({msg:"Login Sucessfully"});
            }
            else{
                res.status(400).json({msg:"Invalid credentials"});
            }
        })
    } catch (error) {
        res.status(500).json({msg:"Internal server error"})
    }
}

module.exports ={register, login};