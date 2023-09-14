const mongoose=require('mongoose');
const {Schema}=mongoose;
const NotesSchema=new mongoose.Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    tag:{
        type: String,
        default: 'general'
    },
    date:{
        type: Date,
        default: Date.now
    }
    

    }
    
)
const NotesModel=mongoose.model('Notes', NotesSchema);
module.exports = NotesModel;