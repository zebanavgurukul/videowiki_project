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
    return knex('user_post').insert(create_data)
};

// 3.1
let data_put = (updata,post_id) => {
    return knex('user_post').update(updata).where("post_id",post_id)
};

// 4
let create_data = (create) =>{
    return knex('post').insert(create)
};

// 5 dono 5.1
let get_data = (registration_id) => {
    return knex('reg')
    .join("user_post","reg.registration_id","=","user_post.registration_id")
    .join('post','user_post.post_id','=', 'post.post_id')
    .select('reg.registration_id','email','password','first_name','last_name','user_post.post_id','img_url','caption','post.id','likes','Dislikes','comments')
    .where('reg.registration_id',registration_id)
};

// 5
let dataUserId = (id) => {
    return knex.select('*').from("post").where('id',id)
};

// 6
let reverse_data = (registration_id) => {
    return knex('reg')
    .join("user_post","reg.registration_id","=","user_post.registration_id")
    .join('post','user_post.post_id','=', 'post.post_id')
    .select('reg.registration_id','email','password','first_name','last_name','user_post.post_id','img_url','caption','post.id','likes','Dislikes','comments')
    .where('reg.registration_id',registration_id)
};

// 7
let post_bio = (post_data) => {
    return knex('bio').insert(post_data)
};

// 7.1
let bio_get = () => {
    return knex('bio').select("*")
};

// 7.2
let bio_id = (id) => {
    return knex('bio').select('*').where('id',id)
};

// 7.3
let bio_update = (updata,id) => {
    return knex('bio').update(updata).where('id',id)
};

// 7.4
let data_delete = (id) => {
    return knex('bio').where('id',id).del()
};

// 8
let home_page = (registration_id) => {
    return knex('reg')
    .join('user_post','reg.registration_id', 'user_post.post_id')
    .join('post','user_post.post_id', '=', 'post.post_id')
    .select('reg.first_name','last_name','user_post.img_url','caption','post.likes','Dislikes','comments')
    .where('reg.registration_id',registration_id)
};

// 9
let page_data = () => {
    return knex('bio')
    .join('post','bio.id', '=', 'post.id')
    .join('user_post','post.id','user_post.post_id')
    .select('user_post.post_id','img_url','caption','bio.Name','post.comments')
};

let page = () => {
    return knex('reg')
    .join('user_post','reg.registration_id', '=', 'user_post.registration_id')
    .join('post','user_post.post_id','post.id')
    .select('user_post.post_id','img_url','caption','reg.first_name','post.comments')
}

module.exports = {registration,
    registration_login,
    else_login,
    create,
    data_put,
    create_post_data,
    get_data,
    create_data,
    dataUserId,
    reverse_data,
    post_bio,
    bio_get,
    bio_id,
    bio_update,
    data_delete,
    home_page,
    page_data,
    page}