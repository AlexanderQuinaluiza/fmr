/**
 * FUNCIONES PARA LA GESTIÓN DE PEDIDOS
 */
$('#loadingImage').hide();
$('#loadingImage1').hide();

/**
 * Permite obtener una vista previa del pedido
 * con opcion de imprimir
 */
function vistaPreviaImprimir(elem) {
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
    mywindow.document.write('<html><head><title>Pedidos</title>');
    mywindow.document.write('<style type="text/css">' + css + ' </style>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + 'Pedido: '+$('#lblID_PED').text() + '</h1>');
    var contenido = document.getElementById(elem).innerHTML;
    var $html = $('<div />',{html:contenido});
    $html.find('button#btnPreview').hide();
    $html.find('button#btnSendMail').hide();
    $html.find('table#tabla-detalle>thead').attr('style','color:black;background:rgb(84, 110, 122);');
    mywindow.document.write($html.html());
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();
    return true;
}

/**
 *permite añadir un item a la tabla de detalle pedido 
 */
var arreglo = [];
function addItemTabla() {
    var ID_PRS = $('#ddlPresentacion option:selected').val().trim();
    var ID_MAR = $('#ddlMarca option:selected').val().trim();
    //var ID_PROV = $('#ddlProveedor option:selected').val().trim();
    var ID_PRO = $('#ddlProducto option:selected').val().trim();
    var CANTIDAD_PRO = $('#CANTIDAD_PRO').val().trim();
    var errorMostrarMsj = [];
    if (!ID_PRO || ID_PRO == 0) errorMostrarMsj.push("Escoja una producto");
    if (!ID_MAR || ID_MAR == 0) errorMostrarMsj.push("Escoja una marca");
    if (!ID_PRS || ID_PRS == 0) errorMostrarMsj.push("Escoja una presentación");
    //if (!ID_PROV || ID_PROV == 0) errorMostrarMsj.push("Escoja un proveedor");
    if (!CANTIDAD_PRO || CANTIDAD_PRO == 0) errorMostrarMsj.push("Cantidad de producto no puede estar vacío");
    if (errorMostrarMsj.length) {
        $('#lstErrores').empty();
        var lista = '';
        for (var i = 0; i < errorMostrarMsj.length; i++) {
            lista += '<li style="color: red !important">' + errorMostrarMsj[i] + '</li>';
        }
        $('#lstErrores').append(lista);
    }
    else {
        $('#lstErrores').empty();
        var NOMBRE_PRO = $('#ddlProducto option:selected').text().trim();
        var NOMBRE_MAR = $('#ddlMarca option:selected').text().trim();
        var NOMBRE_PRS = $('#ddlPresentacion option:selected').text().trim();
        //var NOMBRE_PROV = $('#ddlProveedor option:selected').text().trim();

        var item = {};
        item.ID_PRO = ID_PRO;
        item.ID_MAR = ID_MAR;
        item.ID_PRS = ID_PRS;
        //item.ID_PROV = ID_PROV;
        item.NOMBRE_PRO = NOMBRE_PRO;
        item.NOMBRE_MAR = NOMBRE_MAR;
        item.NOMBRE_PRS = NOMBRE_PRS;
        //item.NOMBRE_PROV = NOMBRE_PROV;
        item.CANTIDAD_PRO = CANTIDAD_PRO;
        if (!verificarRepetido(ID_PRO, ID_MAR, ID_PRS, CANTIDAD_PRO)) {
            arreglo.push(item);
        }
        var btn = '<button type="button" class="btn btn-danger btn-sm delete"><span class="fa fa-trash"></span> Eliminar</button>';
        tabla.clear();
        for (var i in arreglo) {

            tabla.row.add({
                "NOMBRE_PRODUCTO": arreglo[i].NOMBRE_PRO,
                "MARCA": arreglo[i].NOMBRE_MAR,
                "PRESENTACION": arreglo[i].NOMBRE_PRS,
                "CANTIDAD": arreglo[i].CANTIDAD_PRO,
                "ACCIONES": btn
            }).draw();
        }
    }
}

/**
 * Permite el registro de un pedido
 */
function registrar() {

    if (validarDatos()) {
        return;
    }
    var ID_PROV = $('#ddlProveedor option:selected').val().trim();
    var OBSERVACION_PED = $('#OBSERVACION_PED').val().trim();
    var data = new FormData();
    data.append('datos', JSON.stringify(arreglo));
    data.append('OBSERVACION_PED', OBSERVACION_PED);
    data.append('ID_PROV', ID_PROV);
    axios.post('/pedidos/registrar', data).then(function (response) {
        if (response.data > 0) {
            toastr.success('Registrado correctamente!');
            limpiarDatos();
            tablaPedidos.ajax.reload();
            tabla.clear().draw();
            arreglo = [];
        }
        else {
            toastr.error('No se ha podido guardar el registro.', 'Error!')
        }
        //console.log(response.data);
    })
        .catch(function (error) {
            console.log(error);
            toastr.error('No se ha podido guardar el registro.', 'Error!')
        });
}

/**
 * permite actualizar la cantidad de producto a pedir en caso 
 * que se añada un item repetido
 * @param {int} ID_PRO  --identificador de producto
 * @param {int} ID_MAR  --identificador de marca
 * @param {int} ID_PRS  --identificador de presentación
 * @param {int} ID_PROV  --identificador de proveedor
 * @param {int} CANTIDAD_PRO --cantidad de producto a pedir
 */
function verificarRepetido(ID_PRO, ID_MAR, ID_PRS, CANTIDAD_PRO) {
    var igual = false;
    for (var i in arreglo) {
        if (arreglo[i].ID_PRO == ID_PRO && arreglo[i].ID_MAR == ID_MAR
            && arreglo[i].ID_PRS == ID_PRS) {
            arreglo[i].CANTIDAD_PRO = parseInt(arreglo[i].CANTIDAD_PRO) + parseInt(CANTIDAD_PRO);
            igual = true;
            break;
        }
    }
    return igual;
}

/**
 * Permite cambiar el estado del pedido de entregado a pendiente
 * @param {int} idRegistro --identificador de pedido
 */
function pendiente(idRegistro) {
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
    })

    swalWithBootstrapButtons({
        title: 'Esta seguro de poner en pendiente este pedido?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar!',
        cancelButtonText: 'Cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            axios.post('/pedidos/pendiente', {
                'ID_PED': idRegistro
            }).then(function (response) {
                tablaPedidos.ajax.reload();
                toastr.warning('El registro ha pasado a pendiente con éxito!')
            })
                .catch(function (error) {
                    toastr.error('No se ha puesto a pendiente el pedido.', 'Error!')
                });
        }
    })
}

