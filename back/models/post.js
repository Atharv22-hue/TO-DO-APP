const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const PostSchema= new Schema({
    date:{
        type:Date,
        required:true,
   
    },
    text:{
        type:String,
        required:true,
        
    }
})
module.exports=mongoose.model('post1',PostSchema);