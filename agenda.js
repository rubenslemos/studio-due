var buttonNovoEvento = document.getElementById('buttonNovoEvento')
var buttonCancelar = document.getElementById('buttonCancelar')
var novoEvento = document.getElementById('novoEvento')
var formNovoEvento = document.getElementById('formNovoEvento')
var inputNomeEvento = document.getElementById('nomeEvento')
var inputDataEvento = document.getElementById('dataEvento')
var hoje = new Date()

function novoEventoValido(nomeEvento, dataEvento) {
    if (nomeEvento === '' || inputDataEvento.value === '' || dataEvento < hoje) {
        return false
    } else {
        return true
    }
}

buttonNovoEvento.addEventListener('click', () => novoEvento.classList.remove('d-none'))
buttonCancelar.addEventListener('click', () => novoEvento.classList.add('d-none'))
formNovoEvento.addEventListener('submit', (event) => {
    event.preventDefault()
    var nomeEvento = inputNomeEvento.value
    var dataEvento = new Date(inputDataEvento.value)
    console.log('Data evento Value: ', dataEvento.value)
    console.log('Input Data evento Value: ', inputDataEvento.value)
    if (novoEventoValido(nomeEvento, dataEvento)) {
        console.log('Evento Valido!')
    } else {
        console.log('Evento Invalido!')
    }
    novoEvento.classList.add('d-none');
})