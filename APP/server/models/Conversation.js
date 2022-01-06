const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    members:{
        type: Array
    },

},{
    timestamps: true
},{
    collections: 'conversations'
});

module.exports = mongoose.model("Conversation", ConversationSchema);