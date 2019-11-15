exports.up = function(knex) {
  return knex.schema
    .createTable('user', function(table) {
      table
        .increments('id_user')
        .primary()
        .notNullable()
        .unique()
        .unsigned();
      table
        .string('username')
        .notNullable()
        .unique();
      table.string('password').notNullable();
      table
        .string('user_email')
        .notNullable()
        .unique();
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
    })
    .createTable('admin', function(table) {
      table
        .increments('id_admin')
        .primary()
        .notNullable()
        .unique();
      table
        .string('username')
        .notNullable()
        .unique();
      table.string('password').notNullable();
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
      table.bigInteger('created_at').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('admin').dropTable('user');
};
