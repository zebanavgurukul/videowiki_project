var knex = require("knex")({
    client: 'mysql',
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "navgurukul",
        database: "wiki_project"
    },
    useNullAsDefault: true
});
module.exports = knex;

knex.schema.hasTable('reg').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('reg', (table) => {
            table.increments('registration_id')
            table.string('email')
            table.string('password')
            table.string('first_name')
            table.string('last_name')
        })
        .catch((err) => {
            console.log(err,"There is some err while writing the quety")
        })
    }
    return console.log('table is created!')
});

knex.schema.hasTable('user').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('user', (table) => {
            table.increments('user_id')
            table.string('img_url')
            table.string('caption')
        })
        .catch((err) => {
            console.log(err,"There is some err while writing the quety")
        })
    }
    return console.log('table is created!')
});

knex.schema.hasTable('user_post').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('user_post', (table) => {
            table.increments('id')
            table.integer('likes')
            table.integer('Dislikes')
            table.string('comments')
        })
        .catch((err) => {
            console.log(err,"There is some err while writing the quety")
        })
    }
    return console.log('table is created!')
});