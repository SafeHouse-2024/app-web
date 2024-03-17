const bgAnimado = document.getElementById('bgAnimado');
var labels = document.getElementsByTagName("label")
const numerosDeCaixas = 400;

for (let i = 0; i < numerosDeCaixas; i++) {
    const caixa = document.createElement('div');
    caixa.classList.add('caixaColorida');
    bgAnimado.appendChild(caixa);
}

var emailValido = false
var nomeValido = false
var senhaValida = false
var senhaConfirmada = false
var cnpjValido = false;

const validarNomeUsuario = (nomeUser) => {
  if(nomeUser.value.length < 3 && nomeUser.value.length >= 1  ){
    nome.style.border = `1px solid red`
    nome.style.color = `red`
    nomeSpan.style.display = `block`
    nomeSpan.style.color = `red`
    labels[0].style.color = `red`
    bgAnimado.style.height = `138%`;
    nomeValido = false
  }else{
    nome.style.border = `1px solid black`
    nome.style.color = `black`
    nomeSpan.style.display = `none`
    nomeSpan.style.color = `black`
    labels[0].style.color = `white`
    bgAnimado.style.height = `125%`;
    nomeValido = true
  }
}

const validarCnpj = (cnpjUser) => {
  if(cnpjUser.value.length != 14 && cnpjUser.value.length >= 1){
    cnpj.style.border = `1px solid red`
    cnpj.style.color = `red`
    cnpjSpan.style.display = `block`
    cnpjSpan.style.color = `red`
    labels[1].style.color = `red`
    bgAnimado.style.height = `138%`;
    cnpjValido = false
  }else{
    cnpj.style.border = `1px solid black`
    cnpj.style.color = `black`
    cnpjSpan.style.display = `none`
    cnpjSpan.style.color = `black`
    labels[1].style.color = `white`
    bgAnimado.style.height = `125%`;
    cnpjValido = true
  }
}

const validarEmail = (emailUser) => {

if(emailUser.value.length >= 1 && (!emailUser.value.includes("@") || !emailUser.value.includes("."))){
  email.style.border = `1px solid red`;
  email.style.color = `red`;
  emailSpan.style.display = `block`;
  emailSpan.style.color = `red`
  labels[2].style.color = `red`;
  bgAnimado.style.height = `138%`;
  emailValido = false
}else{
  email.style.border = `1px solid black`;
  email.style.color = `black`;
  emailSpan.style.display = `none`;
  emailSpan.style.color = `black`
  labels[2].style.color = `white`
  bgAnimado.style.height = `125%`;
  emailValido = true
}

}

const hasUpper = (str) => /[A-Z]/.test(str)

const validarSenha = (senhaUsuario) => {
if(senhaUsuario.value.length < 6  || !senhaUsuario.value.includes("@", "#", "!", "$", "%", "&", "*") || !hasUpper(senhaUsuario.value)){

  if(senhaUsuario.value.length < 6 && senhaUsuario.value.length >=1 ){
    senha.style.border = `1px solid red`
    senha.style.color = `red`
    senhaSpan.style.display = `block`
    senhaSpan.style.color = `red`
    labels[3].style.color = `red`
    senhaSpan.innerHTML = `A senha deve ter mais de 6 caracteres`
    bgAnimado.style.height = `138%`;
    senhaValida = false
  }else if(!senhaUsuario.value.includes("@", "#", "!", "$", "%", "&", "*") && senhaUsuario.value.length >=1){
    senha.style.border = `1px solid red`
    senha.style.color = `red`
    senhaSpan.style.display = `block`
    senhaSpan.style.color = `red`
    labels[3].style.color = `red`
    bgAnimado.style.height = `138%`;
    senhaSpan.innerHTML = `A senha precisa ter pelo menos um caracter especial (@, #, &)`
    senhaValida = false
  }else if(!hasUpper(senhaUsuario.value) && senhaUsuario.value.length >=1){
    senha.style.border = `1px solid red`
    senha.style.color = `red`
    senhaSpan.style.display = `block`
    senhaSpan.style.color = `red`
    labels[3].style.color = `red`
    bgAnimado.style.height = `138%`;
    senhaSpan.innerHTML = `A senha precisa ter pelo menos um caracter maiúsculo`
    senhaValida = false
  }else{
    senha.style.border = `1px solid black`
    senha.style.color = `black`
    senhaSpan.style.display = `none`
    bgAnimado.style.height = `125%`;
    senhaSpan.style.color = `black`
    labels[3].style.color = `white`        
  }

}else{
  senha.style.border = `1px solid black`
    senha.style.color = `black`
    senhaSpan.style.display = `none`
    senhaSpan.style.color = `black`
    bgAnimado.style.height = `125%`;
    labels[3].style.color = `white`
    senhaValida = true
}
}



const confirmarSenha = (confirmarSenha) => {
  if(confirmarSenha.value != senha.value){
    senha.style.border = `1px solid red`
    senha.style.color = `red`
    senhaSpan.style.color = `red`
    labels[4].style.color = `red`

    confirmar_senha.style.border = `1px solid red`
    confirmar_senha.style.color = `red`
    confirmSpan.style.display = `block`
    confirmSpan.style.color = `red`
    bgAnimado.style.height = `138%`;
    labels[4].style.color = `red`
    senhaConfirmada = false
  }else{
    validarSenha(confirmarSenha)

    confirmar_senha.style.border = `1px solid black`
    confirmar_senha.style.color = `black`
    confirmSpan.style.display = `none`
    confirmSpan.style.color = `black`
    labels[4].style.color = `white`
    bgAnimado.style.height = `125%`;
    senhaConfirmada = true
  }
}
  
function cadastrar(){

  let email = document.getElementById("email").value;
  let nome = document.getElementById("nome").value;
  let cnpj = document.getElementById("cnpj").value;
  let senha = document.getElementById("senha").value;

  if(!(emailValido && senhaValida && nomeValido && senhaConfirmada && cnpjValido)){
    Swal.fire({
      icon: "error",
      width: "600",
      text: "Não foi possível cadastrar o usuário, por favor preencha os campos corretamente",
      confirmButtonColor: "#060118"
    });
    return
  }

  fetch("/usuario/cadastrar", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      emailEmpresa: email,
      nomeEmpresa: nome,
      senhaEmpresa: senha,
      cnpj: cnpj
    })
  }).then(resposta => {
    if(resposta.status == 201){
      /*Pop up de cadastro bem-sucedido*/
      Swal.fire({
        icon: "success",
        title: "Usuário cadastrado com sucesso",
        confirmButtonColor: "#060118"
      }).then(() => {
        window.location.href = "/login.html";
      });
    }else{
      // Alerta de Erro no cadastro
      Swal.fire({
        icon: "error",
        width: "600",
        text: "Não foi possível cadastrar o usuário, já existe um usuário com esse e-mail",
        confirmButtonColor: "#060118"
      });
    }
  })

}