const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET;

//Route 1: create a user - /api/auth/createuser
router.post('/createuser',
   body('email').isEmail(),
   body('password').isLength({ min: 5 }),
   body('name').isLength({ min: 3 }),
   async (req, res) => {
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ success,error: errors.array() });
      }
      try {
         let user = await User.findOne({ email: req.body.email });
         if (user) {
            return res.status(400).json({success, error: "sorry this user already exists" })
         }
         const salt = await bcrypt.genSalt(10);
         const secPass = await bcrypt.hash(req.body.password, salt)
         user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
         })
         const data = {
            user: {
               id: user.id
            }
         }
         const authtoken = jwt.sign(data, JWT_SECRET);
         success = true

         //  .then(user => res.json(user))
         //  .catch(err => {console.log(err)
         // res.json({error: "Please enter a unique email",message:err.message})});

         res.json({ success, authtoken });
      } catch (error) {
         res.status(500).send({success,error:"Internal server error"});
      }


   })

//Route 2: authenticate a user - /api/auth/login

router.post('/login',
   body('email').isEmail(),
   async (req, res) => {

      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({success, error: errors.array() });
      }

      const { email, password } = req.body;

      try {
         let user = await User.findOne({ email });
         if (!user) {
            return res.status(400).json({success, error: "please try to login with valid credentials" })
         }
         const passwordCompare = await bcrypt.compare(password, user.password);
         if (!passwordCompare) {
            return res.status(400).json({success, error: "please try to login with valid credentials" })
         }

         const data = {
            user: {
               id: user.id
            }
         }
         const authtoken = jwt.sign(data, JWT_SECRET);
         success=true
         res.json({ success,authtoken });
      } catch (error) {
         res.status(500).send({success,success:"Internal server error"});
      }

   })

//Route 3: get loggedin user detail - /api/auth/getuser
router.get('/getuser', fetchuser, async (req, res) => {
   let success=false;
   try {
     const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      success=true
      res.send({success:success,user:user});
      // res.json(user)
   } catch (error) {
      res.send(500).send({error:"Internal Server Error"});
   }
})

module.exports = router;