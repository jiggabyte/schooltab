const express = require('express');

const schoolController = require('../controllers/index');

const router = express.Router();


// GET All
router.get('/students', schoolController.getAllStudents);

// GET One
router.get('/get-student/:stud_id', schoolController.getStudent);

// POST a Student
router.post('/add-student', schoolController.addStudent);

// PUT a Student (Update)
router.put('/update-student/:stud_id', schoolController.updateStudent);

// DELETE a Student
router.delete('/delete-student/:stud_id', schoolController.deleteStudent);

module.exports = router;