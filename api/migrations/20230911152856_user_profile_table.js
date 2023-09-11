/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable(
    'user_profile', table => {
        table.increments();
        table.string('first_name', 256);
        table.string('last_name', 256);
        table.string('username', 256);
        table.string('password', 256);
    }
  )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_profile')
  
};



