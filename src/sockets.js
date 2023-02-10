module.exports = (io) =>{

    let nickNames = [];

    io.on('connection', socket =>{
        console.log('Nuevo Usuario Conectado');
        
        //Al recibir el mensaje recojemos los datos: 
        socket.on('enviar mensaje', (datos) =>{
            io.sockets.emit('nuevo mensaje', {
                msg:datos,
                username:socket.nickname
            });
        });

        //Ingreso de nuevos usuarios
        socket.on('nuevo usuario', (datos, callback) =>{
            if(nickNames.indexOf(datos) != -1){
                callback(false);
            }else{
                callback(true);
                socket.nickname = datos;
                nickNames.push(socket.nickname);

                io.sockets.emit('nombre usuario', nickNames);
            }
        });

        socket.on('disconnect', datos =>{
            if(!socket.nickname){
                return;
            }else{
                nickNames.splice(nickNames.indexOf(socket.nickname), 1);
                io.sockets.emit('nombre usuario', nickNames);
            }
        });
    })
}