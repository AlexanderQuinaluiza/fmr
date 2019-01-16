/**
 * FUNCIONES PARA LA GESTIÓN DE PRESENTACIONES
 */

 /**
  *permite validar los datos de entrada para presentacion 
  * @param {int} opcion -1=registrar, 2=actualizar
  */
function validarDatos(opcion)
{
    var error = 0;
    var errorMostrarMsj = [];
    if(!$('#NOMBRE_PRS').val().trim()) errorMostrarMsj.push("El nombre de presentación no puede estar vacío");
    if(opcion==2) //opcion para editar
    {
        if(!$('#id').val().trim()) errorMostrarMsj.push("Escoja una presentación existente de la lista");
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
    $('#NOMBRE_PRS').val('');
    $('#lstErrores').empty();
}

/**
 * permite registrar una presentación
 */
function registrar()
{
    if(validarDatos(1)){
        return;
    }
    axios.post('/presentaciones/registrar',{
        'NOMBRE_PRS': $('#NOMBRE_PRS').val().trim(),
        'CANT_EDIT':$('select[name=selector]').val().trim()
    }).then(function (response){
    tabla.ajax.reload();
    limpiarDatos();
    toastr.success('Registrado correctamente!')
    })
    .catch(function (error) {
     //console.log(error);
     toastr.error('No se ha podido guardar el registro.', 'Error!')
    });
}

/**
 * permite actualizar una presentación existente
 */
function actualizar()
{
    if(validarDatos(2)){
       return;
   }                   
   axios.post('/presentaciones/actualizar',{
       'ID_PRS': $('#id').val().trim(),
       'NOMBRE_PRS':$('#NOMBRE_PRS').val().trim(),
       'CANT_EDIT':$('select[name=selector]').val().trim()
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
 * permite actualizar el estado de una presentación de activo a inactivo
 * @param {int} idRegistro -identificador de presentación
 */
function desactivar(idRegistro)
{
    const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
    })

    swalWithBootstrapButtons({
    title: 'Esta seguro de desactivar esta presentación?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aceptar!',
    cancelButtonText: 'Cancelar!',
    reverseButtons: true
    }).then((result) => {
    if (result.value) {
        axios.post('/presentaciones/desactivar',{
        'ID_PRS':idRegistro
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
 * permite actualizar el estado de una presentación de inactivo a activo
 * @param {int} idRegistro -identificador de presentación
 */
function activar(idRegistro)
{
    axios.post('/presentaciones/activar',{
    'ID_PRS':idRegistro
    }).then(function (response){
    tabla.ajax.reload();
    })
    .catch(function (error) {
        console.log(error);
    });
}

/**
 * permite obtener una presentación dado su id
 * @param {int} idRegistro - id de presentación
 */
function getRegistroById(idRegistro){
    var url = '/presentaciones/byid';
    axios.get(url, { params: { ID_PRS: idRegistro } }).then(function (response){
        $('#id').val(response.data.ID_PRS);
        $('#NOMBRE_PRS').val(response.data.NOMBRE_PRS);
        $('#selector option').each(function(){
            // alert('opcion '+$(this).text()+' valor '+ $(this).attr('value'))
             if(response.data.CANT_EDIT==$(this).attr('value')){
                 $('#selector').val(response.data.CANT_EDIT);
             }
          });
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
 * @param {int} idRegistro -identificador de presentación
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
       "url"    : "presentaciones",
       "dataSrc": function (json) {
         var return_data = new Array();
          var buttons = '';       
          var btn = '';
          var labelEstado = '';
          var labelCantidad='';
         for(var i=0;i< json.data.length; i++){
          var ID_PRS = json.data[i].ID_PRS;
           if(json.data[i].ESTADO_PRS>0)
           {
             btn = '<button type="button" onclick="desactivar('+ID_PRS+');" class="btn btn-danger"><span class="fa fa-trash"></span> Desactivar</button>';
             labelEstado =  '<span  class="badge badge-success">Activo</span>';
           }
           else {
             btn = '<button type="button" onclick="activar('+ID_PRS+')" class="btn btn-success"><span class="fa fa-check"></span> Activar</button>';
             labelEstado = '<span  class="badge badge-danger">Inactivo</span>';
           }
           if(json.data[i].CANT_EDIT>0){
             labelCantidad='<span  class="badge badge-warning">Manipulable</span>';
           }else{
            labelCantidad='<span  class="badge badge-info">Constante</span>';
           }          
           buttons = '<div class="btn-group btn-group-sm">'+
           '<button class="btn btn-primary" onclick="cambiarTab(1,'+ID_PRS+');"><span class="fa fa-pencil-square-o"></span> Editar</button>'+btn+'</div>';
           return_data.push({
             'ID_PRS': json.data[i].ID_PRS,
             'NOMBRE_PRS'  : json.data[i].NOMBRE_PRS,
             'CANT_EDIT' : labelCantidad,
             'ESTADO_PRS' : labelEstado,
             'ACCIONES_PRS' : buttons
           })
         }
         return return_data;
       }
     },
     "columns"    : [
       {'data': 'ID_PRS'},
       {'data': 'NOMBRE_PRS'},
       {'data': 'CANT_EDIT'},
       {'data': 'ESTADO_PRS'},
       {'data': 'ACCIONES_PRS'}
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