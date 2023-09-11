/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_profile').del()
  await knex('user_profile').insert([
    {first_name: 'Michael', last_name: 'Hickson', username:'mhickson89', password: 1234},
    {first_name: 'Travis', last_name: 'Hickson', username:'thickson90', password: 5678}
    
  ]);
};
