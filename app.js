const express=require('express');
const expressLayout=require('express-ejs-layouts');
const bodyParser=require('body-parser');
const methodOverride=require('method-override');
const mongoose=require('mongoose');
const {isActive}=require('../to do 2/back/helpers/help');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.locals.isActive=isActive;
const cookieparser=require('cookie-parser');
const session=require('express-session');
const MongoStore = require('connect-mongo');

const mongoUrl='mongodb+srv://pant2:awapx7UCOhQn4GBa@atharv.09g0rli.mongodb.net/';

app.use(cookieparser());


app.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true,
  store:MongoStore.create({
    mongoUrl:mongoUrl
  })
}))

const path = require('path');

app.set('views', path.join(__dirname, 'views'));

app.set('view engine','ejs');
app.use(expressLayout);
app.set('layout','./layout/layout')

app.use('/',require('./back/routes/main'));
const date=mongoose.model('date',{date:Number});

mongoose.connect(mongoUrl, {
  
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
}
);



// Use sessions with MongoDB store



app.listen(4000,(req,res)=>{
    console.log('running');
    });
