var buttonNovoEvento = document.getElementById('buttonNovoEvento')
var buttonCancelar = document.getElementById('buttonCancelar')
var novoEvento = document.getElementById('novoEvento')
var formNovoEvento = document.getElementById('formNovoEvento')
var inputNomeEvento = document.getElementById('nomeEvento')
var inputDataEvento = document.getElementById('dataEvento')
var divMensagemErro = document.getElementById('mensagemErro')
var tabelaEventos = document.getElementById('tabelaEventos')
var listaEventos = []

function atualizarTabelaEventos() {
    if (listaEventos.length === 0) {
        tabelaEventos.innerHTML = '<tr><td colspan="3">Nenhum evento</td></tr>'
        return
    }
    tabelaEventos.innerHTML = ''
    for (var i = 0; i < listaEventos.length; i++) {
        var evento = listaEventos[i]
        var linha = document.createElement('tr')
        var celulaNome = document.createElement('td')
        var celulaData = document.createElement('td')
        var celulaAcoes = document.createElement('td')
        var btnDelete = document.createElement('button')
        btnDelete.setAttribute('data-evento', i)
        btnDelete.classList.add('btn')
        btnDelete.classList.add('btn-danger')
        btnDelete.classList.add('btn-sm')
        btnDelete.innerText = 'Deletar'
        btnDelete.addEventListener('click', removerEvento)
        celulaNome.innerText = evento.nome
        celulaData.innerText = evento.data
        celulaAcoes.appendChild(btnDelete)
        linha.appendChild(celulaNome)
        linha.appendChild(celulaData)
        linha.appendChild(celulaAcoes)
        tabelaEventos.appendChild(linha)
    }
}

function cancelar() {
    inputDataEvento.value = ''
    inputNomeEvento.value = ''
    inputNomeEvento.classList.remove("is-invalid")
    inputDataEvento.classList.remove("is-invalid")
    divMensagemErro.classList.add('d-none')
    novoEvento.classList.add('d-none')
    divMensagemErro.innerHTML = ''
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

function salvarNovoEvento(event) {
    event.preventDefault()
    var nomeEvento = inputNomeEvento.value
    var dataEvento = inputDataEvento.value
    if (novoEventoValido(nomeEvento, dataEvento)) {
        listaEventos.push({
            nome: nomeEvento,
            data: dataEvento,
        })
        atualizarTabelaEventos()
        cancelar()
    } else {
        console.log('Evento Invalido!')
    }
}

function removerEvento(event) {
    var posicao = event.target.getAttribute('data-evento')
    listaEventos.splice(posicao, 1)
    atualizarTabelaEventos()
}

buttonNovoEvento.addEventListener('click', () => novoEvento.classList.remove('d-none'))
buttonCancelar.addEventListener('click', cancelar)
formNovoEvento.addEventListener('submit', salvarNovoEvento)
window.addEventListener('load', atualizarTabelaEventos)