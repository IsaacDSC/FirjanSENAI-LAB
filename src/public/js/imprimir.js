function imprimir() {
    const pageContent = document.querySelectorAll('#IMPRIMIR')
    content = $(pageContent).parent().parent().html()
    document.write(pageContent)
    let page = window.open('', '', 'width: 150mm,height: 146mm')
    page.document.write(`
                <!DOCTYPE html>
        <html lang="pt-br">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>whatsapp</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <link rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
        <!-- Font Awesome Icons -->
        <link rel="stylesheet" href="/plugins/fontawesome-free/css/all.min.css">
        <!-- overlayScrollbars -->
        <link rel="stylesheet" href="/plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
        <!-- Theme style -->
        <link rel="stylesheet" href="/dist/css/adminlte.min.css">

        <link rel="stylesheet" href="/css/registerProducts.css">
        <link rel="stylesheet" href="/css/style.css">
        <link rel="stylesheet" href="/css/btnONOFF.css">

    </head>

    <body class="hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
    ${content}


            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
                crossorigin="anonymous"></script>
            <!-- REQUIRED SCRIPTS -->
            <!-- jQuery -->
            <script src="/plugins/jquery/jquery.min.js"></script>
            <!-- Bootstrap -->
            <script src="/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
            <!-- overlayScrollbars -->
            <script src="/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
            <!-- AdminLTE App -->
            <script src="/dist/js/adminlte.js"></script>

            <!-- PAGE /PLUGINS -->
            <!-- jQuery Mapael -->
            <script src="/plugins/jquery-mousewheel/jquery.mousewheel.js"></script>
            <script src="/plugins/raphael/raphael.min.js"></script>
            <script src="/plugins/jquery-mapael/jquery.mapael.min.js"></script>
            <script src="/plugins/jquery-mapael/maps/usa_states.min.js"></script>
            <!-- ChartJS -->
            <script src="/plugins/chart.js/Chart.min.js"></script>

            <!-- AdminLTE for demo purposes -->
            <script src="/dist/js/demo.js"></script>
            <!-- AdminLTE dashboard demo (This is only for demo purposes) -->
            <script src="/dist/js/pages/dashboard2.js"></script>
            <script src="/js/DeleteEmployee.js"></script>
            <script src="/js/imprimir.js"></script>
    </body>

    </html>

            `)
    page.window.print();
    page.window.close();
}