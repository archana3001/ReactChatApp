const router = require('express').Router();
const jwt = require("jsonwebtoken");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const authorize = require("../middlewares/auth");
const { check, validationResult } = require('express-validator');
// Register
router.post("/register", [
    check('username')
        .not()
        .isEmpty()
        .isLength({ min: 3 })
        .withMessage('Name must be atleast 3 characters long'),
    check('email', 'Email is required')
        .not()
        .isEmpty(),
    check('password', 'Password should be between 6 to 20 characters long')
        .not()
        .isEmpty()
        .isLength({ min: 6, max: 20 })
], (req, res, next)=>{
    const errors = validationResult(req);
        console.log(req.body);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
    console.log(req.body)
        // generate new password
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            //  save user
            newUser.save().then((response) => {
                res.status(201).json({
                    message: "User successfully created!",
                    result: response
                });
            }).catch(error => {
                res.status(500).json({
                    error: error
                });
            });
        });
        }
})

// LOGIN
/*
router.post("/login", async (req, res)=>{
    try{
        const user= await User.findOne({email: req.body.email});
        !user && res.status(404).json("Authentication failed");
        const validPassword=await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Authentication failed");
        res.status(200).json(user);
    }catch(err){
        console.log(err)
    }
    
});
*/
router.post("/login", (req, res, next) => {
    let getUser;
    User.findOne({
        email: req.body.email
    }).then(admin => {
        if (!admin) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = admin;
        console.log(getUser);
        return bcrypt.compare(req.body.password, admin.password);
    }).then(response => {
        if (response==false) {
            console.log("response",response);
            return res.status(401).json({
                message: "Authentication failed"
            });
        }/*
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            _id: getUser._id,
            user: getUser
        });*/
        res.status(200).send(getUser);
    }).catch(err => {
        console.log("error",err);
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
});

module.exports = router