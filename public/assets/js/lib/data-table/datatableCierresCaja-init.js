/**
 * FUNCIONES PARA LA GESTIÓN DE CIERRES DE CAJA
 */
var denominaciones = [];
var inputCantidades = [];
var inputTotales = [];
var labelDenominaciones = [];
var subtotalesCalculados = [];
var ID_CCJ,ID_USU;ID_CCJ=ID_USU=0;
 /**
 * Permite obtener el total contado
 */
function getTotales() {
    var total = 0;
    for (var index = 0; index < denominaciones.length; index++) {
        try {
            var value = parseFloat($('#' + index + 'total').val());
            if (isNaN(value)) value = 0;
            total += value;
        } catch (error) {
            console.log("aperturaCaja.getTotales: " + error);
        }
    }
    $('#totalContado').val(total.toFixed(2));
}

 /**
 * Permite obtener las denominaciones de dinero
 */
function getDenominacionesDinero() {
    var indice = 0;
    $.getJSON('/denominacionDinero', function (data) {
        $.each(data.data, function (key, entry) {
            denominaciones.push(entry.VALOR_DEN);
            $('#divCantidades').append('<input type="text" id="' + indice + '" name="' + indice + '" maxlength="13" class="form-control entero cant text-center" placeholder="0">');
            $('#divTotales').append('<input type="text" disabled id="' + indice + 'total" maxlength="13" class="form-control decimal total text-center" value="0.00" placeholder="0.00">');
            $('#divDenominaciones').append('<label class="lblDenominacion den">x $ ' + entry.VALOR_DEN + ' </label><br>');
            $('#formDenominaciones').on('keyup', '#' + indice, function () {

                var currentValue = parseInt($(this).val());
                var currentName = $(this).attr('name');
                var subtotal = denominaciones[currentName] * currentValue;
                if (isNaN(subtotal)) subtotal = 0;
                $('#' + currentName + "total").val(parseFloat(subtotal).toFixed(2));
                getTotales();
            });
            //validar solo números enteros
            $('#formDenominaciones').on('keydown', '#' + indice, function (e) {
                -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) || (/65|67|86|88/.test(e.keyCode) && (e.ctrlKey === true || e.metaKey === true)) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
            });
            indice++;
        })
    });
}

/**
 * Permite obtener la diferencia entre lo contado y lo calculado
 */
function getDiferencia() {
    var valorContado = $('#CONTADO').val();
    if (!valorContado) valorContado = 0.00;

    var valorCalculado = $('#CALCULADO').val();
    if (!valorCalculado) valorCalculado = 0.00;

    var diferencia = valorContado - valorCalculado;
    console.log(valorContado + " : " + valorCalculado);
    var valorDiferencia = Math.round(diferencia * 100) / 100
    $('#DIFERENCIA').val(valorDiferencia);
    if (valorDiferencia == 0)
        $('#DIFERENCIA').attr('style', 'color:blue');
    else
        $('#DIFERENCIA').attr('style', 'color:red');
}

/**
 * Permite obtener las cajas disponibles para cierre
 */
function getCajasParaCierre()
{
    var ddlCaja = $('#ddlCaja');
      $.getJSON('/cajasParaCierre', function (data) {
        ddlCaja.append($('<option></option>').attr('value', '0').text('--Seleccione caja--'));
          $.each(data.data, function (key, entry) {
            var datos = entry.ID_USU+'_'+entry.ID_CCJ;
            ddlCaja.append($('<option></option>').attr('value', datos).text(entry.CAJA));
          })
    });
}

/**
 * Permite obtener los detalles de un cierre de caja
 * @param {int} idRegistro -identificador de cierre de caja
 */
function getCierreCajaById(idRegistro) {
    var url = '/cierreCajas/byid';
    axios.get(url, {
        params: {
            ID_CCJ: idRegistro
        }
    }).then(function (response) {
        var longitud = Object.keys(response.data.data).length;
        if (longitud > 0) {
            $('#lblID_CCJ').text(response.data.data[0].ID_CCJ);
            $('#lblFECHA_CCJ').text(response.data.data[0].FECHA_CIERRE_CCJ);
            $('#lblCAJA_CCJ').text(response.data.data[0].CAJA);
            $('#lblRESPONSABLE_CCJ').text(response.data.data[0].NOMBRE_USU+' '+response.data.data[0].APELLIDO_USU);
            $('#lblINICIAL_CCJ').text(response.data.data[0].DEPOSITO);
            $('#lblCONTADO_CCJ').text(response.data.data[0].CONTADO_CCJ);
            $('#lblCALCULADO_CCJ').text(response.data.data[0].CALCULADO_CCJ);
            $('#lblDIFERENCIA_CCJ').text(response.data.data[0].DIFERENCIA_CCJ);
            $('#lblRETIRADO_CCJ').text(response.data.data[0].RETIRO_CCJ);

            var diferencia = response.data.data[0].DIFERENCIA_CCJ;
            $('#DIFERENCIA_CCJ').text(diferencia);
            if (diferencia < 0) {          
                $('#DIFERENCIA_CCJ').prop('class', 'badge badge-danger');
            }
            else {
                $('#DIFERENCIA_CCJ').prop('class', '');
            }
        }
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
 * @param {int} idRegistro -identificador de cierre de caja
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
                getCierreCajaById(idRegistro);
                break;
            }
    }
}

/**
 * Permite realizar el corte/cierre de caja
 */
