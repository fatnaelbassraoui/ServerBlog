const express = require('express')
const Users = require('../models/Users')

const router = express.Router()



router.get('/users', async (req, res) => {
    try {
        const users = await Users.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send({
            message: "an error has occured"
        })
    }
})

router.post('/users', async (req, res) => {
    const newUser = new Users({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const saveUser = await newUser.save()
        res.status(200).send({
            message: "User saved succesfully",
            payload: saveUser
        })

    } catch (error) {
        res.status(500).send({
            message: "an erroe is occurred",
            error: error
        })

    }
})

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params

    try {

        const user = await Users.findById(id).deleteOne()
        if (!user)
            return res
                .status(404)
                .send(`the User with id ${id} does not exist`)

        res.status(200).send('user deleted successfully')

    } catch (error) {
        res.status(500).send({
            message: "User can't be deleted",
            error: error
        })

    }
})

router.patch("/users/:id", async(req, res)=>{
   
    try {
        const {id} = req.params
        const updateUser = req.body
        const options = {new: true}
        const result = await Users.findByIdAndUpdate(id, updateUser, options)
        if(!result)
            return res
                .status(404)
                .send(`user with id ${id} not found`)
                
        res.status(200).send({
            message: "user info updated successfully",
            payload: result
        })
    }
    catch(error){
        res.status(500).send({
            message: "an error has occurred",
            error: error
        })
    }
})


module.exports = router