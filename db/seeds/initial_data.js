/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return knex('students').insert([
    { firstname: 'Usman', lastname: "Rasheed" },
    { firstname: 'Nouman', lastname: "Rasheed" },
    { firstname: 'Shery', lastname: "Ali" }
  ])('books').insert([
    { name: 'Math', author: "XYZ",student_id: null, date_borrow: null ,date_return: null },
    { name: 'English', author: "XYZ",student_id: 1, date_borrow: "2021-11-29T00:00:00.000Z" ,date_return: "2022-11-29T00:00:00.000Z" },
    { name: 'Pak Studies', author: "ABC",student_id: 2, date_borrow: "2021-11-29T00:00:00.000Z" ,date_return: "2022-11-29T00:00:00.000Z" }
  ]);
};
