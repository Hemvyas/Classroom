const User=require("../models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


//principalRegisteration
exports.register=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const existingUser=await User.findOne({email});
        if (existingUser)
          return res.status(400).json({ message: "User already exists" });
        const user=new User({email,password,role:"Principal"});
        await user.save();
        res.status(201).json({ message: "Principal account created" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//principalLogin
exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;
         const user = await User.findOne({ email });
         if (!user)
           return res
        .status(400)
        .json({ message: "Invalid email or password" });
         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch)
           return res
             .status(400)
             .json({ message: "Invalid email or password" });
         const token=jwt.sign(
            {_id:user._id,role:user.role},
            process.env.secretkey,
            {expiresIn:"1d"}
        )
        const id=user._id;
        const role=user.role;
         res.status(200).json({ token, id, role });
    } catch (error) {
       res.status(500).json({ error: error.message }); 
    }
}