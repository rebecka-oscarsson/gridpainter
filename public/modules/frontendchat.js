const socket = io()


export const join = (username, color) => {

    socket.emit('join', { username, color })

}

