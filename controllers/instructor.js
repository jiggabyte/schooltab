const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAllInstructors = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('instructors').find();
    result.toArray().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
    });
};

const getInstructor = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('instructors').find({ _id: new ObjectId(req.params.inst_id) });
    result.toArray().then((data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(data);
    });
};

const addInstructor = async (req, res, next) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        coursesTaught: req.body.coursesTaught,
        yearOfEmployment: req.body.yearOfEmployment
    }
    const result = await mongodb.getDb().db().collection('instructors').insertOne(user);
    console.log(result);
    if (result.acknowledged) {
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ Inst_id: result.insertedId });
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error: "Instructor not created!" });
    }
}

const updateInstructor = async (req, res, next) => {
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        yearOfEmployment: req.body.yearOfEmployment
    }
    const result = await mongodb.getDb().db().collection('instructors').updateOne({ _id: new ObjectId(req.params.inst_id) }, { $set: student });
    console.log(result);
    if (result.modifiedCount > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ success: "Instructor updated!" });
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error: "Instructor not updated!" });
    }
}

const deleteInstructor = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('instructors').deleteOne({ _id: new ObjectId(req.params.inst_id) });
    if (result.deletedCount > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(204).json({ success: "Instructor deleted!" });
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({ error: "Instructor not deleted!" });
    }

}

const getError = (req, res, next) => {
    throw new Error("Server Error!");
}

module.exports = { getAllInstructors, getInstructor, addInstructor, updateInstructor, deleteInstructor, getError };