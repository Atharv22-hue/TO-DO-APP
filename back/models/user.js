const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const bcrypt = require('bcrypt');
const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    
    }
})
UserSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
      try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  });
module.exports=mongoose.model('user1',UserSchema);

