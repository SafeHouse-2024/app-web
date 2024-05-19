const socket = io("http://localhost:3001", {
      extraHeaders: {
        "token": "123",
        "empresa": "Rappi",
        "darkstore": "",
        "macaddress": "a4:63:a1:6d:0f:f7"
      }
})
socket.on(`receive_message_Rappi`, (data) => {
    alert(data)
})

socket.on(`receive_message_Rappi_DarkStore`, (data) => {
    alert(data)
})

const desativarModoSeguranca = (macAddress) => {
  socket.emit(`send_message_${macAddress}`, 'Desativando modo de segurança')
}