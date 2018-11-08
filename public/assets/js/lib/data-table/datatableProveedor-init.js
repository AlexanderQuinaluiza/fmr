/**
 * FUNCIONES PARA LA GESTIÓN DE PROVEEDORES
 */

 /**
  *permite validar los datos de entrada para proveedor 
  * @param {int} opcion -1=registrar, 2=actualizar
  */
function validarDatos(opcion)
{
    var error = 0;
    var errorMostrarMsj = [];
    if(!$('#RUC_PROV').val().trim()) errorMostrarMsj.push("El RUC de proveedor no puede estar vacío");
    if(!$('#NOMBRE_PROV').val().trim()) errorMostrarMsj.push("El nombre de proveedor no puede estar vacío");
    if(!$('#RAZON_SOCIAL_PROV').val().trim()) errorMostrarMsj.push("La razón social de proveedor no puede estar vacío");
    if(!$('#DIRECCION_PROV').val().trim()) errorMostrarMsj.push("La dirección de proveedor no puede estar vacío");
    if(!$('#TELEFONO_PROV').val().trim()) errorMostrarMsj.push("El teléfono de proveedor no puede estar vacío");
    if(!$('#CORREO_PROV').val().trim()) errorMostrarMsj.push("El correo de proveedor no puede estar vacío");
    if(!$('#DEMORA_ENTREGA').val().trim()) errorMostrarMsj.push("Los días demora entrega no puede estar vacío");
   
    if(opcion==2) //opcion para editar
    {
        if(!$('#id').val().trim()) errorMostrarMsj.push("Escoja un proveedor existente de la tabla");
    }
    if(errorMostrarMsj.length){
        $('#lstErrores').empty();
        error = 1;
        var lista = '';
        for(var i=0;i<errorMostrarMsj.length;i++)
        {
            lista+='<li style="color: red !important">'+errorMostrarMsj[i]+'</li>';
        }
        $('#lstErrores').append(lista);
    }
    else
    {
          $('#lstErrores').empty();
    }
    return error;
}

/**
 * permite limpiar las entradas de texto
 */
function limpiarDatos()
{
    $('#id').val('');
    $('#RUC_PROV').val('');
    $('#NOMBRE_PROV').val('');
    $('#RAZON_SOCIAL_PROV').val('');
    $('#DIRECCION_PROV').val('');
    $('#TELEFONO_PROV').val('');
    $('#CORREO_PROV').val('');
    $('#NACIONALIDAD_PROV').val('');
    $('#PROVINCIA_PROV').val('');
    $('#CIUDAD_PROV').val('');
    $('#DEMORA_ENTREGA').val('');
    $('#lstErrores').empty();
}

/**
 * permite registrar un proveedor
 */
function registrar()
{
    var nacionalidad = '';
    if(this.validarDatos(1)){
        return;
    }

    if ($('#extranjero').is(':checked') && $('#extranjero').val() == 'extranjero') {
        nacionalidad = 'extranjero';
     }
     else
     {
        nacionalidad = 'nacional';
     }
    axios.post('/proveedores/registrar',{
        'RUC_PROV':$('#RUC_PROV').val().trim(),
        'NOMBRE_PROV' : $('#NOMBRE_PROV').val().trim(),
        'RAZON_SOCIAL_PROV' : $('#RAZON_SOCIAL_PROV').val().trim(),
        'DIRECCION_PROV' : $('#DIRECCION_PROV').val().trim(),
        'TELEFONO_PROV' : $('#TELEFONO_PROV').val().trim(),
        'CORREO_PROV' : $('#CORREO_PROV').val().trim(),
        'NACIONALIDAD_PROV' : nacionalidad,
        'PROVINCIA_PROV' : $('#PROVINCIA_PROV').val().trim(),
        'CIUDAD_PROV' : $('#CIUDAD_PROV').val().trim(),
        'DEMORA_ENTREGA' : $('#DEMORA_ENTREGA').val().trim()
    }).then(function (response){
    tabla.ajax.reload();
    limpiarDatos();
    toastr.success('Registrado correctamente!')
    })
    .catch(function (error) {
     console.log(error);
     toastr.error('No se ha podido guardar el registro.', 'Error!')
    });
}

/**
 * permite actualizar un proveedor existente
 */
