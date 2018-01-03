// require dependencies
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// access tokens to twilio are stored in a .env file and placed in .gitignore for security purposes
const env = require("dotenv").config();
// twilio is required, and access tokens are passed in indirectly
const client = require('twilio')(
     process.env.TWILIO_ACCOUNT_SID,
     process.env.TWILIO_AUTH_TOKEN
  );

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: false }))

app.set("views", "./views");
app.set("view engine", "ejs");

// GET method route to main page

app.get("/", (req, res) => {
    res.render("index");
});

// POST method for contact form submittal
// sends the thanks page as a response and fires Twilio's API

app.post('/thanks',(req, res) => {
    var userInfo = {
        name: req.body.name,
        email_address: req.body.email,
        message: req.body.message
      }
      client.messages.create({
        from: "+18585003836",
        to:   "+18586638730",
        body: userInfo.name + " " + "just sent you a message from " + userInfo.email_address + ": " + userInfo.message 
      });
      res.render('thanks', userInfo )
});

app.set("port", (process.env.PORT || 8080));

app.listen(app.get("port"), () => {
  console.log("listening at http://localhost:" + app.get("port"));
});

// only set port locally

// app.listen(8080, () => {
//     console.log("listening at http://localhost:8080");
// });
