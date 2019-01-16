/**
 * FUNCIONES PARA LA GESTIÓN DE DEVOLUCIÓN DE COMPRAS
 */

//objeto que permite almacenar los item agregados a la compra
var jsonItemsDevolver = {};
var iva = 0;

//contador para generar identificador de filas del objeto que almacena items compra
var indiceItemDevolver = 1;
var indiceItemDevolverSeleccionado = -1;
var cantidadProductoCompradoSeleccionado = 0;
var cantidadProductoDevueltoSeleccionado = 0;

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
            iva = parseFloat(respuesta.trim());
        },
        beforeSend: function () { },
        error: function (objXMLHttpRequest) { }
    });
} getSetting('iva');

/**
 * Permite obtener una compra dado su id
 * @param {int} idRegistro -identificador de compra
 */
function getCompraById(idRegistro) {
    var url = '/compras/byid';
    axios.get(url, {
        params: {
            ID_COMP: idRegistro
        }
    }).then(function (response) {
        $('#lblID_COMP').html(response.data.data[0].ID_COMP);
        $('#lblNOMBRE_PROV').html(response.data.data[0].NOMBRE_PROV);
        $('#lblNOMBRE_USU').html(response.data.data[0].NOMBRE_USU + " " + response.data.data[0].APELLIDO_USU);
        $('#lblFACTURA_PROV').html(response.data.data[0].FACTURA_PROV);
        $('#lblFECHA_COMP').html(response.data.data[0].FECHA_COMP);
        var porcentajeDescuento = response.data.data[0].DESCUENTO_COMP;
        var totalCompra = response.data.data[0].TOTAL_COMP;
        var descuentoPorc = porcentajeDescuento * totalCompra;
        var totalConDescuento = totalCompra - descuentoPorc;
        $('#lblTOTALCONDESCUENTO').html(totalConDescuento);
        $('#lblDESCUENTO_COMP').html(porcentajeDescuento);
        if (!porcentajeDescuento)
            $('#divDescuento').hide();
        else
            $('#divDescuento').show();
    })
        .catch(function (error) {
            console.log(error);
        });
}


/**
 * Permite obtener una devolución dado su id
 * @param {int} idRegistro -identificador de devolución
 */
function getDevolucionById(idRegistro) {
    var url = '/devolucion-compra/byid';
    axios.get(url, {
        params: {
            ID_DEV: idRegistro
        }
    }).then(function (response) {
        $('#lblID_DEV').html(response.data.data[0].ID_DEV);
        $('#lblFECHA_DEV').html(response.data.data[0].FECHA_DEV);
        $('#lblNOMBRE_PROV_DEV').html(response.data.data[0].PROVEEDOR);
        $('#lblNOMBRE_USU_DEV').html(response.data.data[0].NOMBRE_USU + " " + response.data.data[0].APELLIDO_USU);
        $('#lblNOTA_CREDITO_PROV').html(response.data.data[0].NUMERO_NC);
        $('#lblCAJA').html(response.data.data[0].DESCRIPCION_CAJA);
    })
        .catch(function (error) {
            console.log(error);
        });
}

/** funcion obtiene los items seleccionados de la tabla detalle compra */
function itemsSeleccionados() {
    var arrayItems = new Array();
    var cont = 0;
    var table = document.getElementById('tabla-detalle-compra');
    checkboxes = document.getElementsByName('sld');
    for (var i = 0, r = 1, n = checkboxes.length; i < n; i++ , r++) {
        if (checkboxes[i].checked) {
            cont = cont + 1;
            var id_row = table.rows[r].cells[1].innerHTML;
            var item = {};
            item.ID_ROW = id_row;
            arrayItems.push(item);
        }
    }
    return arrayItems;
}

