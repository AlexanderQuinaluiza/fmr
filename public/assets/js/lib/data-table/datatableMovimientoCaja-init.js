/**
 * FUNCIONES PARA LA GESTIÓN DE MOVIMIENTOS DE CAJA
 */

 /**
 * Permite mostrar las cajas disponibles en controles tipo radiobuttom
 */
function getCajas()
{
    var url = '/cajas';
    var ESTADO_CAJA = 0;
    var itemsRadioCajas = '';
    var numeroRadios = 0;
    axios.get(url).then(function (response) {
        $.each(response.data.data,function(key,value){
            ESTADO_CAJA = value.ESTADO;
            if(ESTADO_CAJA>0)
            {
                var DESCRIPCION_CAJA = value.DESCRIPCION_CAJA;
                var ID_CAJA = value.ID_CAJA;
                var itemRadio='<div class="form-check"><label class="toggle"><input hidden type="radio" name="radioCaja" value="'+ID_CAJA+'" class="radioBtnCaja"> <span class="label-text">'+DESCRIPCION_CAJA+'</span></label></div>';
                itemsRadioCajas+=itemRadio;
                numeroRadios++;
            }
        });
        $('#divCajas').append(itemsRadioCajas);
        //si existe una única caja marque por defecto
        if(numeroRadios==1)
        $('.radioBtnCaja').prop('checked',true);
    })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * Permite el registro de un movimiento de caja
 */
function registrar() {

    if (validarDatos()) {
        return;
    }
    var VALOR_MOV = $('#VALOR_MOV').val().trim();
    var DESCRIPCION_MOV = $('#DESCRIPCION_MOV').val().trim();
    var TIPO_MOV = $('input[name=radioMovCaja]:checked', '#formulario').val();
    var ID_CAJA = $('input[name=radioCaja]:checked', '#formulario').val();
    axios.post('/movimientos/registrar', {
        'VALOR_MOV':VALOR_MOV,
        'DESCRIPCION_MOV':DESCRIPCION_MOV,
        'TIPO_MOV':TIPO_MOV,
        'ID_CAJA':ID_CAJA
        }).then(function (response) {
        if (response.data>0) {
            toastr.success('Registrado correctamente!');
            limpiarDatos();
            tablaMovimientosCaja.ajax.reload();
        }
        else {
            toastr.error('No se ha podido guardar el registro.', 'Error!')
        }
    })
        .catch(function (error) {
            console.log(error);
            toastr.error('No se ha podido guardar el registro.', 'Error!')
        });
}

/**
 * permite limpiar las entradas de texto
 */
function limpiarDatos() {
    $('#formulario')[0].reset();
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
 * Permite validar datos de entrada
 */
function validarDatos() {
    var error = 0;
    var errorMostrarMsj = [];
    var VALOR_MOV = $('#VALOR_MOV').val().trim();
    var DESCRIPCION_MOV = $('#DESCRIPCION_MOV').val().trim();
    var TIPO_MOV = $('input[name=radioMovCaja]:checked', '#formulario').val();
    var ID_CAJA = $('input[name=radioCaja]:checked', '#formulario').val();
    if (!VALOR_MOV || VALOR_MOV == 0) errorMostrarMsj.push("Ingrese valor para movimiento de caja");
    if (!DESCRIPCION_MOV) errorMostrarMsj.push("Ingrese descripción para movimiento de caja");
    if (!ID_CAJA || ID_CAJA==0) errorMostrarMsj.push("Seleccione una caja");
    if (!TIPO_MOV || TIPO_MOV==0) errorMostrarMsj.push("Seleccione un tipo de movimiento de caja");
    
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


//----------------------------------INICIALIZACIÓN DE MÉTODOS-------------------------
//tab activo por defecto
cambiarTab(0, 0, 0, 0);
getCajas();
$('#btnGuardarMov').click(function () {
    registrar();
});

//configuración inicial para tabla listado de MOVIMIENTOS DE CAJA
var tablaMovimientosCaja = $('#tabla-movimientos-caja').DataTable(
    {
        'ajax': {
            "type": "GET",
            "url": "movimientos",
            "dataSrc": function (json) {
                var return_data = new Array();
                for (var i = 0; i < json.length; i++) {                   
                    var TRANSACCION = '';
                    if(json[i].VEN_ID>0) TRANSACCION = 'Venta';
                    else if(json[i].COM_ID>0) TRANSACCION = 'Compra';
                    else if(json[i].NCR_ID>0) TRANSACCION = 'Devolución venta';
                    else if(json[i].DEV_ID>0) TRANSACCION = 'Devolución compra';                              
                    return_data.push({
                        'ID_MOV': json[i].ID,
                        'FECHA_MOV': "<p style='font-size:15px;color:#000'>"+json[i].FECHA+"</p>",
                        'DESCRIPCION_MOV': json[i].COMENTARIO,
                        'CAJA': json[i].DESCRIPCION_CAJA,
                        'TIPO': json[i].TIPO,
                        'TRANSACCION':TRANSACCION,
                        'VALOR':'$ '+json[i].TOTAL
                    })
                }
                return return_data;
            }
        },
        "columns": [
            { 'data': 'ID_MOV' },
            { 'data': 'FECHA_MOV' },
            { 'data': 'DESCRIPCION_MOV' },
            { 'data': 'CAJA' },
            { 'data': 'TIPO' },
            { 'data': 'TRANSACCION' },
            { 'data': 'VALOR' }
        ],
        dom: 'lBfrtip',
        lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "Todo"]],
        buttons: [
            {
                extend: 'copyHtml5',
                text: '<i class="fa fa-files-o"></i> Copiar',
                titleAttr: 'Copiar'
            },
            {
                extend: 'excelHtml5',
                text: '<i class="fa fa-file-excel-o"></i> Excel',
                titleAttr: 'Excel'
            },
            {
                extend: 'csvHtml5',
                text: '<i class="fa fa-file-text-o"></i> CSV',
                titleAttr: 'CSV'
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fa fa-file-pdf-o"></i> PDF',
                titleAttr: 'PDF',
                title: 'Listado de' + $('#titulo').text()
            },
            {
                extend: 'print',
                text: '<i class="fa fa-print"></i> Imprimir',
                titleAttr: 'Imprimir',
                title: 'Listado de' + $('#titulo').text(),
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

$('.table').attr('style', 'width:100%');

