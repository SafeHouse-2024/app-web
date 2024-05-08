const bgAnimado = document.getElementById('bgAnimado');
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

window.onload = limparCampos();

function limparCampos() {
  document.getElementById("email").value = ""
  document.getElementById("nome").value = ""
  document.getElementById("cnpj").value = ""
  document.getElementById("senha").value = ""
  document.getElementById("confirmar_senha").value = ""
}

const validarNomeUsuario = (nomeUser) => {
  if (nomeUser.value.length < 3 && nomeUser.value.length >= 1) {
    nome.style.color = `red`
    nomeSpan.style.display = `block`
    nomeSpan.style.color = `red`
    nomeValido = false
  } else {
    nome.style.color = `black`
    nomeSpan.style.display = `none`
    nomeSpan.style.color = `black`
    nomeValido = true
  }
}

const validarCnpj = (cnpjUser) => {
  if (cnpjUser.value.length != 14 && cnpjUser.value.length >= 1) {
    cnpj.style.color = `red`
    cnpjSpan.style.display = `block`
    cnpjSpan.style.color = `red`
    cnpjValido = false
  } else {
    cnpj.style.color = `black`
    cnpjSpan.style.display = `none`
    cnpjSpan.style.color = `black`
    cnpjValido = true
  }
}

const validarEmail = (emailUser) => {

  if (emailUser.value.length >= 1 && (!emailUser.value.includes("@") || !emailUser.value.includes("."))) {
    email.style.color = `red`;
    emailSpan.style.display = `block`;
    emailSpan.style.color = `red`
    emailValido = false
  } else {
    email.style.color = `black`;
    emailSpan.style.display = `none`;
    emailSpan.style.color = `black`
    emailValido = true
  }

}

const hasUpper = (str) => /[A-Z]/.test(str)

var caracteresEspeciais = ["@", "#", "!", "$", "%", "&", "*"];

function validarCaracter(senhaUsuario) {
  for (let i of caracteresEspeciais) {
    if (senhaUsuario.value.includes(i)) {
      return true
    }
  }
}

const validarSenha = (senhaUsuario) => {
  if (senhaUsuario.value.length < 6 || !validarCaracter(senhaUsuario) || !hasUpper(senhaUsuario.value)) {

    if (senhaUsuario.value.length < 6 && senhaUsuario.value.length >= 1) {
      senha.style.color = `red`
      senhaSpan.style.display = `block`
      senhaSpan.style.color = `red`
      senhaSpan.innerHTML = `A senha deve ter mais de 6 caracteres`
      senhaValida = false
    } else if (!validarCaracter(senhaUsuario) && senhaUsuario.value.length >= 1) {
      senha.style.color = `red`
      senhaSpan.style.display = `block`
      senhaSpan.style.color = `red`
      senhaSpan.innerHTML = `A senha precisa ter pelo menos um caracter especial (@, #, &)`
      senhaValida = false
    } else if (!hasUpper(senhaUsuario.value) && senhaUsuario.value.length >= 1) {
      senha.style.color = `red`
      senhaSpan.style.display = `block`
      senhaSpan.style.color = `red`
      senhaSpan.innerHTML = `A senha precisa ter pelo menos um caracter maiúsculo`
      senhaValida = false
    } else {
      senha.style.color = `black`
      senhaSpan.style.display = `none`
      senhaSpan.style.color = `black`
    }

  } else {
    senha.style.color = `black`
    senhaSpan.style.display = `none`
    senhaSpan.style.color = `black`
    senhaValida = true
  }
}

const confirmarSenha = (confirmarSenha) => {
  if (confirmarSenha.value != senha.value) {
    senha.style.color = `red`
    senhaSpan.style.color = `red`

    confirmar_senha.style.color = `red`
    confirmSpan.style.display = `block`
    confirmSpan.style.color = `red`
    senhaConfirmada = false
  } else {
    validarSenha(confirmarSenha)

    confirmar_senha.style.color = `black`
    confirmSpan.style.display = `none`
    confirmSpan.style.color = `black`
    senhaConfirmada = true
  }
}

function cadastrar() {

  let email = document.getElementById("email").value;
  let nome = document.getElementById("nome").value;
  let cnpj = document.getElementById("cnpj").value;
  let senha = document.getElementById("senha").value;

  console.log(emailValido, senhaValida, nomeValido, senhaConfirmada, cnpjValido);

  if (!(emailValido && senhaValida && nomeValido && senhaConfirmada && cnpjValido)) {
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
    if (resposta.status == 201) {
      /*Pop up de cadastro bem-sucedido*/
      Swal.fire({
        icon: "success",
        title: "Usuário cadastrado com sucesso",
        confirmButtonColor: "#060118"
      }).then(() => {
        window.location.href = "/login.html";
      });
    } else {
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