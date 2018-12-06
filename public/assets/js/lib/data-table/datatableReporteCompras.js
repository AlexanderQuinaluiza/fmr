/**
 * FUNCIONES PARA REPORTES
 */

//objeto que permite almacenar los item agregados a la compra
var jsonItemsDevolver = {};
var iva = 0;
/**
 * FUNCION PARA LEER DATOS DE CONFIGURACIONES DADO UN ID
 * @param {string} key --nombre de configuracion
 */
function getSetting(key) {
    $.ajax({
        async: false,
        cache: false,
        dataType: "html",
        type: 'GET',
        url: "/settings",
        data: { setting: key },
        success: function (respuesta) {
            iva =  parseFloat(respuesta.trim());
        },
        beforeSend: function () { },
        error: function (objXMLHttpRequest) { }
    });
}getSetting('iva');
//contador para generar identificador de filas del objeto que almacena items compra
var indiceItemDevolver = 1;
var indiceItemDevolverSeleccionado = -1;
var cantidadProductoCompradoSeleccionado = 0;


/**
 * Permite obtener las compras dado en fechas especificadas
 */
function consultarComprasGeneral() {
    $('#tabla-reporte-general-compras').dataTable().fnClearTable();
    var url = '/reportes/generalcompras';
    var FECHA_INICIO = $('#FECHA_INICIO').val();
    var FECHA_FIN = $('#FECHA_FIN').val();
    var TOTAL_COMPRAS = 0;
    var TOTAL_DEVOLUCIONES = 0;
    axios.get(url, {
        params: {
            FECHA_INICIO:FECHA_INICIO,
            FECHA_FIN:FECHA_FIN
        }
    }).then(function (response) {
        $.each(response.data,function(key,value){
            console.log(value);
            TOTAL_COMPRAS+=value.TOTAL;
            TOTAL_DEVOLUCIONES+=value.DEVOLUCION;
               tablaGeneralCompras.row.add({
                    "DOCUMENTO": value.FACTURA_PROV,
                    "FECHA": value.FECHA,
                    "PROVEEDOR": value.PROVEEDOR,
                    "USUARIO": value.USUARIO,
                    "TOTAL": '$ '+value.TOTAL,
                    "ITEMS": value.ITEMS,
                    "DEVOLUCION": '$ '+value.DEVOLUCION
                }).draw();
        });

        if(TOTAL_COMPRAS>0){
        tablaGeneralCompras.row.add({
            "DOCUMENTO": '&nbsp;',
            "FECHA": '&nbsp;',
            "PROVEEDOR": '&nbsp;',
            "USUARIO": '<strong>TOTAL</strong>',
            "TOTAL": '$ '+TOTAL_COMPRAS,
            "ITEMS": '',
            "DEVOLUCION": '$ ' + TOTAL_DEVOLUCIONES
        }).draw();
        tablaGeneralCompras.row.add({
            "DOCUMENTO": '&nbsp;',
            "FECHA": '&nbsp;',
            "PROVEEDOR": '&nbsp;',
            "USUARIO": '<strong>TOTAL GENERAL</strong>',
            "TOTAL": '$ '+(TOTAL_COMPRAS-TOTAL_DEVOLUCIONES),
            "ITEMS": '',
            "DEVOLUCION": '&nbsp;'
        }).draw();
    }
    })
        .catch(function (error) {
            console.log(error);
        });
}


/**
 * Permite obtener las compras x productos en fechas especificadas
 */