function guardarDevolucionCompra() {
    var arrayItemsSelected = itemsSeleccionados();
    var arreglo = [];
    var dataItems = JSON.parse(localStorage.getItem("itemsAdevolver"));
    for (var index = 0; index < arrayItemsSelected.length; index++) {
        var idFila = arrayItemsSelected[index].ID_ROW;
        $.each(dataItems, function (key, value) {
            if(key == idFila && value.DEVOLVER>0 && value.SUBTOTAL>0)
            {
                
                arreglo.push(value);
            }
        });
    }
    if(arrayItemsSelected.length==0)
    {
        toastr.warning('Marque al menos un item de la tabla');
    }
    else
    {
    if(arreglo.length>0)
    {
        var OBSERVACION_DEV = $('#OBSERVACION_DEV').val().trim();
        var FECHA_DEV = $('#FECHA_DEV').val().trim();
        var NUM_NOTA_CREDITO = $('#NOTA_CREDITO_DEV').val().trim();
        if(!FECHA_DEV || !NUM_NOTA_CREDITO)toastr.warning('Complete todos los datos requeridos', 'Incompleto!');
        else 
        {  
                var data = new FormData();
                data.append('datos', JSON.stringify(arreglo));
                data.append('ID_COMP', $('#lblID_COMP').text());
                data.append('NUM_NOTA_CREDITO', NUM_NOTA_CREDITO);
                data.append('OBSERVACION_DEV', OBSERVACION_DEV);
                data.append('FECHA_DEV', FECHA_DEV);
                data.append('SUBTOTAL_DEV', getSubTotales(1));
                data.append('TOTAL_DEV', getSubTotales(3));
                axios.post('/devolucion-compra/registrar', data).then(function (response) {
                    if (response.data > 0) {
                        toastr.success('Devolución registrado correctamente!');
                        $('#secondFormDevolucion')[0].reset();
                        $('#FECHA_DEV').datepicker("setDate", new Date());
                        localStorage.clear();
                        tablaDetalleCompra.clear().draw();
                        jsonItemsDevolver = {};
                        tablaDevolucionCompras.ajax.reload();
                    }
                    else {
                        console.log(response.data);
                        toastr.error('No se ha podido guardar el registro.', 'Error!')
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                        toastr.error('No se ha podido guardar el registro.', 'Error!')
                    });         
        }

    }
    else
    {
        toastr.warning('Verifique que las cantidades a devolver sean mayor a 0');
    }
    }
}

function calcular() {
    var num = itemsSeleccionados().length;
    //console.log(itemsSeleccionados());
    //document.getElementById("numselected").innerHTML=num;
}

/** funcion seleciona todos los checks items de compra */
function toggle(source) {
    checkboxes = document.getElementsByName('sld');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
    }
}

/**
 * Permite obtener los valores de SUBTOTAL,IVA y TOTAL de la devolución
 * @param {int} opcion --opcion 1=subtotal, 2=IVA, 3=total
 */
function getSubTotales(opcion) {
    var valorRetorno = 0;
    var dataItems = JSON.parse(localStorage.getItem("itemsAdevolver"));
    var itemSubtotal = 0;
    var subtotal = 0;
    var subtotalIVA = 0;
    $.each(dataItems, function (key, value) {
        itemSubtotal = value.SUBTOTAL;
        if (value.INCLUYE_IVA > 0) {
            subtotalIVA += (iva * itemSubtotal);
        }
        subtotal += itemSubtotal;
    });
    if (opcion == 1)
        valorRetorno = subtotal;
    else if (opcion == 2)
        valorRetorno = subtotalIVA;
    else if (opcion == 3)
        valorRetorno = subtotal + subtotalIVA;
    return valorRetorno.toFixed(2);
}

/**
 * Permite mostrar los valores en cajas de texto correspondiente a cantidad de una fila
 * seleccionada de la tabla detalle compras previo a modificar los datos
 * @param {int} idFila --representa el identificador de la fila seleccionada de la tabla detalle compras
 */
function editar(idFila) {
    $('#lstErroresEditItem').empty();
    indiceItemDevolverSeleccionado = idFila;
    var dataItems = JSON.parse(localStorage.getItem("itemsAdevolver"));
    $.each(dataItems, function (key, value) {
        if (key == idFila) {
            $('#EDIT_CANTIDAD_PRO').val(value.DEVOLVER);
            cantidadProductoCompradoSeleccionado = value.COMPRADO;
            cantidadProductoDevueltoSeleccionado = value.DEVUELTO;
        }
    });
}

