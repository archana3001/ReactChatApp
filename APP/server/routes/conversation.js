const router = require('express').Router();
const Conversation = require('../models/Conversation');

//new conversation

router.post("/", async (req, res)=>{
    //console.log(req.body);
    const newConversation = Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });
    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }
    catch(err){
        res.status(500).json(err);
    }
})
// get conv of a user
router.get("/:userId", async (req, res)=>{
    console.log(req.params.userId);
   try{
        const conv=await Conversation.find({
            members:{ $in: [req.params.userId]}
        });
        res.status(200).json(conv);
   }
   catch(err){
       res.send(500).json(err);
   }
});

module.exports = router;