function actualizar()
{
   if(this.validarDatos(2)){
    return;
    }
    
    var nacionalidad = '';
    if ($('#extranjero').is(':checked') && $('#extranjero').val() == 'extranjero') {
        nacionalidad = 'extranjero';
     }
     else
     {
        nacionalidad = 'nacional';
     }
    axios.post('/proveedores/actualizar',{
        'ID_PROV':$('#id').val().trim(),
        'RUC_PROV':$('#RUC_PROV').val().trim(),
        'NOMBRE_PROV' : $('#NOMBRE_PROV').val().trim(),
        'RAZON_SOCIAL_PROV' : $('#RAZON_SOCIAL_PROV').val().trim(),
        'DIRECCION_PROV' : $('#DIRECCION_PROV').val().trim(),
        'TELEFONO_PROV' : $('#TELEFONO_PROV').val().trim(),
        'CORREO_PROV' : $('#CORREO_PROV').val().trim(),
        'NACIONALIDAD_PROV' : nacionalidad,
        'PROVINCIA_PROV' : (!$('#PROVINCIA_PROV').val().trim()?'':$('#PROVINCIA_PROV').val().trim()),
        'CIUDAD_PROV' : (!$('#CIUDAD_PROV').val().trim()?'':$('#CIUDAD_PROV').val().trim()),
        'DEMORA_ENTREGA' : $('#DEMORA_ENTREGA').val().trim()
    }).then(function (response){
    tabla.ajax.reload();
    toastr.info('Actualizado correctamente!')
    })
    .catch(function (error) {
    console.log(error);
    toastr.error('No se ha podido actualizar el registro.', 'Error!')
    });
}

/**
 * permite actualizar el estado de un proveedor de activo a inactivo
 * @param {int} idRegistro -identificador de proveedor
 */