/**
 * Permite volver a realizar los calculos de compra total
 * y mostrar en la tabla los nuevos cambios
 */
function reloadTablaDetalleCompras() {
    var btnEditar = '';
    $('#tabla-detalle-compra').dataTable().fnClearTable();
    var checkbox = ' <div class="form-check">   <label class="form-check-label"> <input type="checkbox" name="sld" onchange="calcular();" class="form-check-input" value="" data-toggle="tooltip"  title="Seleciona todos los items"></label> </div>';
    var datos = JSON.parse(localStorage.getItem("itemsAdevolver"));
    $.each(datos, function (key, value) {
        btnEditar = '<div class="btn-group btn-group-sm"><button data-toggle="modal" data-target="#itemCompraModal" class="btn btn-primary" onclick="editar(' + key + ');"><span class="fa fa-pencil-square-o"></span> Editar</button></div>';
        tablaDetalleCompra.row.add({
            "SELECCIONAR": checkbox,
            "ID": key,
            "ID_PRO": value.ID_PRO,
            "NOMBRE_PRO": value.NOMBRE_PRO,
            "COMPRADO": value.COMPRADO,
            "DEVUELTO": value.DEVUELTO,
            "DEVOLVER": value.DEVOLVER,
            "PRECIO_COMP": '$ ' + value.PRECIO_COMP,
            "SUBTOTAL": '$ ' + (parseFloat(value.SUBTOTAL)).toFixed(2),
            "INCLUYE_IVA": value.APLICA_IVA,
            "ACCIONES": btnEditar
        }).draw();
    })
    //fila subtotal
    tablaDetalleCompra.row.add({
        "SELECCIONAR": '&nbsp;',
        "ID": '&nbsp;',
        "ID_PRO": '&nbsp;',
        "NOMBRE_PRO": '&nbsp;',
        "COMPRADO": '&nbsp;',
        "DEVUELTO": '&nbsp;',
        "DEVOLVER": '&nbsp;',
        "PRECIO_COMP": '<strong>SUBTOTAL</strong>',
        "SUBTOTAL": '$ ' + getSubTotales(1),
        "INCLUYE_IVA": '',
        "ACCIONES": '&nbsp;'
    }).draw();
    //fila TOTAL
    tablaDetalleCompra.row.add({
        "SELECCIONAR": '&nbsp;',
        "ID": '&nbsp;',
        "ID_PRO": '&nbsp;',
        "NOMBRE_PRO": '&nbsp;',
        "COMPRADO": '&nbsp;',
        "DEVUELTO": '&nbsp;',
        "DEVOLVER": '&nbsp;',
        "PRECIO_COMP": '<strong>TOTAL</strong>',
        "SUBTOTAL": '$ ' + getSubTotales(3),
        "INCLUYE_IVA": '',
        "ACCIONES": '&nbsp;'
    }).draw();
}

/**
 * Permite obtener los detalles de una compra
 * @param {int} idRegistro -identificador de compra
 */