function consultarComprasProductos() {
    $('#tabla-reporte-compra-productos').dataTable().fnClearTable();
    var url = '/reportes/productocompras';
    var FECHA_INICIO = $('#FECHA_INICIO_RPRODUCTO').val();
    var FECHA_FIN = $('#FECHA_FIN_RPRODUCTO').val();
    axios.get(url, {
        params: {
            FECHA_INICIO:FECHA_INICIO,
            FECHA_FIN:FECHA_FIN
        }
    }).then(function (response) {
        $.each(response.data,function(key,value){
            if(value.CANTIDAD_PRO!=null)
            {
                tablaComprasProducto.row.add({
                    "ID": value.ID_PRO,
                    "PRODUCTO": value.NOMBRE_PRO,
                    "MARCA": value.MARCA,
                    "PRESENTACION": value.PRESENTACION,
                    "CATEGORIA": value.CATEGORIA,
                    "CANTIDAD": value.CANTIDAD_PRO
                }).draw();
            }
            
           
        });
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
                //cambiarTabActivo('#editar', '');
                cambiarTabActivo('#detalleReportePorProducto', '');
                break;
            }
        case 1: //tab detalle
            {
                cambiarTabActivo('#detalleReportePorProducto', 'active show');
                cambiarTabActivo('#listado', '');
                //cambiarTabActivo('#editar', '');
                getDetalleByIdCompra(idRegistro);
                break;
            }
        case 2: //tab detalle
            {
               // cambiarTabActivo('#editar', 'active show');
                cambiarTabActivo('#listado', '');
                cambiarTabActivo('#detalleReportePorProducto', '');
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
    mywindow.document.write('<h6>' + 'Reporte General Compras&nbsp;&nbsp;&nbsp;&nbsp;   '+PERIODO+' </h6>');
    
    var contenido = document.getElementById(elem).innerHTML;
    var $html = $('<div />',{html:contenido});
    $html.find('div#divInputFechas').hide();
    $html.find('div#tabla-reporte-general-compras_length').hide();
    $html.find('div.dt-buttons').hide();
    $html.find('div#tabla-reporte-general-compras_paginate').hide();
    $html.find('div#tabla-reporte-general-compras_info').hide();
    
    $html.find('div#tabla-reporte-general-compras_filter').hide();
    $html.find('table#tabla-reporte-general-compras>thead').attr('style','color:black;background:rgb(84, 110, 122);');
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

$('#btnGeneralCompras').click(function () {
    consultarComprasGeneral();
});

$('#btnComprasxProductos').click(function () {
    consultarComprasProductos();
});



//configuración inicial para tabla reporte general de compras
var tablaGeneralCompras = $('#tabla-reporte-general-compras').DataTable(
    {
        "ordering": false,
        "columns": 
        [
            {
                className: 'details-control',
                defaultContent: '',
                data: null,
                orderable: false
            },
            { data: 'DOCUMENTO' },
            { data: 'FECHA' },
            { data: 'PROVEEDOR' },
            { data: 'USUARIO' },
            { data: 'TOTAL' },
            { data: 'ITEMS' },
            { data: 'DEVOLUCION' }
        ], //permite que la columna con indice 6 no se muestre
        "columnDefs": [
            { "visible": false, "targets": 6 }
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
                title: 'Reporte General Compras',
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

    var tablaComprasProducto = $('#tabla-reporte-compra-productos').DataTable(
        {
            "ordering": false,
            "columns": 
            [
                { data: 'ID' },
                { data: 'PRODUCTO' },
                { data: 'MARCA' },
                { data: 'PRESENTACION' },
                { data: 'CATEGORIA' },
                { data: 'CANTIDAD' }
            ], //permite que la columna con indice 6 no se muestre            
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
                    title: 'Reporte Compras Productos',
                    className: 'btn btn-info btn-xs'
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

/**
 * Permite crear una sección de detalle para cada fila de la tabla pedidos
 * @param {json} data --objeto que contiene el detalle de cada pedido
 */
function format(data) {
    var filas = '';
    var estilo = "";
    var longitud = Object.keys(data.ITEMS).length;
    for (var index = 0; index < longitud; index++) {
        var subtotalMasIva = data.ITEMS[index].SUBTOTAL;
        if(data.ITEMS[index].INCLUYE_IVA>0)
        {
            subtotalMasIva += data.ITEMS[index].SUBTOTAL*iva;
        }
        estilo = index == longitud - 1 ? "" : "border-bottom: 1px solid #cfd8dc";
        filas = filas + '<tr >' +
            '<td style="border-top:none ;padding:0px" class="title">Producto:</td>' +
            '<td style="border-top:none;padding:0px">' + data.ITEMS[index].NOMBRE_PRO + '</td>' +
            '</tr>' +
            '<tr style="' + estilo + '">' +
            '<td style="border-top:none ;padding:0px" class="title">Precio:</td>' +
            '<td style="border-top:none;padding:0px"> $ ' + data.ITEMS[index].PRECIO_COMP + '</td>' +
            '<td style="border-top:none ;padding:0px" class="title">Cantidad:</td>' +
            '<td style="border-top:none;padding:0px">' + data.ITEMS[index].CANTIDAD_PRO + '</td>' +
            '<td style="border-top:none ;padding:0px" class="title">Subtotal:</td>' +
            '<td style="border-top:none;padding:0px"> $ ' + subtotalMasIva + '</td>' +
            '</tr>';
    }
    return '<div class="details-container">' +
        '<table cellpadding="5" cellspacing="0" border="0" class="details-table ">' +
        filas + '</table>' + '</div>';
};

//permite desplegar un detalle en cada fila de la tabla pedidos
$('#tabla-reporte-general-compras tbody').on('click', 'td.details-control', function () {
    
    var tr = $(this).closest('tr'),
        row = tablaGeneralCompras.row(tr);
        
    if(row.data().ITEMS.length>0)
    {
        if (row.child.isShown()) {
            tr.next('tr').removeClass('details-row');
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            row.child(format(row.data())).show();
            tr.next('tr').addClass('details-row');
            tr.addClass('shown');
        }
    }
});    
//columna ID de tabla detalle compra, se hace no visible
//tablaDetalleCompra.column(1).visible(false);
// tablaDetalleCompra.column(2).visible(false);
$('.table').attr('style', 'width:100%');


$('#FECHA_INICIO').datepicker("setDate", new Date());
$('#FECHA_FIN').datepicker("setDate", new Date());
$('#FECHA_INICIO_RPRODUCTO').datepicker("setDate", new Date());
$('#FECHA_FIN_RPRODUCTO').datepicker("setDate", new Date());