function desactivar(idRegistro)
{
    const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
    })

    swalWithBootstrapButtons({
    title: 'Esta seguro de desactivar este proveedor?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aceptar!',
    cancelButtonText: 'Cancelar!',
    reverseButtons: true
    }).then((result) => {
    if (result.value) {
        axios.post('/proveedores/desactivar',{
        'ID_PROV':idRegistro
        }).then(function (response){
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
 * permite actualizar el estado de un proveedor de inactivo a activo
 * @param {int} idRegistro -identificador de proveedor
 */
function activar(idRegistro)
{
    axios.post('/proveedores/activar',{
    'ID_PROV':idRegistro
    }).then(function (response){
    tabla.ajax.reload();
    })
    .catch(function (error) {
        console.log(error);
    });
}

/**
 * permite obtener un proveedor dado su id
 * @param {int} idRegistro - id de proveedor
 */
function getRegistroById(idRegistro){
    var url = '/proveedores/byid';
    axios.get(url, { params: { ID_PROV: idRegistro } }).then(function (response){
        $('#id').val(response.data.ID_PROV);
        $('#RUC_PROV').val(response.data.RUC_PROV);
        $('#NOMBRE_PROV').val(response.data.NOMBRE_PROV);
        $('#RAZON_SOCIAL_PROV').val(response.data.RAZON_SOCIAL_PROV);
        $('#DIRECCION_PROV').val(response.data.DIRECCION_PROV);
        $('#TELEFONO_PROV').val(response.data.TELEFONO_PROV);
        $('#CORREO_PROV').val(response.data.CORREO_PROV);
        //$('#NACIONALIDAD_PROV').val(response.data.NACIONALIDAD_PROV);
        $('#PROVINCIA_PROV').val(response.data.PROVINCIA_PROV);
        $('#CIUDAD_PROV').val(response.data.CIUDAD_PROV);
        $('#DEMORA_ENTREGA').val(response.data.DEMORA_ENTREGA);
        $('#btnCancelarActualizar').show();

        $('#extranjero').prop('checked',false);
        $('#nacional').prop('checked',false);
        if(response.data.NACIONALIDAD_PROV.trim()=='nacional')
        {
            $('#nacional').prop('checked',true);
        }
        else $('#extranjero').prop('checked',true);

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
function cambiarTabActivo(idTab,clase)
{
    if(clase=='active show')
    {
        $(idTab).attr('class', 'tab-pane fade active show');
        $(idTab+'-tab').attr('class', 'nav-item nav-link active show');
    }
    else
    {
        $(idTab).attr('class', 'tab-pane fade');
        $(idTab+'-tab').attr('class', 'nav-item nav-link');
    }
}

/**
 * permite cambiar un tab de activo a inactivo o viceversa
 * @param {int} indice -indice de tab
 * @param {int} idRegistro -identificador de proveedor
 */
function cambiarTab(indice,idRegistro)
{
    switch (indice)
    {
        case 0: //tab listado
        {
            cambiarTabActivo('#listado','active show');
            cambiarTabActivo('#editar','');
            break;
        }
        case 1: //tab nuevo/editar
        {
            cambiarTabActivo('#editar','active show');
            cambiarTabActivo('#listado','');
            $('#editar-tab').html('<i class="fa fa-edit"></i>'+' Editar');
            getRegistroById(idRegistro);
            $('#lstErrores').empty();
            break;
        }
    }
}

/**
 * permite proporcionar autocompletado a un campo de texto
 * @param {string} url  -url de donde se obtiene los datos
 * @param {string} idInput -identificador de campo de texto
 */
function iniciarAutocompletado(url,idInput)
{
    var options = {
        url: function(phrase) {
          return url;
        },
        
        getValue: function(element) {
          return element.name;
        },       
        ajaxSettings: {
          dataType: "json",
          method: "GET",
          data: {
            dataType: "json"
          }
        },
        list: {
            match: {
                enabled: true
            }
        },
        preparePostData: function(data) {
          data.phrase = $(idInput).val();
          return data;
        },      
        requestDelay: 100
        };      
        $(idInput).easyAutocomplete(options);     
        $(idInput).parent().css("width", "100%");
}

/**$('input:radio[name="nacionalidad"]').change(
    function(){
        if ($(this).is(':checked') && $(this).val() == 'n') {
           console.log('nacional checked');
        }
        else
        {

            console.log('extranjero checked');
        }
    });*/

//----------------------------------INICIALIZACIÓN DE MÉTODOS-------------------------
$('#btnCancelarActualizar').hide();
//tab activo por defecto
cambiarTab(0,0);

$('#btnGuardar').click(function(){
    var esEditar = $('#id').val().trim();
    if(!esEditar)
    registrar();
    else actualizar();
});

$('#btnCancelarActualizar').click(function(){
    limpiarDatos();
    $('#editar-tab').html('<i class="fa fa-plus"></i>'+' Nuevo');
    $('#btnCancelarActualizar').hide();
});

iniciarAutocompletado("proveedores/provincias","#PROVINCIA_PROV");
iniciarAutocompletado("proveedores/ciudades","#CIUDAD_PROV");

//configuracion inicial para tabla
var tabla =   $('#bootstrap-data-table').DataTable(
{
      'ajax'       : {
       "type"   : "GET",
       "url"    : "proveedores",
       "dataSrc": function (json) {
         var return_data = new Array();
          var buttons = '';       
          var btn = '';
          var labelEstado = '';
         for(var i=0;i< json.data.length; i++){
          var ID_PROV = json.data[i].ID_PROV;
           if(json.data[i].ESTADO_PROV>0)
           {
             btn = '<button type="button" onclick="desactivar('+ID_PROV+');" class="btn btn-danger"><span class="fa fa-trash"></span> Desactivar</button>';
             labelEstado =  '<span  class="badge badge-success">Activo</span>';
           }
           else {
             btn = '<button type="button" onclick="activar('+ID_PROV+')" class="btn btn-success"><span class="fa fa-check"></span> Activar</button>';
             labelEstado = '<span  class="badge badge-danger">Inactivo</span>';
           }          
           buttons = '<div class="btn-group btn-group-sm">'+
           '<button class="btn btn-primary" onclick="cambiarTab(1,'+ID_PROV+');"><span class="fa fa-pencil-square-o"></span> Editar</button>'+btn+'</div>';
           return_data.push({
             'ID_PROV': json.data[i].ID_PROV,
             'RUC_PROV'  : json.data[i].RUC_PROV,
             'NOMBRE_PROV'  : json.data[i].NOMBRE_PROV,
             'RAZON_SOCIAL_PROV'  : json.data[i].RAZON_SOCIAL_PROV,
             'CORREO_PROV'  : json.data[i].CORREO_PROV,
             'ESTADO_PROV' : labelEstado,
             'ACCIONES_PROV' : buttons
           })
         }
         return return_data;
       }
     },
     "columns"    : [
       {'data': 'ID_PROV'},
       {'data': 'RUC_PROV'},
       {'data': 'NOMBRE_PROV'},
       {'data': 'RAZON_SOCIAL_PROV'},
       {'data': 'CORREO_PROV'},
       {'data': 'ESTADO_PROV'},
       {'data': 'ACCIONES_PROV'}
     ],
        dom: 'lBfrtip',
        lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "Todo"]],
        buttons: [
          {
                extend:    'copyHtml5',
                text:      '<i class="fa fa-files-o"></i> Copiar',
                titleAttr: 'Copiar',
                exportOptions: {
                  columns: 'th:not(:last-child)'
              }
            },
            {
                extend:    'excelHtml5',
                text:      '<i class="fa fa-file-excel-o"></i> Excel',
                titleAttr: 'Excel',
                exportOptions: {
                  columns: 'th:not(:last-child)'
              }
            },
            {
                extend:    'csvHtml5',
                text:      '<i class="fa fa-file-text-o"></i> CSV',
                titleAttr: 'CSV',
                exportOptions: {
                  columns: 'th:not(:last-child)'
              }
            },
            {
                extend:    'pdfHtml5',
                text:      '<i class="fa fa-file-pdf-o"></i> PDF',
                titleAttr: 'PDF',
                title: 'Listado de'+$('#titulo').text(),
                exportOptions: {
                  columns: 'th:not(:last-child)'
              }
            },
            {
                extend:    'print',
                text:      '<i class="fa fa-print"></i> Imprimir',
                titleAttr: 'Imprimir',
                title: 'Listado de'+$('#titulo').text(),
                className: 'btn btn-info btn-xs',
                exportOptions: {
                  columns: 'th:not(:last-child)'
              }
            }
        ],
        "language": {
            "sProcessing":    "Procesando...",
            "sLengthMenu":    "Mostrar _MENU_ registros",
            "sZeroRecords":   "No se encontraron resultados",
            "sEmptyTable":    "Ningún dato disponible en esta tabla",
            "sInfo":          "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":     "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":  "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":   "",
            "sSearch":        "Buscar:",
            "sUrl":           "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":    "Último",
                "sNext":    "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
});