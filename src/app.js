const PollController = require('./controller/PollController')
const express = require('express')
const app = express()
const PollRoute = require('./routes/PollRoute')
///global Middleware
app.use(express.json())/// parse JSON from the request body
////global routes
app.use('/polls',PollRoute )

module.exports = app
