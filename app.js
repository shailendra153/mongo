const express = require('express');
const bodyParser = require('body-parser')

const path = require('path');
const indexRouter = require("./router/index.router");
const session = require('express-session')


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(session({ secret: 'hamaracode' }))
app.use(indexRouter);
app.listen(3000, () => {
    console.log("Server is Running")
});