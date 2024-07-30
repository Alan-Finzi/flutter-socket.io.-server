const { io } = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand( new Band( 'Contenido Cocina' ) );
bands.addBand( new Band( 'Tutoriales' ) );
bands.addBand( new Band( 'Entretenimiento' ) );
bands.addBand( new Band( 'Deporte') );
bands.addBand( new Band( 'Vida sana') );


//Mensaje de sockets
io.on('connection',clien => {

    console.log('cliente conectado');

clien.emit('active-bands',bands.getBands());

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

    clien.on('vote-band', (payload) => {

        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands() );
    });


    clien.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands() );
    });
})