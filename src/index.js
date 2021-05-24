// Dependencies
const express = require('express')
const http = require('http')
const socketIO = require('socket.io') 
const engine = require('ejs-mate')  // Template engine
const path = require('path')  // Absolute paths working on any OS


// Initializations
const app = express()
const server = http.Server(app)  // Init http server to be passed to 'socket.io'
const io = socketIO(server)


// App constants
const PORT = process.env.PORT || 3000


// Settings
app.engine('ejs', engine)  // Name 'ejs-mate' under 'ejs'
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


// Routes
app.use( require('./routes/index') )


// Sockets
require('./sockets')(io) 


// Static files
app.use( express.static(path.join(__dirname, 'public') ) )


// Start server
server.listen( PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
