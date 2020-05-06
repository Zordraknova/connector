const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');

// @User
// @access  Public

    router.post('/', 

    [   check('name', 'name is OK').not().isEmpty(),
        check('email', 'Need valid @mail').isEmail(),
        check('password', '6 or more symbols').isLength({min:6})
    ],
        async (req, res) => {
    const errors =validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
            console.log(req.body); //===================================================================
    const { name,email,password } = req.body;
        
        try{
            let user = await User.findOne({ email });
              res.send('User route');

            if (user){
                 return res.status(400).json ({ errors: [{ msg: 'User is already exist'}] }); 
            }
        
    const avatar = gravatar.url(email,{
          s: '200',
          r: 'pg',
          d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });
        

    const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(password, salt);
         await user.save();

    const payload = {
        user:{
          id:user.id
      }  
    };

    jwt.sign(
        payload, 
        config.get('jwtSecret'),
        { expiresIn: 360000 },
            (err,token) => {
                if (err) throw err;
              return  res.json({ token });
            });
      


        
        }catch(err){
    console.log(err.message);

    // return res.status(500).send('Server error');
    return res.status (500);
        }
        
    });

module.exports = router;