/**
 * permite actualizar el estado de un pedido de pendiente a entregado
 * @param {int} idRegistro -identificador de pedido
 */
function entregado(idRegistro) {
    axios.post('/pedidos/entregado', {
        'ID_PED': idRegistro
    }).then(function (response) {
        tablaPedidos.ajax.reload();
    })
        .catch(function (error) {
            console.log(error);
        });
}
/**
 * permite limpiar las entradas de texto
 */
function limpiarDatos() {
    $('#formulario')[0].reset();
    $('#OBSERVACION_PED').val('');
}

/**
 * Permite obtener los detalles de un pedido
 * @param {int} idRegistro -identificador de pedido
 */
function getDetalleByIdPedido(idRegistro) {
    //var datos = [];
    //console.log(idRegistro);
    var url = '/pedidos/detalle/byid';
    axios.get(url, {
        params: {
            ID_PED: idRegistro
        }
    }).then(function (response) {
        //datos = response.data;
        var longitud = Object.keys(response.data.data).length;
        if (longitud > 0) {
            $('#lblOBSERVACION_PED').text(response.data.data[0].OBSERVACION_PED);
            $('.fecha').text(response.data.data[0].FECHA_PED);
            $('.numero').text(response.data.data[0].ID_PED);
            $('#tabla-detalle').dataTable().fnClearTable();
            $('#tabla-detalle').dataTable().fnAddData(response.data.data);
        }
        //console.log(longitud);


    })
        .catch(function (error) {
            console.log(error);
        });
    //return datos;
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
 * @param {int} idRegistro -identificador de pedido
 * @param {string} observacion -observación de pedido
 * @param {string} proveedor -nombre de proveedor
 */
function cambiarTab(indice, idRegistro, observacion, proveedor) {
    switch (parseInt(indice)) {
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
                getDetalleByIdPedido(parseInt(idRegistro));
                $('#lblOBSERVACION_PED').text(observacion);
                $('#lblPROVEEDOR_PED').text(proveedor);
                break;
            }
    }
}


