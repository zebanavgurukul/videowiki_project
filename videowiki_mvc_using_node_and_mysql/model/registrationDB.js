const knex = require("../knex");

// 1
let registration = (add) => {
    return knex('reg').insert(add)
};

// 2
let registration_login = (email) => {
    return knex.select("email","first_name","last_name","password").from('reg').havingIn('reg.email',email)
};

let else_login = (password)=>{
    return knex.select('password').from('reg').havingIn('reg.password',password)
};

// 3 
let create_post_data = (registration_id)=>{
    return knex("reg").select("reg.registration_id").where("registration_id",registration_id)
};

let create = (create_data) =>{
    return knex('user').insert(create_data)
};

// 4
let create_data = (create) =>{
    return knex('user_post').insert(create)
};

// 5
let dataUserId = (id) => {
    return knex.select('*').from("user_post").where('id',id)
};

// 6
let reverse_data = (registration_id) => {
    return knex('reg')
    .join("user","reg.registration_id","=","user.registration_id")
    .join('user_post','user.user_id','=', 'user_post.user_id')
    .select('reg.registration_id','email','password','first_name','last_name','user.user_id','img_url','caption','user_post.id','likes','Dislikes','comments')
    .where('reg.registration_id',registration_id)
};

// 7
let post_bio = (post_data) => {
    return knex('bio').insert(post_data)
};

module.exports = {registration,registration_login,else_login,create,create_post_data,create_data,dataUserId,reverse_data,post_bio}