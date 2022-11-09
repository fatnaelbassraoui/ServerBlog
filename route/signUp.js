const express = require('express')// faccio l'import di express framework che serve per la creazione in node
const SignUp = require('../models/SignUp')// si fa l'import del modello per riflettere lo schema di dati presente nel data base


const router = express.Router()// il router ci cerve per splittare il codice.


//si usa l'async perchè siamo in attesa di un dato che non è pronto subito. E'una promise (una promessa che un dato sar caricato). Si mette il segna posto a js
router.get('/registeredUsers', async (req, res) => {
    //il try and catch serve per gestire gli errori
    try {
        const registeredUsers = await SignUp.find()//si dice di usare il nostro modello e di restiture i dati presenti nel db. in questo caso tutti i dati
        res.status(200).send(registeredUsers)       // send è un metodo che serve per gestire la nostra risposta
    } catch (error) {
        res.status(500).send({
            message: 'an error has occured'
        })

    }
})

router.post('/registeredUsers', async (req, res) => {
    const newRegisteredUsers = new SignUp({  // qui sto istanziando una nuova classe di signUp, ovvero creo un nuovo modello di signUp
        firstName: req.body.firstName,
        lastName: req.body.email,
        gender: req.body.gender,
        age: req.body.age,
        password: req.body.password,
        userName: req.body.userName,
        email: req.body.email
    })

    try {

        const saveRegisteredUsers = await newRegisteredUsers.save()//il metodo mongoose ci permette di salvare l'oggetto creato
        res.status(200).send({
            message: 'Registration succesfull',
            payload: saveRegisteredUsers //payload è un nome che si da ai dati.si può chiamare diversamente
        })
    } catch (error) {
        res.status(500).send({
            message: 'an error is occurred',
            error: error
        })
    }
})

router.delete('/registeredUsers/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await SignUp.findById(id).deleteOne()
        if (!user)
            return res
                .status(404)
                .send(`the User with id ${id} does not exist`)

    } catch (error) {
        res.status(500).send({
            message: "User can't be deleted",
            error: error
        })

    }
})

router.patch('/registeredUsers/:id', async (req, res) => { //  si puo sovrascrivere solo le proprietà che gli passo
    try {
        const { id } = req.params
        const updateUser = req.body
        const options = { new: true }// con new:true gli dico di non mostrarmi più il dato vecchio ma quello nuovno
        const result = await SignUp.findByIdAndUpdate(id, updateUser, options)
        if (!result)
            return res
                .status(404)
                .send(`user with id ${id} not found`)

        res.status(200).send({
            message: "user info updated successfully",
            payload: result
        })
    } catch (error) {
        res.status(500).send({
            message: "an error has occurred",
            error: error
        })
    }
})


module.exports = router