/**
 * permite obtener datos para las listas desplegables de MARCA,
 * PRESENTACIÓN, PRODUCTO Y PROVEEDOR
 */
function loadDataDropDownList() {
    var ddlMarca = $('#ddlMarca');
    $.getJSON('/marcas/activas', function (data) {
        ddlMarca.append($('<option></option>').attr('value', '0').text('--Seleccione marca--'));
        $.each(data.data, function (key, entry) {
            ddlMarca.append($('<option></option>').attr('value', entry.ID_MAR).text(entry.NOMBRE_MAR));
        })
    });

    var ddlPresentacion = $('#ddlPresentacion');
    $.getJSON('/presentaciones/activas', function (data) {
        ddlPresentacion.append($('<option></option>').attr('value', '0').text('--Seleccione presentación--'));
        $.each(data.data, function (key, entry) {
            ddlPresentacion.append($('<option></option>').attr('value', entry.ID_PRS).text(entry.NOMBRE_PRS));
        })
    });

    var ddlProductos = $('#ddlProducto');
    $.getJSON('/productos/activos', function (data) {
        ddlProductos.append($('<option></option>').attr('value', '0').text('--Seleccione producto--'));
        $.each(data.data, function (key, entry) {
            ddlProductos.append($('<option></option>').attr('value', entry.ID_PRO).text(entry.NOMBRE_PRO));
        })
    });

    var ddlProveedor = $('#ddlProveedor');
    $.getJSON('/proveedores/activos', function (data) {
        ddlProveedor.append($('<option></option>').attr('value', '0').text('--Seleccione proveedor--'));
        $.each(data.data, function (key, entry) {
            ddlProveedor.append($('<option></option>').attr('value', entry.ID_PROV).text(entry.NOMBRE_PROV));
        })
    });
}

/**
 * Permite validar datos de entrada
 */
function validarDatos() {
    var error = 0;
    var errorMostrarMsj = [];
    var totalFilas = tabla.page.info().recordsTotal;
    var ID_PROV = $('#ddlProveedor option:selected').val().trim();;
    if (totalFilas <= 0) errorMostrarMsj.push("Añade al menos un item");
    if (!ID_PROV || ID_PROV == 0) errorMostrarMsj.push("Escoja un proveedor");

    if (errorMostrarMsj.length) {
        $('#lstErrores').empty();
        error = 1;
        var lista = '';
        for (var i = 0; i < errorMostrarMsj.length; i++) {
            lista += '<li style="color: red !important">' + errorMostrarMsj[i] + '</li>';
        }
        $('#lstErrores').append(lista);
    }
    else {
        $('#lstErrores').empty();
    }
    return error;
}

/**
 * Permite enviar un pedido al correo del proveedor
 * dicho pedido NO ha sido previamente almacenado en la base de datos
 */
