var express = require('express');
var booksRouter = express.Router();

/* GET users listing. */
var express = require('express');
var booksRouter = express.Router();
const DB = require('../services/DB');

/* GET users listing. */
booksRouter.get('/', function (req, res, next) {
    DB('books')
        .join('students', 'books.student_id', 'students.id')
        .select("books.id as id", "books.name as name", "books.author as author", "students.firstname as firstname", "students.lastname as lastname", "books.date_borrow as date_borrow", "books.date_return as date_return")
        .then(function (rows) {
            if (rows.length === 0) {
                // no matching records found
                res.setHeader('Content-Type', 'application/json');
                res.json(rows);
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(rows)
            }
        })
        .catch(function (ex) {
            res.json(ex)
        })
});

booksRouter.post('/', async function (req, res, next) {

    const { name, author, student_id, date_borrow, date_return } = req.body.book;
    if (name !== "" && author !== "" && name !== undefined && author !== undefined) {
        try {
            const insertedRows = await DB('books').insert({ name: name, author: author, student_id: student_id || null, date_borrow: date_borrow || null, date_return: date_return || null }).returning('*');
            if (insertedRows) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ book: insertedRows[0] });
            }
            else {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: "Book not added!" })
            }
        } catch (ex) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json(ex)
        }
    }
    else {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: "Fill all Fields" });
    }
});

booksRouter.put('/', async function (req, res, next) {

    const { id, name, author, student_id, date_borrow, date_return } = req.body.book;
    if (name !== "" && author !== "" && name !== undefined && author !== undefined) {
        try {
            const insertedRows = await DB('books').where({ id: id }).update({ name: name, author: author, student_id: student_id || null, date_borrow: date_borrow || null, date_return: date_return || null }).returning('*');
            if (insertedRows) {
                DB('books')
                    .join('students', 'books.student_id', 'students.id')
                    .select("books.id as id", "books.name as name", "books.author as author", "students.firstname as firstname", "students.lastname as lastname", "books.date_borrow as date_borrow", "books.date_return as date_return")
                    .where('books.id', insertedRows[0].id)
                    .then(function (rows) {
                        if (rows.length === 0) {
                            // no matching records found
                            res.setHeader('Content-Type', 'application/json');
                            res.json({ book: rows[0] });
                        } else {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({ book: rows[0] });
                        }
                    })
                    .catch(function (ex) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(ex)
                    })
            }
            else {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: "Book not updated!" })
            }
        } catch (ex) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json(ex)
        }
    }
    else {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: "Fill all Fields" });
    }
});

module.exports = booksRouter;