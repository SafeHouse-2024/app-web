const socket = io("http://localhost:3001", {
      extraHeaders: {
        "token": "123",
        "empresa": "Rappi"
      }
})
socket.on(`receive_message_Rappi`, (data) => {
    alert(data)
})

socket.on(`receive_message_Rappi_DarkStore`, (data) => {
    alert(data)
})