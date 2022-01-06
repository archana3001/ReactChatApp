const { body } = require('express-validator');
const User = require('../models/User');

const router = require('express').Router();


router.put('/:id',(req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('User successfully updated!')
        }
    })
})

router.delete('/:id',(req, res, next) => {
    User.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// get a user
router.get('/',async (req, res) => {
    const userId=req.query.userId;
    const username=req.query.username;
    try{
        const user=userId ? await User.findById(userId): await User.findOne({username: username});
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    }catch(err){
        res.status(500).json(err);
    }
})

// get friends
router.get("/friends/:userId", async (req, res)=>{
    try{
        const user=await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.following.map(friendId=>{
                return User.findById(friendId);
            })
        )
        let friendList=[];
        friends.map(friend=>{
            const {_id, username, profilePicture}= friend;
            friendList.push({_id, username, profilePicture});
        });
        res.status(200).json(friendList);
    }catch(err){
        console.log(err);
    }
})

// follow user and following
router.put("/:id/follow", async (req, res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser=await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push: {followers: req.body.userId}});
                await currentUser.updateOne({ $push: { following: req.params.id}});
                res.status(200).json("user has been followed");
            }else{
                res.status(403).json("you are already following");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("you cannot follow yourself");
    }
})

// unfollow user
router.put("/:id/unfollow", async (req, res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser=await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({ $pull: {followers: req.body.userId}});
                await currentUser.updateOne({ $pull: { following: req.params.id}});
                res.status(200).json("user has been unfollowed");
            }else{
                res.status(403).json("you are already not following");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("you cannot unfollow yourself");
    }
})

module.exports = router