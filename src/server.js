const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const contacts = require('../data/contacts')

const app = express()
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here
app.get('/contacts', (req, res) => {
    res.status(200).json({contacts})
})


app.post('/contacts', (req, res) => {
    try {
        const newUser = req.body
        const id = contacts.length + 1
        newUser.id = id
        contacts.push(newUser)
        res.status(201).json({contact: newUser})
    } catch (error) {
        return res.status(400).json({error:  'Invalid Json Format!'})
    }
})

app.get('/contacts/:id', (req, res) => {
    const id = req.params.id
    const foundUser = contacts.find((user) => user.id === Number(id))
    console.log(foundUser)
    return res.status(200).json({contact: foundUser})
})


app.delete('/contacts/:id', (req, res) => {
    const id = req.params.id
    const userToDelete = contacts.findIndex((user) => user.id === Number(id))
    const contactToDelete = contacts.find((user) => user.id === Number(id))

    if(userToDelete !== -1) {
        contacts.splice(userToDelete, 1)
        return res.status(200).json({contact: contactToDelete})
    }
    return res.status(404).json({"error": "user cant be found!"})
})


app.put('/contacts/:id', (req, res) => {
    const id = req.params.id
    const foundUser = contacts.find((user) => user.id === Number(id))

    if(!foundUser) {
        return res.status(404).json({ "error": "user does'nt exist"})
    }

    Object.assign(foundUser, req.body);
    return res.status(200).json({contact: foundUser})

})

module.exports = app
