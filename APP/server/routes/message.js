const router = require('express').Router();
const Post = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/Message');

// add 

router.post("/", async (req, res)=>{
    const newMessage = new Message(req.body);
    try{
        const saveM= await newMessage.save();
        res.status(200).json(saveM);
    }
    catch(err){
        console.log(err);
    }
});

// get
router.get("/:conversationId", async (req, res) =>{
    try{
        const messages= await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;