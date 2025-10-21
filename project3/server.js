const express = require('express')
const parser = require('body-parser')
const encodedParser = parser.urlencoded({ extended: true });
const multer = require("multer");
const uploadProcessor = multer({ dest: "public/upload/" });
let app = express()
app.use(express.static("public"));
app.use(encodedParser);
app.set("view engine", "ejs");

//put an empty array here if you need it:
let messages =[];


// If the user just goes to the "route" /test then run this function
app.get('/', function(request, response) {
    //              -----PLANNING-----
    // array with the objects of the panels in beginning state
    // if the path of /final room is found, change the array to middle state
    //     ACTIAL CODE ||
    //                 \/
    let panelsArray = [
        {},{},{},
    ]
    


    response.render("disguise.ejs", {});
})

app.get('/homepage', function (request, response) {
  // send the current messages array to the homepage so it can render posts
  let data = {
    allPosts: messages,
  };
  response.render("template.ejs", data);
})
app.get("/all-messages", (request, response) => {
  let allMessages = "";
  //this is a loop to access array for objects in
  for (let m of messages) {
    allMessages += m.username + " says " + m.text + "<br/>";
  }
  response.send(allMessages);
});
app.get("/post", (request, response) => {
  //allPosts will be accessed on the ejs side
  //posts is the current array in the server
  let data = {
    allPosts: messages,
  };
  response.render("post.ejs", data);
});

app.post("/upload", uploadProcessor.single("bountyThumbnail"), (req, res) => {
  console.log(req.body);
  let singlePost = {
    text: req.body.status,
  };

  let date = new Date();
  singlePost.time = date.toLocaleString();
  if (req.file) {
    singlePost.imgSrc = "upload/" + req.file.filename;
  }
  messages.push(singlePost);
  res.redirect("/homepage");
});


app.listen(8000, function() {
    console.log("App listening on port 8000")
})