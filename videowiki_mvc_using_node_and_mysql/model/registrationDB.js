const knex = require("../knex");

// 1
let registration = (add) => {
    return knex('reg').insert(add)
}

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
let get_data = (user_id)=>{
    return knex("user").select("user.user_id").where("user_id",user_id)
};

let create_data = (create) =>{
    return knex('user_post').insert(create)
};

module.exports = {registration,registration_login,else_login,create,create_post_data,get_data,create_data}