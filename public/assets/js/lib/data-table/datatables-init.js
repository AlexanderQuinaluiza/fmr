/**
 * FUNCIONES PARA LA GESTIÓN DE USUARIOS
 */

 
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
    //console.log("idRegistro: "+idRegistro);
    switch (indice)
    {
        case 0: //tab listado
        {
            cambiarTabActivo('#listado','active show');
            cambiarTabActivo('#editar','');
            cambiarTabActivo('#password','');
            break;
        }
        case 1: //tab nuevo/editar
        {
            cambiarTabActivo('#editar','active show');
            cambiarTabActivo('#listado','');
            cambiarTabActivo('#password','');
            $('#editar-tab').html('<i class="fa fa-edit"></i>'+' Editar');
            getUsuarioById(idRegistro,1);
            $('#lstErrores').empty();
            break;
        }
        case 2: //tab cambiar contraseña
        {
        cambiarTabActivo('#password','active show');
            cambiarTabActivo('#listado','');
            cambiarTabActivo('#editar','');
            getUsuarioById(idRegistro,2);
            $('#lstErroresUpdateClave').empty();
            break;
        }
        case 3: //tab cambiar asignar caja
        {
            cambiarTabActivo('#caja','active show');
            cambiarTabActivo('#listado','');
            cambiarTabActivo('#editar','');
            cambiarTabActivo('#password','');
            getUsuarioById(idRegistro,3);
            $('#lstErroresUpdateClave').empty();
            break;
        }
    }
}

/**
 * permite el registro de un usuario
 */
function registrarUsuario()
{
    if(validarDatosUsuario(1)==0)
    {                       
    axios.post('/usuarios/registrar',{
        'CED_RUC_USU':$('#CED_RUC_USU').val().trim(),
        'NOMBRE_USU':$('#NOMBRE_USU').val().trim(),
        'APELLIDO_USU':$('#APELLIDO_USU').val().trim(),
        'TELEFONO_USU':$('#TELEFONO_USU').val().trim(),
        'ALIAS_USU':$('#ALIAS_USU').val().trim(),
        'CLAVE_USU':$('#CLAVE_USU').val().trim(),
        'DIRECCION_USU':$('#DIRECCION_USU').val().trim(),
        'CORREO_USU':$('#CORREO_USU').val().trim(),
        'ROLES_USU': getRolesSeleccionados()
        }).then(function (response){
        tabla.ajax.reload();
        //console.log(response.data)
        limpiarDatosUsuario();
        toastr.success('Registrado correctamente!')
        })
        .catch(function (error) {
            //console.log(error);
            toastr.error('No se ha podido guardar el registro.', 'Error!')
        });
    }                 
}

/**
 * permite actualizar un usuario
 */
function actualizarUsuario()
{
    if(validarDatosUsuario(2)){
       return;
   }                                    
   axios.post('/usuarios/actualizar',{
       'ID_USU': $('#id').val().trim(),
       'CED_RUC_USU':$('#CED_RUC_USU').val().trim(),
       'NOMBRE_USU':$('#NOMBRE_USU').val().trim(),
       'APELLIDO_USU':$('#APELLIDO_USU').val().trim(),
       'TELEFONO_USU':$('#TELEFONO_USU').val().trim(),
       'ALIAS_USU':$('#ALIAS_USU').val().trim(),
       'DIRECCION_USU':$('#DIRECCION_USU').val().trim(),
       'CORREO_USU':$('#CORREO_USU').val().trim(),
       'ROLES_USU': getRolesSeleccionados()
   }).then(function (response){
    //console.log(getRolesSeleccionados());
    tabla.ajax.reload();
    toastr.info('Actualizado correctamente!')
    //console.log(response);
    })
    .catch(function (error) {
        console.log(error);
        toastr.error('No se ha podido actualizar el registro.', 'Error!')
    });
}

/**
 * permite limpiar las entradas de texto
 */
