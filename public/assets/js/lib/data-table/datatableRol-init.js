/**
 * FUNCIONES PARA LA GESTIÓN DE ROLES
 */

 /**
  *permite validar los datos de entrada para rol 
  * @param {int} opcion -1=registrar, 2=actualizar
  */
function validarDatos(opcion)
{
    var error = 0;
    var errorMostrarMsj = [];
    if(!$('#NOMBRE_ROL').val().trim()) errorMostrarMsj.push("El nombre de rol no puede estar vacío");
    if(!$('#DESCRIPCION_ROL').val().trim()) errorMostrarMsj.push("La descripción de rol no puede estar vacío");
    if(opcion==2) //opcion para editar
    {
        if(!$('#id').val().trim()) errorMostrarMsj.push("Escoja un rol existente de la lista");
    }

    if(contarModulos()==0)
    {
         errorMostrarMsj.push("Escoja al menos un módulo");
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
 * permite registrar un rol
 */
function registrar()
{
    if(validarDatos(1)){
        return;
    }
    axios.post('/roles/registrar',{
        'NOMBRE_ROL': $('#NOMBRE_ROL').val().trim(),
        'DESCRIPCION_ROL' : $('#DESCRIPCION_ROL').val().trim(),
        'MODULOS_ROL' : getModulosSeleccionados()
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
   axios.post('/roles/actualizar',{
       'ID_ROL': $('#id').val().trim(),
       'NOMBRE_ROL':$('#NOMBRE_ROL').val().trim(),
       'DESCRIPCION_ROL' : $('#DESCRIPCION_ROL').val().trim(),
       'MODULOS_ROL': getModulosSeleccionados()
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
    title: 'Esta seguro de desactivar este rol?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aceptar!',
    cancelButtonText: 'Cancelar!',
    reverseButtons: true
    }).then((result) => {
    if (result.value) {
        axios.post('/roles/desactivar',{
        'ID_ROL':idRegistro
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
    axios.post('/roles/activar',{
    'ID_ROL':idRegistro
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
    var url = '/roles/byid';
    axios.get(url, { params: { ID_ROL: idRegistro } }).then(function (response){
        $('#id').val(response.data.ID_ROL);
        $('#NOMBRE_ROL').val(response.data.NOMBRE_ROL);
        $('#DESCRIPCION_ROL').val(response.data.DESCRIPCION_ROL);
        $('#btnCancelarActualizar').show();
        listarModulosUpdate(idRegistro);                                                                                                                   
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
            //if(!$('#id').val())getModulosActivosNuevo();
            
            break;
        }
    }
}

/**
 * Permite mostrar los módulos activos en controles tipo checkbox
 */
function getModulosActivosNuevo()
{
    var url = '/modulos/activos';
    axios.get(url).then(function (response){
        var valor = "";
        var texto = "";
        var html = '';
        for (var key in response.data) 
        {
            valor = response.data[key]['ID_MOD'];
            texto = response.data[key]['NOMBRE_MOD'];
            //console.log("datos: "+response.data[key]['text']);
            html+= '<div class="checkbox"><label class="form-check-label ">'+
            '<input type="checkbox" name="modulosR" id="modulo'+valor+'" value="'+valor+'" class="form-check-input">'+
            texto+'</label></div>';                                
        }
        $('#divchecks').append(html);                    
    })
    .catch(function (error) {
     console.log(error);
    });        
}

/**
  * permite obtener un listado de los módulos a los que puede acceder un rol
  * @param {int} idRegistro -identificador de rol
  */
 function listarModulosUpdate(idRegistro)
 {
     var url = '/roles/modulos/update';
     axios.get(url, { params: { ID_ROL: idRegistro } }).then(function (response){
         for (var key in response.data) {
             var selected = response.data[key]['selected'];
             var valor = response.data[key]['id']
             if(selected>0)
             {
                 $( "#modulo"+valor).prop('checked', true);
             }
             else
             {
                 $( "#modulo"+valor).prop('checked', false);
             }                                                                          
         }                                               
     })
     .catch(function (error) {
         console.log(error);
     });                     
 }

/**
 * permite contar los módulos marcados en los input tipo check
 * @return {int} numero -numero de módulos seleccionados/marcados
 */
function contarModulos(){
    var numero = 0;
    var result = $('input[name="modulosR"]:checked');
    if (result.length > 0) {
        result.each(function(){
            numero++;
         });                      
    }else{
       numero=0;
    }
    return numero;
}

/**
 * permite obtener una lista de los módulos seleccionados a los cuales
 * un rol determinado va a tener acceso
 * @return {array} listadoModulos -lista con los identificadores de los módulos seleccionados
 */
function getModulosSeleccionados()
 {
    var listadoModulos =[];
    var result = $('input[name="modulosR"]:checked');
    if (result.length > 0) {
        result.each(function(){
            listadoModulos.push(jQuery(this).val()); 
            //console.log("item: "+jQuery(this).val());                  
        });                     
    }else{
        console.log(" Ningun checkbox  esta seleccionado");
    }
    return listadoModulos;
 }

 function detalles(idRegistro)
 {
    var url = '/roles/modulos';
    axios.get(url,{
        params: {
          ID_ROL: idRegistro
        }}).then(function (response){
        var longitud = Object.keys(response.data.data).length;
        if(longitud>0)
        {
            var NOMBRE_ROL='';
            $('#lstModulos').empty();
            var lista = '';
            $.each(response.data.data,function(key,entry){
                NOMBRE_ROL = entry.rol;            
                lista+='<li class="fa fa-check" aria-hidden="true">&nbsp;'+entry.modulo+'</li><br>';
            });
            $('#lstModulos').append(lista);
            $('#lblNombreRol').html("Rol <strong>"+NOMBRE_ROL+"</strong> tiene acceso a los siguientes módulos:");
        }
        else
        {
            $('#lstModulos').empty();
            $('#lblNombreRol').html("Este rol no tiene acceso a ningún módulo");
        }
    //console.log(longitud);
    
    })
    .catch(function (error) {
        console.log(error);
    });
 }
//----------------------------------INICIALIZACIÓN DE MÉTODOS-------------------------
//detalles(18);
$('#btnCancelarActualizar').hide();
//tab activo por defecto
cambiarTab(0,0);
getModulosActivosNuevo();
$('#btnGuardarRol').click(function(){
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
       "url"    : "roles",
       "dataSrc": function (json) {
         var return_data = new Array();
          var buttons = '';       
          var btn = '';
          var labelEstado = '';
         for(var i=0;i< json.data.length; i++){
          var ID_ROL = json.data[i].ID_ROL;
          var btnVerDetalles = '<button type="button" data-toggle="modal" data-target="#mediumModal" onclick="detalles('+ID_ROL+');" class="btn btn-info"><span class="fa fa-info-circle"></span> </button>';   
          
           if(json.data[i].ESTADO_ROL>0)
           {
             btn = '<button type="button" onclick="desactivar('+ID_ROL+');" class="btn btn-danger"><span class="fa fa-trash"></span> Desactivar</button>';
             labelEstado =  '<span  class="badge badge-success">Activo</span>';
           }
           else {
            //var saludo = new Saludar();
             btn = '<button type="button" onclick="activar('+ID_ROL+')" class="btn btn-success"><span class="fa fa-check"></span> Activar</button>';
             labelEstado = '<span  class="badge badge-danger">Inactivo</span>';
           }          
           buttons = '<div class="btn-group btn-group-sm">'+
           '<button class="btn btn-primary" onclick="cambiarTab(1,'+ID_ROL+');"><span class="fa fa-pencil-square-o"></span> Editar</button>'+btnVerDetalles+btn+'</div>';
           //console.log("jaja");
           return_data.push({
             'ID_ROL': json.data[i].ID_ROL,
             'NOMBRE_ROL'  : json.data[i].NOMBRE_ROL,
             'DESCRIPCION_ROL'  : json.data[i].DESCRIPCION_ROL,
             'ESTADO_ROL' : labelEstado,
             'ACCIONES_ROL' : buttons
           })
         }
         return return_data;
       }
     },
     "columns"    : [
       {'data': 'ID_ROL'},
       {'data': 'NOMBRE_ROL'},
       {'data': 'DESCRIPCION_ROL'},
       {'data': 'ESTADO_ROL'},
       {'data': 'ACCIONES_ROL'}
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