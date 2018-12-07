/**
 * FUNCIONES PARA REPORTES
 */

//objeto que permite almacenar los item agregados a la compra
var jsonItemsDevolver = {};
var iva = 0;

//contador para generar identificador de filas del objeto que almacena items compra
var indiceItemDevolver = 1;
var indiceItemDevolverSeleccionado = -1;
var cantidadProductoCompradoSeleccionado = 0;


/**
 * Permite obtener una compra dado su id
 * @param {int} idRegistro -identificador de compra
 */
function consultarVentasGeneral() {
    $('#tabla-reporte-general-ventas').dataTable().fnClearTable();
    var url = '/reportes/generalventas';
    var FECHA_INICIO = $('#FECHA_INICIO').val();
    var FECHA_FIN = $('#FECHA_FIN').val();
    var TOTAL_VENTAS = 0;
    axios.get(url, {
        params: {
            FECHA_INICIO:FECHA_INICIO,
            FECHA_FIN:FECHA_FIN
        }
    }).then(function (response) {
        $.each(response.data,function(key,value){
            TOTAL_VENTAS+=value.TOTAL_VEN;
               tablaGeneralVentas.row.add({
                    "DOCUMENTO": value.DOCUMENTO,
                    "FECHA": value.FECHA,
                    "CLIENTE": value.CLIENTE,
                    "CAJA": value.CAJA,
                    "USUARIO": value.USUARIO,
                    "TOTAL": '$ '+value.TOTAL_VEN
                }).draw();
        });

        if(TOTAL_VENTAS>0)
        tablaGeneralVentas.row.add({
            "DOCUMENTO": '&nbsp;',
            "FECHA": '&nbsp;',
            "CLIENTE": '&nbsp;',
            "CAJA": '&nbsp;',
            "USUARIO": '<strong>TOTAL GENERAL</strong>',
            "TOTAL": '$ ' + TOTAL_VENTAS
        }).draw();
       // console.log(response.data);
    })
        .catch(function (error) {
            console.log(error);
        });
}





/**
 * permite cambiar el nombre de clase de un tab
 * @param {string} idTab -identificador de tab
 * @param {string} clase -nombre de clase para el tab
 */
function cambiarTabActivo(idTab, clase) {
    if (clase == 'active show') {
        $(idTab).attr('class', 'tab-pane fade active show');
        $(idTab + '-tab').attr('class', 'nav-item nav-link active show');
    }
    else {
        $(idTab).attr('class', 'tab-pane fade');
        $(idTab + '-tab').attr('class', 'nav-item nav-link');
    }
}

/**
 * permite cambiar un tab de activo a inactivo o viceversa
 * @param {int} indice -indice de tab
 * @param {int} idRegistro -identificador de usuario
 */
function cambiarTab(indice, idRegistro) {
    switch (indice) {
        case 0: //tab listado
            {
                cambiarTabActivo('#listado', 'active show');
                cambiarTabActivo('#editar', '');
                cambiarTabActivo('#detalle', '');
                break;
            }
        case 1: //tab detalle
            {
                cambiarTabActivo('#detalle', 'active show');
                cambiarTabActivo('#listado', '');
                cambiarTabActivo('#editar', '');
                getDetalleByIdCompra(idRegistro);
                break;
            }
        case 2: //tab detalle
            {
                cambiarTabActivo('#editar', 'active show');
                cambiarTabActivo('#listado', '');
                cambiarTabActivo('#detalle', '');
                // getDetalleByIdCompra(idRegistro);
                break;
            }
    }
}

function vistaPreviaImprimir(elem) {
    var FECHA_INICIO = $('#FECHA_INICIO').val();
    var FECHA_FIN = $('#FECHA_FIN').val();
    var PERIODO = '<strong>Período:</strong> Del '+FECHA_INICIO+' al '+FECHA_FIN;
    var context = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2)); 
    var url =window.location.protocol+"//"+ window.location.host +context;
    var mywindow = window.open();
    var css = "";
    var myStylesLocation = url+"/assets/css/bootstrap.min.css";
    $.ajax({
        url: myStylesLocation,
        type: "POST",
        async: false
    }).done(function (data) {
        css += data;
    })
    mywindow.document.write('<html><head><title>Reporte General Ventas</title>');
    mywindow.document.write('<style type="text/css">' + css + ' </style>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h6>' + 'Reporte General Ventas&nbsp;&nbsp;&nbsp;&nbsp;   '+PERIODO+' </h6>');
    
    var contenido = document.getElementById(elem).innerHTML;
    var $html = $('<div />',{html:contenido});
    $html.find('div#divInputFechas').hide();
    $html.find('div#tabla-reporte-general-ventas_length').hide();
    $html.find('div.dt-buttons').hide();
    $html.find('div#tabla-reporte-general-ventas_paginate').hide();
    $html.find('div#tabla-reporte-general-ventas_info').hide();
    
    $html.find('div#tabla-reporte-general-ventas_filter').hide();
    $html.find('table#tabla-reporte-general-ventas>thead').attr('style','color:black;background:rgb(84, 110, 122);');
    mywindow.document.write($html.html());
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();
    return true;
}


//----------------------------------INICIALIZACIÓN DE MÉTODOS-------------------------
//tab activo por defecto
cambiarTab(0, 0);

$('#btnGeneralVentas').click(function () {
    consultarVentasGeneral();
});




//configuración inicial para tabla reporte general de ventas
var tablaGeneralVentas = $('#tabla-reporte-general-ventas').DataTable(
    {
        "ordering": false,
        "columns": [
            { 'data': 'DOCUMENTO' },
            { 'data': 'FECHA' },
            { 'data': 'CLIENTE' },
            { 'data': 'CAJA' },
            { 'data': 'USUARIO' },
            { 'data': 'TOTAL' }
        ],
        dom: 'lBfrtip',
        lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "Todo"]],
        buttons: [
            {
                extend: 'copyHtml5',
                text: '<i class="fa fa-files-o"></i> Copiar',
                titleAttr: 'Copiar',
                exportOptions: {
                    columns: 'th:not(:last-child)'
                }
            },
            {
                extend: 'print',
                text: '<i class="fa fa-print"></i> Imprimir',
                titleAttr: 'Imprimir',
                title: 'Reporte General Ventas',
                className: 'btn btn-info btn-xs',
                action: function ( e, dt, node, config ) {
                    // Copy an array based DataTables' data to another element
                    vistaPreviaImprimir('listado');
                }
            }
        ],
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });

//configuración inicial para tabla DETALLE DE COMPRA
var tablaDetalleCompra = $('#tabla-detalle-compra').DataTable(
    {

        "paging": false,
        "searching": false,
        "info": false,
        "ordering": false,
        "columns": [
            { 'data': 'SELECCIONAR' },
            { 'data': 'ID' },
            { 'data': 'ID_PRO' },
            { 'data': 'NOMBRE_PRO' },
            { 'data': 'COMPRADO' },
            { 'data': 'DEVOLVER' },
            { 'data': 'PRECIO_COMP' },
            { 'data': 'SUBTOTAL' },
            { 'data': 'INCLUYE_IVA' },
            { 'data': 'ACCIONES' }
        ],
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });

//columna ID de tabla detalle compra, se hace no visible
//tablaDetalleCompra.column(1).visible(false);
tablaDetalleCompra.column(2).visible(false);
$('.table').attr('style', 'width:100%');


$('#FECHA_INICIO').datepicker("setDate", new Date());
$('#FECHA_FIN').datepicker("setDate", new Date());

