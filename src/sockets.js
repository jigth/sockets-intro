module.exports = io => {
   io.on('connection', socket => {
      console.log("New User connected")

      socket.on('userCoordinates', latlng => {
         socket.broadcast.emit('newUserConnected', latlng)
      })
   })

}
