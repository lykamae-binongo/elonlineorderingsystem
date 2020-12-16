const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
require('dotenv').config()

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

require("./routes/information.routes.js")(app);
require("./routes/site.routes")(app);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.statusCode = 200;
    res.render('index');
  });



  app.get('*', function(req, res){
    res.status(404).render('404');
  });

app.listen(3000, () => {
    console.log("Dont Terminate the app");
    console.log("Server is running on port 3000.");
  });