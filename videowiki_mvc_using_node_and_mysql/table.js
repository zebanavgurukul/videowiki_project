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
            table.string('email').unique();
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

knex.schema.hasTable('user_post').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('user_post', (table) => {
            table.increments('post_id')
            table.integer('registration_id')
            table.string('img_url')
            table.string('caption')
        })
        .catch((err) => {
            console.log(err,"There is some err while writing the quety")
        })
    }
    return console.log('table is created!')
});

knex.schema.hasTable('post').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('post', (table) => {
            table.integer('registration_id')
            table.integer('post_id')
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

knex.schema.hasTable('bio').then((exists) => {
    if (!exists) {
        return knex.schema.createTable('bio', (table) => {
            table.increments('id')
            table.string('Name')
            table.string('Birthday')
            table.string('Mobile')
            table.string('Gender')
            table.string('Location')
            table.string('Education')
        })
        .catch((err) => {
            console.log(err,"There is some err while writing the quety")
        })
    }
    return console.log('table is created!')
});