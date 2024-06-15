const desativarModoSeguranca = (macAddress) => {
  const socket = io("http://52.70.29.252:3001", {
    extraHeaders: {
      "empresa": "Rappi",
      "darkstore": "",
      "macaddress": "a4:63:a1:6d:0f:f7"
    }
})
  socket.emit(`send_message_${macAddress}`, 'Desativando modo de segurança')
}