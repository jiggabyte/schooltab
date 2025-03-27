const { body, validationResult } = require('express-validator')

export const studentValidationRules = () => {
    return [
        body('firstName', 'First Name is required').notEmpty(),
        body('lastName', 'Last Name is required').notEmpty(),
        body('email', 'Email is required').isEmail(),
        body('yearOfAdmission', 'Year of Admission is required').notEmpty(),
        body('courseOfStudy', 'Course of Study is required').notEmpty(),
    ]
}

export const validate = (
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
