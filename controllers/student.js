const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAllStudents = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('students').find();
    result.toArray().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
    });
};

const getStudent = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('students').find({ _id: new ObjectId(req.params.stud_id) });
    result.toArray().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
    });
};

const addStudent = async (req, res, next) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        yearOfAdmission: req.body.yearOfAdmission,
        courseOfStudy: req.body.courseOfStudy
    }
    const result = await mongodb.getDb().db().collection('students').insertOne(user);
    console.log(result);
    if (result.acknowledged) {
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ stud_id: result.insertedId });
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error: "Student not created!" });
    }
}

const updateStudent = async (req, res, next) => {
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        courseOfStudy: req.body.courseOfStudy,
        yearOfAdmission: req.body.yearOfAdmission
    }
    const result = await mongodb.getDb().db().collection('students').updateOne({ _id: new ObjectId(req.params.stud_id) }, { $set: student });
    console.log(result);
    if (result.modifiedCount > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ success: "Student updated!" });
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error: "Student not updated!" });
    }
}

const deleteStudent = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('students').deleteOne({ _id: new ObjectId(req.params.stud_id) });
    if (result.deletedCount > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(204).json({ success: "Student deleted!" });
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error: "Student not deleted!" });
    }

}

module.exports = { getAllStudents, getStudent, addStudent, updateStudent, deleteStudent };