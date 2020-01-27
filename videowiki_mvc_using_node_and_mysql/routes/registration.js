const express = require("express");
const registration = express.Router();
const jwt = require('jsonwebtoken');
const registrationDB   = require("../model/registrationDB")

// 1
registration.post('/Register', (req,res) => {
    var main_data = req.body.params
    let add = {
        registration_id : main_data.registration_id,
        email : main_data.email,
        password : main_data.password,
        first_name : main_data.first_name,
        last_name : main_data.last_name
    }
    
    registrationDB.registration(add)
    .then(()=>{
        res.send('insert')
    })
});


// 2
registration.post("/Login",(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    registrationDB.registration_login(email)
    .then((data)=>{
        if(data.length==0){
            res.send("your email is incorect please try again...")
        }
        else if(data[0]["password"]==password){
            let token = jwt.sign({"user":data[0]},"zeba")
            res.cookie(token)
            jwt.verify(token,"zeba",(err,result)=>{
                res.json({"status":"write","massage":"login successful ","token":token})
            })
        }
        else{
            res.send("your password is incorect try again....")
        }
    }).catch((err)=>{
        res.send(err)
    })
});

registration.post("/registration_login",(req,res)=>{
    var alltoken = req.headers.cookie
    var token = alltoken.split('=')
    token = (token[token.length-2]).slice(11,300)
    jwt.verify(token, 'zeba', (err,data) => {
        for(let i = 0; i < data['costomer'].length; i++)
        var password = data['costomer'][i]['password']
        if(err){
            res.send("err");
        }
        else {
            res.json({password})
        }
    })
});

// 3 
registration.post('/create_post/:registration_id', (req,res) => {
    let registration_id = req.params.registration_id
    let data = registrationDB.create_post_data(registration_id)
    data.then((data)=> {
        var id_data = data[0]["registration_id"]
    let create_data = {
        user_id : id_data,
        img_url : req.body.img_url,
        caption : req.body.caption
    }
    registrationDB.create(create_data)
    .then(()=>{
        res.send('insert')
    }).catch((err)=>{
        res.send(err)
    })
    })
});

// 4
registration.post('/create_data/:user_id', (req,res) => {
    let user_id = req.params.user_id
    let data = registrationDB.get_data(user_id)
    data.then((data)=> {
        var id_data = data[0]["user_id"]
    let create = {
        id : id_data,
        likes : req.body.likes,
        Dislikes : req.body.Dislikes,
        comments : req.body.comments
    }
    registrationDB.create_data(create)
    .then(()=>{
        res.send('insert')
    }).catch((err)=>{
        res.send(err)
    })
    })
});

// 5
registration.get('/get_data', (req,res) => {
    
})

module.exports = registration
