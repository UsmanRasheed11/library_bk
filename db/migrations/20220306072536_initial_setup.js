/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('students', (table) => {
        table.increments('id');
        table.string('firstname');
        table.string('lastname');
    })
    .createTable('books', (table) => {
                table.increments('id');
                table.string('name');
                table.string('author');
                table
                    .integer('student_id')
                    .unsigned()
                    .references('students.id');
                table.date('date_borrow');
                table.date('date_return');
              });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('students')
    .dropTable('books');
};
