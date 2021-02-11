const select = document.getElementById('telephone')
let idDoCliente
let taxaEntrega

select.addEventListener('change', e => {
    let value = select.options[select.selectedIndex].value;

    $.ajax({
        type: "POST",
        url: '/cashier/search/client',
        data: { name: value },
        success: console.log('Pesquisado Com Sucesso')
    }).then((result) => {
        $('[name="nomecli"]').val(result.name);
        $('#telephonecli').val(result.telephone);
        $('#neighborhood').val(result.neighborhood);
        $('#address').val(result.address);
    })

})





$("#postClientes").submit(function (e) {
    let clientCarrinho = document.getElementById('clientCarrinho')
    const taxaValue = document.getElementById('taxaEntrega')
    e.preventDefault();
    const nomeCLient = $('[name="nomecli"]').val().trim();
    const telefoneClient = $('#telephonecli').val().trim();
    const bairro = $('#neighborhood').val().trim();
    const endereco = $('#address').val().trim();
    const taxa = Number($('#delivered').val().trim().replace(',', '.'))
    taxaEntrega = taxa
    if (!nomeCLient) {
        return alert('Informe o Nome do Cliente')
    }
    $.ajax({
        type: "POST",
        url: '/cashier/insert/client',
        data: { name: nomeCLient, telephone: telefoneClient, neighborhood: bairro, adress: endereco },
        success: console.log('Pesquisado Com Sucesso')
    }).then((res) => {
        idDoCliente = res
        jQuery('.modal').modal('hide')
        clientCarrinho.innerText = `Cliente: [ ${res} ] ${nomeCLient/* .split(' ')[0] */}`
        taxaValue.innerText = taxa.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        total(0, taxa)
    })
})