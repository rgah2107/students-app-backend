const express = require('express')
const router = express.Router()
const Student = require('../models/student')

// Get students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find()
    res.json(students)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get one student
router.get('/:id', getStudent, async (req, res) => {
  res.send(res.student)
})

// Add student
router.post('/', async (req, res) => {
  const student = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    age: req.body.age,
    grade: req.body.grade,
  })

  try {
    const newStudent = await student.save()
    res.status(201).json(newStudent)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Patch student
router.patch('/:id', getStudent, async (req, res) => {
  try {
    const student = await Student.updateOne({ _id: req.params.id }, req.body)
    res.json(student)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete student
router.delete('/:id', getStudent, async (req, res) => {
  try {
    await Student.deleteOne({ _id: req.params.id })
    res.json({ message: 'Deleted student' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Midleware
async function getStudent(req, res, next) {
  let student
  try {
    student = await Student.findById(req.params.id)
    if (student == null) {
      return res.status(404).json({ message: 'Cannot find student' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  res.student = student
  next()
}

module.exports = router
