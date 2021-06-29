const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', (client) =>  {
    const [ valido, uid ] = comprobarJWT( client.handshake.headers['x-token'] );

    // Verificar autenticación
    if ( !valido ) { return client.disconnect(); }
    
    // Cliente autenticado
    usuarioConectado( uid );
    console.log("Cliente conectado:", uid);
    
    //ingreso a sala
    client.join(uid);
    //escuchar msj
    client.on ("msj priv", async (payload) => {
        await grabarMensaje(payload);
        io.to(payload.para).emit("msj priv",payload);
    })




    client.on('disconnect', () => {
        usuarioDesconectado(uid);
        console.log("Cliente desconectado:", uid);
    });

});