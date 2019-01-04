/**
 * FUNCIONES PARA APERTURA DE CAJA
 */
var denominaciones = [];
var inputCantidades = [];
var inputTotales = [];
var labelDenominaciones = [];
var subtotalesCalculados = [];
var ID_CAJA;ID_CAJA=0;



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
 * Permite realizar el corte/cierre de caja
 */
function corteDeCaja()
{
    var CONTADO = parseFloat($('#CONTADO').val().trim()); if(!CONTADO) CONTADO=0;
    var RETIRADO = parseFloat($('#RETIRADO').val().trim()); if(!RETIRADO) RETIRADO = 0;
    if(ID_CAJA==0)
    {
        toastr.warning('Seleccione una caja para el cierre!','Incompleto')
        return;
    }
    if((!CONTADO || CONTADO<=0) || (!RETIRADO || RETIRADO<=0))
    {
        toastr.warning('Complete todos los datos requeridos para el cierre!','Incompleto')
        return;
    }
    if(RETIRADO>CONTADO)
    {
        toastr.warning('No puede retirar una cantidad superior a lo existente en CAJA','Incorrecto')
        return;
    }
    axios.post('/cierreCaja/registrar', {
        'ID_CAJA': ID_CAJA,
        'CONTADO_CCJ': CONTADO,
        'RETIRO_CCJ': RETIRADO
    }).then(function (response) {
        if(response.data===1)
        {
        toastr.success('Se realizó el corte de caja correctamente!')
        $('#CONTADO').val("0.00");
        $('#RETIRADO').val("0.00");
        $('#ddlCaja')[0].options.length = 0;
        getCajasParaCierre();
        ID_CAJA = 0;
        }
        else
        toastr.error('No se ha podido realizar el corte de caja.'+response.data, 'Error!');
    })
        .catch(function (error) {
            console.log(error);
            toastr.error('No se ha podido realizar el corte de caja.', 'Error!')
        });
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
            ddlCaja.append($('<option></option>').attr('value',  entry.ID_CAJA).text(entry.DESCRIPCION_CAJA));
          })
    });
}

$('#ddlCaja').change(function () {
    ID_CAJA = $(this).val();
});
/**************************CONFIGURACIONES INICIALES ***********************************/
getDenominacionesDinero();

getCajasParaCierre();


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

