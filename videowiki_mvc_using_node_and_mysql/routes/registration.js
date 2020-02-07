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

registration.post('/Register', (req,res) => {
    let add = {
        registration_id : req.body.registration_id,
        email : req.body.email,
        password : req.body.password,
        first_name : req.body.first_name,
        last_name : req.body.last_name
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
        if(data.length == 0){
            res.send("your email is incorect please try again...")
        }
        else if(data[0]["password"] == password){
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
    data.then((data) => {
        var id_data = data[0]["registration_id"]
    let create_data = {
        post_id : req.body.post_id,
        registration_id : id_data,
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

// 3.1
registration.put('/put_data/:post_id', (req,res) => {
    var post_id = req.params.post_id
    var updata = {
        "registration_id" : req.body.registration_id,
        "img_url" : req.body.img_url,
        "caption" : req.body.caption
    }
    registrationDB.data_put(updata,post_id)
    .then(()=>{
        res.json("table updated!...")
    }).catch((err)=>{
        res.send(err)
    })
});


// 4
registration.post('/create_data', (req,res) => {
    let create = {
        registration_id : req.body.registration_id,
        post_id : req.body.post_id,
        id : req.body.id,
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
});

// 5
registration.get('/likes_get/:registration_id', (req,res) => {
    let registration_id = req.params.registration_id;
    let data = registrationDB.get_data(registration_id)
    data.then((result) => {
        let likes_counter = 0
        for(let i = 0; i<result.length; i++) {
            if(result[i]['likes'] == 1){
                likes_counter += 1
            }
        }
        res.send({likes_counter})
    })
});

// 5.1
registration.get('/Dislikes_get/:registration_id', (req,res) => {
    let registration_id = req.params.registration_id
    let data = registrationDB.get_data(registration_id)
    data.then((result) => {
    let Dislikes_counter = 0
    for(let j = 0; j < result.length; j++) {
        if (result[j]['Dislikes'] == 1){
            Dislikes_counter += 1
        }
    }
    res.send({Dislikes_counter})
    })
})

// 6
registration.get('/reverse/:registration_id',(req,res) => {
    let registration_id = req.params.registration_id
    let reverse_data_post = registrationDB.reverse_data(registration_id)
    reverse_data_post.then((data) => {
        const reversed = data.reverse();
        console.log(reversed)
        res.send(data)
    })
});

// 7
registration.post('/bio_post', (req,res) => {
    let post_data = {
        Name : req.body.Name,
        Birthday : req.body.Birthday,
        Mobile : req.body.Mobile,
        Gender : req.body.Gender,
        Location : req.body.Location,
        Education : req.body.Education
    }
    registrationDB.post_bio(post_data)
    .then(()=>{
        res.send('insert')
    }).catch((err)=>{
        res.send(err)
    })
});

// 7.1
registration.get('/bio',(req,res) => {
    registrationDB.bio_get()
    .then((result) => {
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
});

// 7.2
registration.get('/boi_get/:id', (req,res) => {
    let id = req.params.id
    registrationDB.bio_id(id)
    .then((result) => {
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
});

// 7.3
registration.put('/bio_put/:id', (req,res) => {
    let id = req.params.id
    let updata = {
        id : req.body.id,
        Name : req.body.Name,
        Birthday : req.body.Birthday,
        Mobile : req.body.Mobile,
        Gender : req.body.Gender,
        Location : req.body.Location,
        Education : req.body.Education
    }
    registrationDB.bio_update(updata,id)
    .then(() => {
        res.send('insert')
    }).catch((err)=>{
        res.send(err)
    })
});

// 7.4
registration.delete('/delete/:id', (req,res) => {
    var id = req.params.id
    registrationDB.data_delete(id)
    .then(() => {
        res.send('delete')
    }).catch((err) => {
        res.send(err)
    })
});

// 8
registration.get('/get_page/:registration_id',(req,res) => {
    let registration_id = req.params.registration_id
    registrationDB.home_page(registration_id)
    .then((result) => {
    let likes_counter = 0
    for(let i = 0; i<result.length; i++) {
        if(result[i]['likes'] == 1){
            likes_counter += 1
        }
    }
    let Dislikes_counter = 0
    for(let j = 0; j < result.length; j++) {
        if (result[j]['Dislikes'] == 1){
            Dislikes_counter += 1
        }
    }
    let data_result = {
        "first_name": result[0]['first_name'],
        "last_name": result[0]['last_name'],
        "img_url": result[0]['img_url'],
        "caption": result[0]['caption'],
        "likes": likes_counter,
        "Dislikes": Dislikes_counter,
        "comments": result[0]['comments']
    }
    res.send(data_result)
    }).catch((err) => {
        res.send(err)
    })
})

// 9
registration.get('/get/:id', (req,res) => {
    let id = req.params.id
    registrationDB.page_data(id)
    .then((data) => {
    let page = {
        "Name": data[0]['Name'],
        "Birthday": data[0]['Birthday'],
        "Mobile": data[0]['Mobile'],
        "Gender": data[0]['Gender'],
        "Location": data[0]['Location'],
        "Education": data[0]['Education'],
        "img_url": data[0]['img_url'],
        "comments": data[0]['comments'],
        "caption": data[0]['caption']
    }
    res.send(page)
    }).catch((err) => {
        res.send(err)
    })
});

module.exports = registration