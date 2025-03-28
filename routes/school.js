const express = require('express');

const studentController = require('../controllers/student');

const instructorController = require('../controllers/instructor');

const router = express.Router();

const { studentValidationRules, studentUpdateValidationRules, instructorValidationRules, instructorUpdateValidationRules, studentIdValidationRules, instructorIdValidationRules, validate } = require('../utils/validator');


// GET All
router.get('/students', studentController.getAllStudents);

// GET One
router.get('/get-student/:stud_id', studentIdValidationRules(), validate, studentController.getStudent);

// POST a Student
router.post('/add-student', studentValidationRules(), validate, studentController.addStudent);

// PUT a Student (Update)
router.put('/update-student/:stud_id', studentUpdateValidationRules(), validate, studentController.updateStudent);

// DELETE a Student
router.delete('/delete-student/:stud_id', studentIdValidationRules(), validate, studentController.deleteStudent);

// GET All
router.get('/instructors', instructorController.getAllInstructors);

// GET One
router.get('/get-instructor/:inst_id', instructorIdValidationRules(), validate, instructorController.getInstructor);

// POST a Student
router.post('/add-instructor', instructorValidationRules(), validate, instructorController.addInstructor);

// PUT a Student (Update)
router.put('/update-instructor/:inst_id', instructorUpdateValidationRules(), validate, instructorController.updateInstructor);

// DELETE a Student
router.delete('/delete-instructor/:inst_id', instructorIdValidationRules(), validate, instructorController.deleteInstructor);

// Error route
router.get('/instructor-error', instructorController.getError);

// File Not Found Route - must be last route in list
router.use((req, res, next) => {
    const err = new Error("not found!");
    err.status = 404;
    next(err);
});

module.exports = router;