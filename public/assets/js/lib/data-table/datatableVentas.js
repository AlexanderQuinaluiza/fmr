/**
 * FUNCIONES DE VENTAS
 */



/**
 *permite validar los datos de entrada para rol 
 * @param {int} opcion -1=registrar, 2=actualizar
 * 
 * 
 */
function validarDatos(opcion) {
    var error = 0;
    var errorMostrarMsj = [];
    if (!$('#NOMBRE_CAT').val().trim()) errorMostrarMsj.push("El nombre de la categoria no puede estar vacío");
    /*if(!$('#DESCRIPCION_ROL').val().trim()) errorMostrarMsj.push("La descripción de rol no puede estar vacío");*/
    /* if(opcion==2) //opcion para editar
     {
         if(!$('#id').val().trim()) errorMostrarMsj.push("Escoja una categoria existente de la lista");
     }*/
    if (errorMostrarMsj.length) {
        $('#lstErrores').empty();
        error = 1;
        var lista = '';
        for (var i = 0; i < errorMostrarMsj.length; i++) {
            lista += '<li style="color: red !important">' + errorMostrarMsj[i] + '</li>';
        }
        $('#lstErrores').append(lista);
        $('#btnGuardar').attr("data-dismiss","");
    }
    else {
        $('#lstErrores').empty();
    }
    return error;
}

/**
 * permite limpiar las entradas de texto
 */
function limpiarDatos() {
    $('#id').val('');
    $('#NOMBRE_CAT').val('');
    // $('#DESCRIPCION_ROL').val('');
    $('#lstErrores').empty();
}



/**
 * permite actualizar el estado de un rol de activo a inactivo
 * @param {int} idRegistro -identificador de rol
 */
function desactivar(idRegistro) {
    const swalWithBootstrapButtons = swal.mixin({
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
    })

    swalWithBootstrapButtons({
        title: 'Esta seguro de desactivar esta caegoria?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar!',
        cancelButtonText: 'Cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            axios.post('/categorias/desactivar', {
                'ID_CAT': idRegistro
            }).then(function (response) {
                tabla.ajax.reload();
                toastr.warning('El registro ha sido desactivado con éxito!')
            })
                .catch(function (error) {
                    toastr.error('No se ha podido desactivar el registro.', 'Error!')
                });
        }
    })
}

/**
 * permite actualizar el estado de un rol de inactivo a activo
 * @param {int} idRegistro -identificador de rol
 */
