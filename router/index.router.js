const { response, request } = require('express');
const db = require('../util/database')
const express = require('express');
const multer = require("multer");
const upload = multer({ dest: "public/images" })
const router = express.Router();
router.get("/", (request, response) => {
    return response.render("home.ejs", {
        title: "Home Page"
    })
})
router.get("/signin", (request, response) => {
    return response.render("signin.ejs", {
        title: "SignIn Page"
    })
})
router.get("/signup", (request, response) => {
    return response.render("signup.ejs", {
        title: "Sign-Up Pag`e"
    })
})
router.get("/category", (request, response) => {
    return response.render("category.ejs", {
        title: "category Page"
    })
})
router.post("/signup", (request, response) => {
    console.log(request.body)
    db.collection("user").insertOne(request.body)
        .then(result => {
                return response.redirect('/signin')
            }

        )
        .catch(err => {
            return response.send("Error Is Coming");
        })
})
router.post("/signin", (request, response) => {
    console.log(request.body)
    let email = request.body.email;
    let password = request.body.password;
    db.collection("user").find({
            email: email,
            password: password
        }).toArray()
        .then(result => {
            request.session.current_user_id = result[0]._id;
            request.session.current_user_name = result[0].username;
            response.render("home.ejs", {
                title: "home page",
                username: request.session.current_user_name
            })

        }).catch(err => {
            console.log(err);
        });
})

router.post("/category", upload.single('category_image'), function(req, res) {
    const imagename = req.file.filename;
    console.log(imagename)
    db.collection("category").insertOne({ category_name: req.body.category_name, category_image: imagename })
        .then(result => {
            res.send("Ho gya bhiya")
        })
        .catch(err => {
            res.send("Error is Coming")
        })

});
module.exports = router;