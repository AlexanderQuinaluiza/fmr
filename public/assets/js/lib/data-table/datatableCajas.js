/**
 * FUNCIONES PARA LA GESTIÓN DE ROLES
 * ID_CAJAA, ID_AGE, DESCRIPCION_CAJAA, ESTADO
 */

function listarAgencias(){
    var url = '/cajas/agencias';
    axios.get(url).then(function (response){
         var respuesta = response.data;
       //   console.log(respuesta);
        for(var i=0;i< respuesta.data.length; i++){
            var ID = respuesta.data[i].ID_AGE;
            var VALOR = respuesta.data[i].NOMBRE_AGE;
            $("#selector").append('<option value='+ID+'>'+VALOR+'</option>'); 
        }                                                                                                                  
    })
    .catch(function (error) {
        console.log(error);
    });        
}


 /**
  *permite validar los datos de entrada para rol 
  * @param {int} opcion -1=registrar, 2=actualizar
  */
 function validarDatos(opcion)
 {
     var error = 0;
     var errorMostrarMsj = [];
     if(!$('#DESCRIPCION_CAJA').val().trim()) errorMostrarMsj.push("La descripción no puede estar vacío");
     //if(!$('select[name=selector]').val().trim()) errorMostrarMsj.push("La agencia no puede estar vacío");

     /*if(!$('#DESCRIPCION_ROL').val().trim()) errorMostrarMsj.push("La descripción de rol no puede estar vacío");*/
     if(opcion==2) //opcion para editar
     {
         if(!$('#id').val().trim()) errorMostrarMsj.push("Escoja una caja existente de la lista");
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
     $('#DESCRIPCION_CAJA').val('');
    // $('#DESCRIPCION_ROL').val('');
     $('#lstErrores').empty();
 }
 
 /**
  * permite registrar un rol
  */
 function registrar()
 {
     if(validarDatos(1)){
         return;
     }
     axios.post('/cajas/registrar',{
         'DESCRIPCION_CAJA': $('#DESCRIPCION_CAJA').val().trim(),
         'ID_AGE' : $('select[name=selector]').val().trim()
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
  * permite actualizar un rol existente
  */
 function actualizar()
 {
     if(validarDatos(2)){
        return;
    }                   
    axios.post('/cajas/actualizar',{
        'ID_CAJA': $('#id').val().trim(),
        'DESCRIPCION_CAJA': $('#DESCRIPCION_CAJA').val().trim(),
        'ID_AGE' : $('select[name=selector]').val().trim()
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
  * permite actualizar el estado de un rol de activo a inactivo
  * @param {int} idRegistro -identificador de rol
  */
 function desactivar(idRegistro)
 {
     const swalWithBootstrapButtons = swal.mixin({
     confirmButtonClass: 'btn btn-success',
     cancelButtonClass: 'btn btn-danger',
     buttonsStyling: false,
     })
 
     swalWithBootstrapButtons({
     title: 'Esta seguro de desactivar esta caja?',
     type: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Aceptar!',
     cancelButtonText: 'Cancelar!',
     reverseButtons: true
     }).then((result) => {
     if (result.value) {
         axios.post('/cajas/desactivar',{
         'ID_CAJA':idRegistro
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
  * permite actualizar el estado de un rol de inactivo a activo
  * @param {int} idRegistro -identificador de rol
  */
 function activar(idRegistro)
 {
     axios.post('/cajas/activar',{
     'ID_CAJA':idRegistro
     }).then(function (response){
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
 function getRegistroById(idRegistro){
     var url = 'cajas/byid';
     axios.get(url, { params: { ID_CAJA: idRegistro } }).then(function (response){
         $('#id').val(response.data.ID_CAJA);
         $('#DESCRIPCION_CAJA').val(response.data.DESCRIPCION_CAJA);
         $('#selector option').each(function(){
           // alert('opcion '+$(this).text()+' valor '+ $(this).attr('value'))
            if(response.data.ID_AGE==$(this).attr('value')){
                $('#selector').val(response.data.ID_AGE);
            }
         });
         //$('#DESCRIPCION_ROL').val(response.data.DESCRIPCION_ROL);
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
 
 $('#btnGuardarCategoria').click(function(){
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
 listarAgencias();
 //configuracion inicial para tabla
 var tabla =   $('#table_cajas').DataTable(
 {
     
       'ajax'       : {
        "type"   : "GET",
        "url"    : "cajas",
        "dataSrc": function (json) {
          var return_data = new Array();
           var buttons = '';       
           var btn = '';
           var labelEstado = '';
          for(var i=0;i< json.data.length; i++){
           var ID_CAJA = json.data[i].ID_CAJA;
            if(json.data[i].ESTADO>0)
            {
              btn = '<button type="button" onclick="desactivar('+ID_CAJA+');" class="btn btn-danger"><span class="fa fa-trash"></span> Desactivar</button>';
              labelEstado =  '<span  class="badge badge-success">Activo</span>';
            }
            else {
             //var saludo = new Saludar();
              btn = '<button type="button" onclick="activar('+ID_CAJA+')" class="btn btn-success"><span class="fa fa-check"></span> Activar</button>';
              labelEstado = '<span  class="badge badge-danger">Inactivo</span>';
            }          
            buttons = '<div class="btn-group btn-group-sm">'+
            '<button class="btn btn-primary" onclick="cambiarTab(1,'+ID_CAJA+');"><span class="fa fa-pencil-square-o"></span> Editar</button>'+btn+'</div>';
            //console.log("jaja");
            return_data.push({
              'ID_CAJA': json.data[i].ID_CAJA,
              'DESCRIPCION_CAJA'  : json.data[i].DESCRIPCION_CAJA,
              'AGENCIA'  : json.data[i].AGENCIA,
              'VALOR'  : '$ '+json.data[i].VALOR,
              'ESTADO' : labelEstado,
              'ACCIONES' : buttons
            })
          }
          return return_data;
        }
      },
      "columns"    : [
        {'data': 'ID_CAJA'},
        {'data': 'DESCRIPCION_CAJA'},
        {'data': 'AGENCIA'},
        {'data': 'VALOR'},
        {'data': 'ESTADO'},
        {'data': 'ACCIONES'}
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