function activar(idRegistro) {
    axios.post('/categorias/activar', {
        'ID_CAT': idRegistro
    }).then(function (response) {
        tabla.ajax.reload();
    })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * permite obtener un rol dado su id
 * @param {int} idRegistro - id de rol
 */
function getRegistroById(idRegistro) {
    var url = '/categorias/byid';
    axios.get(url, { params: { ID_CAT: idRegistro } }).then(function (response) {
        $('#id').val(response.data.ID_CAT);
        $('#NOMBRE_CAT').val(response.data.NOMBRE_CAT);
        // $('#DESCRIPCION_ROL').val(response.data.DESCRIPCION_ROL);
        $('#btnCancelarActualizar').show();
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
                break;
            }
        case 1: //tab nuevo/editar
            {
                cambiarTabActivo('#editar', 'active show');
                cambiarTabActivo('#listado', '');
                $('#editar-tab').html('<i class="fa fa-edit"></i>' + ' Editar');
                getRegistroById(idRegistro);
                $('#lstErrores').empty();
                break;
            }
    }
}

//----------------------------------INICIALIZACIÓN DE MÉTODOS-------------------------
$('#btnCancelarActualizar').hide();
//tab activo por defecto
cambiarTab(0, 0);

$('#btnGuardarVenta').click(function () {
    console.log(productosSeleccionados());
    registrarVenta();
});

$('#btnCancelarActualizar').click(function () {
    limpiarDatos();
    $('#editar-tab').html('<i class="fa fa-plus"></i>' + ' Nuevo');
    $('#btnCancelarActualizar').hide();
});
/** listar las agencias que existen */


var tablaproductos = $('#table_busqueda').DataTable(
    {

        'ajax': {
            "type": "GET",
            "url": "/ventas/productosventas",
            "dataSrc": function (json) {
                var return_data = new Array();


                var labelreceta = '';
                for (var i = 0; i < json.data.length; i++) {
                    // var ID_PRO = json.data[i].ID_PRO;
                    // var NOMBRE_PRO = '"'+String(json.data[i].NOMBRE_PRO)+'"';
                    format(json.data[i]);
                    var img_url = '<img src="' + json.data[i].IMAGEN_PRO + '" alt="Img" width="50" height="50" style="border-radius: 50%;">';

                    if (json.data[i].VENTA_CON_RECETA > 0) {
                        // btn = '<button type="button" onclick="desactivar('+ID_PRO+');" class="btn btn-danger"><span class="fa fa-trash"></span> Desactivar</button>';
                        labelreceta = '<span  class="badge badge-danger">con receta</span>';
                    }
                    else {
                        //btn = '<button type="button" onclick="activar('+ID_PRO+')" class="btn btn-success"><span class="fa fa-check"></span> Activar</button>';
                        labelreceta = '<span  class="badge badge-success">publico</span>';
                    }
                    /*buttons = '<div class="btn-group btn-group-sm">'+
                    '<button class="btn btn-primary" onclick="cambiarTab(1,'+ID_PRO+');"><span class="fa fa-pencil-square-o"></span> Editar</button>'+btnVerDetalles+btnAgregarEjemplar+btn+'</div>';
                    */
                    //ID_PRO, ID_CAT, ID_PRS, ID_MAR, NOMBRE_PRO, DESCRIPCION_PRO, COSTO_PRO, GANANCIA_PRO, PRECIO_VENTA_PRO, EXISTENCIA_MIN_PRO, EXISTENCIA_MAX_PRO, ETIQUETAS_PRO, UBICACION_PRO, IMAGEN_PRO, APLICA_IVA_PRO, STOCK_PRO, LOTE_PRO, LABORATORIO_PRO, ESTADO_PRO, FECHA_REGISTRO_PRO, TIPO_PRO, PRECIO_PROMOCIONAL_PRO, VENTA_CON_RECETA, USU_REGISTRO
                    return_data.push({
                        'ID_PRO': json.data[i].ID_PRO,
                        'IMAGEN_PRO': img_url,
                        'NOMBRE_PRO': json.data[i].NOMBRE_PRO,
                        'DESCRIPCION_PRO': json.data[i].DESCRIPCION_PRO,
                        'MARCA_PRO': json.data[i].MARCA_PRO,
                        'CATEGORIA_PRO': json.data[i].CATEGORIA_PRO,
                        'PRESENTACION_PRO': json.data[i].PRESENTACION_PRO,
                        'LABORATORIO_PRO': json.data[i].LABORATORIO_PRO,
                        'STOCK_PRO': json.data[i].STOCK_PRO,
                        'TIPO_PRO': json.data[i].TIPO_PRO,
                        'VENTA_CON_RECETA': labelreceta,
                        'PRECIO_VENTA_PRO': json.data[i].PRECIO_VENTA_PRO,
                        'PRECIO_PROMOCIONAL_PRO': json.data[i].PRECIO_PROMOCIONAL_PRO,
                        'UBICACION_PRO': json.data[i].UBICACION_PRO,
                        'ETIQUETAS_PRO': json.data[i].ETIQUETAS_PRO,
                        //'ESTADO_PRO' : labelEstado,
                        //'ACCIONES_PRO' : btnVerDetalles,
                        //'SELECCIONAR': checkbox
                    })
                }
                return return_data;
            }
        },
        "columns": [
            {
                className: 'details-control',
                defaultContent: '',
                data: null,
                orderable: false
            },
            { 'data': 'ID_PRO' },
            { 'data': 'IMAGEN_PRO' },
            { 'data': 'NOMBRE_PRO' },
            { 'data': 'DESCRIPCION_PRO' },
            { 'data': 'MARCA_PRO' },
            { 'data': 'CATEGORIA_PRO' },
            { 'data': 'PRESENTACION_PRO' },
            { 'data': 'LABORATORIO_PRO' },
            { 'data': 'STOCK_PRO' },
            { 'data': 'TIPO_PRO' },
            { 'data': 'VENTA_CON_RECETA' },
            { 'data': 'PRECIO_VENTA_PRO' },
            { 'data': 'PRECIO_PROMOCIONAL_PRO' },
            { 'data': 'UBICACION_PRO' },
            { 'data': 'ETIQUETAS_PRO' },
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
        "columnDefs": [
            { "visible": false, "targets": [15, 4, 6, 8, 10, 11] }
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


/** funcion retorna las demas etiquetas de los productos */
function format(data) {
    // var fila = "";
    //console.log(data);
    var filas = '';
    var paneles = "";
    //     var url = '/detallepedidos';
    //     axios.get(url,{
    //         params:{
    //             ID_PED:2
    //         }
    //     }).then(function (response) {
    //         console.log(response.data.data);
    //var longitud = Object.keys(data.ITEMS).length;
    //console.log(longitud);
    //for (var index = 0; index < longitud; index++) {
    var estilo = "";

    console.log(data.NOMBRE_PRO);
    filas = filas + '<tr>' +
        '<td style="border-top:none ;padding:0px" class="title">Descripción:</td>' +
        '<td style="border-top:none;padding:0px">' + data.DESCRIPCION_PRO + '</td>' +
        '<td style="border-top:none ;padding:0px" class="title">Tipo:</td>' +
        '<td style="border-top:none;padding:0px">' + data.TIPO_PRO + '</td>' +
        '</tr>' +
        '<tr >' +
        '<td style="border-top:none ;padding:0px" class="title">Marca:</td>' +
        '<td style="border-top:none;padding:0px">' + data.MARCA_PRO + '</td>' +
        '<td style="border-top:none ;padding:0px" class="title">Categoria:</td>' +
        '<td style="border-top:none;padding:0px">' + data.CATEGORIA_PRO + '</td>' +
        '</tr>  ' +

        '<tr>' +
        '<td style="border-top:none ;padding:0px" class="title">Laboratorio:</td>' +
        '<td style="border-top:none;padding:0px">' + data.LABORATORIO_PRO + '</td>' +
        '<td style="border-top:none ;padding:0px" class="title">Venta:</td>' +
        '<td style="border-top:none;padding:0px">' + data.VENTA_CON_RECETA + '</td>' +

        '</tr>' +
        '<td style="border-top:none ;padding:0px" class="title">Trata:</td>' +
        '<td style="border-top:none;padding:0px">' + data.ETIQUETAS_PRO + '</td>' +
        '</tr>';

    paneles +=
        '<div class="panel panel-primary">' +
        '<div class="panel-heading">Panel with panel-primary class</div>' +
        '<div class="panel-body">Panel Content</div>' +
        '</div>';
    // filas+=fila;


    //         return '<div class="details-container">'+
    //         '<table cellpadding="5" cellspacing="0" border="0" class="details-table">'+
    //             filas+
    //         '</table>'+
    //       '</div>';

    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    return '<div class="details-container">' +
        '<table cellpadding="5" cellspacing="0" border="0" class="details-table ">' +
        filas +
        '</table>' +
        '</div>';


}

/**
 * agrega el boton + a la tabla principal para mostrar los detalles 
 */
$('#table_busqueda tbody').on('click', 'td.details-control', function () {
    var tr = $(this).closest('tr'),
        row = tablaproductos.row(tr);

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
});

/** funcion que solo valida la cedula o ruc */
function onlyvalidarcedula() {
    var error_ruc = 0;
    var i;
    var cedula;
    var acumulado;
    cedula = document.formcl.CED_RUC_CLI.value;
    var instancia;
    acumulado = 0;
    for (i = 1; i <= 9; i++) {
        if (i % 2 != 0) {
            instancia = cedula.substring(i - 1, i) * 2;
            if (instancia > 9) instancia -= 9;
        }
        else instancia = cedula.substring(i - 1, i);
        acumulado += parseInt(instancia);
    }
    while (acumulado > 0)
        acumulado -= 10;
    if (cedula.substring(9, 10) != (acumulado * -1)) {
        $('#indruc').html('<span class="input-group-text"><span class="fa fa-times" style="color:red;"></span></span>');
        //alert("Cedula no valida!!");
        error_ruc = 0;

        document.formcl.CED_RUC_CLI.focus();
        // this.focused=true;
        //this.$refs.ruc.focus();
    } else {
        //datosCliente(cedula);
        $('#indruc').html('<span class="input-group-text"><span  class="fa fa-check" style="color:green;"></span></span>');
        //alert("Cedula valida !!");
        //this.focused=false;
        //this.ok=true;
        error_ruc = 1;
    }
    return error_ruc;
}

//tablaproductos.column(1).visible(false);

function validarcedula() {
    var i;
    var error_ruc = 0;
    var cedula;
    var acumulado;
    cedula = document.formfact.RUC.value;
    var instancia;
    acumulado = 0;
    for (i = 1; i <= 9; i++) {
        if (i % 2 != 0) {
            instancia = cedula.substring(i - 1, i) * 2;
            if (instancia > 9) instancia -= 9;
        }
        else instancia = cedula.substring(i - 1, i);
        acumulado += parseInt(instancia);
    }
    while (acumulado > 0)
        acumulado -= 10;
    if (cedula.substring(9, 10) != (acumulado * -1)) {
        $('#rucced').html('<span class="input-group-text"><span class="fa fa-times" style="color:red;"></span></span>');
        //alert("Cedula no valida!!");
        datosCliente(cedula);
        error_ruc = 0;

        document.formfact.RUC.focus();
        // this.focused=true;
        //this.$refs.ruc.focus();
    } else {
        if (datosCliente(cedula) == 0) {
            document.formcl.CED_RUC_CLI.value = cedula;
        }
        $('#rucced').html('<span class="input-group-text"><span  class="fa fa-check" style="color:green;"></span></span>');
        //alert("Cedula valida !!");
        //this.focused=false;
        //this.ok=true;
        error_ruc = 1;
    }
    return error_ruc;
}
/**
 * aperturar la caja, esto se realiza una solo vez al dia,
 * ingresa
 */
function aperturarCaja() {
    var resultado = 0;
    var parametros = {
        ID_CAJA: 1,
        ID_USER: 1
    };
    axios.get('/ventas/apertura', { params: parametros }).then(function (response) {
        //console.log(response.data);  
        if (response.data[0].resultado == 0) {
            toastr.warning('Debe pedir que se aperture la caja para poder empezar a facturar.!');
            resultado = 0;
        } else {
            toastr.success('Listo para trabajar, caja aperturada');
            resultado = 1;
        }

    })
        .catch(function (error) {
            toastr.error('Error en el servidor: ' + error, 'Error!');
        });
    return resultado;
}

/** datos factura */
function datosFac() {
    var parametros = {
        ID_USER: 1
    };
    axios.get('/ventas/cabecera', { params: parametros }).then(function (response) {
        //  console.log(response.data); 
        $('#imglogofac')
            .attr('src', response.data[0].LOGO_AGE);

        $('#rucfac').html('R.U.C ' + response.data[0].RUC_AGE);
        $('#numfac').html('001-00' + response.data[0].ID_AGE + '-00000###');
        $('#direccionfac').html('Dirección: ' + response.data[0].DIRECCION_AGE);
        $('#cajadesc').html(response.data[0].DESCRIPCION_CAJA);
        $('#idcaja').html(response.data[0].ID_CAJA);
        

    })
        .catch(function (error) {
            toastr.error('Error en el servidor: ' + error, 'Error!');
        });
}

function datosCliente(cedruc) {
    var respuesta = 0;
    var parametros = {
        CEDRUC: cedruc
    };
    axios.get('/ventas/cliente', { params: parametros }).then(function (response) {

        var midata = response.data;
        //console.log(midata[0].CORREO_CLI);

        //ID_CLI, CED_RUC_CLI, NOMBRE_CLI, APELLIDO_CLI, DIRECCION_CLI, TELEFONO_CLI, CORREO_CLI, ESTADO_CLI, FECHA_REG_CLI
        if (midata.length > 0) {
            var datos = '<h5 class="card-title" id="nombrescl">' + midata[0].NOMBRE_CLI + ' ' + midata[0].APELLIDO_CLI + '</h5>' +
                '<p class="card-text" id="cedcl">' + midata[0].CED_RUC_CLI + '</p>' +
                '<p class="card-text" id="correocl">' + midata[0].CORREO_CLI + '</p>' +
                '<p class="card-text" id="dirtel">' + midata[0].DIRECCION_CLI + ' // ' + midata[0].TELEFONO_CLI + '</p>' +
                '<p class="card-text" style="display:none;" id="id_cli">' + midata[0].ID_CLI + '</p>';;
            $('#carddatoscl').html(datos);
            respuesta = 1;

        } else {
            var btnVer = '<button type="button" data-toggle="modal" data-target="#modalnewCl" class="btn btn-info btn-sm"><span class="fa fa-plus"></span> Nuevo</button>';

            $('#carddatoscl').html('<p style="color:red;"> El cliente no existe, cree uno nuevo por favor.</p> <br>' + btnVer);
            respuesta = 0;
        }

        //}
    })
        .catch(function (error) {
            toastr.error('Error en el servidor: ' + error, 'Error!');
        });
    return respuesta;
}


// aperturarCaja();
datosFac();
validarcedula();

/** registro de un nuevo cliente  */

function validarDatos(opcion) {
    var error = 0;
    var errorMostrarMsj = [];
    if (!$('#CED_RUC_CLI').val().trim()) errorMostrarMsj.push("La cédula o RUC de cliente no puede estar vacío");
    if (!$('#NOMBRE_CLI').val().trim()) errorMostrarMsj.push("El nombre de cliente no puede estar vacío");
    if (!$('#APELLIDO_CLI').val().trim()) errorMostrarMsj.push("El apellido de cliente no puede estar vacío");
    if (!$('#DIRECCION_CLI').val().trim()) errorMostrarMsj.push("La dirección de cliente no puede estar vacío");
    if (!$('#TELEFONO_CLI').val().trim()) errorMostrarMsj.push("El teléfono de cliente no puede estar vacío");

    if (opcion == 2) //opcion para editar
    {
        if (!$('#id').val().trim()) errorMostrarMsj.push("Escoja un cliente existente de la tabla");
    }
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

function validarDatosCabeceraFac() {
    var error = 0;
    var table = document.getElementById('table_detalles');
    var errorMostrarMsj = [];
    if (!$('#RUC').val().trim()) errorMostrarMsj.push("La cédula o RUC de cliente no puede estar vacío.");
    // if(!$('#nombrescl').html().trim()) errorMostrarMsj.push("El nombre de cliente no puede estar vacío.");
    if (table.rows.length == 0) errorMostrarMsj.push("Debe ingresar al menos un item al detalle.");
    //if(!$('#dirtel').html().trim()) errorMostrarMsj.push("La dirección de cliente no puede estar vacío.");
    // if(aperturarCaja()==0) errorMostrarMsj.push("Debe solicitar que se aperture su caja para poder realizar la venta.")
    //if(!$('#TELEFONO_CLI').val().trim()) errorMostrarMsj.push("El teléfono de cliente no puede estar vacío");

    if (errorMostrarMsj.length) {
        $('#lstErroresFac').empty();
        error = 1;
        var lista = '';
        for (var i = 0; i < errorMostrarMsj.length; i++) {
            lista += '<li style="color: red !important">' + errorMostrarMsj[i] + '</li>';
        }
        $('#lstErroresFac').append(lista);
    }
    else {
        $('#lstErrores').empty();
    }
    return error;
}
/**
 * permite limpiar las entradas de texto
 */
function limpiarDatos() {
    $('#id').val('');
    $('#CED_RUC_CLI').val('');
    $('#NOMBRE_CLI').val('');
    $('#APELLIDO_CLI').val('');
    $('#DIRECCION_CLI').val('');
    $('#TELEFONO_CLI').val('');
    $('#CORREO_CLI').val('');
    $('#lstErrores').empty();
}

function productosSeleccionados() {
    try {
        var arrayproductos = new Array();

        var cont = 0;
        var table = document.getElementById('table_detalles');


        for (var i = 0, n = table.rows.length; i < n; i++) {
            var item = {};

            var arrayCodigosBarra = new Array();
            var cantidad = 0;
            var stringCodes = table.rows[i].cells[2].innerHTML;
            var res = stringCodes.split(",");

            //console.log(res);
            for (var j = 0; j < res.length; j++) {
                var subitem = {};
                subitem.CODE_BAR = res[j];
                arrayCodigosBarra.push(subitem);

            }
            //console.log(arrayCodigosBarra);
            item.BARCODES = arrayCodigosBarra;

            var id_prod = table.rows[i].cells[1].innerHTML;
            item.ID_PRO = id_prod;
            //var nameinput= table.rows[i].cells[4].getElementsByTagName("input")[0].tagName;
            var nameinput = table.rows[i].cells[4].children.length;

            // alert(nameinput);
            if (nameinput > 0) {
                cantidad = table.rows[i].cells[4].getElementsByTagName("input")[0].value;

            } else {
                cantidad = table.rows[i].cells[4].innerHTML;
            }
            item.CANTIDAD = cantidad;
            item.PRECIO_VENTA = table.rows[i].cells[5].innerHTML;
            item.AHORRO = table.rows[i].cells[8].innerHTML;
            item.SUBTOTAL = table.rows[i].cells[9].innerHTML;
            arrayproductos.push(item);

            /* if(cantidad==undefined){
              //cantidad=table.rows[i].cells[4].getElementsByTagName("input")[0].value;
              }*/

        }
    } catch (error) {
        console.log(error);
    }
    //console.log(arrayproductos);  
    // alert(arrayproductos);
    return arrayproductos;
}
/** funcion para registrar una venta */
function registrarVenta() {
    if (this.validarDatosCabeceraFac()) {
        return;
    }
    var url = 'ventas/registrar';
    var data = new FormData();

    data.append('detalles', JSON.stringify(productosSeleccionados()));
   // data.append('ID_USU', 1);
    data.append('ID_CLI', $('#id_cli').html());
    data.append('TOTAL_VEN', $('#total').html());
    data.append('SUBT_IVA', $('#tar12').html());
    data.append('SUBT_CERO', $('#tar0').html());
    data.append('IVA_VEN', $('#valoriva').html());
    data.append('TOTAL_DESC', $('#descfac').html());
    data.append('ID_CAJA', $('#idcaja').html());
    

    axios.post(url, data).then(function (response) {

        //console.log(response.data.result);   
        //console.log(response.data.detalles); 
        //console.log(response.data.miventa);
        if (response.data.result > 0) {
            toastr.success('Se ingreso la venta. Puede continuar con el proceso.');
            bloquearControles();

            tablaproductos.ajax.reload();
            crearFactura(response.data.miventa, response.data.detalles);
            vistaPreviaImprimir();

        } else {
            toastr.error('Los datos ingresados son erroneos, Intentente nuevamente', 'Error!');
        }

    }).catch(function (error) {
        console.log(error);
        toastr.error('No se ha podido guardar la venta.', 'Error!');
    });
}
/**
 * permite registrar un cliente
 */
function registrar() {
    if (this.validarDatos(1)) {

        return;
    }
     $('#btnGuardar').attr("data-dismiss","modal");
    axios.post('/clientes/registrar', {
        'CED_RUC_CLI': $('#CED_RUC_CLI').val().trim(),
        'NOMBRE_CLI': $('#NOMBRE_CLI').val().trim(),
        'APELLIDO_CLI': $('#APELLIDO_CLI').val().trim(),
        'DIRECCION_CLI': $('#DIRECCION_CLI').val().trim(),
        'TELEFONO_CLI': $('#TELEFONO_CLI').val().trim(),
        'CORREO_CLI': $('#CORREO_CLI').val().trim()
    }).then(function (response) {
        // tabla.ajax.reload();
        validarcedula();
        limpiarDatos();
        //$('#btncerrar').click();
        toastr.success('Registrado correctamente!, continue facturando');
        //$('#btnGuardar').attr("data-dismiss","modal");
        //$('#btnGuardar').modal('hide');
        //jQuery('#modalnewCl').modal('toggle');
        //$('.close').click(); 
        //$('#modalnewCl').hide();
       // $('#modalnewCl').attr("aria-hidden","true");
        //$('.modal-backdrop').hide();
       
    })
        .catch(function (error) {
            console.log(error);
           // $('#btnGuardar').attr("data-dismiss","");
            toastr.error('No se ha podido guardar el registro.', 'Error!')
        });
        
}

/** funcion enable controles, finalizar venta */

function finalizarVenta() {
    var formulariofac = document.getElementById("formfac");
    for (var i = 0; i < formulariofac.elements.length; i++) {

        if (formulariofac.elements[i].tagName == "INPUT") {
            formulariofac.elements[i].readOnly = false;
        }
    }
    document.getElementById("btndelete").disabled = false;
    document.getElementById("table_detalles").innerHTML = "";
    recalcularTotales();
    $('#lstErroresFac').empty();
    document.getElementById("btnGuardarVenta").style.display = "block";
    document.getElementById("btnImprimirVenta").style.display = "none";
    document.getElementById("btnfinalizarVenta").style.display = "none";
    document.getElementById("recibe").value = "";
    totalArticulosVendidos();
}

/** funcion para crear la factura  */
function crearFactura(miventa, misdetalles) {
    var conten = document.getElementById("ridefac");
    var numcomprobante = document.getElementById("numfac").innerHTML;
    var nuevocomp = numcomprobante.replace('###', miventa[0].NUMERO_COM);

    var contenido = '<div class="card" style="width: 20rem;">' +
        '<div class="card-body">' +
        '<div><center> <b> FARMACIA COMUNITARIA PUYO </b></center> </div>' +
        ' <center><div>' + document.getElementById("rucfac").innerHTML + ' </div>  </center>' +
        ' <center><div>' + document.getElementById("direccionfac").innerHTML + ' </div>  </center>' +
        '<div id="numfac">FACTURA: ' + nuevocomp + '</div>' +
        '<div>Fecha: ' + miventa[0].FECHA_VEN + '   Codigo: ' + miventa[0].ID_VEN + '</div>' +
        '<div>Ruc/Ci: ' + document.getElementById("RUC").value + '</div>' +
        '<div>Cliente:<b> ' + document.getElementById("nombrescl").innerHTML + '</b></div>' +
        '<div>Dirección:' + document.getElementById("dirtel").innerHTML + '</div>' +
        '<table class="table table-sm">' +
        '<tr style="font-size: smaller;">' +
        '<th>Descripción</th>' +
        '<th>Cantidad</th>' +
        '<th>Pre.Uni</th>' +
        '<th>Pre.Total</th>' +
        '</tr> <tbody>';
    //ID_DET_VEN, ID_PRO, ID_VEN, CANTIDAD_PRO, PRECIO_VEN, AHORRO, SUBTOTAL, DESCRIPCION_PRO
    for (let i = 0; i < misdetalles.length; i++) {
        var fila = '<tr style="font-size: smaller;">' +
            '<td>' + misdetalles[i].DESCRIPCION_PRO + '</td>' +
            '<td>' + misdetalles[i].CANTIDAD_PRO + '</td>' +
            '<td>' + misdetalles[i].PRECIO_VEN + '</td>' +
            '<td>' + misdetalles[i].SUBTOTAL + '</td>' +
            '</tr>';
        contenido += fila;

    }

    contenido += '</tbody>' +
        '</table>' +
        '<table class="table table-sm" style="font-size: smaller;">' +
        '<tr>' +
        '    <td class="datosv">Valor</td>' +
        '<td class="datosv">' + document.getElementById("valorfac").innerHTML + '</td>' +
        '</tr>' +
        '<tr>' +

        '<td class="datosv">Descuentos</td>' +
        '<td class="datosv">' + document.getElementById("descfac").innerHTML + '</td>' +
        '</tr>' +
        '<tr>' +

        '<td class="datosv">Subtotal</td>' +
        '<td class="datosv">' + document.getElementById("subsubtotal").innerHTML + '</td>' +
        '</tr>' +
        '<tr>' +

        '<td class="datosv">tarifa '+ toFixedTrunc(iva*100,0)+'%</td>' +
        '<td class="datosv">' + document.getElementById("tar12").innerHTML + '</td>' +
        '</tr>' +

        '<tr>' +

        '<td class="datosv">Tarifa 0%</td>' +
        '<td class="datosv">' + document.getElementById("tar0").innerHTML + '</td>' +
        '</tr>' +
        '<tr>' +

        '<td class="datosv">IVA</td>' +
        ' <td class="datosv">' + document.getElementById("valoriva").innerHTML + '</td>' +
        '</tr>' +
        ' <tr>' +

        '<th>TOTAL</th>' +
        '<th>' + document.getElementById("total").innerHTML + '</th>' +
        '</tr>' +
        ' </table>' +
        ' <hr>' +
        '<div class="datosv" style="font-size: smaller;">Paga con:' + document.getElementById("recibe").value + ' '+ document.getElementById("cambio").innerHTML +' </div>' +
        '<div class="datosv" style="font-size: smaller;">Atendido por:' + document.getElementById("h6UserName").innerHTML + ' </div>' +
        ' <div class="datosv" style="font-size: smaller;">' + document.getElementById("cajadesc").innerHTML + '</div>' +
        ' <div class="datosv" style="font-size: smaller;">Total de articulos vendidos:' + totalArticulosVendidos() + '</div> ' +
        '</div>' +
        '</div>';
    document.getElementById("ridefac").innerHTML = contenido;
}
/** funcion para imprimir la factura */
function vistaPreviaImprimir() {
    var elem = "ridefac";
    var context = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
    var url = window.location.protocol + "//" + window.location.host + context;
    var mywindow = window.open();
    var css = "";
    var myStylesLocation = url + "/assets/css/bootstrap.min.css";
    $.ajax({
        url: myStylesLocation,
        type: "POST",
        async: false
    }).done(function (data) {
        css += data;
    })
    // mywindow.document.write('<html><head><title>Pedidos</title>');
    mywindow.document.write('<style type="text/css">' + css + ' </style>');
    mywindow.document.write('</head><body >');
    // mywindow.document.write('<h1>' + 'Pedido: '+$('#lblID_PED').text() + '</h1>');
    var contenido = document.getElementById(elem).innerHTML;
    var $html = $('<div />', { html: contenido });
    //$html.find('button#btnPreview').hide();
    //$html.find('button#btnSendMail').hide();
    // $html.find('table#tabla-detalle>thead').attr('style','color:black;background:rgb(84, 110, 122);');
    mywindow.document.write($html.html());
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();
    return true;
}
/** funcion para calcular el total de articulos vendidos */
function totalArticulosVendidos() {
    var cantidades = 0;
    var table = document.getElementById('table_detalles');
    for (var i = 0, n = table.rows.length; i < n; i++) {
        var has_input = table.rows[i].cells[4].children.length;
        if (has_input > 0) {
            var cantidad = table.rows[i].cells[4].getElementsByTagName("input")[0].value;
            cantidad = toFixedTrunc(cantidad, 2);
            cantidades += cantidad * 1;
        } else {
            var cantidad = table.rows[i].cells[4].innerHTML;
            cantidad = toFixedTrunc(cantidad, 2);
            cantidades += cantidad * 1;
        }
    }
    //document.getElementById("articuloscount").innerHTML=cantidades*1; 
    return cantidades * 1;
}
/********************************************* detalles de la factura  ***/
// verificarEjemplar();


function verificarEjemplar() {
    // codigosBar=[];
    try {
        var codigobar = document.getElementById('barcode').value;
        console.log(codigobar)
        var parametros = {
            CODEBAR: codigobar
        };
        axios.get('/ventas/ejemplares', { params: parametros }).then(function (response) {
            //console.log(response.data);
            var datin = response.data;



            if (VerificarProdExiste(datin) == 0) {
                addRow(datin);
            }

            //addRow(datin);
            /** hay que agregar los codigos de barra a borrar de los ejemplares, validar si es capsulas o pastillas, ya que el codigo no se eliminara hasta que el*/
            // codigosBar.push(codigobar);
            document.getElementById('barcode').value = "";
            document.getElementById('barcode').focus;


        })
            .catch(function (error) {
                toastr.error('El ejemplar no esta registrado en la base de datos. Registre y pruebe nuevamente', 'Error!');
                console.log(error);
            });
    } catch (error) {

    }

    //return misdatos;
}

function verificaCodigoRepetido(datos) {
    var existe = 0;
    var cont = 0;
    var table = document.getElementById('table_detalles');
    for (var i = 0, n = table.rows.length; i < n; i++) {
        var id_prod = table.rows[i].cells[1].innerHTML;
        if (datos.data[0].ID_PRO == id_prod) {
            cont = cont + 1;
            var stringCodes = table.rows[i].cells[2].innerHTML;
            var res = stringCodes.split(",");
            //  alert(res);
            for (var j = 0; j < res.length; j++) {
                // alert(res.length);
                // alert(res[j]);
                if (res[j] == datos.data[0].COD_BARRAS_EJM) {
                    toastr.error('El item ya esta ingresado!');
                    existe = 1;
                    break;
                } else {

                    existe = 0;

                }
            }

            break;
        } else {
            existe = 0;


        }
    }
    // alert("existe= "+existe)
    return existe;
}

/** v-bind:style="[cabecera=='Código'?{'display':'none'}:{}]" */
/*** agrega un item al detalle de la factura */

function addRow(datos) {
    var arraycodigos = new Array();
    var existe = 0;
    var cont = 0;
    var table = document.getElementById('table_detalles');
    console.log("agregando fila " + datos.data[0].DESCRIPCION_PRO);
    var table = document.getElementById("table_detalles");

    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(0);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:

    for (var i = 0; i < 10; i++) {
        var cell = row.insertCell(i);

        switch (i) {
            case 0:
                cell.innerHTML = '<button type="button" id="btndelete" name="btndelete" class="btn btn-danger btn-sm" title="Borrar item" onclick = "deleteRow(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>';
                break;
            case 1:
                cell.innerHTML = datos.data[0].ID_PRO;
                break;
            case 2:
                cell.style = "display:none;";
                cell.innerHTML = datos.data[0].COD_BARRAS_EJM;

                break;

            case 3:
                cell.innerHTML = datos.data[0].DESCRIPCION_PRO;
                break;

            case 4:

                // cell.innerHTML=toFixedTrunc(1,2);
                if (datos.data[0].CANT_EDIT>0)
                    cell.innerHTML = '<input class="form-control form-control-sm" required type="number" placeholder="" min="1.00" max="' + datos.data[0].STOCK_PRO + '" step="1.00" value="1.00" onchange="recalcularFila(' + datos.data[0].ID_PRO + ');" pattern="^[0-9]+"></input>';
                else
                    //cell.name="simpecant"; 
                    cell.innerHTML = 1;
                break;

            case 5:

                cell.innerHTML = toFixedTrunc(datos.data[0].PRECIO_VENTA_PRO, 2);
                break;
            case 6:
                if (datos.data[0].APLICA_IVA_PRO == 1)
                    cell.innerHTML = '<span class="badge badge-success">Si</span>';
                else
                    cell.innerHTML = '<span class="badge badge-danger">No</span>';
                break;
            case 7:
                cell.style = "display:none;";
                cell.innerHTML = toFixedTrunc(datos.data[0].PRECIO_PROMOCIONAL_PRO * 1, 2);
                break;
            case 8:
                cell.innerHTML = toFixedTrunc(datos.data[0].PRECIO_VENTA_PRO - datos.data[0].PRECIO_PROMOCIONAL_PRO, 2);
                break;

            case 9:
                cell.innerHTML = toFixedTrunc(datos.data[0].PRECIO_VENTA_PRO * 1, 2);
                break;
            default:
                break;
        }

    }
    // var cell1 = row.insertCell(0);
    // var cell2 = row.insertCell(1);
    //recalculartotales 
    recalcularTotales();
    //totalArticulosVendidos();
    // Add some text to the new cells:
    // cell1.innerHTML = "NEW CELL1";
    // cell2.innerHTML = "NEW CELL2";
}

function deleteRow(row) {
    var d = row.parentNode.parentNode.rowIndex - 1;
    document.getElementById('table_detalles').deleteRow(d);
    toastr.warning('Se elimino un item.! ');
    recalcularTotales();
    //totalArticulosVendidos();
}

/** funcion retorna un array con los id_pro agregado */
function VerificarProdExiste(datos) {

    if (verificaCodigoRepetido(datos) == 0) {
        // var arraycodigos = new Array();
        var existe = 0;
        var cont = 0;
        var table = document.getElementById('table_detalles');
        //checkboxes = document.getElementsByName('sld');


        for (var i = 0, n = table.rows.length; i < n; i++) {
            var id_prod = table.rows[i].cells[1].innerHTML;
            if (datos.data[0].ID_PRO == id_prod) {
                cont = cont + 1;
                if (datos.data[0].CANT_EDIT > 0 ) {
                    var cantidad = table.rows[i].cells[4].getElementsByTagName("input")[0].value;
                    cantidad = toFixedTrunc(cantidad, 2);
                    document.getElementById("table_detalles").rows[i].cells[4].getElementsByTagName("input")[0].value = toFixedTrunc(cantidad * 1 + 1, 2);
                } else {
                    var cantidad = table.rows[i].cells[4].innerHTML;
                    cantidad = toFixedTrunc(cantidad, 2);
                    document.getElementById("table_detalles").rows[i].cells[4].innerHTML = toFixedTrunc(cantidad * 1 + 1, 2);
                }
                var p_uni = table.rows[i].cells[5].innerHTML;
                p_uni = toFixedTrunc(p_uni, 2);
                // var codigos=table.rows[i].cells[2].innerHTML;
                // alert(cantidad ++1);
                //alert(p_uni*(cantidad*1+1));
                // var td = document.getElementById("table_detalles").rows[i].cells[3];style="display: none;"
                document.getElementById("table_detalles").rows[i].cells[2].append("," + datos.data[0].COD_BARRAS_EJM);


                var preciopromo = table.rows[i].cells[7].innerHTML;
                preciopromo = toFixedTrunc(preciopromo, 2);
                //alert(p_uni);
                // alert(toFixedTrunc(p_uni*(cantidad*1),2));
                document.getElementById("table_detalles").rows[i].cells[8].innerHTML = toFixedTrunc(p_uni * (cantidad * 1 + 1) - preciopromo * (cantidad * 1 + 1), 2);


                // alert(table.rows[i].cells[4].getElementsByTagName("input")[0].value);


                // var inputs = table.rows.item(i).getElementsByTagName("input");
                // inputs[i].value=toFixedTrunc(cantidad*1+1,2);

                document.getElementById("table_detalles").rows[i].cells[9].innerHTML = toFixedTrunc(p_uni * (cantidad * 1 + 1), 2);
                /* var item={};
                 item.ID_PRO=id_prod;
                 arrayproductos.push(item);
                 */
                toastr.success(datos.data[0].DESCRIPCION_PRO + ' agregado!');
                //recualcular totales
                recalcularTotales();
                existe = 1;
                break;
            } else {
                existe = 0;

                recalcularTotales();
            }
        }
    }

    return existe;
    // alert(arrayproductos);
    // return arrayproductos;
}

/** función para truncar los valores */
function toFixedTrunc(value, n) {
    const v = value.toString().split('.');
    if (n <= 0) return v[0];
    let f = v[1] || '';
    if (f.length > n) return `${v[0]}.${f.substr(0, n)}`;
    while (f.length < n) f += '0';
    return `${v[0]}.${f}`
}
/** recalcula el subtotal de la fila */
function recalcularFila(myid) {
    var table = document.getElementById('table_detalles');
    for (var i = 0, n = table.rows.length; i < n; i++) {
        var id_prod = table.rows[i].cells[1].innerHTML;
        var has_input = table.rows[i].cells[4].children.length;
        if (id_prod == myid) {
            if (has_input > 0) {
                var cantidad = table.rows[i].cells[4].getElementsByTagName("input")[0].value;
                cantidad = toFixedTrunc(cantidad, 2);
            } else {
                var cantidad = table.rows[i].cells[4].innerHTML;
                cantidad = toFixedTrunc(cantidad, 2);
            }

            //   alert(cantidad);

            var p_uni = table.rows[i].cells[5].innerHTML;
            p_uni = toFixedTrunc(p_uni, 2);
            /** */
            var preciopromo = table.rows[i].cells[7].innerHTML;
            preciopromo = toFixedTrunc(preciopromo, 2);
            //alert(p_uni);
            // alert(toFixedTrunc(p_uni*(cantidad*1),2));
            document.getElementById("table_detalles").rows[i].cells[8].innerHTML = toFixedTrunc(p_uni * (cantidad * 1) - preciopromo * (cantidad * 1), 2);
            document.getElementById("table_detalles").rows[i].cells[9].innerHTML = toFixedTrunc(p_uni * (cantidad * 1), 2);
            recalcularTotales();
            //totalArticulosVendidos();
            break;
        }
    }

}
function recalcularTotales() {
    var table = document.getElementById('table_detalles');
    var valor_total = 0;
    var subtotaliva = 0;
    var subtotalcero = 0;
    var descuentos = 0;
    for (var i = 0, n = table.rows.length; i < n; i++) {
        var totalfila = table.rows[i].cells[9].innerHTML;
        var ahorro = table.rows[i].cells[8].innerHTML;
        descuentos += toFixedTrunc(ahorro, 2) * 1;
        //alert(totalfila);
        valor_total += toFixedTrunc(totalfila, 2) * 1;
        var aplicaiva = table.rows[i].cells[6].getElementsByTagName("span")[0].innerHTML;
        if (aplicaiva == "Si")
            subtotaliva += toFixedTrunc(totalfila - ahorro, 2) * 1;
        else
            subtotalcero += toFixedTrunc(totalfila - ahorro, 2) * 1;
    }
    document.getElementById("valorfac").innerHTML = toFixedTrunc(valor_total, 2);
    document.getElementById("tar12").innerHTML = toFixedTrunc(subtotaliva, 2);
    document.getElementById("tar0").innerHTML = toFixedTrunc(subtotalcero, 2);
    document.getElementById("descfac").innerHTML = toFixedTrunc(descuentos, 2);
    document.getElementById("subsubtotal").innerHTML = toFixedTrunc(valor_total - descuentos, 2);
    document.getElementById("valoriva").innerHTML = toFixedTrunc(subtotaliva * iva, 2);
    document.getElementById("total").innerHTML = toFixedTrunc(subtotaliva * 1 + subtotalcero * 1 + subtotaliva * iva, 2);

}
/** calcular el cambio */
function calculaCambio(valor) {
    try {
        //alert(valor);
        var total = document.getElementById("total").innerHTML;
        document.getElementById("cambio").innerHTML = 'Cambio: <b>' + toFixedTrunc(valor - total, 2) + '</b>';
    } catch (error) {
        toastr.warning("No se puede efectuar la operación.!");
        console.log(error);

    }


}
/**bloquear los botones imprimir y finalizar */
document.getElementById("btnImprimirVenta").style.display = "none";
document.getElementById("btnfinalizarVenta").style.display = "none";
/**funcion bloquear cuando se ingrese una venta los controles **/

function bloquearControles() {
    var formulariofac = document.getElementById("formfac");
    for (var i = 0; i < formulariofac.elements.length; i++) {

        if (formulariofac.elements[i].tagName == "INPUT") {
            formulariofac.elements[i].readOnly = true;
        }
    }
    /** DISABLED BUTON DELETE ITEM */
    var elems = document.getElementsByName("btndelete");
console.log(elems);
for(var i = 0; i < elems.length; i++) {
  elems[i].disabled = true;
}

   // document.getElementById("btndelete").disabled = true;
    document.getElementById("btnGuardarVenta").style.display = "none";
    document.getElementById("btnImprimirVenta").style.display = "inline";
    document.getElementById("btnfinalizarVenta").style.display = "inline";
    $('#lstErroresFac').empty();
    document.getElementById("ridefac").innerHTML = "";
   
}

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
           document.getElementById("etiva").innerHTML="Tarifa "+toFixedTrunc( iva*100,0)+"%";
        },
        beforeSend: function () { },
        error: function (objXMLHttpRequest) { }
    });
}
getSetting('iva');
$('.table').attr('style','width:100%');