

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
})