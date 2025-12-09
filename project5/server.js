/*********************************************
library imports
*********************************************/
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const nedb = require("@seald-io/nedb");
const cookieParser = require("cookie-parser");
const expressSession = require('express-session')
const nedbSessionStore = require('nedb-promises-session-store')
const bcrypt = require('bcrypt')

/*********************************************
library configurations:
- setting up express server via app
- setting up how the parser interprets data
- setting up where multer stores images
- setting up database files
*********************************************/
const app = express();
const urlEncodedParser = bodyParser.urlencoded({ extended: true });
const upload = multer({
  dest: "public/uploads",
});
let database = new nedb({
  filename: "database.txt",
  autoload: true,
});
//// NEW LIBRARY CONFIGURATIONS
app.use(cookieParser());

// setting up the session db creation
const nedbSessionInit = nedbSessionStore({
  connect: expressSession,
  filename: 'sessions.txt'
})
// linking app to use session db
app.use(expressSession({
  store: nedbSessionInit, 
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 // after a year, delete the session
  },
  secret: 'thisismysecretkey'
}))
let userdb = new nedb({
  filename: 'userdb.txt',
  autoload: true
})

/*********************************************
middleware setup
*********************************************/
app.use(express.static("public"));
app.use(urlEncodedParser);
app.set("view engine", "ejs");

//--------------------project5 routes begin below-------------------------
app.get('/start', (req, res)=>{

  if (req.cookies.hasViewedPage === 'true'){
    
    res.redirect('/whiteroom')
  } else{
    let intrusiveThought = ''
    res.cookie('hasViewedPage', 'true', {expires: new Date(Date.now() + 100000000)})
    res.render('start.ejs')
  }
})


app.get('/whiteroom', (req, res)=>{
  //this prevents browser from caching
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.render('whiteroom.ejs')
})

app.get('/greenroom', (req, res)=>{
  //this prevents browser from caching
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.render('greenroom.ejs')
})

app.post('/close-eyes', (req, res)=>{
  let progressAttempt = {
    thought: req.body.thought
  }
      if(progressAttempt.thought === 'good night'){
        res.redirect('/greenroom');
      } else{
        res.redirect('/whiteroom');
      }
    })




/*********************************************
server listener for when requests are made 
to the server
- we don't really need to modify this
- needs to go at the end
*********************************************/
app.listen(6001, () => {
  console.log("server started on port 6001");
});
