const express = require('express');

const studentController = require('../controllers/student');

const instructorController = require('../controllers/instructor');

const authController = require('../controllers/authController');

const router = express.Router();

const { studentValidationRules, studentUpdateValidationRules, instructorValidationRules, instructorUpdateValidationRules, studentIdValidationRules, instructorIdValidationRules, validate } = require('../utils/validator');

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ error: 'Unauthorized' });
};

// GET All
router.get('/students', studentController.getAllStudents);

// GET One
router.get('/get-student/:stud_id', studentIdValidationRules(), validate, studentController.getStudent);

// POST a Student
router.post('/add-student', ensureAuthenticated, studentValidationRules(), validate, studentController.addStudent);

// PUT a Student (Update)
router.put('/update-student/:stud_id', ensureAuthenticated, studentUpdateValidationRules(), validate, studentController.updateStudent);

// DELETE a Student
router.delete('/delete-student/:stud_id', ensureAuthenticated, studentIdValidationRules(), validate, studentController.deleteStudent);

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

// Example protected routes
router.get('/protected-students', ensureAuthenticated, studentController.getAllStudents);
router.get('/protected-instructors', ensureAuthenticated, instructorController.getAllInstructors);

// Error route
router.get('/instructor-error', instructorController.getError);


// File Not Found Route - must be last route in list 
router.use((req, res, next) => {
    const err = new Error("not found!");
    err.status = 404;
    next(err);
});

module.exports = router;