function enviarMailPedidoNoGuardado() {
    var ID_PROV = $('#ddlProveedor option:selected').val().trim();;
    if (validarDatos()) {
        return;
    }
    var OBSERVACION_PED = $('#OBSERVACION_PED').val().trim();
    var data = new FormData();
    data.append('datos', JSON.stringify(arreglo));
    data.append('OBSERVACION_PED', OBSERVACION_PED);
    data.append('ID_PROV', ID_PROV);
    $('#loadingImage').show();
    $('#mailIcon').hide();
    $('#btnText').text("Enviando..");

    axios.post('/enviarCorreoPedidoNoGuardado', data).then(function (response) {
        if (response.data > 0) {
            toastr.success('Correo enviado correctamente!');
            $('#loadingImage').hide();
            $('#mailIcon').show();
            $('#btnText').text("Enviar por correo");
        }
        else {
            toastr.error('No se ha podido enviar el correo.', 'Error!')
            $('#loadingImage').hide();
            $('#mailIcon').show();
            $('#btnText').text("Enviar por correo");
        }
    })
        .catch(function (error) {
            console.log(error);
            $('#loadingImage').hide();
            $('#mailIcon').show();
            $('#btnText').text("Enviar por correo");
            toastr.error('No se ha podido enviar el correo.', 'Error!')
        });
}

/**
 * Permite enviar un pedido al correo del proveedor
 * dicho pedido ha sido previamente almacenado en la base de datos
 */
function enviarMailPedidoGuardado() {
    var totalFilas = tablaDetallePedidos.page.info().recordsTotal;
    if (totalFilas <= 0) {
        toastr.warning('Añade al menos un item al pedido', 'Incompleto!')
        return;
    }
    var data = new FormData();
    data.append('ID_PED', $('#lblID_PED').text());
    data.append('NOMBRE_PROV', $('#lblPROVEEDOR_PED').text());
    $('#loadingImage1').show();
    $('#mailIcon1').hide();
    $('#btnText1').text("Enviando..");
    axios.post('/enviarCorreoPedidoGuardado', data).then(function (response) {
        if (response.data > 0) {
            toastr.success('Correo enviado correctamente!');
            $('#loadingImage1').hide();
            $('#mailIcon1').show();
            $('#btnText1').text("Enviar por correo");
        }
        else {
            toastr.error('No se ha podido enviar el correo.', 'Error!')
            $('#loadingImage1').hide();
            $('#mailIcon1').show();
            $('#btnText1').text("Enviar por correo");
        }
    })
        .catch(function (error) {
            console.log(error);
            $('#loadingImage1').hide();
            $('#mailIcon1').show();
            $('#btnText1').text("Enviar por correo");
            toastr.error('No se ha podido enviar el correo.', 'Error!')
        });
}
//----------------------------------INICIALIZACIÓN DE MÉTODOS-------------------------
$('#btnCancelarActualizar').hide();
//tab activo por defecto
cambiarTab(0, 0, 0, 0);

loadDataDropDownList();
$('#btnGuardar').click(function () {
    registrar();
});

$('#btnEnviarCorreo').click(function () {
    enviarMailPedidoNoGuardado();
});

$('#btnAdd').click(function () {
    addItemTabla();
});

$('#btnSendMail').click(function () {
    enviarMailPedidoGuardado();
});

$('#btnPreview').click(function () {
   // vistaPreviaImprimir();
   vistaPreviaImprimir('detalle');
});


//permite borrar un item de la tabla pedido cuando pulsa sobre el boton Eliminar
$('#bootstrap-data-table tbody').on('click', 'button.delete', function () {
    var indice = tabla.row($(this).parents('tr')).index();
    arreglo.splice(indice, 1);
    tabla
        .row($(this).parents('tr'))
        .remove()
        .draw();
});


