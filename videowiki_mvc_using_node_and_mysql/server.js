const express = require('express');
var bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json())

const registration = require("./routes/registration")
app.use("/registration",registration)

app.listen(5000, () => {
    console.log("server is listening 5000.........")
});