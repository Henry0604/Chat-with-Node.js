$(function() {
    const socket = io();
    var nick = '';

    //Acceder a elementos del login
    const messageForm = $('#message-form');
    const messageBox = $('#message');
    const chat = $('#chat');

    const nickForm = $('#nick-form');
    const nickError = $('#nick-error');
    const nickName = $('#nick-name');

    const mensaje = document.querySelector('#message');

    const userNames = $('#usernames');

    //Actos

    function validar(){
        if (mensaje.value.length==0) {
            alert('el campo no puesde estar vacio');
        }

    }

    //Mensaje directo al servidor
    messageForm.submit( e => {
        e.preventDefault();
        socket.emit('enviar mensaje', messageBox.val());
        messageBox.val('');
    });

    //Obtencion de respuesta del servidor
    socket.on('nuevo mensaje', function(datos){
        let color = "#f4f4f4";

        if(nick == datos.username){
            color = '#9ff4c5';
        }

        chat.append(`<div class="msg-area mb-2 d-flex" style="background-color:${color}"><b class="oro">${datos.username} :</b><p class="msg">${datos.msg}</p></div>`);
    });

    //Nuevo Usuario
    nickForm.submit( e =>{
        e.preventDefault();

        socket.emit('nuevo usuario', nickName.val(), datos =>{
            if(datos){
                nick = nickName.val();
                $('#nick-wrap').hide();
                $('#content-wrap').show();
            }else{
                nickError.html('<div class="alert alert-danger">El usuario ya existe</div>');
            }
            nickName.val('');
        });
    });

    //Obtenemos el array de usuarios activos
    socket.on('nombre usuario', datos =>{
        let html = '';
        let color = '';
        let salir = '';

        for(let i=0; i<datos.length; i++){
            if(nick == datos[i]){
                color = "#027f43";
                salir = '<a class="enlace-salir" href="/" style="color: red;"><i class="fas fa-sign-out-alt salir"></i></a>';
            }else{
                color = "#000"
                salir = '';
            }

            html += `<p style="color:${color}"><i class="fas fa-user"></i> ${datos[i]} ${salir}</p>`;
        }

        userNames.html(html);
    });


})

const socket = io();