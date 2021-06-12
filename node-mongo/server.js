require('dotenv').config()
require('./app/models/inventory.model');
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')


const app = express()
require('./app/routes/inventory.router')(app)
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open')
    })
    .on('error', (err) => {
        console.log(`Connection error ${err.message}`)
    })

const server = app.listen(8000, ()=>{
    const host = server.address().address
    const port = server.address().port
    console.log('APP LISTENING AT HTTP://%s:%s', host, port)
})