

const { io } = require('../index');

//Mensaje de sockets
io.on('connection',clien => {

    console.log('cliente conectado');
    clien.on('disconnect', ()=> {
        console.log('cliente desconectado');
    });

    clien.on('mensaje',(payload)=>{
        console.log('mensajito loco loco',payload);
        io.emit('mensaje',{admin: 'nuevo mensaje'});
    });

    clien.on('emitir-mensaje', ( payload ) => {
        console.log(payload);
      // io.emit('nuevo-mensaje', payload); // emite a todos!!
      clien.broadcast.emit('nuevo-mensaje', payload); //emite a todos mejos al que emitio.
    })
})