//configuración inicial para tabla PEDIDO NUEVO
var tabla = $('#bootstrap-data-table').DataTable(
    {
        "paging": false,
        "searching": false,
        "info": false,
        "ordering": false,
        "columns": [
            { 'data': 'NOMBRE_PRODUCTO' },
            { 'data': 'MARCA' },
            { 'data': 'PRESENTACION' },
            { 'data': 'CANTIDAD' },
            { 'data': 'ACCIONES' }
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
                title: 'Listado de' + $('#titulo').text(),
                exportOptions: {
                    columns: 'th:not(:last-child)'
                }
            },
            {
                extend: 'print',
                text: '<i class="fa fa-print"></i> Imprimir',
                titleAttr: 'Imprimir',
                title: 'Listado de' + $('#titulo').text(),
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

//configuración inicial para tabla listado de PEDIDOS
var tablaPedidos = $('#tabla-listado').DataTable(
    {
        'ajax': {
            "type": "GET",
            "url": "pedidos",
            "dataSrc": function (json) {
                var return_data = new Array();
                var buttons = '';
                var btn = '';
                var labelEstado = '';
                for (var i = 0; i < json.data.length; i++) {
                    var ID_PED = json.data[i].ID_PED;
                    var OBSERVACION_PED = json.data[i].OBSERVACION_PED;
                    var NOMBRE_PROV = json.data[i].NOMBRE_PROV;

                    var datos = "'1" + "'," + "'" + ID_PED + "','" + OBSERVACION_PED + "','" + NOMBRE_PROV + "'";

                    if (json.data[i].ESTADO > 0) {
                        //btn = '<button type="button" onclick="pendiente(' + ID_PED + ');" class="btn btn-danger"><span class="fa fa-pause"></span> Pendiente</button>';
                        btn = '<button type="button" onclick="entregado(' + ID_PED + ')" class="btn btn-success"><span class="fa fa-check"></span> Entregado</button>';

                        labelEstado = '<span  class="badge badge-success">Entregado</span>';
                    }
                    else {
                        // btn = '<button type="button" onclick="entregado(' + ID_PED + ')" class="btn btn-success"><span class="fa fa-check"></span> Entregado</button>';
                        btn = '<button type="button" onclick="pendiente(' + ID_PED + ');" class="btn btn-danger"><span class="fa fa-pause"></span> Pendiente</button>';

                        labelEstado = '<span  class="badge badge-danger">Pendiente</span>';
                    }
                    var btnVerDetalles = '<button type="button" onclick="cambiarTab(' + datos + ');" class="btn btn-info"><span class="fa fa-info-circle"></span> Detalles</button>';
                    buttons = '<div class="btn-group btn-group-sm">' + btnVerDetalles + '</div>';
                    return_data.push({
                        'ID_PED': json.data[i].ID_PED,
                        'FECHA_PED': json.data[i].FECHA_PED,
                        'OBSERVACION_PED': OBSERVACION_PED,
                        'PROVEEDOR': NOMBRE_PROV,
                        'ACCIONES_PED': buttons
                    })
                }
                return return_data;
            }
        },
        "columns": [
            { 'data': 'ID_PED' },
            { 'data': 'FECHA_PED' },
            { 'data': 'OBSERVACION_PED' },
            { 'data': 'PROVEEDOR' },
            { 'data': 'ACCIONES_PED' }
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
                title: 'Listado de' + $('#titulo').text(),
                exportOptions: {
                    columns: 'th:not(:last-child)'
                }
            },
            {
                extend: 'print',
                text: '<i class="fa fa-print"></i> Imprimir',
                titleAttr: 'Imprimir',
                title: 'Listado de' + $('#titulo').text(),
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


//configuración inicial para tabla DETALLE DE PEDIDO
var tablaDetallePedidos = $('#tabla-detalle').DataTable(
    {
        "paging": false,
        "searching": false,
        "info": false,
        "ordering": false,

        "columns": [
            { 'data': 'NOMBRE_PRO' },
            { 'data': 'NOMBRE_MAR' },
            { 'data': 'NOMBRE_PRS' },
            { 'data': 'CANTIDAD_PRO' }
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

