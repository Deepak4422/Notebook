const express=require('express');
const router =express.Router();
const User=require('../models/User')
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
var  jwt = require('jsonwebtoken');
const JWT_SECRET='webtokenboyoftheyear';
const fetchuser=require('../middleware/fetchUser');

router.post('/createUser', [
    body('name','Enter a name'),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({ min: 5 }),],
    async (req,res)=>{
      let success=false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({success, errors: errors.array() });
        }
        try{
            const findemail=await User.findOne({email: req.body.email});
        if(findemail)
        {
           return  res.status(400).json({success,error: "This email address is already in use"});
        }
        
        const salt=await bcrypt.genSalt(10);
        const newpassword=await bcrypt.hash(req.body.password,salt);
        const user = await User.create({email: req.body.email, password: newpassword, name: req.body.name});
        const data={
            user: {
                id: user.id
            }
        }
        const authtoken=jwt.sign(data, JWT_SECRET);
        success=true
        res.json({success,authtoken});
        }
        catch(err){
            res.status(500).send({message: err.message});
        }
    });


        //authenticate the user
       
        router.post('/login', [
            body('email','Enter a valid email').isEmail(),
            body('password','Password cannot be blank').exists()]  ,
            async (req,res)=>{
                const errors = validationResult(req);
                let success=false;
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        const find= await User.findOne({email:req.body.email} );
        if(!find)
        {
           return  res.status(400).json({success: success,error:"Please login with correct credentials"});
        }
       try{
        let compare=  await bcrypt.compare(req.body.password, find.password);
       if(!compare)
       {
        return res.status(400).json({success: success,error:"Please login with correct credentials"});
       }
       const data={
        user:{
            id: find.id
        }
       }
       const authtoken=jwt.sign(data,JWT_SECRET);
       success=true;
       res.json({success, authtoken});
       }
       catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
       }
           
       // user login details route 

       router.get('/getuser', fetchuser,
        async (req,res)=>{
            try {
                const userId=req.user.id;
                const userdata=await User.findById(userId).select('-password');
                res.send(userdata);
                
            } catch (error) {
                console.error({error: error.message});
                res.status(500).send('Internal server error');
            }
        });
        

})
module.exports=router;