function limpiarDatosUsuario()
{
    $('#CED_RUC_USU').val('');
    $('#NOMBRE_USU').val('');
    $('#APELLIDO_USU').val('');
    $('#TELEFONO_USU').val('');
    $('#ALIAS_USU').val('');
    $('#CLAVE_USU').val('');
    $('#DIRECCION_USU').val('');
    $('#CORREO_USU').val('');
    limpiarCheckRoles();
}

/**
 * permite deseleccionar o limpiar los input tipo checkbox
 */
function  limpiarCheckRoles()
{
    var result = $('input[name="rolesR"]:checked');
    if (result.length > 0) {
        result.each(function(){
           $(this).prop('checked',false);
         });      
    }else{
        //console.log("Ningun checkbox marcado");
    }
}

function validarcedula() {
    var error_ruc = 0;
    var i;
    var cedula;
    var acumulado;
    cedula = $("#CED_RUC_USU").val();
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
        error_ruc = 0;
    } else {
        error_ruc = 1;
    }
    return error_ruc;
}

/**
 * permite validar que los campos para guardar usuario no esten vacíos
 * @param {int} opcion - 1=datos para registrar,  2=datos para actualizar
 * @return {int} error -banderin para error 0=no hay error, 1=si tiene error
 */
function validarDatosUsuario(opcion)
{
    var error = 0;
    var errorMostrarMsj = [];
    if(!$('#CED_RUC_USU').val().trim()){
    errorMostrarMsj.push("La cédula/ruc no puede estar vacío");
    }
    else{
        if(validarcedula()==0)  errorMostrarMsj.push("La cédula/ruc de usuario no es válido");
    }
    if(!$('#NOMBRE_USU').val().trim()) errorMostrarMsj.push("El nombre de usuario no puede estar vacío");
    if(!$('#APELLIDO_USU').val().trim()) errorMostrarMsj.push("El apellido de usuario no puede estar vacío");
    if(!$('#ALIAS_USU').val().trim()) errorMostrarMsj.push("El alias de usuario no puede estar vacío");
    if(!$('#CORREO_USU').val().trim()) errorMostrarMsj.push("El correo de usuario no puede estar vacío");
    if(opcion==1) //opcion para registrar
    {
        if(!$('#CLAVE_USU').val().trim()) errorMostrarMsj.push("La contraseña de usuario no puede estar vacío");
    }
    else if(opcion==2) //opcion para editar
    {
        if(!$('#id').val().trim()) errorMostrarMsj.push("Escoja un usuario existente de la lista");

    }
    //console.log(this.contarRoles());
    if(contarRoles()==0)
    {
         errorMostrarMsj.push("Escoja un rol");
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
 * permite validar que los campos para actualizar contraseña no esten vacíos
 * @return {int} error -banderin para error 0=no hay error, 1=si tiene error
 */
function validarClave(){
    error = 0;
    errorMostrarMsjClave = [];
    if(!$('#id').val().trim())errorMostrarMsjClave.push("Escoja un usuario existente de la lista");
    if(!$('#newPassword').val().trim()) errorMostrarMsjClave.push("La contraseña nueva de usuario no puede estar vacía");
    if(errorMostrarMsjClave.length){
        $('#lstErroresUpdateClave').empty();
        error = 1;
        var lista = '';
        for(var i=0;i<errorMostrarMsjClave.length;i++)
        {
            lista+='<li style="color: red !important">'+errorMostrarMsjClave[i]+'</li>';

        }
        $('#lstErroresUpdateClave').append(lista);
    }
    else
    {
          $('#lstErroresUpdateClave').empty();
    }
    return error;
}

/**
 * permite actualiar la contraseña de un usuario
 * 
 */
function actualizarClave()
{
    if(validarClave()){
    return;
    }
    axios.post('/usuarios/actualizarClave',{
        'ID_USU':$('#id').val().trim(),
        'CLAVE_USU':$('#newPassword').val().trim()                      
    }).then(function (response){                  
    tabla.ajax.reload();
    toastr.info('Contraseña actualizada correctamente!')
    //console.log(response);
    })
    .catch(function (error) {
        //console.log(error);
        toastr.error('No se ha podido actualizar la contraseña.', 'Error!')
    });
}

/**
 * permite listar los roles disponibles para asignar a un usuario
 */
function listarRolesCrearUsuario()
{
    var url = '/roles/fillddl';
    axios.get(url).then(function (response){
        var valor = "";
        var texto = "";
        var html = '';
        for (var key in response.data) 
        {
            valor = response.data[key]['id'];
            texto = response.data[key]['text'];
            //console.log("datos: "+response.data[key]['text']);
            html+= '<div class="checkbox"><label class="form-check-label ">'+
            '<input type="radio" name="rolesR" id="rol'+valor+'" value="'+valor+'" class="form-check-input">'+
            texto+'</label></div>';                                
        }
        $('#divchecks').append(html);                    
    })
    .catch(function (error) {
     console.log(error);
    });                  
}

/**
 * permite contar los roles marcados en los input tipo check
 * @return {int} numero -numero de roles seleccionados/marcados
 */
function contarRoles(){
    var numero = 0;
    var result = $('input[name="rolesR"]:checked');
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
 * permite obtener una lista de los roles seleccionados
 * @return {array} listadoRoles -lista con los identificadores de los roles seleccionados
 */
function getRolesSeleccionados()
 {
    var listadoRoles =[];
    var result = $('input[name="rolesR"]:checked');
    if (result.length > 0) {
        result.each(function(){
            listadoRoles.push(jQuery(this).val()); 
            //console.log("item: "+jQuery(this).val());                  
        });                     
    }else{
        console.log(" Ningun checkbox  esta seleccionado");
    }
    return listadoRoles;
 }

 /**
  * permite obtener un listado de los roles que tiene asignado un usuario
  * @param {int} idRegistro -identificador de usuario
  */
function listarRolesUpdate(idRegistro)
{
    var url = '/roles_up/fillddl';
    axios.get(url, { params: { ID_USU: idRegistro } }).then(function (response){
        for (var key in response.data) {
            var selected = response.data[key]['selected'];
            var valor = response.data[key]['id']
            if(selected>0)
            {
                $( "#rol"+valor).prop('checked', true);
            }
            else
            {
                $( "#rol"+valor).prop('checked', false);
            }                                                                          
        }                                               
    })
    .catch(function (error) {
        console.log(error);
    });                     
}

 /**
  * permite actualizar el estado de un usuario de inactivo a activo
  * @param {int} idRegistro -identificador de usuario
  */
function activar(idRegistro)
{
    axios.post('/usuarios/activar',{
    'ID_USU':idRegistro
    }).then(function (response){
    tabla.ajax.reload();
    })
    .catch(function (error) {
    console.log(error);
    });
}

/**
 * permite actualizar el estado de un usuario de activo a inactivo
 * @param {int} idRegistro -identificador de usuario
 */
function desactivar(idRegistro)
{
    const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
    })

    swalWithBootstrapButtons({
    title: 'Esta seguro de desactivar este usuario?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aceptar!',
    cancelButtonText: 'Cancelar!',
    reverseButtons: true
    }).then((result) => {
        if (result.value) {
            axios.post('/usuarios/desactivar',{
            'ID_USU':idRegistro
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
 * permite obtiene un usuario dado su id
 * @param {int} idRegistro - id de usuario
 * @param {int} operacion - representa la operacion 1=editar,2=actualizar password
 */
function getUsuarioById(idRegistro,operacion){
    var url = '/usuarios/byid';
    axios.get(url, { params: { ID_USU: idRegistro } }).then(function (response){

        $.each($('input[type=radio][name=radioCaja]'),function(){
            var currentValue = parseInt($(this).val());
            if(currentValue===parseInt(response.data.ID_CAJA))
            {
                console.log('igual');
                $(this).prop('checked',true);
                return;
            }
            else  $(this).prop('checked',false);
        })
        if(operacion==1) //mostrar datos para editar
        {
            $('#id').val(response.data.ID_USU);
            $('#CED_RUC_USU').val(response.data.CED_RUC_USU);
            $('#NOMBRE_USU').val(response.data.NOMBRE_USU);
            $('#APELLIDO_USU').val(response.data.APELLIDO_USU);
            $('#TELEFONO_USU').val(response.data.TELEFONO_USU);
            $('#ALIAS_USU').val(response.data.ALIAS_USU);
            $('#DIRECCION_USU').val(response.data.DIRECCION_USU);
            $('#CORREO_USU').val(response.data.CORREO_USU);
            $('#divPassword').hide();
            $('#btnCancelarActualizar').show();
            $('.username').text(response.data.NOMBRE_USU+" "+response.data.APELLIDO_USU);
            $('#oldPassword').val(response.data.CLAVE_USU);
            listarRolesUpdate(idRegistro);        
        }
        else if(operacion==2) //mostrar datos para actualizar contraseña
        {
            $('#id').val(response.data.ID_USU);
            $('.username').text(response.data.NOMBRE_USU+" "+response.data.APELLIDO_USU);
            $('#oldPassword').val(response.data.CLAVE_USU);
            $('#newPassword').val('');
        }
        else if(operacion==3) //mostrar datos para actualizar asignar caja
        {
            $('#id').val(response.data.ID_USU);
            $('.username').text(response.data.NOMBRE_USU+" "+response.data.APELLIDO_USU);
        }
                                                                                                                          
    })
    .catch(function (error) {
        console.log(error);
    });                     
}

/**
 * Permite mostrar las cajas disponibles en controles tipo radiobuttom
 */
function getCajas()
{
    var url = '/cajas';
    var ESTADO_CAJA = 0;
    var itemsRadioCajas = '';
    var numeroRadios = 0;
    axios.get(url).then(function (response) {
        $.each(response.data.data,function(key,value){
            ESTADO_CAJA = value.ESTADO;
            if(ESTADO_CAJA>0)
            {
                var DESCRIPCION_CAJA = value.DESCRIPCION_CAJA;
                var ID_CAJA = value.ID_CAJA;
                var itemRadio='<div class="form-check"><label class="toggle"><input hidden type="radio" name="radioCaja" value="'+ID_CAJA+'" class="radioBtnCaja"> <span class="label-text">'+DESCRIPCION_CAJA+'</span></label></div>';
                itemsRadioCajas+=itemRadio;
                numeroRadios++;
            }
        });
        $('#divCajasAsignar').append(itemsRadioCajas);
        //si existe una única caja marque por defecto
        if(numeroRadios==1)
        $('.radioBtnCaja').prop('checked',true);
    })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * permite cambiar el tipo de input de password a text y viceversa
 * para el campo CLAVE_USU de un usuario nuevo
 */
function verPasswdUsuarioNuevo()
{
    $('#chkVerPassword').click(function() {
        if ($('#chkVerPassword:checked').val() !== undefined)
         {
             $("#CLAVE_USU").prop("type", "text");
         }
         else
         {
             $("#CLAVE_USU").prop("type", "password");
         }
     });
}

/**
 * permite cambiar el tipo de input de password a text y viceversa
 * para la contraseña de un usuario que desea editar
 */
function verPasswdUsuarioEditar()
{
    $('#chkVerPasswd').click(function() {
        if ($('#chkVerPasswd:checked').val() !== undefined)
         {          
             $("#oldPassword").prop("type", "text");
             $("#newPassword").prop("type", "text");
         }
         else
         {       
             $("#oldPassword").prop("type", "password");
             $("#newPassword").prop("type", "password");
         }
     });
}

 /**
  * permite actualizar el id de caja asignado a un usuario
  */
 function asignarCaja()
 {
     var ID_CAJA = $('input[name=radioCaja]:checked', '#formAsignarCaja').val();
     var ID_USU = $('#id').val();
     !$('#CED_RUC_USU').val().trim()
     if(!ID_CAJA || ID_CAJA==0)
     {
        toastr.warning('Seleccione una caja!')
         return;
     }
     if(!ID_USU || ID_USU==0)
     {
        toastr.warning('Seleccione un usuario de la lista!')
         return;
     }
     axios.post('/usuarios/asignarRol',{
      'ID_USU':ID_USU,   
     'ID_CAJA': ID_CAJA
     }).then(function (response){
        toastr.success('Caja asignada con éxito!')   
     })
     .catch(function (error) {
     console.log(error);
     toastr.error('No se ha podido asignar la caja.', 'Error!')
     });
 }
//----------------------------------INICIALIZACIÓN DE MÉTODOS-------------------------
//Listar roles disponibles para asignar a usuario
listarRolesCrearUsuario();
$('#btnCancelarActualizar').hide();
//tab activo por defecto
cambiarTab(0,0);

getCajas();

$('#btnGuardarUsuario').click(function(){
    var esEditar = $('#id').val().trim();
    if(!esEditar)
    registrarUsuario();
    else actualizarUsuario();
});

$('#btnGuardarAsignarCaja').click(function(){
   asignarCaja();
});


$('#btnUpdateP').click(function(){
    actualizarClave();
});

$('#btnCancelarActualizar').click(function(){
    limpiarDatosUsuario();
    limpiarCheckRoles();
    $('#editar-tab').html('<i class="fa fa-plus"></i>'+' Nuevo');
    $('#divPassword').show();
    $('#btnCancelarActualizar').hide();
    $('#id').val('');
});

verPasswdUsuarioNuevo();
verPasswdUsuarioEditar(); 
//configuracion inicial para tabla
var tabla =   $('#bootstrap-data-table').DataTable(
{
      'ajax'       : {
       "type"   : "GET",
       "url"    : "usuarios",
       error: function (xhr, error, thrown) {
        toastr.error('No autorizado para consultar información')
        },
       "dataSrc": function (json) {
         var return_data = new Array();
          var buttons = '';       
          var btn = '';
          var labelEstado = '';
         for(var i=0;i< json.data.length; i++){
          var ID_USU = json.data[i].ID_USU;
           if(json.data[i].ESTADO_USU>0)
           {
             btn = '<button type="button" onclick="desactivar('+ID_USU+');" class="btn btn-danger"><span class="fa fa-trash"></span> Desactivar</button>';
             labelEstado =  '<span  class="badge badge-success">Activo</span>';
           }
           else {
            //var saludo = new Saludar();
             btn = '<button type="button" onclick="activar('+ID_USU+')" class="btn btn-success"><span class="fa fa-check"></span> Activar</button>';
             labelEstado = '<span  class="badge badge-danger">Inactivo</span>';
           }          
           buttons = '<div class="btn-group btn-group-sm">'+
           '<button class="btn btn-primary" onclick="cambiarTab(1,'+ID_USU+');"><span class="fa fa-pencil-square-o"></span> Editar</button>'+
           '<button class="btn btn-warning" onclick="cambiarTab(2,'+ID_USU+');" ><span class="fa fa-key"></span> Clave</button>'+
           '<button class="btn btn-info" onclick="cambiarTab(3,'+ID_USU+');" ><span class="fa fa-lock"></span> Caja</button>'+btn
           '</div>';
           //console.log("jaja");
           return_data.push({
             'ID_USU': json.data[i].ID_USU,
             'CED_RUC_USU'  : json.data[i].CED_RUC_USU,
             'NOMBRE_USU'  : json.data[i].NOMBRE_USU,
             'APELLIDO_USU'  : json.data[i].APELLIDO_USU,
             'ESTADO_USU' : labelEstado,
             'ACCIONES_USU' : buttons
           })
         }
         return return_data;
       }
     },
     "columns"    : [
       {'data': 'ID_USU'},
       {'data': 'CED_RUC_USU'},
       {'data': 'NOMBRE_USU'},
       {'data': 'APELLIDO_USU'},
       {'data': 'ESTADO_USU'},
       {'data': 'ACCIONES_USU'}
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