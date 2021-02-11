function part_one() {
    var telefone = document.querySelector('#telefone').value
    var DDD = document.querySelector('#DDD').value
    if (DDD == 'null') {
        alert('Selecione o DDD')
    }
    if (telefone == undefined || telefone == null || telefone == '') {
        alert('Adione o Numero telefonico sem o DDD')
    }
    if (DDD != 'null' && telefone != '') {
        window.open(`https://web.whatsapp.com/send?phone=+55${DDD}${telefone}`, '_blank')
    }

}