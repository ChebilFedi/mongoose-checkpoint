const express = require('express')
const router = express.Router()
const Person = require('../models/person')
router.route('/')
    .post((req, res) => {
        let newPerson = new Person(req.body)
        newPerson.save()
            .then(user => res.send(user))
            .catch(err => console.error(err))

    }).get((req, res) => {
        Person.find()
            .then(persons => res.send(persons))
            .catch(err => console.log(err.message))
    })
router.route('/:id').get((req, res) => {

    Person.findById(req.params.id)
        .then(persons => res.send(persons)).catch(err => console.log(err.message))


}).put((req, res) => {
    Person.findById(req.params.id)
        .update({ $push: { favoriteFoods: 'hamburger' } })
        .then(person => res.send(person))
        .catch(err => console.log(err.message))
}).delete((req, res) => {
    Person.findByIdAndDelete({ _id: req.params.id })
        .then(res.send({ msg: 'succesfully removed' }))
        .catch(err => console.log(err.message))
})



router.post('/create', (req, res) => {
    Person.create(req.body.persons)
        .then(users => res.send(users))
        .catch(err => console.log(err.message))
})


router.get('/favorite/:food', (req, res) => {
    Person.findOne({ favoriteFoods: req.params.food }).then(person => res.send(person))
        .catch(err => console.log(err.message))
})


router.route('/user/:name').put ((req, res) => {
    Person.findOneAndUpdate({ name: req.params.name }, { age: 20 }, { new: true })
        .then(person => res.send(person))
        .catch(err => console.log(err.message))
}).delete((req, res) => {
    Person.remove({ name: req.params.name})
        .then(x => {
            Person.find()
                .then(users => res.json({users, affected: x.deletedCount}))
                .catch(err => console.log(err.message))
        })
        .catch(err => console.log(err.message))
})


router.get('/food/:food', (req, res) => {
    Person.find({ favoriteFoods: req.params.food }).limit(2).sort({ name: 1 }).select({ age: false })
        .exec().then(person => res.send(person))
        .catch(err => console.log(err.message))
})
module.exports = router