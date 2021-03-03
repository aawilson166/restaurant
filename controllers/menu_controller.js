const express = require('express')
const menu = express.Router()

const MenuItem = require('../models/menu.js')

menu.get('/', (req, res) => {
    MenuItem.find({}, (err, found) => {
        res.json(found)
    })
})

//to hit this route must type localhost:3000/menu/setup/seed in browser
menu.get('/setup/seed', (req, res) => {
    MenuItem.create(
        [
            //Future Seed Data goes here
        ],
        (err, createdMenuItem) => {
            MenuItem.find({}, (err, foundMenuItems) => {
                res.redirect('/menu')
            })
            
        }
    )
})

menu.post('/', (req, res) => {
    MenuItem.create(req.body, (err, createdMenuItem) => {
        MenuItem.find({}, (err, foundMenuItems) => {
            res.json(foundMenuItems)
        })
    })
})

menu.put('/:id', (req, res) => {
    MenuItem.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedMenuItem) => {
        if(err) {
            res.send(err)
        }else{
            MenuItem.find({}, (err, foundMenuItems) => {
                res.json(foundMenuItems)
            })
        }
    })
})

menu.delete('/:id', (req, res) => {
    MenuItem.findByIdAndRemove(req.params.id, (err, deletedMenuItem) => {
        MenuItem.find({}, (err, foundMenuItems) => {
            res.json(foundMenuItems)
        })
    })
})

module.exports = menu