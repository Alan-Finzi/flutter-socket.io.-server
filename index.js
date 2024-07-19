const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Establecer directorio público
app.use(express.static(path.join(__dirname, 'public')));


server.listen(process.env.PORT , (err)=> {
if(err)throw new Error(err);
console.log('servidor corriendo en puerto', process.env.PORT );

});