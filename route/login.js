const express = require('express')
const Login = require('../models/SignUp')
const Bcrypt = require('bcrypt')

const login = express.Router()


login.post('/login', async (req, res) => {
    const user = await Login.findOne({ email: req.body.email })
    if (!user) {
        return res
            .status(404)
            .send({
                message: 'email non valida o inesistente'
            })
    }
    const validPassword = await Bcrypt.compare(req.body.password,user.password) //confronta la password che mette l'utente con quella esistente
        if(!validPassword){
            return res
            .status(404)
            .send({
                message: 'Password non valida'
            })
        }
    res
        .status(200)
        .send(user)
})

module.exports = login