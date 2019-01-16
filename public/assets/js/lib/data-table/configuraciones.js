/**
 * FUNCIONES PARA ACTUALIZACIÓN DE CONFIGURACIONES
 */

 /**
  * Permite obtener las configuraciones y llenarlas
  * en el control tipo select
  */
function getConfiguraciones()
{
    var ddlConfig = $('#ddlConfig');
      $.getJSON('/config', function (data) {
        ddlConfig.append($('<option></option>').attr('value', '0').text('--Seleccione configuración--'));
          $.each(data.data, function (key, entry) {
            ddlConfig.append($('<option></option>').attr('value', entry.ID_CONF).text(entry.NOMBRE_CONF));
          })
    });
}

/**
 * Permite obtener el valor de configuración dado su nombre
 * @param {string} nombreConfig --nombre de la configuración
 */
function getConfiguracionByNombre(nombreConfig)
{
    var url = '/settings';
    axios.get(url, {
        params: {
            setting: nombreConfig
        }
    }).then(function (response) {
        $('#VALOR_CONF').val(response.data);
    })
        .catch(function (error) {
            toastr.error('Error al recuperar valor de configuración para: '+nombreConfig);
        });
}

/**
 * Permite actualizar el valor de configuración
 */
function guardarConfiguracion()
{
    var NAME_CONFIG = $('#ddlConfig option:selected').val().trim();
    var CONFIG = $('#VALOR_CONF').val().trim();
    if(NAME_CONFIG ==0 || !NAME_CONFIG)
    {
        toastr.warning('Seleccione un item de la lista!','Incompleto')
        return;
    }
    if(CONFIG ==0 || !CONFIG)
    {
        toastr.warning('Valor de configuración no puede estar vacío!','Incompleto')
        return;
    }
    axios.post('/config/update', {
        'NOMBRE_CONF': NAME_CONFIG,
        'VALOR_CONF': CONFIG
    }).then(function (response) {
        toastr.success('Actualizado correctamente!');
    })
        .catch(function (error) {
            console.log(error);
            toastr.error('No se ha podido actualizar el registro.', 'Error!');
    });
}

/************************* CONFIGURACIONES INICIALES ***********************************/
getConfiguraciones();

$('#btnGuardar').click(function(){
    guardarConfiguracion();
});

$('#ddlConfig').change(function () {
    var name = $(this).find("option:selected").text();
    getConfiguracionByNombre(name);
});