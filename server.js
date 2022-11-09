const express = require('express')
const mongoose= require('mongoose')
const userRoute = require('./route/RouteUsers')
const signUpRoute = require('./route/signUp')
const postsRoute= require('./route/posts')
const cors= require('cors')
const PORT = 3030


const app = express()
app.use(cors())
app.use(express.json())
app.use('/',userRoute)
app.use('/',signUpRoute)
app.use('/',postsRoute)





mongoose.connect('mongodb+srv://Faty87:ft01111987@blogdb.rsk5o1z.mongodb.net/BlogDb?retryWrites=true&w=majority')

const db = mongoose.connection
db.on("error",()=>{
    console.error.bind(console,'errore di connessione')
})

db.once("open",()=>{
    console.log('db connected');
})

app.listen(PORT,()=>console.log(`server running correctly on port ${PORT}`))