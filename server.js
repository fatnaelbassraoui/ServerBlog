const express = require('express')
const mongoose= require('mongoose')
const userRoute = require('./route/RouteUsers')
const signUpRoute = require('./route/signUp')
const postsRoute= require('./route/posts')
const loginRoute = require('./route/login')
require('dotenv').config()
const cors= require('cors')
const PORT = process.env.PORT


const app = express()
app.use(cors())
app.use(express.json())
app.use('/',userRoute)
app.use('/',signUpRoute)
app.use('/',postsRoute)
app.use('/',loginRoute)





mongoose.connect(process.env.DB_ADDRESS)

const db = mongoose.connection
db.on("error",()=>{
    console.error.bind(console,'errore di connessione') //in questo file salviamo tutte le nostre variabili sensibili(es. password o dati sensibili in generale) che non dobbiamo committare su git
                                                            //CHIAVE VALORE
})

db.once("open",()=>{
    console.log('db connected');
})

app.listen(PORT,()=>console.log(`server running correctly on port ${PORT}`))