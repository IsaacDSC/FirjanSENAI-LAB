function formataDinheiro(n) {
   return "R$ " + n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
}

function modalDadosdoPedido(order) {


   const elemento = document.querySelector(`.insertDadosPedido${order}`)
   const priceTotalField = document.querySelector(`.total${order}`)
   const formPagamento = document.querySelector(`.formPagamento${order}`)

   $.ajax({
      type: "POST",
      url: '/send/orders',
      data: { order },
   }).then(async res => {
      elemento.innerHTML = ''
      priceTotalField.innerHTML = ''

      let priceTotal = 0
      const espera = await res.forEach((e, index) => {
         priceTotal += Number(e.costProduce * e.quantity)
         elemento.innerHTML += `<tr>
        <th scope="row">${index + 1}</th>
        <td>${e.name}</td>
        <td>${e.observations}</td>
        <td>${e.quantity}</td>
        <td>${formataDinheiro(Number(e.costProduce * e.quantity))}</td>
        </tr>`

      })
      priceTotalField.innerHTML = formataDinheiro(priceTotal)
   })



}
