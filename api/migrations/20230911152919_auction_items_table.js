/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable(
        'auction_items', table => {
            table.increments();
            table.integer('user_profile_id').unsigned();
            table.foreign('user_profile_id').references('user_profile_id');
            table.string('item_name', 256).notNullable();
            table.string('description', 1024);
            table.integer('quantity');
        }
    )
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('auction_items', table => {
    table.dropForeign('user_profile_id')
  })
        .then(function (){
            return knex.schema.dropTableIfExists('auction_items')
        })
};




