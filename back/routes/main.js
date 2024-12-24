const express=require('express');
const router=express.Router();
const post1=require('../models/post');
const user1=require('../models/user');

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { isActive } = require('../helpers/help');

const jwtSecret=process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  // Check if headers and token are defined
  const token = req.cookies.token;

  if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
      // Here you would verify the token (e.g., using JWT)
      const decoded = jwt.verify(token, jwtSecret);
   req.user1 = decoded.user1;
     next();
  } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
  }
}


router.get('/about',async(req,res)=>{
  res.render('partials/about')
})


router.post('/',async(req,res)=>{
   try{
    try {
        const { username, password } = req.body;
        
        // Find user by username
        const user = await user1.findOne({ username });
        if (!user) {
          return res.status(400).send('User not found');
        }
        // Continue with login process (e.g., generating a token, etc.)
      // res.send('Login successful');
       res.redirect('/todo');
      } catch (error) {
        res.status(500).send('Server error');
      }


}
   catch(error){

   }
})

 router.get('/register',(req,res)=>{
    res.render('layout/layout2');
});


router.post('/register',async(req,res)=>{
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
  
    try {
      const existingUser = await user1.findOne({ username });
      if (existingUser) {
        return res.status(400).send('Username is already taken');
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new user1({ username, password: hashedPassword });
      await newUser.save();
      console.log(username,password);
  
      res.send('User registered successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
    
})


router.get('/todo',async(req,res)=>
{
  const posts = await post1.find();;


    res.render('main/todo',{posts});
});

 

router.post('/todo',async(req,res)=>{

  try{
  
        const {date, text } = req.body;
      
        // Find user by username
        console.log(req.body)
    const newPost=await new post1({
      date,text
    })
    await newPost.save();
res.send('successs');
      } catch (err) {
        res.status(500).send('Server error'+err.message);
      }

}
)
router.post('/todo', (req, res) => {
  console.log('Received data:', req.body);

  const { date,text} = req.body;
  // Continue with the rest of the logic
});


router.get('/edit-post/:id',async(req,res)=>{
  try{
const id=req.params.id;
const posts = await post1.find();;
    const data=await post1.findOne({id});
   
    res.render('layout/edit-layout',{ data,posts})
  }
  catch(error){
console.log(error);
  }
})


router.put('/edit-post/:id',async(req,res)=>{
  try{
 
  const id=req.params.id;
await post1.findByIdAndUpdate({id,
  date:req.body.date,
  text:req.body.text,
  updatedAt:Date.now()
})
res.redirect('/todo')
  }
  catch(error){

  }
});

router.delete('/delete-post/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await post1.findByIdAndDelete(postId);
    if (result) {
        res.status(200).json({ message: 'Post deleted successfully' });
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
} catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete post' });
}
});

 
router.get('/logout',async(req,res)=>{
  res.clearCookie(token);
  res.redirect('/')
})

  /// {const authMiddleware=(req,res)=>{
  //const token=req.cookie.token;

  //if(!token){
    //  return res.status(401).json({ message:'authorised'});

  //}
  //try{
    //const decoded=jwt.verify(token,jwtSecret);
    //req.userId=decoded.userId;
    //next();
//}
//catch(error){
  //  res.status(401).json({message:'unauthorised'});
//}}

 //  }

router.get('',(req,res)=>{
    res.render('index');
});

module.exports=router;
