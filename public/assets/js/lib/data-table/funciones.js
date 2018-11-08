/**function registrarUsuario()
{
    var usuario = {};
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
   
   // tabla.ajax.reload();
    return response.data;
    console.log(response.data)
    limpiarDatosUsuario();
    toastr.success('Registrado correctamente!')
    })
    .catch(function (error) {
        console.log(error);
        toastr.error('No se ha podido guardar el registro.', 'Error!')
        return usuario; 
    });
} 
                
}
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
 }*/
 function listarRolesUpdate(idRegistro){
    var url = '/roles_up/fillddl';
    axios.get(url, { params: { ID_USU: idRegistro } }).then(function (response){
        for (var key in response.data) {
            var selected = response.data[key]['selected'];
            var valor = response.data[key]['id']
            if(selected>0)
            {
                jQuery( "#rol"+valor).prop('checked', true);
            }
            else
            {
                jQuery( "#rol"+valor).prop('checked', false);
            }                                                                          
        }                                               
    })
    .catch(function (error) {
        console.log(error);
    });                     
}
/**
 * Obtiene un usuario dado su id
 * @param {int} idRegistro - id de usuario
 * @param {int} operacion - representa la operacion 1=editar,2=actualizar password
 */
function getUsuarioById(idRegistro,operacion){
    var url = '/usuarios/byid';
    axios.get(url, { params: { ID_USU: idRegistro } }).then(function (response){
        if(operacion==1) //mostrar datos para editar
        {
            $('#CED_RUC_USU').val(response.data.CED_RUC_USU);
            $('#NOMBRE_USU').val(response.data.NOMBRE_USU);
            $('#APELLIDO_USU').val(response.data.APELLIDO_USU);
            $('#TELEFONO_USU').val(response.data.TELEFONO_USU);
            $('#ALIAS_USU').val(response.data.ALIAS_USU);
            $('#DIRECCION_USU').val(response.data.DIRECCION_USU);
            $('#CORREO_USU').val(response.data.CORREO_USU);
            $('#divPassword').hide();
            $('#btnCancelarActualizar').show();
            listarRolesUpdate(idRegistro);        
        }
        else if(operacion==2) //mostrar datos para actualizar contraseña
        {
            $('#id').val(response.data.ID_USU);
            $('#lblUsuario').text(response.data.NOMBRE_USU+" "+response.data.APELLIDO_USU);
            $('#oldPassword').val(response.data.CLAVE_USU);
            $('#newPassword').val('');
        }
                                                                                                                          
    })
    .catch(function (error) {
        console.log(error);
    });                     
}


function desactivar(idRegistro){
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
        axios.put('/usuarios/desactivar',{
        'ID_USU':idRegistro
        }).then(function (response){
        tabla.ajax.reload();
        toastr.warning('El registro ha sido desactivado con éxito!')                    
    })
    .catch(function (error) {
      toastr.error('No se ha podido borrar el registro.', 'Error!')
    });

        
    } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
    ) {
       /** swalWithBootstrapButtons(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
        )*/
    }
    })

}


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
                                             this.cambiarTabActivo('#listado','active show');
                                             this.cambiarTabActivo('#editar','');
                                             this.cambiarTabActivo('#password','');

                                             break;
                                         }
                                          case 1:
                                         {
                                            this.cambiarTabActivo('#editar','active show');
                                             this.cambiarTabActivo('#listado','');
                                             this.cambiarTabActivo('#password','');
                                            $('#editar-tab').html('<i class="fa fa-edit"></i>'+' Editar');
                                            getUsuarioById(idRegistro,1);
                                             break;
                                         }
                                          case 2:
                                         {
                                            this.cambiarTabActivo('#password','active show');
                                             this.cambiarTabActivo('#listado','');
                                             this.cambiarTabActivo('#editar','');
                                             getUsuarioById(idRegistro,2);
                                             $('#lstErroresUpdateClave').empty();
                                             break;
                                         }
                                     }
                         }

