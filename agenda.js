var buttonNovoEvento = document.getElementById('buttonNovoEvento')
var buttonCancelar = document.getElementById('buttonCancelar')
var novoEvento = document.getElementById('novoEvento')
var formNovoEvento = document.getElementById('formNovoEvento')
var inputNomeEvento = document.getElementById('nomeEvento')
var inputDataEvento = document.getElementById('dataEvento')
var divMensagemErro = document.getElementById('mensagemErro')

function cancelar() {
    inputDataEvento.value = ''
    inputNomeEvento.value = ''
    inputNomeEvento.classList.remove("is-invalid")
    inputDataEvento.classList.remove("is-invalid")
    divMensagemErro.classList.add('d-none')
    novoEvento.classList.add('d-none')
}

function novoEventoValido(nomeEvento, dataEvento) {
    var validacaoOk = true
    var erro = ''
    var timestampEvento = Date.parse(dataEvento)
    var timestampAtual = (new Date()).getTime()
    if (nomeEvento.trim().length === 0) {
        erro = 'O nome da noiva é obrigatório, favor preencher.'
        inputNomeEvento.classList.add("is-invalid")
        validacaoOk = false
    } else {
        inputNomeEvento.classList.remove("is-invalid")
    }
    if (isNaN(timestampEvento)) {
        if (erro.length > 0) {
            erro += '<br>'
        }
        erro += 'A data do evento não pode ser nula, favor preencher corretamente.'
        inputDataEvento.classList.add("is-invalid")
        validacaoOk = false
    } else {
        inputDataEvento.classList.remove("is-invalid")
    }
    if (timestampEvento < timestampAtual) {
        if (erro.length > 0) {
            erro += '<br>'
        }
        erro += 'A data do evento não pode ser no passado, favor preencher corretamente.'
        inputDataEvento.classList.add("is-invalid")
        validacaoOk = false
    } else {
        inputDataEvento.classList.remove("is-invalid")
    }

    if (!validacaoOk) {
        divMensagemErro.classList.remove('d-none')
        divMensagemErro.innerHTML = erro
    } else {
        divMensagemErro.classList.add('d-none')
    }

    return validacaoOk
}

buttonNovoEvento.addEventListener('click', () => novoEvento.classList.remove('d-none'))
buttonCancelar.addEventListener('click', cancelar)
formNovoEvento.addEventListener('submit', (event) => {
    event.preventDefault()
    var nomeEvento = inputNomeEvento.value
    var dataEvento = inputDataEvento.value
    if (novoEventoValido(nomeEvento, dataEvento)) {
        console.log('Evento Valido!')
    } else {
        console.log('Evento Invalido!')
    }
})