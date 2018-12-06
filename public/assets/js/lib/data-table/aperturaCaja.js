/**
 * FUNCIONES PARA APERTURA DE CAJA
 */
var denominaciones = [];
var inputCantidades = [];
var inputTotales = [];
var labelDenominaciones = [];
var subtotalesCalculados = [];
var ID_USU = 0;
var ID_CCJ = 0;
try {
    ID_USU = parseInt($('#idUsuario').val()); 
    console.log("current userID: "+ID_USU);
} catch (error) {
    
}

/**
 * Permite obtener las agencias registradas y cargarlas
 * en el control de tipo select
 */
function getAgencias() {
    var ddlAgencia = $('#ddlAgencia');
    $.getJSON('/agencias', function (data) {
        ddlAgencia.append($('<option></option>').attr('value', '0').text('--Seleccione agencia--'));
        $.each(data.data, function (key, entry) {
            if (entry.ESTADO_AGE > 0)
                ddlAgencia.append($('<option></option>').attr('value', entry.ID_AGE).text(entry.NOMBRE_AGE + " - " + entry.DIRECCION_AGE));
        })
    });
}

/**
 * Permite obtener las cajas correspondiente a una agencia en especifico
 * @param {int} idAgencia  --identificador de agencia
 */
function getCajasByAgencia(idAgencia) {
    var ddlCajas = $('#ddlCajas');
    $.getJSON('/cajasParaAbrir', function (data) {
        ddlCajas.append($('<option></option>').attr('value', '0').text('--Seleccione caja--'));
        $.each(data.data, function (key, entry) {
            if (entry.ID_AGE == idAgencia && entry.DISPONIBLE_ABRIR == 0) {
                ddlCajas.append($('<option></option>').attr('value', entry.ID_CAJA).text(entry.DESCRIPCION_CAJA));
            }
        })
    });
}

/**
 * Permite validar que los datos de entrada no esten vacíos (para apertura caja)
 */
function validarDatos() {
    var error = 0;
    var errorMostrarMsj = [];
    var DEPOSITO = $('#DEPOSITO').val().trim();
    var AGENCIA = $('#ddlAgencia option:selected').val();
    var CAJA = $('#ddlCajas option:selected').val();
    if (!DEPOSITO) DEPOSITO = 0;
    if (!AGENCIA || AGENCIA == 0) errorMostrarMsj.push("Escoja una agencia de la lista");
    if (!CAJA || CAJA == 0) errorMostrarMsj.push("Escoja una caja de la lista");

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
 * Permite aperturar una caja
 */
function aperturaCaja() {
    if (this.validarDatos()) {
        return;
    }
    var DEPOSITO = $('#DEPOSITO').val().trim();
    var CAJA = $('#ddlCajas option:selected').val();
    var CAJA_DESCRIPCION = $('#ddlCajas option:selected').text();
    axios.post('/cierreCaja/registrar', {
        'ID_CAJA': CAJA,
        'ID_USU': ID_USU,
        'DEPOSITO': DEPOSITO
    }).then(function (response) {
        $('#formAperturaCaja')[0].reset();
        $('#ddlCajas')[0].options.length = 0;
        toastr.success('Se aperturo la caja "' + CAJA_DESCRIPCION + '" correctamente!')
    })
        .catch(function (error) {
            console.log(error);
            toastr.error('No se ha podido aperturar la caja.', 'Error!')
        });
}

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

/**
 * Permite obtener la diferencia entre lo contado y lo calculado
 */
// function getDiferencia() {
//     var valorContado = $('#CONTADO').val();
//     if (!valorContado) valorContado = 0.00;

//     var valorCalculado = $('#CALCULADO').val();
//     if (!valorCalculado) valorCalculado = 0.00;

//     var diferencia = valorContado - valorCalculado;
//     console.log(valorContado + " : " + valorCalculado);
//     var valorDiferencia = Math.round(diferencia * 100) / 100
//     $('#DIFERENCIA').val(valorDiferencia);
//     if (valorDiferencia == 0)
//         $('#DIFERENCIA').attr('style', 'color:blue');
//     else
//         $('#DIFERENCIA').attr('style', 'color:red');
// }

function getCajaDeUsuarioParaCierre()
{
        $.ajax({
            async: false,
            cache: false,
            dataType: "json",
            type: 'GET',
            url: "/cajasParaCierre",
            success: function (respuesta) {
              //  iva =  parseFloat(respuesta.trim());
              $.each(respuesta.data, function (key, entry) {
                        if(entry.ID_USU == ID_USU){
                        ID_CCJ = entry.ID_CCJ;
                        $('#lblNombreCaja').text('Caja: '+entry.CAJA);
                        }
                      })
            },
            beforeSend: function () { },
            error: function (objXMLHttpRequest) { }
        });
}

/**
 * Permite realizar el corte/cierre de caja
 */
function corteDeCaja()
{
    var CONTADO = $('#CONTADO').val().trim(); if(!CONTADO) CONTADO=0;
   // var CALCULADO = $('#CALCULADO').val().trim(); if(!CALCULADO) CALCULADO = 0;
   // var DIFERENCIA = $('#DIFERENCIA').val().trim(); if(!DIFERENCIA) DIFERENCIA = 0;
    var RETIRADO = $('#RETIRADO').val().trim(); if(!RETIRADO) RETIRADO = 0;
    //var ID_CCJ = 7; 
    console.log("id de cierre caja: "+ID_CCJ);
    //console.log('contado: '+CONTADO+" calculado: "+CALCULADO+" diferencia: "+DIFERENCIA+
    //'retirado: '+RETIRADO);
    // axios.post('/cierreCaja/actualizar', {
    //     'ID_CCJ': ID_CCJ,
    //     'CONTADO_CCJ': CONTADO,
    //     'CALCULADO_CCJ': CALCULADO,
    //     'DIFERENCIA_CCJ':DIFERENCIA,
    //     'RETIRO_CCJ': RETIRADO
    // }).then(function (response) {
    //     $('#formCierreCaja').hide();
    //     toastr.success('Se realizó el corte de caja correctamente!')
    // })
    //     .catch(function (error) {
    //         console.log(error);
    //         toastr.error('No se ha podido realizar el corte de caja.', 'Error!')
    //     });
}
/**************************CONFIGURACIONES INICIALES ***********************************/
getDenominacionesDinero();

//getTotalVentasPorUsuario();

getAgencias();

$('#ddlAgencia').change(function () {
    var agencia = $(this).val();
    if (agencia > 0)
        getCajasByAgencia(agencia);
    else
        $('#ddlCajas')[0].options.length = 0;
});

$('#btnAbrirCaja').click(function () {
    aperturaCaja();
});

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


getCajaDeUsuarioParaCierre();

