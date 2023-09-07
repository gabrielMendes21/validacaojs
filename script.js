// Campos
const inputs = document.getElementsByTagName("input")
const nome = document.querySelector("input#nome")
const endereco = document.querySelector("input#endereco")
const bairro = document.querySelector("input#bairro")
const cidade = document.querySelector("input#cidade")
const estado = document.querySelector("input#estado")
const telefone = document.querySelector("input#telefone")
const celular = document.querySelector("input#celular")
const CEPInput = document.querySelector("input#cep")
const RGInput = document.querySelector("input#rg")
const CPFInput = document.querySelector("input#cpf")

//  Máscaras
let CEPNumber= "xxxxx-xxx"
let phoneNumber= "(xx) xxxx-xxxx"
let celNumber= "(xx) x xxxx-xxxx"
let CPFNumber= "xxx.xxx.xxx-xx"
let RGNumber= "xx.xxx.xxx-x"

// Formatação de campos
function formatCEP(event) {
    if (!CEPInput.contains(event.target)) {
        let inputValue = CEPInput.value

        for (num of CEPInput.value) {
            CEPNumber = CEPNumber.replace("x", num)
        }

        if (inputValue.length === 8) {
            CEPInput.value = CEPNumber
        }
    }
}

function formatTelefone(event) {
    if (!telefone.contains(event.target)) {
        let inputValue = telefone.value

        for (num of telefone.value) {
            phoneNumber = phoneNumber.replace("x", num)
        }

        if (inputValue.length === 10) {
            telefone.value = phoneNumber
        }
    }
}

function formatCelular(event) {
    if (!celular.contains(event.target)) {
        let inputValue = celular.value

        for (num of celular.value) {
            celNumber = celNumber.replace("x", num)
        }

        if (inputValue.length === 11) {
            celular.value = celNumber
        }
    }
}

function formatRG(event) {
    if (!RGInput.contains(event.target)) {
        let inputValue = RGInput.value

        for (num of RGInput.value) {
            RGNumber = RGNumber.replace("x", num)
        }

        if (inputValue.length === 9) {
            RGInput.value = RGNumber
        }
    }
}
function formatCPF(event) {
    if (!CPFInput.contains(event.target)) {
        let inputValue = CPFInput.value

        for (num of CPFInput.value) {
            CPFNumber = CPFNumber.replace("x", num)
        }

        if (inputValue.length === 11) {
            CPFInput.value = CPFNumber
        }
    }
}

document.addEventListener('click', formatCEP)
document.addEventListener('click', formatTelefone)
document.addEventListener('click', formatCelular)
document.addEventListener('click', formatRG)
document.addEventListener('click', formatCPF)

function handleCadastrar(event) {
    event.preventDefault()

    // Nome
    if (nome.value.length < 3) {
        nome.nextElementSibling.innerHTML = "O nome precisa ter mais de 3 caracteres"
    } else {
        nome.nextElementSibling.innerHTML = ""
    }

    // Endereço
    const regexpEndereco = /[0-9]/g
    if (!endereco.value.toLowerCase().includes("rua") || !regexpEndereco.test(endereco.value.toLowerCase())) {
        endereco.nextElementSibling.innerHTML = "O endereço deve ter o nome da rua e a numeração"
    } else {
        endereco.nextElementSibling.innerHTML = ""
    }

    // Bairro
    if (bairro.value.length < 3) {
        bairro.nextElementSibling.innerHTML = "O bairro precisa ter mais de 3 caracteres"
    } else {
        bairro.nextElementSibling.innerHTML = ""
    }

    // CEP
    // * Veja a função formatCEP
    if (CEPInput.value.length < 9) {
        CEPInput.nextElementSibling.innerHTML = "O CEP precisa ter 8 caracteres"
    } else {
        CEPInput.nextElementSibling.innerHTML = ""
    }

    // Cidade
    if (cidade.value.length < 3) {
        cidade.nextElementSibling.innerHTML = "A cidade precisa ter mais de 3 caracteres"
    } else {
        cidade.nextElementSibling.innerHTML = ""
    }

    // Estado
    if (estado.value.length < 3) {
        estado.nextElementSibling.innerHTML = "O estado precisa ter mais de 3 caracteres"
    } else {
        estado.nextElementSibling.innerHTML = ""
    }

    // Telefone
    // * Veja a função formatTelefone
    if (telefone.value.length < 14) {
        telefone.nextElementSibling.innerHTML = "Insira um telefone válido"
    } else {
        telefone.nextElementSibling.innerHTML = ""
    }

    // Celular
    // * Veja a função formatCelular
    if (celular.value.length < 14) {
        celular.nextElementSibling.innerHTML = "Insira um celular válido"
    } else {
        celular.nextElementSibling.innerHTML = ""
    }

    // RG
    // * Veja a função formatRG
    if (RGInput.value.length < 9) {
        RGInput.nextElementSibling.innerHTML = "Insira um RG válido"
    } else {
        RGInput.nextElementSibling.innerHTML = ""
    }

    // CPF
    // * Veja a função formatCPF
    const novePrimeirosDigitos = CPFInput.value.split("-")[0].split(".").join("")
    const doisUltimosDigitos = CPFInput.value.split(".")[2].split("-")[1]
    const sequenciaDeValidacaoPrimeiroDigito = [10, 9, 8, 7, 6, 5, 4, 3, 2]
    let sum = 0

    for (let i = 0; i < sequenciaDeValidacaoPrimeiroDigito.length; i++) {
        sum += novePrimeirosDigitos[i] * sequenciaDeValidacaoPrimeiroDigito[i]
    }

    const primeiroDigitoValido = ((sum * 10) % 11 == 10 && doisUltimosDigitos[0] === 0) || (sum * 10) % 11 == doisUltimosDigitos[0] 

    // Segunda parte da validação (tendo o segundo dígito após o '-' como base)
    const sequenciaDeValidacaoSegundoDigito = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
    sum = 0

    for (let i = 0; i < sequenciaDeValidacaoPrimeiroDigito.length; i++) {
        sum += novePrimeirosDigitos[i] * sequenciaDeValidacaoSegundoDigito[i]
    }

    sum += doisUltimosDigitos[0] * 2

    const segundoDigitoValido = ((sum * 10) % 11 == 10 && doisUltimosDigitos[1] === 0) || (sum * 10) % 11 == doisUltimosDigitos[1] 

    if (!segundoDigitoValido || !primeiroDigitoValido) {
        CPFInput.nextElementSibling.innerHTML = "CPF inválido"
    } else {
        CPFInput.nextElementSibling.innerHTML = ""
    }
}