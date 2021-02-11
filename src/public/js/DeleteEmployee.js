const deletarUser = (event, employeed) => {
    event.preventDefault();
    $.ajax({
        type: "POST",
        url: '/config/employees/delete',
        data: { employeed },
        success: function(value) {
            location.reload()
            alert('Colaborador deletado com sucesso!')
        }
    })

}