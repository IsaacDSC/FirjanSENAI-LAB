const DataProdutos = []
const selectClasses = document.querySelector("#classe")
const adicionarPedido = document.querySelector(".adicionarPedido")
const finalizarPedidoDoCashier = document.querySelector("#finalizarPedidoDoCashier")
const salvarPedido = document.querySelector("#salvarPedido")

const itensNoCarrinho = document.getElementById('itensNoCarrinho')

selectClasses.addEventListener('change', (e) => {
    pesquisarClasse()
})

const pesquisarClasse = () => {
    let classe = selectClasses.options[selectClasses.selectedIndex].value;
    if (!classe) {
        return
    }
    $.ajax({
        type: "POST",
        url: '/cashier/search',
        data: { classe },
        success: async function (value) {
            let options = ''
            await value.forEach(element => {
                options += `<option value="${element.name} ; ${element.value} ; ${element.id}">${element.name} - ${element.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</option>`
            })

            adicionarPedido.innerHTML = ''
            let html = `<div>
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-xl-6 mt-2">
                        <div id="itensDoCardapio" class="container">
                            <select id="nameproduct" class="form-control">
                                <option value="">Selecione</option>
                                ${options}
                                </option>

                            </select>
                            <div class="row mt-2">
                                <input type="hidden" name="quantity" id="quantity"
                                    value="1">
                                <div class="col">
                                    <button class="btn btn-danger mt-2 col-12" onclick="adicionarAoCarrinho()">
                                        <i class="fas fa-cart-plus"></i> Adicionar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col mt-2">
                        <textarea id="obsClienteCaixa" cols="30" rows="10" name="obs"
                            class="form-control col-12 ml-2" style="height: 100px;"
                            style="background-color: rgba(236, 236, 236, 0.418);">OBS:</textarea>
                    </div>
                </div>
            </div>`


            adicionarPedido.insertAdjacentHTML('beforeend', html)

        }
    })
}

const adicionarAoCarrinho = async () => {
    const obsClienteCaixa = document.getElementById('obsClienteCaixa').value
    const nameProduct = document.getElementById('nameproduct')
    let nomeProduto = nameProduct.options[nameProduct.selectedIndex].value

    if (!nomeProduto) {
        return
    }

    let preco = nomeProduto.split(';')[1]
    let idProduto = nomeProduto.split(';')[2]
    let index = DataProdutos.findIndex(val => val.nomeProduto === nomeProduto.split(';')[0]);

    if (index !== -1) {
        DataProdutos[index].quantidade = DataProdutos[index].quantidade + 1
        let precoProduto = DataProdutos[index].preco * DataProdutos[index].quantidade
        DataProdutos[index].precoProduto = precoProduto

    } else {
        DataProdutos.push({ id: idProduto, nomeProduto: nomeProduto.split(';')[0], quantidade: 1, preco, precoProduto: preco, obs: obsClienteCaixa })
    }

    itensNoCarrinho.innerHTML = ''

    let valorTotal = 0
    let esperar = await DataProdutos.forEach(e => {
        itensNoCarrinho.insertAdjacentHTML('beforeend', `<p class="descCarrinho" class="text-center ml-2">${e.quantidade}x <strong>${e.nomeProduto} - ${Number(e.precoProduto).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} <i class="fas fa-times-circle text-danger" onclick="deletarDoCarrinho('${e.nomeProduto}')"></i></strong></p>`)
        valorTotal += Number(e.precoProduto)
    })
    total(valorTotal)
}

function total(valor, taxaEntrega = 0) {
    const subtotalValue = document.getElementById('subtotalValue')
    const totalValue = document.getElementById('totalValue')
    const taxaValor = document.getElementById('taxaEntrega').textContent.split('R$')[1].trim().replace(',', '.')

    if (taxaEntrega != 0) {
        totalValue.innerHTML = (Number(subtotalValue.textContent.split('R$')[1].trim().replace(',', '.')) + taxaEntrega).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
    if (valor > 0) {
        subtotalValue.innerHTML = valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        totalValue.innerHTML = (valor + Number(taxaValor)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
    if (valor < 0) {
        subtotalValue.innerHTML = Number(0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        totalValue.innerHTML = Number(taxaValor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
}

async function deletarDoCarrinho(nomeProduto) {
    let valorTotal = 0

    let index = DataProdutos.findIndex(val => val.nomeProduto === nomeProduto.split(';')[0]);

    let precoUnico = DataProdutos[index].preco

    DataProdutos[index].quantidade = DataProdutos[index].quantidade - 1


    let precoProduto = DataProdutos[index].preco * DataProdutos[index].quantidade

    DataProdutos[index].precoProduto = precoProduto

    itensNoCarrinho.innerHTML = ''
    if (DataProdutos[index].quantidade < 1) {
        valorTotal -= await DataProdutos[index].precoProduto
        DataProdutos.splice(index, 1)

    }
    let esperar = await DataProdutos.forEach(e => {
        itensNoCarrinho.insertAdjacentHTML('beforeend', `<p class="descCarrinho" class="text-center ml-2">${e.quantidade}x <strong>${e.nomeProduto} - ${Number(e.precoProduto).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} <i class="fas fa-times-circle text-danger" style="cursor: pointer;" onclick="deletarDoCarrinho('${e.nomeProduto}')"></i></strong></p>`)
        valorTotal += Number(e.precoProduto)
    })
    total(valorTotal)

    if (DataProdutos.length == 0) {
        total(Number(-precoUnico))

    }

}

finalizarPedidoDoCashier.addEventListener('click', e => {
    e.preventDefault()

    if (!idDoCliente || DataProdutos.length == 0) {
        return
    } else {
        $('#finaly').modal('show')
    }
})

salvarPedido.addEventListener('click', async (e) => {
    const tipoEntrega = document.querySelectorAll('input[type=radio]:checked')[0].value;
    const TipoDePagamento = document.querySelector('#sTipoDePagamento')
    const trocoPara = document.querySelector('#trocoPara').value
    if (DataProdutos.length == 0) {
        return alert('Você precisa adicionar um produto!')
    }
    if (!idDoCliente) {
        return alert('Selecione o cliente!')
    }
    try {
        let pagamento = TipoDePagamento.options[TipoDePagamento.selectedIndex].value
        const esperar = await DataProdutos.forEach(e => {
            $.ajax({
                type: "POST",
                url: '/cashier/insert/order',
                data: { idProduto: e.id, quantidade: e.quantidade, preco: e.preco, obs: e.obs, idDoCliente, tipoEntrega, pagamento, trocoPara, taxaEntrega },
            })
        })
       
        $('#finaly').modal('hide')
        location.reload()
    } catch (error) {
        console.log(error)
    }

})
