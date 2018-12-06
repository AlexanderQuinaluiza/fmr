/**
 * FUNCIONES PARA VISUALIZACIÓN DE INVENTARIO
 */
var NOMBRE_PRODUCTO = '';
/**
 * permite obtener el inventario de un producto dado
 * @param {int} idRegistro - id de producto
 */
function getInventarioById(idRegistro) {
    var url = '/inventarios';
    axios.get(url, { params: { ID_PRO: idRegistro } }).then(function (response) {
        var longitud = Object.keys(response.data.data).length;
        var CANTIDAD_PRO_COMPRA,VALOR_UNITARIO_COMPRA,VALOR_TOTAL_COMPRA ;
        var CANTIDAD_PRO_VENTA,VALOR_UNITARIO_VENTA, VALOR_TOTAL_VENTA ;

        var TIPO_ITEM = '';
        $('#tabla-inventario').dataTable().fnClearTable();
        for (var i = 0; i < longitud; i++) {
            TIPO_ITEM = response.data.data[i].TIPO_ITEM;
            switch (TIPO_ITEM) {
                case 'compra':
                CANTIDAD_PRO_COMPRA = response.data.data[i].CANTIDAD_PRO;
                VALOR_UNITARIO_COMPRA = response.data.data[i].VALOR;
                VALOR_TOTAL_COMPRA = response.data.data[i].TOTAL;
                CANTIDAD_PRO_VENTA = '';
                VALOR_UNITARIO_VENTA = '';
                VALOR_TOTAL_VENTA = '';
                    break;
                case 'devolucion-compra':
                CANTIDAD_PRO_COMPRA = '';
                VALOR_UNITARIO_COMPRA = '';
                VALOR_TOTAL_COMPRA = '';
                CANTIDAD_PRO_VENTA = response.data.data[i].CANTIDAD_PRO;
                VALOR_UNITARIO_VENTA = response.data.data[i].VALOR;
                VALOR_TOTAL_VENTA = response.data.data[i].TOTAL;
                    break;
                case 'venta':
                CANTIDAD_PRO_COMPRA = '';
                VALOR_UNITARIO_COMPRA = '';
                VALOR_TOTAL_COMPRA = '';
                CANTIDAD_PRO_VENTA = response.data.data[i].CANTIDAD_PRO;
                VALOR_UNITARIO_VENTA = response.data.data[i].VALOR;
                VALOR_TOTAL_VENTA = response.data.data[i].TOTAL;

                    break;
                case 'devolucion-venta':
                CANTIDAD_PRO_COMPRA = response.data.data[i].CANTIDAD_PRO;
                VALOR_UNITARIO_COMPRA = response.data.data[i].VALOR;
                VALOR_TOTAL_COMPRA = response.data.data[i].TOTAL;
                CANTIDAD_PRO_VENTA = '';
                VALOR_UNITARIO_VENTA = '';
                VALOR_TOTAL_VENTA = '';
                    break;
                default:
                    break;
            }
           tablaDetalleInventario.row.add({
                "ID": NOMBRE_PRODUCTO,
                "FECHA_COM": response.data.data[i].FECHA_COM,
                "DESCRIPCION": response.data.data[i].DESCRIPCION,
                "CANTIDAD_ENTRADA": CANTIDAD_PRO_COMPRA,
                "VU_ENTRADA": VALOR_UNITARIO_COMPRA,
                "VT_ENTRADA": VALOR_TOTAL_COMPRA,
                "CANTIDAD_SALIDA": CANTIDAD_PRO_VENTA,
                "VU_SALIDA": VALOR_UNITARIO_VENTA,
                "VT_SALIDA": VALOR_TOTAL_VENTA,
                "CANTIDAD_TOTAL": response.data.data[i].CANTIDAD_EXIST,
                "VU_TOTAL": response.data.data[i].VALOR_EXIST,
                "VT_TOTAL": response.data.data[i].TOTAL_EXIST
            }).draw();
        }
        console.log(response.data.data);
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
function cambiarTab(indice, idRegistro,nombreProducto) {
    switch (parseInt(indice)) {
        case 0: //tab listado
            {
                cambiarTabActivo('#listado', 'active show');
                cambiarTabActivo('#editar', '');
                break;
            }
        case 1: //tab nuevo/editar
            {
                cambiarTabActivo('#editar', 'active show');
                cambiarTabActivo('#listado', '');
                $('#editar-tab').html('<i class="fa fa-info-circle"></i>' + ' Kardex');
                getInventarioById(parseInt(idRegistro));
                $('#lstErrores').empty();
                $('#lblNombreProducto').text(nombreProducto);
                NOMBRE_PRODUCTO = nombreProducto;            
                break;
            }
    }
}



function detalles(idRegistro) {
    var url = '/roles/modulos';
    axios.get(url, {
        params: {
            ID_ROL: idRegistro
        }
    }).then(function (response) {
        var longitud = Object.keys(response.data.data).length;
        if (longitud > 0) {
            var NOMBRE_ROL = '';
            $('#lstModulos').empty();
            var lista = '';
            $.each(response.data.data, function (key, entry) {
                NOMBRE_ROL = entry.rol;
                lista += '<li class="fa fa-check" aria-hidden="true">&nbsp;' + entry.modulo + '</li><br>';
            });
            $('#lstModulos').append(lista);
            $('#lblNombreRol').html("Rol <strong>" + NOMBRE_ROL + "</strong> tiene acceso a los siguientes módulos:");
        }
        else {
            $('#lstModulos').empty();
            $('#lblNombreRol').html("Este rol no tiene acceso a ningún módulo");
        }
        //console.log(longitud);

    })
        .catch(function (error) {
            console.log(error);
        });
}
//----------------------------------INICIALIZACIÓN DE MÉTODOS-------------------------
//tab activo por defecto
cambiarTab(0, 0);



//configuracion inicial para tabla
var tabla = $('#bootstrap-data-table').DataTable(
    {
        'ajax': {
            "type": "GET",
            "url": "productos",
            "dataSrc": function (json) {
                var return_data = new Array();
                var buttons = '';
                var btn = '';
                for (var i = 0; i < json.data.length; i++) {
                    var ID_PRO = json.data[i].ID_PRO;
                    var datos = "'1" + "'," + "'" + ID_PRO + "','"  + json.data[i].NOMBRE_PRO + "'";        
                    buttons = '<div class="btn-group btn-group-sm">' +
                        '<button class="btn btn-info" onclick="cambiarTab(' + datos + ');"><span class="fa fa-info-circle"></span> Detalles</button>' + btn + '</div>';
                    return_data.push({
                        'ID_PRO': json.data[i].ID_PRO,
                        'NOMBRE_PRO': json.data[i].NOMBRE_PRO,
                        'DESCRIPCION_PRO': json.data[i].DESCRIPCION_PRO,
                        'STOCK_PRO': json.data[i].STOCK_PRO,
                        'COSTO_PRO': '$ ' + json.data[i].COSTO_PRO,
                        'LABORATORIO_PRO': json.data[i].LABORATORIO_PRO,
                        'ACCIONES_PRO': buttons
                    })
                }
                return return_data;
            }
        },
        "columns": [
            { 'data': 'ID_PRO' },
            { 'data': 'NOMBRE_PRO' },
            { 'data': 'DESCRIPCION_PRO' },
            { 'data': 'STOCK_PRO' },
            { 'data': 'COSTO_PRO' },
            { 'data': 'LABORATORIO_PRO' },
            { 'data': 'ACCIONES_PRO' }
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
                extend: 'excelHtml5',
                text: '<i class="fa fa-file-excel-o"></i> Excel',
                titleAttr: 'Excel',
                exportOptions: {
                    columns: 'th:not(:last-child)'
                }
            },
            {
                extend: 'csvHtml5',
                text: '<i class="fa fa-file-text-o"></i> CSV',
                titleAttr: 'CSV',
                exportOptions: {
                    columns: 'th:not(:last-child)'
                }
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fa fa-file-pdf-o"></i> PDF',
                titleAttr: 'PDF',
                title: 'Listado Productos',
                exportOptions: {
                    columns: 'th:not(:last-child)'
                }
            },
            {
                extend: 'print',
                text: '<i class="fa fa-print"></i> Imprimir',
                titleAttr: 'Imprimir',
                title: 'Listado Productos',
                className: 'btn btn-info btn-xs',
                exportOptions: {
                    columns: 'th:not(:last-child)'
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

//configuración inicial para tabla DETALLE DE INVENTARIO (KARDEX)
var tablaDetalleInventario = $('#tabla-inventario').DataTable(
    {
        "paging": false,
        "searching": true,
        "info": true,
        "ordering": false,
        "columns": [
            { 'data': 'ID' },
            { 'data': 'FECHA_COM' },
            { 'data': 'DESCRIPCION' },
            { 'data': 'CANTIDAD_ENTRADA' },
            { 'data': 'VU_ENTRADA' },
            { 'data': 'VT_ENTRADA' },
            { 'data': 'CANTIDAD_SALIDA' },
            { 'data': 'VU_SALIDA' },
            { 'data': 'VT_SALIDA' },
            { 'data': 'CANTIDAD_TOTAL' },
            { 'data': 'VU_TOTAL' },
            { 'data': 'VT_TOTAL' }
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
                extend: 'excelHtml5',
                text: '<i class="fa fa-file-excel-o"></i> Excel',
                titleAttr: 'Excel',
                exportOptions: {
                    columns: 'th:not(:last-child)'
                }
            },
            {
                extend: 'csvHtml5',
                text: '<i class="fa fa-file-text-o"></i> CSV',
                titleAttr: 'CSV',
                exportOptions: {
                    columns: 'th:not(:last-child)'
                }
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fa fa-file-pdf-o"></i> PDF',
                titleAttr: 'PDF',
                title: 'Inventario producto '+NOMBRE_PRODUCTO,
                exportOptions: {
                    columns: 'th:not(:last-child)'
                }
            },
            {
                extend: 'print',
                text: '<i class="fa fa-print"></i> Imprimir',
                titleAttr: 'Imprimir',
                title: 'Inventario producto '+NOMBRE_PRODUCTO,
                className: 'btn btn-info btn-xs',
                exportOptions: {
                    columns: 'th:not(:last-child)'
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

$('.table').attr('style', 'width:100%');