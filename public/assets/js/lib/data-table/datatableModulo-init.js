/**
 * FUNCIONES PARA LA GESTIÓN DE MÓDULOS
 */

 /**
  *permite validar los datos de entrada para módulo 
  * @param {int} opcion -1=registrar, 2=actualizar
  */
function validarDatos(opcion)
{
    var error = 0;
    var errorMostrarMsj = [];
    if(!$('#NOMBRE_MOD').val().trim()) errorMostrarMsj.push("El nombre de módulo no puede estar vacío");
    //if(!$('#ICONO_MOD').val().trim()) errorMostrarMsj.push("La descripción de rol no puede estar vacío");
    if(!$('#URL_MOD').val().trim()) errorMostrarMsj.push("El identificador de módulo no puede estar vacío");
    if(opcion==2) //opcion para editar
    {
        if(!$('#id').val().trim()) errorMostrarMsj.push("Escoja un módulo existente de la lista");
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
    $('#form')[0].reset();
    $('#lstErrores').empty();
}

/**
 * permite registrar un módulo
 */
function registrar()
{
    if(validarDatos(1)){
        return;
    }
    axios.post('/modulos/registrar',{
        'NOMBRE_MOD': $('#NOMBRE_MOD').val().trim(),
        'ICONO_MOD' : $('#ICONO_MOD').val().trim(),
        'URL_MOD' : $('#URL_MOD').val().trim()
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
 * permite actualizar un módulo existente
 */
function actualizar()
{
    if(validarDatos(2)){
       return;
   }                   
   axios.post('/modulos/actualizar',{
       'ID_MOD': $('#id').val().trim(),
       'NOMBRE_MOD':$('#NOMBRE_MOD').val().trim(),
       'ICONO_MOD' : $('#ICONO_MOD').val().trim(),
       'URL_MOD' : $('#URL_MOD').val().trim()
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
 * permite actualizar el estado de un módulo de activo a inactivo
 * @param {int} idRegistro -identificador de módulo
 */
function desactivar(idRegistro)
{
    const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
    })

    swalWithBootstrapButtons({
    title: 'Esta seguro de desactivar este módulo?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aceptar!',
    cancelButtonText: 'Cancelar!',
    reverseButtons: true
    }).then((result) => {
    if (result.value) {
        axios.post('/modulos/desactivar',{
        'ID_MOD':idRegistro
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
 * permite actualizar el estado de un módulo de inactivo a activo
 * @param {int} idRegistro -identificador de módulo
 */
function activar(idRegistro)
{
    axios.post('/modulos/activar',{
    'ID_MOD':idRegistro
    }).then(function (response){
    tabla.ajax.reload();
    })
    .catch(function (error) {
        console.log(error);
    });
}

/**
 * permite obtener un módulo dado su id
 * @param {int} idRegistro - id de módulo
 */
function getRegistroById(idRegistro){
    var url = '/modulos/byid';
    axios.get(url, { params: { ID_MOD: idRegistro } }).then(function (response){
        $('#id').val(response.data.ID_MOD);
        $('#NOMBRE_MOD').val(response.data.NOMBRE_MOD);
        $('#URL_MOD').val(response.data.URL_MOD);
        $('#ICONO_MOD').val(response.data.ICONO_MOD);
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
 * @param {int} idRegistro -identificador de usuario
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

//configuracion inicial para tabla
var tabla =   $('#bootstrap-data-table').DataTable(
{
      'ajax'       : {
       "type"   : "GET",
       "url"    : "modulos",
       "dataSrc": function (json) {
         var return_data = new Array();
          var buttons = '';       
          var btn = '';
          var labelEstado = '';
          var icono = '';
         for(var i=0;i< json.data.length; i++){
          var ID_MOD = json.data[i].ID_MOD;
           if(json.data[i].ESTADO_MOD>0)
           {
             btn = '<button type="button" onclick="desactivar('+ID_MOD+');" class="btn btn-danger"><span class="fa fa-trash"></span> Desactivar</button>';
             labelEstado =  '<span  class="badge badge-success">Activo</span>';
           }
           else {
             btn = '<button type="button" onclick="activar('+ID_MOD+')" class="btn btn-success"><span class="fa fa-check"></span> Activar</button>';
             labelEstado = '<span  class="badge badge-danger">Inactivo</span>';
           }          
           buttons = '<div class="btn-group btn-group-sm">'+
           '<button class="btn btn-primary" onclick="cambiarTab(1,'+ID_MOD+');"><span class="fa fa-pencil-square-o"></span> Editar</button>'+btn+'</div>';
           icono = '<span class="'+json.data[i].ICONO_MOD+'"></span>';
           return_data.push({
             'ID_MOD': json.data[i].ID_MOD,
             'NOMBRE_MOD'  : json.data[i].NOMBRE_MOD,
             'ICONO_MOD'  : icono,
             'URL_MOD'  : json.data[i].URL_MOD,
             'ESTADO_MOD' : labelEstado,
             'ACCIONES_MOD' : buttons
           })
         }
         return return_data;
       }
     },
     "columns"    : [
       {'data': 'ID_MOD'},
       {'data': 'NOMBRE_MOD'},
       {'data': 'ICONO_MOD'},
       {'data': 'URL_MOD'},
       {'data': 'ESTADO_MOD'},
       {'data': 'ACCIONES_MOD'}
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
$('.table').attr('style','width:100%');