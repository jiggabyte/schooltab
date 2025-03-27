const { body, validationResult } = require('express-validator');

const studentValidationRules = () => {
    return [
        body('firstName', 'First Name is required').notEmpty(),
        body('lastName', 'Last Name is required').notEmpty(),
        body('email', 'Email is required').isEmail(),
        body('yearOfAdmission', 'Year of Admission is required').notEmpty(),
        body('courseOfStudy', 'Course of Study is required').notEmpty(),
    ]
}

const studentUpdateValidationRules = () => {
    return [
        body('firstName', 'First Name is required').notEmpty(),
        body('lastName', 'Last Name is required').notEmpty(),
        body('yearOfAdmission', 'Year of Admission is required').notEmpty(),
        body('courseOfStudy', 'Course of Study is required').notEmpty(),
    ]
}


const instructorValidationRules = () => {
    return [
        body('firstName', 'First Name is required').notEmpty(),
        body('lastName', 'Last Name is required').notEmpty(),
        body('email', 'Email is required').isEmail(),
        body('yearOfEmployment', 'Year of Employment is required').notEmpty(),
        body('coursesTaught', 'Courses Taught is required').notEmpty(),
    ]
}

const instructorUpdateValidationRules = () => {
    return [
        body('firstName', 'First Name is required').notEmpty(),
        body('lastName', 'Last Name is required').notEmpty(),
        body('yearOfEmployment', 'Year of Employment is required').notEmpty()
    ]
}

const studentIdValidationRules = () => {
    return [
        param('stud_id', 'stud_id is required').notEmpty()
    ]
}

const instructorIdValidationRules = () => {
    return [
        param('inst_id', 'inst_id is required').notEmpty()
    ]
}

const validate = (
    req,
    res,
    next
) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors = []
    errors
        .array()
        .map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = { studentValidationRules, studentUpdateValidationRules, instructorValidationRules, instructorUpdateValidationRules, studentIdValidationRules, instructorIdValidationRules, validate };
