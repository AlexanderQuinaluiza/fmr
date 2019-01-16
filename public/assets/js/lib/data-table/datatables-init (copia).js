(function ($) {
    //    "use strict";


    /*  Data Table
    -------------*/
  /**
*/

//Listar roles disponibles para asignar a usuario
listarRolesCrearUsuario();
$('#btnCancelarActualizar').hide();
//tab activo por defecto

/**Inicio funciones cambiar TAB */

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
               /**$('#listado-tab').click(function(){
               $('#editar-tab').html('<i class="fa fa-plus"></i>'+' Nuevo');
             });*/
           }
          function cambiarTab(indice,idRegistro)
                         {
                             console.log("idRegistro: "+idRegistro);
                             switch (indice)
                                     {
                                         case 0:
                                         {
                                             cambiarTabActivo('#listado','active show');
                                             cambiarTabActivo('#editar','');
                                             cambiarTabActivo('#password','');

                                             break;
                                         }
                                          case 1:
                                         {
                                            cambiarTabActivo('#editar','active show');
                                             cambiarTabActivo('#listado','');
                                            cambiarTabActivo('#password','');
                                            $('#editar-tab').html('<i class="fa fa-edit"></i>'+' Editar');
                                            getUsuarioById(idRegistro,1);
                                             break;
                                         }
                                          case 2:
                                         {
                                            cambiarTabActivo('#password','active show');
                                             cambiarTabActivo('#listado','');
                                             cambiarTabActivo('#editar','');
                                             getUsuarioById(idRegistro,2);
                                             $('#lstErroresUpdateClave').empty();
                                             break;
                                         }
                                     }
                         }
                         cambiarTab(0,0);

/**Fin funciones cambiar TAB */
function saludar()
{
    console.log('HOLA MUNDO');
} 

  var tabla =   $('#bootstrap-data-table').DataTable({
      'ajax'       : {
       "type"   : "GET",
       "url"    : "usuarios",
       "dataSrc": function (json) {
         var return_data = new Array();
          var buttons = '';
          

          var btnActivo = '<button type="button" class="btn btn-success"><span class="fa fa-check"></span> Activar</button>';
          var btnInactivo ='<button type="button" class="btn btn-danger"><span class="fa fa-trash"></span> Desactivar</button>';
          var btn = '';
          var labelEstado = '';


         //var count = Object.keys(json).length;
         //console.log(count);
         for(var i=0;i< json.data.length; i++){
          var ID_USU = json.data[i].ID_USU;
           if(json.data[i].ESTADO_USU>0)
           {
             btn = '<button type="button" onclick="desactivar('+ID_USU+');" class="btn btn-danger"><span class="fa fa-trash"></span> Desactivar</button>';
             labelEstado =  '<span  class="badge badge-success">Activo</span>';

             //console.log('ACTIVO');
           }
           else {
            //var saludo = new Saludar();
             btn = '<button type="button" onclick="saludar()" class="btn btn-success"><span class="fa fa-check"></span> Activar</button>';
             labelEstado = '<span  class="badge badge-danger">Inactivo</span>';
           }
           
           buttons = '<div class="btn-group btn-group-sm">'+
           '<button class="btn btn-primary" onclick="cambiarTab(1,'+ID_USU+');"><span class="fa fa-pencil-square-o"></span> Editar</button>'+
           '<button class="btn btn-warning" onclick="cambiarTab(2,'+ID_USU+');" ><span class="fa fa-key"></span> Cambiar Clave</button>'+btn
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
        lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "All"]],
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
        ]
    });

    $('#btnRegistroUsuario').click(function(){
      registrarUsuario();
    });

    /**Inicio codigo USUARIO */
   
function registrarUsuario()
{
    if(validarDatosUsuario()==0){                       
    axios.post('/usuarios/registrar',{
        'CED_RUC_USU':$('#CED_RUC_USU').val(),
        'NOMBRE_USU':$('#NOMBRE_USU').val(),
        'APELLIDO_USU':$('#APELLIDO_USU').val(),
        'TELEFONO_USU':$('#TELEFONO_USU').val(),
        'ALIAS_USU':$('#ALIAS_USU').val(),
        'CLAVE_USU':$('#CLAVE_USU').val(),
        'DIRECCION_USU':$('#DIRECCION_USU').val(),
        'CORREO_USU':$('#CORREO_USU').val(),
        'ROLES_USU': getRolesSeleccionados()
    }).then(function (response){
      tabla.ajax.reload();
      console.log(response.data)
      limpiarDatosUsuario();
      toastr.success('Registrado correctamente!')
      })
      .catch(function (error) {
          console.log(error);
          toastr.error('No se ha podido guardar el registro.', 'Error!')
      });
} 
                
}

$('#btnCancelarActualizar').click(function(){
    limpiarDatosUsuario();
    limpiarCheckRoles();
    $('#editar-tab').html('<i class="fa fa-plus"></i>'+' Nuevo');
    $('#divPassword').show();
    $('#btnCancelarActualizar').hide();
});

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
function  limpiarCheckRoles()
{
    var result = jQuery('input[name="rolesR"]:checked');
    if (result.length > 0) {
        result.each(function(){
           jQuery(this).prop('checked',false);
         });      
    }else{
        console.log("Ningun checkbox marcado");
    }
}

function validarClave(){
    error = 0;
    errorMostrarMsjClave = [];
    if(!$('#id').val())errorMostrarMsjClave.push("Escoja un usuario existente de la lista");
    if(!jQuery('#newPassword').val()) errorMostrarMsjClave.push("La contraseña nueva de usuario no puede estar vacía");
    //if(errorMostrarMsjClave.length) error = 1;
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
function actualizarClave()
{
    if(validarClave()){
    return;
    }
    axios.put('/usuarios/actualizarClave',{
        'ID_USU':$('#id').val(),
        'CLAVE_USU':$('#newPassword').val()                      
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
$('#btnUpdateP').click(function(){
    actualizarClave();
});
function listarRolesCrearUsuario(){
    var url = '/roles/fillddl';
    axios.get(url).then(function (response){
        var valor = "";
        var texto = "";
        var html = '';
        //checked
        for (var key in response.data) {
            valor = response.data[key]['id'];
            texto = response.data[key]['text'];
            //console.log("datos: "+response.data[key]['text']);
            html+= '<div class="checkbox"><label class="form-check-label ">'+
        '<input type="checkbox" name="rolesR" id="rol'+valor+'" value="'+valor+'" class="form-check-input">'+
        texto+'</label></div>';                                
        }
        jQuery('#divchecks').append(html);                    
    })
    .catch(function (error) {
     console.log(error);
    });                  
}
function validarDatosUsuario()
{
    var error = 0;
    var errorMostrarMsj = [];
    if(!$('#CED_RUC_USU').val()) errorMostrarMsj.push("La cédula/ruc no puede estar vacío");
    if(!$('#NOMBRE_USU').val()) errorMostrarMsj.push("El nombre de usuario no puede estar vacío");
    if(!$('#APELLIDO_USU').val()) errorMostrarMsj.push("El apellido de usuario no puede estar vacío");
    if(!$('#ALIAS_USU').val()) errorMostrarMsj.push("El alias de usuario no puede estar vacío");
    if(!$('#CLAVE_USU').val()) errorMostrarMsj.push("La contraseña de usuario no puede estar vacío");
    //console.log(this.contarRoles());
    if(contarRoles()==0)
    {
         errorMostrarMsj.push("Escoja al menos un rol");
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


//Funcion para contar los roles marcados en los input tipo check
function contarRoles(){
    var numero = 0;
    var result = jQuery('input[name="rolesR"]:checked');
    if (result.length > 0) {
        result.each(function(){
            numero++;
         });                      
    }else{
       numero=0;
    }
    return numero;
}
function getRolesSeleccionados()
 {
  var listadoRoles =[];
  var result = jQuery('input[name="rolesR"]:checked');
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



    /**Fin codigo USUARIO */

    $('#btnReload').click(function(){
    tabla.ajax.reload();
    console.log("RELOAD OK");
    })

    $('#bootstrap-data-table-export').DataTable({
        dom: 'lBfrtip',
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });

	$('#row-select').DataTable( {
			initComplete: function () {
				this.api().columns().every( function () {
					var column = this;
					var select = $('<select class="form-control"><option value=""></option></select>')
						.appendTo( $(column.footer()).empty() )
						.on( 'change', function () {
							var val = $.fn.dataTable.util.escapeRegex(
								$(this).val()
							);

							column
								.search( val ? '^'+val+'$' : '', true, false )
								.draw();
						} );

					column.data().unique().sort().each( function ( d, j ) {
						select.append( '<option value="'+d+'">'+d+'</option>' )
					} );
				} );
			}
		} );






})(jQuery);
