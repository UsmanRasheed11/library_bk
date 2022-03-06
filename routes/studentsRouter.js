var express = require('express');
var studentsRouter = express.Router();
const DB = require('../services/DB');

/* GET users listing. */
studentsRouter.get('/', function(req, res, next) {
  DB('students')
  .select()
  .then(function(rows) {
    if (rows.length===0) {
      // no matching records found
      res.setHeader('Content-Type', 'application/json');
      res.json(rows);
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(rows)
    }
  })
  .catch(function(ex) {
    res.json(ex)
  })
});

studentsRouter.post('/', async function(req, res, next) {
  
  const {firstname, lastname } = req.body.student;
  if(firstname !=="" && lastname !=="" && firstname !==undefined && lastname !==undefined ){
    try{
      const insertedRows = await DB('students').insert({ firstname: firstname, lastname: lastname }).returning('*');
      if(insertedRows){

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({student: insertedRows[0]});
      }
      else{
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: "Student not added!"})
      }
  }catch(ex) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.json(ex)
  }
}
else{
  res.statusCode = 500;
  res.setHeader('Content-Type', 'application/json');
  res.json({err: "Fill all Fields" });
}
});

studentsRouter.put('/', async function(req, res, next) {
  
  const {student} = req.body;
  if(student.firstname !=="" && student.lastname !=="" && student.firstname !==undefined && student.lastname !==undefined ){
    try{
      const insertedRows = await DB('students').where({id: student.id}).update(student).returning('*');
      if(insertedRows){

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({student: insertedRows[0]});
      }
      else{
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: "Student not updated!"})
      }
  }catch(ex) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.json(ex)
  }
}
else{
  res.statusCode = 500;
  res.setHeader('Content-Type', 'application/json');
  res.json({err: "Fill all Fields" });
}
});

module.exports = studentsRouter;