function getDetalleByIdCompra(idRegistro) {
    getCompraById(idRegistro);
    var url = '/compras/detalle/byid';
    axios.get(url, {
        params: {
            ID_COMP: idRegistro
        }
    }).then(function (response) {
        var longitud = Object.keys(response.data.data).length;
        jsonItemsDevolver = {};
        indiceItemDevolver = 1;
        for (var index = 0; index < longitud; index++) {
            var item = {};
            if(response.data.data[index].CANTIDAD_PRO>response.data.data[index].DEVUELTO)
            {
                item.ID_PRO = response.data.data[index].ID_PRO;
                item.NOMBRE_PRO = response.data.data[index].NOMBRE_PRO;
                item.COMPRADO = response.data.data[index].CANTIDAD_PRO;
                item.DEVUELTO =  response.data.data[index].DEVUELTO;
                item.DEVOLVER = 0;
                item.PRECIO_COMP = response.data.data[index].PRECIO_COMP_CON;
                //item.INCLUYE_IVA = response.data.data[index].IVA;
                // if(item.INCLUYE_IVA == 0)
                // {
                //     item.APLICA_IVA = '<i class="fa fa-times" style="color:#c82333" aria-hidden="true"></i>';
                //     item.IVA = 0;
                // }
                // else
                // {
                //     item.APLICA_IVA = '<i class="fa fa-check" style="color:#17a2b8" aria-hidden="true"></i>';
                //     item.IVA = (item.DEVOLVER * item.PRECIO_COMP)*iva;
                // }
                // item.IVA =  parseFloat((item.IVA).toFixed(2));
                item.SUBTOTAL = (item.DEVOLVER * item.PRECIO_COMP);
                jsonItemsDevolver[indiceItemDevolver] = item;
                indiceItemDevolver++;
            }
        }
        localStorage.setItem("itemsAdevolver", JSON.stringify(jsonItemsDevolver));
        reloadTablaDetalleCompras();
        var datos = JSON.parse(localStorage.getItem("itemsAdevolver"));
        //console.log(datos);
    })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * Permite obtener los detalles de una devolución
 * @param {int} idRegistro -identificador de devolución
 */
function getDetalleByIdDevolucion(idRegistro) {
    tablaDetalleDevolucion.clear().draw();
    getDevolucionById(idRegistro);
    var url = '/devolucion-compra/detalle/byid';
    axios.get(url, {
        params: {
            ID_DEV: idRegistro
        }
    }).then(function (response) {
        var existeDatos = 0;
        var TOTAL = 0;
        $.each(response.data.data, function (key, value) {
            existeDatos++;
            TOTAL+=value.SUBTOTAL_DEV;
            tablaDetalleDevolucion.row.add({
                "#": value.ID_DET_DEV,
                "PRODUCTO": value.NOMBRE_PRO,
                "CANTIDAD": value.CANTIDAD_PRO_DEV,
                'PRECIO': '$ '+ value.PRECIO,
                "SUBTOTAL": '$ '+value.SUBTOTAL_DEV
            }).draw();
        });
        if(existeDatos>0)
        {
             //fila TOTAL
             tablaDetalleDevolucion.row.add({
                "#": '',
                "PRODUCTO": '',
                "CANTIDAD": '',
                "PRECIO": '<strong>TOTAL</strong>',
                "SUBTOTAL": '$ '+TOTAL
            }).draw();
        }
           

        
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
                cambiarTabActivo('#devoluciond', 'active show');
                cambiarTabActivo('#listado', '');
                cambiarTabActivo('#detalle', '');
                cambiarTabActivo('#devolucion', '');
                getDetalleByIdDevolucion(idRegistro);
                break;
            }
    }
}

/**
 * Permite contar la cantidad de items añadidos al detalle de la devolución
 */
function contarItemsDetalleDevolucionNueva() {
    var dataItems = JSON.parse(localStorage.getItem("itemsAdevolver"));
    var existeItems = 0;
    $.each(dataItems, function (key, value) {
        existeItems++;
    });
    return existeItems;
}

/**
 * permite decrementar o incrementar la cantidad de producto en uno
 * @param {int} opcion --1=decrementar cantidad en uno, 2=incrementar cantidad en uno
 */
function masMenosCantidad(opcion) {
    var cantidadActual = $('#EDIT_CANTIDAD_PRO').val().trim();
    if (!cantidadActual) cantidadActual = 0;
    var cantidadProducto = 0;
    if (opcion == 1) {
        cantidadProducto = parseFloat(cantidadActual) - 1;
    }
    else if (opcion == 2) {
        if (cantidadActual < cantidadProductoCompradoSeleccionado)
            cantidadProducto = parseFloat(cantidadActual) + 1;
        else cantidadProducto = 1;
    }
    $('#EDIT_CANTIDAD_PRO').val(cantidadProducto);
}

$('#inCantidad').click(function () {
    //aumentar cantidad producto en uno
    masMenosCantidad(2);

});

$('#deCantidad').click(function () {
    //decrementar cantidad en uno
    var cantidadActual = $('#EDIT_CANTIDAD_PRO').val().trim();
    //valor mínimo hasta el que se puede decrementar 1
    if (cantidadActual >= 2)
        masMenosCantidad(1);
});

/**
 * Permite guardar los datos de edición correspondiente a item devolución compra
 */
function guardarCambiosEditItem() {
    var CANTIDAD_PRO = $('#EDIT_CANTIDAD_PRO').val().trim();
    var errorMostrarMsj = [];
    if (!CANTIDAD_PRO || CANTIDAD_PRO == 0) errorMostrarMsj.push("Cantidad de producto no puede estar vacío");
    var disponibleDevolver = cantidadProductoCompradoSeleccionado-cantidadProductoDevueltoSeleccionado;
    if(CANTIDAD_PRO > disponibleDevolver)
    {
        errorMostrarMsj.push("La cantidad no puede ser mayor a lo disponible para devolución");
        errorMostrarMsj.push("Disponible para devolución: "+disponibleDevolver);
    }
    // if (CANTIDAD_PRO > cantidadProductoCompradoSeleccionado)
    // {

    // } 
    if (errorMostrarMsj.length) {
        $('#lstErroresEditItem').empty();
        var lista = '';
        for (var i = 0; i < errorMostrarMsj.length; i++) {
            lista += '<li style="color: red !important">' + errorMostrarMsj[i] + '</li>';
        }
        $('#lstErroresEditItem').append(lista);
    }
    else {
        $('#lstErroresEditItem').empty();
        try {
            var dataItems = JSON.parse(localStorage.getItem("itemsAdevolver"));
            $.each(dataItems, function (key, value) {
                if (key == indiceItemDevolverSeleccionado) {
                    value.DEVOLVER = parseInt(CANTIDAD_PRO);
                    value.SUBTOTAL = parseFloat(value.PRECIO_COMP) * parseInt(value.DEVOLVER);
                   
                   // if(value.INCLUYE_IVA>0)
                   // value.IVA = value.SUBTOTAL * iva;
                   // value.IVA = parseFloat((value.IVA).toFixed(2));
                    toastr.success('Item modificado correctamente!');
                }
            });
            localStorage.setItem("itemsAdevolver", JSON.stringify(dataItems));
            reloadTablaDetalleCompras();
        } catch (error) {
            toastr.error('Error al modificar el item!' + " " + error);
        }
    }
}

//----------------------------------INICIALIZACIÓN DE MÉTODOS-------------------------
//tab activo por defecto
cambiarTab(0, 0);

$('#btnModificarItem').click(function () {
    guardarCambiosEditItem();
});

$('#btnFinalizarDevolucion').click(function () {

    var totalFilas = tablaDetalleCompra.page.info().recordsTotal;
    if (totalFilas <= 0) {
        toastr.warning('Añada al menos un item a la devolución');
    }
    else {
        //console.log(itemsSeleccionados());
        guardarDevolucionCompra();
    }

    // var dataItems = JSON.parse(localStorage.getItem("itemsAdevolver"));
    // $.each(dataItems, function (key, value) {
    //    console.log(value);
    // });

});
//configuración inicial para tabla listado de COMPRAS
var tablaCompras = $('#tabla-listado-compras').DataTable(
    {
        'ajax': {
            "type": "GET",
            "url": "compras",
            "dataSrc": function (json) {
                var return_data = new Array();
                var buttons = '';
                var btn = '';
                var labelEstado = '';
                var checkbox = ' <div class="form-check">   <label class="form-check-label"> <input type="checkbox" name="sld" onchange="calcular();" class="form-check-input" value="" data-toggle="tooltip"  title="Seleciona todos los productos"></label> </div>';
                for (var i = 0; i < json.data.length; i++) {
                    var ID_COMP = json.data[i].ID_COMP;
                    var btnVerDetalles = '<button type="button" onclick="cambiarTab(1,' + ID_COMP + ');" class="btn btn-info"><span class="fa fa-undo"></span> Devolver</button>';
                    buttons = '<div class="btn-group btn-group-sm">' + btnVerDetalles + '</div>';
                    return_data.push({
                        'ID_COMP': json.data[i].ID_COMP,
                        'NOMBRE_PROV': json.data[i].NOMBRE_PROV,
                        'FECHA_COMP': json.data[i].FECHA_COMP,
                        'FACTURA_PROV': json.data[i].FACTURA_PROV,
                        'DESCRIPCION_COMP': json.data[i].DESCRIPCION_COMP,
                        'TOTAL_COMP': '$ ' + json.data[i].TOTAL_COMP,
                        'ACCIONES_COMP': buttons
                    })
                }
                return return_data;
            }
        },
        "columns": [
            { 'data': 'ID_COMP' },
            { 'data': 'NOMBRE_PROV' },
            { 'data': 'FECHA_COMP' },
            { 'data': 'FACTURA_PROV' },
            { 'data': 'DESCRIPCION_COMP' },
            { 'data': 'TOTAL_COMP' },
            { 'data': 'ACCIONES_COMP' }
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
            { 'data': 'DEVUELTO' },
            { 'data': 'DEVOLVER' },
            { 'data': 'PRECIO_COMP' },
            { 'data': 'SUBTOTAL' },
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

//configuración inicial para tabla listado de DEVOLUCIONES DE COMPRAS
var tablaDevolucionCompras = $('#tabla-listado-devoluciones').DataTable(
    {
        'ajax': {
            "type": "GET",
            "url": "devolucion-compra",
            "dataSrc": function (json) {
                var return_data = new Array();
                var buttons = '';
                for (var i = 0; i < json.data.length; i++) {
                    var ID_DEV = json.data[i].ID_DEV;
                    var btnVerDetalles = '<button type="button" onclick="cambiarTab(2,' + ID_DEV + ');" class="btn btn-info"><span class="fa fa-info-circle"></span> Detalles</button>';
                    buttons = '<div class="btn-group btn-group-sm">' + btnVerDetalles + '</div>';
                    return_data.push({
                        'ID_DEV': ID_DEV,
                        'FECHA': json.data[i].FECHA_DEV,
                        'OBSERVACION': json.data[i].OBSERVACION_DEV,
                        'RESPONSABLE': json.data[i].NOMBRE_USU+" "+json.data[i].APELLIDO_USU,
                        'CAJA': json.data[i].DESCRIPCION_CAJA,
                        'PROVEEDOR': json.data[i].PROVEEDOR,
                        'TOTAL': '$ ' + json.data[i].TOTAL_DEV,
                        'ACCIONES_DEV': buttons
                    })
                }
                return return_data;
            }
        },
        "columns": [
            { 'data': 'ID_DEV' },
            { 'data': 'FECHA' },
            { 'data': 'OBSERVACION' },
            { 'data': 'RESPONSABLE' },
            { 'data': 'CAJA' },
            { 'data': 'PROVEEDOR' },
            { 'data': 'TOTAL' },
            { 'data': 'ACCIONES_DEV' }
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
    
//configuración inicial para tabla DETALLE DE COMPRA
var tablaDetalleDevolucion = $('#tabla-detalle-devolucion').DataTable(
    {

        "paging": false,
        "searching": false,
        "info": false,
        "ordering": false,
        "columns": [
            { 'data': '#' },
            { 'data': 'PRODUCTO' },
            { 'data': 'CANTIDAD' },
            { 'data': 'PRECIO' },
            { 'data': 'SUBTOTAL' }
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

$('#FECHA_DEV').datepicker({
    closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    format: 'yyyy-mm-dd',
    locale: 'es',
    weekStart: 1,
    daysOfWeekHighlighted: "6,0",
    autoclose: true,
    todayHighlight: true
    
});
$('#FECHA_DEV').datepicker("setDate", new Date());