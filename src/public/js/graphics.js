var ctx = document.getElementById('grafico').getContext('2d');

$('document').ready(function() {
    let item = []
    let quantidade = []
    $.ajax({
        type: "POST",
        url: '/dados/grafico',
        success: function(data) {
            data.forEach(e => {
                item.push(e.name)
                quantidade.push(e.quantidade)
            })
        }
    }).then(() => renderGrafico(item, quantidade))

})

function renderGrafico(item, quantidade) {
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: item,
            datasets: [{
                label: 'ITENS MAIS VENDIDOS',
                data: quantidade,
                backgroundColor: [
                    '#29A756',
                    '#63C2DE',
                    '#FFC106',
                    '#20A8D7',
                    'rgba(255, 206, 86, 1)',
                    '#F86C6B'
                ],
                borderColor: [
                    '#006627',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    '#F86C6B'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
}