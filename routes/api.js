let express = require('express')
let db = require('../models')
let Student = db.Student

let router = express.Router()

router.get('/students', function(req, res, next){
    Student.findAll().then( students => {
        return res.json(students)
    })
})

router.post('/students', function(req, res, next){
    Student.create(req.body).then( data => {                  // req.body contains any JSON that our vue client has sent in the request
        return res.status(201).send('ok')                       // every response a server sends has a numeric status code, most common/famous is '404', meaning not found
    })                                                          // '500' means there is some kind of problem with the server  | '200' means, all good
})

// todo, edit a student
router.patch('/students/:id', function(req, res, next){
    // if request is to /students/100
    // studentID will be 100
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update( updatedStudent, { where: { id: studentID } } )
    .then ( () => {
        return res.send('ok')
    })
})

router.delete('/students/:id', function(req, res, next){
    let studentID = req.params.id
    student.destroy( {where: { id: studentID } } )
    .then( () => {
        return res.send('ok')
    })
})    


// todo, delete a student


module.exports = router

// don't write code here - it will be ignored