function corteDeCaja()
{
    var CONTADO = $('#CONTADO').val().trim(); if(!CONTADO) CONTADO=0;
    var CALCULADO = $('#CALCULADO').val().trim(); if(!CALCULADO) CALCULADO = 0;
    var DIFERENCIA = $('#DIFERENCIA').val().trim(); if(!DIFERENCIA) DIFERENCIA = 0;
    var RETIRADO = $('#RETIRADO').val().trim(); if(!RETIRADO) RETIRADO = 0;
    if(ID_CCJ==0 && ID_USU==0)
    {
        toastr.warning('Seleccione una caja para el cierre!','Incompleto')
        return;
    }
    axios.post('/cierreCaja/actualizar', {
        'ID_CCJ': ID_CCJ,
        'CONTADO_CCJ': CONTADO,
        'CALCULADO_CCJ': CALCULADO,
        'DIFERENCIA_CCJ':DIFERENCIA,
        'RETIRO_CCJ': RETIRADO
    }).then(function (response) {
        toastr.success('Se realizó el corte de caja correctamente!');
        $('#ddlCaja')[0].options.length = 0;
        getCajasParaCierre();
        ID_CCJ=ID_USU=0;
        $('#CALCULADO').val("0");
        $('#RETIRADO').val("0");
        $('#DIFERENCIA').val("0");
    })
        .catch(function (error) {
            console.log(error);
            toastr.error('No se ha podido realizar el corte de caja.', 'Error!');
    });
}

/**
 * Permite obtener el total de ventas realizadas por un usuario
 */
function getTotalVentasPorUsuario() {
    var url = '/cierreCaja/ventasPorUsuario';
    axios.get(url, { params: { ID_USU: ID_USU } }).then(function (response) {
        $('#CALCULADO').val(response.data);
        $('#RETIRADO').val(response.data);
        getDiferencia();
    })
        .catch(function (error) {
            console.log(error);
        });
}

$('#ddlCaja').change(function () {
        var datos = $(this).val();
        var items = datos.split('_');
        ID_CCJ=ID_USU=0;
        try {
            ID_USU = parseInt(items[0]);
            ID_CCJ = parseInt(items[items.length-1]);
        } catch (error) {
            console.log('Error al leer datos para cierre de caja');
        }
        
        if(ID_CCJ>0 && ID_USU>0)
        {
            getTotalVentasPorUsuario();
        }    
        else
        {
            $('#CALCULADO').val("0");
            $('#RETIRADO').val("0");
            $('#DIFERENCIA').val("0");
        }
       
});

//----------------------------------INICIALIZACIÓN DE MÉTODOS-------------------------
getDenominacionesDinero();

getCajasParaCierre();






$('#btnCancelarActualizar').hide();
//tab activo por defecto
cambiarTab(0, 0);

$('#btnCorteCaja').click(function () {
   corteDeCaja();
});

$('#btnOK').click(function () {
    toastr.success('Contado correctamente!');
    var contado = parseFloat($('#totalContado').val());
    if (!contado) contado = 0.00;
    $('#CONTADO').val(contado);
    getDiferencia();
});

$('.inputcaja').keyup(function () {
    getDiferencia();
});

//configuración inicial para tabla listado de CIERRES DE CAJA
var tablaPedidos = $('#tabla-listado').DataTable(
    {
        'ajax': {
            "type": "GET",
            "url": "cierreCajas",
            "dataSrc": function (json) {
                var return_data = new Array();
                var buttons = '';
                var btn = '';
                var labelDiferencia = '';
                for (var i = 0; i < json.data.length; i++) {
                    var ID_CCJ = json.data[i].ID_CCJ;
                    var diferencia = json.data[i].DIFERENCIA_CCJ;

                    if (diferencia < 0) {
                        labelDiferencia = '<span  class="badge badge-danger">'+diferencia+'</span>';                   
                    }
                    else {
                        labelDiferencia = diferencia;
                    }
                    var btnVerDetalles = '<button type="button" onclick="cambiarTab(1,' + ID_CCJ + ');" class="btn btn-info"><span class="fa fa-info-circle"></span> Detalles</button>';
                    buttons = '<div class="btn-group btn-group-sm">' + btnVerDetalles  + '</div>';
                    return_data.push({
                        'ID_CCJ': json.data[i].ID_CCJ,
                        'CAJA': json.data[i].CAJA,
                        'FECHA': json.data[i].FECHA_CIERRE_CCJ,
                        'RESPONSABLE': json.data[i].NOMBRE_USU+' '+json.data[i].APELLIDO_USU,
                        'CONTADO_CCJ': json.data[i].CONTADO_CCJ,
                        'CALCULADO_CCJ': json.data[i].CALCULADO_CCJ,
                        'DIFERENCIA_CCJ': labelDiferencia,
                        'ACCIONES_CCJ': buttons
                    })
                }
                return return_data;
            }
        },
        "columns": [
            { 'data': 'ID_CCJ' },
            { 'data': 'CAJA' },
            { 'data': 'FECHA' },
            { 'data': 'RESPONSABLE' },
            { 'data': 'CONTADO_CCJ' },
            { 'data': 'CALCULADO_CCJ' },
            { 'data': 'DIFERENCIA_CCJ' },
            { 'data': 'ACCIONES_CCJ' }
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
$('.table').attr('style','width:100%');


//$("#ddlCaja option").remove();
