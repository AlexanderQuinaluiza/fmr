<template>
<div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-users"></i> Usuarios </h4>
                </div>
                <div class="card-body">
                    <div class="custom-tab">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link" id="listado-tab" data-toggle="tab" href="#listado" role="tab" aria-controls="listado" aria-selected="true" @click="abrirTab('usuario','registrar')"><i class="fa fa-list"></i> Listado</a>
                            <a class="nav-item nav-link" id="editar-tab" data-toggle="tab" href="#editar" role="tab" aria-controls="editar" aria-selected="false"><i class="fa fa-plus"></i> Nuevo</a>
                            <a class="nav-item nav-link" id="password-tab" data-toggle="tab" href="#password" role="tab" aria-controls="password" aria-selected="false"><i class="fa fa-key"></i> Cambiar Contraseña</a>
                            </div>
                        </nav>
                        <div class="tab-content pl-3 pt-2" id="nav-tabContent">
                            <div class="tab-pane fade" id="listado" role="tabpanel" aria-labelledby="listado-tab">
                            <br>
                            <!--<div class="form-group row">
                                <div class="col-md-12">
                                    <div class="input-group">                             
                                        <input type="text" id="texto" name="texto" v-model="buscar" @keyup="listarDatos()" class="form-control" placeholder="Texto a buscar">                   
                                    </div>
                                </div>               
                            </div>
                            <button id="btnReload">SALUDAR</button>-->
                            <table id="bootstrap-data-table" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                <thead style="color:#fff;background:#546e7a">
                                    <tr>
                                        <th v-for="cabecera in cabeceras" :key="cabecera">{{ cabecera }}</th>                                      
                                    </tr>
                                </thead>
                                <tbody>
                                    <!--<tr v-for="usuario in arrayDatos" :key="usuario.ID_USU">
                                        <td v-text="usuario.ID_USU"></td>
                                        <td v-text="usuario.CED_RUC_USU"></td>
                                        <td v-text="usuario.NOMBRE_USU"></td>
                                        <td v-text="usuario.APELLIDO_USU"></td>
                                        <td>
                                            <span v-if="usuario.ESTADO_USU==1" class="badge badge-success">Activado</span>
                                            <span v-if="usuario.ESTADO_USU==0" class="badge badge-danger">Desactivado</span>                                                                                                                      
                                        </td>
                                        <td>
                                            <div class="btn-group btn-group-sm">
                                                <button class="btn btn-primary" @click="abrirTab('usuario','actualizar',usuario)" ><span class="fa fa-pencil-square-o"></span> Editar</button>
                                                <button class="btn btn-warning" @click="abrirTab('usuario','cambiarClave',usuario)" ><span class="fa fa-key"></span> Cambiar Clave</button>
                                                <template v-if="usuario.ESTADO_USU">
                                                    <button type="button" class="btn btn-danger" @click="desactivar(usuario.ID_USU)"><span class="fa fa-trash"></span> Desactivar</button>
                                                </template>
                                                <template v-else>
                                                    <button type="button" class="btn btn-success" @click="activar(usuario.ID_USU)"><span class="fa fa-check"></span> Activar</button>
                                                </template>                                           
                                            </div>
                                        </td>
                                    </tr>-->                              
                                </tbody>
                             </table>
                            <nav>
                                <ul class="pagination">
                                    <li class="page-item" v-if="pagination.current_page > 1">
                                        <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page - 1)">Ant</a>
                                    </li>
                                    <li class="page-item" v-for="page in pagesNumber" :key="page" :class="[page == isActived ? 'active' : '']">
                                        <a class="page-link" href="#" @click.prevent="cambiarPagina(page)" v-text="page"></a>
                                    </li>                    
                                    <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                                        <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page + 1)">Sig</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>                       
                            <div class="tab-pane fade" id="editar" role="tabpanel" aria-labelledby="editar-tab">
                               
                         
                                <br>
                                <form @submit="operaciones()" id="formRegistro">
                                     <div class="row">
                                    <div class="col-md-6">
                                         <div class="form-group row">
                                            <label class="col-md-3 form-control-label" for="text-input">Ced/Ruc</label>
                                            <div class="col-md-9">
                                                <input autofocus tabindex="1" type="text" v-model="CED_RUC_USU" id="CED_RUC_USU" required class="form-control" placeholder="Cédula/Ruc de usuario" maxlength="13">                                           
                                            </div>
                                         </div>
                                         <div class="form-group row">
                                            <label class="col-md-3 form-control-label" for="email-input">Apellido</label>
                                            <div class="col-md-9">
                                                <input tabindex="3" type="text" v-model="APELLIDO_USU"  id="APELLIDO_USU" required class="form-control" placeholder="Apellido de usuario" maxlength="90">
                                            </div>
                                         </div>
                                         <div class="form-group row">
                                            <label class="col-md-3 form-control-label" for="email-input">Alias</label>
                                            <div class="col-md-9">
                                                <input tabindex="5" type="text" v-model="ALIAS_USU" id="ALIAS_USU" required class="form-control" placeholder="Alias de usuario" maxlength="120">
                                            </div>
                                         </div>
                                          <div class="form-group row">
                                            <label class="col-md-3 form-control-label" for="email-input">Dirección</label>
                                            <div class="col-md-9">
                                                <input tabindex="7" type="text" v-model="DIRECCION_USU" id="DIRECCION_USU" required class="form-control" placeholder="Dirección de usuario" maxlength="120">
                                            </div>
                                         </div>
                                         

                                    </div>
                                     <div class="col-md-6">
                                         <div class="form-group row">
                                            <label class="col-md-3 form-control-label" for="text-input">Nombre</label>
                                            <div class="col-md-9">
                                                <input tabindex="2" type="text" v-model="NOMBRE_USU" id="NOMBRE_USU" required class="form-control" placeholder="Nombre de usuario" maxlength="90">                                         
                                            </div>
                                         </div>
                                         <div class="form-group row">
                                            <label class="col-md-3 form-control-label" for="email-input">Teléfono</label>
                                            <div class="col-md-9">
                                                <input tabindex="4" type="text" v-model="TELEFONO_USU" id="TELEFONO_USU" required class="form-control" placeholder="Teléfono de usuario" maxlength="10">
                                            </div>
                                         </div>
                                         
                                         <div class="form-group row">
                                            <label class="col-md-3 form-control-label" for="email-input">Correo</label>
                                            <div class="col-md-9">
                                                <input tabindex="6" type="text" v-model="CORREO_USU" id="CORREO_USU" required class="form-control" placeholder="Correo de usuario" maxlength="110">
                                            </div>
                                         </div>                                  
                                    </div>
                                </div>

                                <div class="row form-group">
                                            <label class="col-md-2 form-control-label">Roles</label>
                                            <div class="col-md-10">
                                               <!--  <select tabindex="8" style="width: 100%" class="js-example-responsive" multiple="multiple" v-model="data.selected">
                                                    <option v-for="option in data.options" v-bind:value="option.id" :selected="option.selected==1?true:false" v-text="option.text">{{ option.text }}</option>
                                                </select>-->
   <!--  <input type="checkbox" name="cities"  value="Pune"> Pune
    <input type="checkbox" name="cities" value="Baramati"> Baramati
    <input type="checkbox" name="cities" value="London"> London
    <input type="button" id="btncitiesgroup" value="Get cities checked group">-->

<div class="form-check" id="divchecks">
                               
                              </div>

    
            <!--<div class="form-check" v-for="option in data.options">
                <div class="checkbox">
                  <label for="checkbox1" class="form-check-label ">
                   <input type="checkbox" 
                   id="option.id"
                   name="roles_" 
                    :checked="option.selected==1?true:false"
                    :value="option.id" 
                    class="form-check-input"> {{option.text}}
                  </label>
                </div>              
            </div>-->
        

                                            </div>
                                </div> 
                                <div class="row form-group">
                                            <label class="col-md-2 form-control-label" for="email-input">Contraseña</label>
                                            <div class="col-md-7">
                                                 <input tabindex="9" type="password" id="CLAVE_USU" v-model="CLAVE_USU" required class="form-control" placeholder="Contraseña de usuario" maxlength="255">
                                            </div>
                                              <label class="col-md-3 form-control-label">
                                             <input type="checkbox" id="chkVerPassword" value="option1"> Ver contraseña </label>
                                </div>



                                    <div class="row clearfix div-error">
                                        <ul id="lstErrores"></ul>
                                        <!--<div class="col-md-6 col-md-offset-3 text-error">
                                            <div v-for="error in errorMostrarMsj" :key="error" v-text="error"></div>                                                    
                                        </div>-->
                                    </div>                                                             
                                    <button type="button" id="btnRegistroUsuario" class="btn btn-primary">Guardar</button>
                                    <button type="button" v-if="tipoAccion==2" @click="actualizar()" class="btn btn-primary">Actualizar</button>
                                </form>
                            </div>

                            <div class="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
                                <br>
                                 <form>
                                <div class="row form-group">
                                    <label class="col-md-3 form-control-label">Usuario</label>
                                    <label class="col-md-9 form-control-label" style="weight-bol" id="lblUsuario"> </label>
                                        
                                </div>
                                <div class="row form-group">
                                    <label class="col-md-3 form-control-label">Contraseña actual</label>
                                    <div class="col-md-9">
                                        <div class="input-group">                             
                                            <input type="password" id="oldPassword" name="oldPassword" class="form-control" placeholder="Contaseña actual">                   
                                        </div>
                                    </div>      
                                </div>
                                <div class="row form-group">
                                    <label class="col-md-3 form-control-label">Contraseña nueva</label>
                                    <div class="col-md-9">
                                        <div class="input-group">                             
                                            <input type="password" id="newPassword" name="newPassword" class="form-control" placeholder="Contraseña nueva">                   
                                        </div>
                                    </div>       
                                </div>
                                <div class="row form-group">
                                     <div class="col-md-3">&nbsp;&nbsp;</div>
                                     <div class="col-md-9">
                                       <label class="col-md-3 form-control-label">
                                        <input type="checkbox" id="chkVerPasswd" value="verpasswd"> Ver contraseña </label>
                                     </div>                                      
                                </div>
                                <div class="row clearfix div-error" v-show="error">
                                        <div class="col-md-6 col-md-offset-3 text-error">
                                            <div v-for="error in errorMostrarMsjClave" :key="error" v-text="error"></div>                                                    
                                        </div>
                                    </div> 
                                 <button type="button" @click="actualizarClave()" class="btn btn-primary">Actualizar Contraseña</button>
                                
                                </form>
                           
                            </div> 

                        </div>
                    </div>
                </div>
            </div>
        </div>                
    </div>




     
</template>

<script>
        export default {
            data(){
                return{
                    ID_USU : 0,
                    CED_RUC_USU : '',
                    NOMBRE_USU : '',
                    APELLIDO_USU : '',
                    TELEFONO_USU : '',
                    ALIAS_USU : '',
                    CLAVE_USU : '',
                    DIRECCION_USU : '',
                    CORREO_USU : '',
                    arrayDatos : [],
                    cabeceras : ["Id","Ced/Ruc","Nombre","Apellido","Estado","Acciones"],
                    numeroRoles : 0,
                    tipoAccion : 1,
                    error : 0,
                    errorMostrarMsj : [],
                    errorMostrarMsjClave : [],
                    data: {
    selected: '',
    options: [
        
    ]
  },
                    rolesCreate: [],
                    rolesUpdate: [],
                    pagination:{
                        'total':0,
                        'current_page':0,
                        'per_page':0,
                        'last_page':0,
                        'from':0,
                        'to':0,
       
                    },
                    offset:3,
                    buscar:''
                }
            },
            computed:{
                isActived:function(){
                    return this.pagination.current_page;
                },
                //Calcula los elementos de la paginacion
                pagesNumber:function(){
                    if(!this.pagination.to){
                        return [];
                    }

                    var from = this.pagination.current_page - this.offset;
                    if(from < 1){
                        from = 1;
                    }

                    var to = from + (this.offset * 2);
                    if(to >= this.pagination.last_page){
                        to = this.pagination.last_page;
                    }

                    var pagesArray = [];
                    while(from <= to){
                        pagesArray.push(from);
                        from++;
                    }
                    return pagesArray;

                }

            },
            mounted() {              
            //this.listarDatos();


//tabla.ajax.reload();
//this.listarRolesCreate();
//this.cambiarTab(0);
//this.listarRolesUpdate(16);
                
              


           /** jQuery(".js-example-responsive").select2({
  width: 'resolve',
   placeholder: 'Select an option',
   data:this.data.options // need to override the changed default
});*/

 // jQuery('.js-example-responsive').append(this.data.options).trigger('change');
          
/**jQuery('#chkVerPassword').click(function(){
$("#txtPassword").prop("type", "text");
});*/


jQuery('#chkVerPassword').click(function() {
   if (jQuery('#chkVerPassword:checked').val() !== undefined)
    {
        jQuery("#txtPassword").prop("type", "text");
    }
    else
    {
        jQuery("#txtPassword").prop("type", "password");
    }
});

jQuery('#chkVerPasswd').click(function() {
   if (jQuery('#chkVerPasswd:checked').val() !== undefined)
    {
        
        jQuery("#oldPassword").prop("type", "text");
        jQuery("#newPassword").prop("type", "text");
    }
    else
    {       
        jQuery("#oldPassword").prop("type", "password");
        jQuery("#newPassword").prop("type", "password");
    }
});

//chkVerPasswd

jQuery('#btncitiesgroup').click(function(){
              getCheckedGroups('roles_');
            });
         var getCheckedGroups = function(groupname){
               var result = jQuery('input[name="'+groupname+'"]:checked');
              if (result.length > 0) {
              	var resultstring = result.length +"checkboxes checked <br>";
              	result.each(function(){
                      console.log(jQuery(this).val());
              		//resultstring += jQuery(this).val(); //append value to exsiting var
              	});
    			
    		}else{
    			console.log(" No checkbox  is Checked");
    		}        
         };



           

            let sweetalert = document.createElement('script')
            sweetalert.setAttribute('src', 'js/sweetalert2/sweetalert2.js')
            document.head.appendChild(sweetalert)

             let sa = document.createElement('script')
            sa.setAttribute('src', 'assets/js/lib/data-table/datatables-init.js')
            document.head.appendChild(sa)

           //tabla.ajax.reload();
            },
             methods:{
                listarDatos(){
                    let me = this;
                    var url = '/usuarios';
                    axios.get(url).then(function (response){
                        var respuesta = response.data;
                        me.arrayDatos = respuesta.data;
                        me.pagination = 1;
                    })
                    .catch(function (error) {
                     console.log(error);
                    });
                },
                 cambiarTabActivo(idTab,clase)
                {
                    if(clase=='active show')
                    {
                        jQuery(idTab).attr('class', 'tab-pane fade active show');
                        jQuery(idTab+'-tab').attr('class', 'nav-item nav-link active show');
                    }
                    else
                    {
                        jQuery(idTab).attr('class', 'tab-pane fade');
                        jQuery(idTab+'-tab').attr('class', 'nav-item nav-link');
                    }
                jQuery('#listado-tab').click(function(){
                jQuery('#editar-tab').html('<i class="fa fa-plus"></i>'+' Nuevo');
                });
                },
                cambiarTab(indice)
                {
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
                                    console.log("PENDEJO");
                                    break;
                                }
                                 case 2:
                                {
                                   this.cambiarTabActivo('#password','active show');
                                    this.cambiarTabActivo('#listado','');
                                    this.cambiarTabActivo('#editar','');
                                    break;
                                }  
                            }
                },
                operaciones()
                {
                    let me = this;
                    if(this.tipoAccion==1)
                    me.registrar();
                    else me.actualizar();

                },
                listarRolesCreate(){
                    let me = this;
                    var url = '/roles/fillddl';
                    axios.get(url).then(function (response){
                        me.rolesCreate = response.data;
                        me.data.options = response.data;
                        var valor = "";
                        var texto = "";
                        var html = '';
                        //checked
                        for (var key in response.data) {
                            valor = response.data[key]['id'];
                            texto = response.data[key]['text'];
                            html+= '<div class="checkbox"><label class="form-check-label ">'+
                        '<input type="checkbox" name="rolesR" id="rol'+valor+'" value="'+valor+'" class="form-check-input">'+
                        texto+'</label></div>';                        
                           
                        }
                        jQuery('#divchecks').append(html);
                      //  console.log(me.rolesCreate);                      
                    })
                    .catch(function (error) {
                     console.log(error);
                    });                  
                },
                 listarRolesUpdate(idRegistro){
                    let me = this;
                    var url = '/roles_up/fillddl';
                    axios.get(url, { params: { ID_USU: idRegistro } }).then(function (response){
                        me.rolesUpdate = response.data;
                        //me.data.options = null;
                        me.data.options = response.data;
//$("#customers_select").select2("val", "");
                    //    jQuery('.js-example-responsive').select2("val", "");

                        
                         //jQuery('.js-example-responsive').append(me.data.options).trigger('change');

                        
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

                        console.log(me.data.options);     
                                  
                    })
                    .catch(function (error) {
                     console.log(error);
                    });                  
                },
                cambiarPagina(page){
                    let me = this;
                    //Actualiza la página actual
                    me.pagination.current_page = page;
                    me.listarDatos();
                },
                contarRoles(){
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
                },
                limpiarCheckRoles()
                {
                    var result = jQuery('input[name="rolesR"]:checked');
                    if (result.length > 0) {
                        result.each(function(){
                           jQuery(this).prop('checked',false);
                         });
                        
                    }else{
                        console.log(" No checkbox");
                    }
                },
                getRolesSeleccionados()
                {
                    var listadoRoles =[];
                    var result = jQuery('input[name="rolesR"]:checked');
                    if (result.length > 0) {
                        result.each(function(){
                            listadoRoles.push(jQuery(this).val()); 
                            console.log("item: "+jQuery(this).val());                  
                        });
                        
                    }else{
                        console.log(" Ningun checkbox  esta seleccionado");
                    }
                    return listadoRoles;
                },
                registrar(){
                  //console.log($('.js-example-responsive').val());  
                    if(this.validarDatos()){
                        return;
                    }
                   
            
                    let me = this;
                    axios.post('/usuarios/registrar',{
                        'CED_RUC_USU':this.CED_RUC_USU,
                        'NOMBRE_USU':this.NOMBRE_USU,
                        'APELLIDO_USU':this.APELLIDO_USU,
                        'TELEFONO_USU':this.TELEFONO_USU,
                        'ALIAS_USU':this.ALIAS_USU,
                        'CLAVE_USU':this.CLAVE_USU,
                        'DIRECCION_USU':this.DIRECCION_USU,
                        'CORREO_USU':this.CORREO_USU,
                        'ROLES_USU': this.getRolesSeleccionados()

                    }).then(function (response){
                    me.limpiarDatos();
                    me.listarDatos();
                    toastr.success('Registrado correctamente!')
                    console.log(response);
                    })
                    .catch(function (error) {
                     console.log(error);
                     toastr.error('No se ha podido guardar el registro.', 'Error!')
                    });
                },
                validarDatos(){
                    this.error = 0;
                    this.errorMostrarMsj = [];

                    if(!this.CED_RUC_USU) this.errorMostrarMsj.push("La cédula/ruc no puede estar vacío");
                    if(!this.NOMBRE_USU) this.errorMostrarMsj.push("El nombre de usuario no puede estar vacío");
                    if(!this.APELLIDO_USU) this.errorMostrarMsj.push("El apellido de usuario no puede estar vacío");
                    if(!this.ALIAS_USU) this.errorMostrarMsj.push("El alias de usuario no puede estar vacío");
                    if(!this.CLAVE_USU) this.errorMostrarMsj.push("La contraseña de usuario no puede estar vacío");
                    //console.log(this.contarRoles());
                    if(this.contarRoles()==0)
                    {
                         this.errorMostrarMsj.push("Escoja al menos un rol");
                    }
                    if(this.errorMostrarMsj.length) this.error = 1;
                    return this.error;
                },
                 validarClave(){
                    this.error = 0;
                    this.errorMostrarMsjClave = [];
                    if(!this.ID_USU)this.errorMostrarMsjClave.push("Escoja un usuario existente de la lista");
                    if(!jQuery('#newPassword').val()) this.errorMostrarMsjClave.push("La contraseña nueva de usuario no puede estar vacía");
                    if(this.errorMostrarMsjClave.length) this.error = 1;
                    return this.error;
                },
                actualizarClave()
                {
                      if(this.validarClave()){
                        return;
                    }
                    let me = this;
                    axios.put('/usuarios/actualizarClave',{
                        'ID_USU':this.ID_USU,
                        'CLAVE_USU':jQuery('#newPassword').val()                      
                    }).then(function (response){                  
                    me.listarDatos();
                    toastr.info('Contraseña actualizada correctamente!')
                    console.log(response);
                    })
                    .catch(function (error) {
                     console.log(error);
                     toastr.error('No se ha podido actualizar la contraseña.', 'Error!')
                    });

                },
                actualizar(){
                     if(this.validarDatos()){
                        return;
                    }                                    
                    let me = this;
                    axios.put('/usuarios/actualizar',{
                        'ID_USU':this.ID_USU,
                        'CED_RUC_USU':this.CED_RUC_USU,
                        'NOMBRE_USU':this.NOMBRE_USU,
                        'APELLIDO_USU':this.APELLIDO_USU,
                        'TELEFONO_USU':this.TELEFONO_USU,
                        'ALIAS_USU':this.ALIAS_USU,
                        'DIRECCION_USU':this.DIRECCION_USU,
                        'CORREO_USU':this.CORREO_USU,
                        'ROLES_USU': me.getRolesSeleccionados()
                    }).then(function (response){
                   console.log(me.getRolesSeleccionados());
                    me.listarDatos();
                    toastr.info('Actualizado correctamente!')
                    console.log(response);
                    })
                    .catch(function (error) {
                     console.log(error);
                     toastr.error('No se ha podido actualizar el registro.', 'Error!')
                    });
                },
                desactivar(idRegistro){
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

                        let me = this;
                        axios.put('/usuarios/desactivar',{
                        'ID_USU':idRegistro
                        }).then(function (response){
                        me.listarDatos();
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

                },
                activar(idRegistro){
                     let me = this;
                        axios.put('/usuarios/activar',{
                        'ID_USU':idRegistro
                        }).then(function (response){
                        me.listarDatos();
                    })
                    .catch(function (error) {
                     console.log(error);
                    });
                },
                limpiarDatos(){
                    this.modal = 0;
                    this.tituloModal = '';
                    this.CED_RUC_USU = '';
                    this.NOMBRE_USU = '';
                    this.APELLIDO_USU = '';
                    this.TELEFONO_USU = '';
                    this.ALIAS_USU = '';
                    this.CLAVE_USU = '';
                    this.DIRECCION_USU = '';
                    this.CORREO_USU = '';
                    this.limpiarCheckRoles();
                },
                abrirTab(modelo,accion,data=[])
                 {
                    switch (modelo) 
                     {
                        case "usuario":
                        {
                            switch (accion) 
                            {
                                case "registrar":
                                {
                                   
                                    this.CED_RUC_USU = '';
                                    this.NOMBRE_USU = '';
                                    this.APELLIDO_USU = '';
                                    this.TELEFONO_USU = '';
                                    this.ALIAS_USU = '';
                                    this.CLAVE_USU = '';
                                    this.DIRECCION_USU = '';
                                    this.CORREO_USU = '';                             
                                    this.tipoAccion = 1;                                 
                                    this.error = 0;
                                    this.errorMostrarMsj = [];
                                    this.limpiarCheckRoles();
                                    break;
                                }
                                    
                                case "actualizar":
                                {
                                    this.ID_USU = data['ID_USU'];
                                    this.CED_RUC_USU = data['CED_RUC_USU'];
                                    this.NOMBRE_USU = data['NOMBRE_USU'];
                                    this.APELLIDO_USU = data['APELLIDO_USU'];
                                    this.TELEFONO_USU = data['TELEFONO_USU'];
                                    this.ALIAS_USU = data['ALIAS_USU'];
                                    //this.CLAVE_USU = data['CLAVE_USU'];
                                    this.DIRECCION_USU = data['DIRECCION_USU'];
                                    this.CORREO_USU = data['CORREO_USU'];   
                                    this.tipoAccion = 2;
                                    this.error = 0;
                                    this.errorMostrarMsj = [];
                                    this.cambiarTab(1);                                  
                                    this.listarRolesUpdate(this.ID_USU);                                  
                                    jQuery('#editar-tab').html('<i class="fa fa-pencil"></i>'+' Editar');
                                    
                                    break;
                                }
                                case "cambiarClave":
                                {
                                    this.modal = 1;
                                    this.tituloModal = 'Actualizar Usuario';
                                    this.ID_USU = data['ID_USU'];
                                    this.CLAVE_USU = data['CLAVE_USU'];
                                    this.error = 0;
                                    this.errorMostrarMsj = [];
                                    this.cambiarTab(2);
                                    console.log(data['NOMBRE_USU']+" "+data['APELLIDO_USU']);
                                    jQuery('#lblUsuario').html(data['NOMBRE_USU']+" "+data['APELLIDO_USU']);
                                    jQuery("#oldPassword").val(data['CLAVE_USU']);
                                    //jQuery("#newPassword").val("type", "password");                                
                                    //jQuery('#editar-tab').html('<i class="fa fa-pencil"></i>'+' Editar');
                                    break;
                                }
                                case "listar":
                                {
                      if(this.ID_USU>0){
                     // if(this.CED_RUC_US ||this.NOMBRE_USU ||
                      //this.APELLIDO_USU || this.TELEFONO_USU || this.ALIAS_USU
                      //|| this.CLAVE_USU || this.DIRECCION_USU || this.CORREO_USU)){

                          /* this.ID_USU = data['ID_USU'];
                                    this.CED_RUC_USU = data['CED_RUC_USU'];
                                     = data['NOMBRE_USU'];
                                     = data['APELLIDO_USU'];
                                     = data['TELEFONO_USU'];
                                     = data['ALIAS_USU'];
                                     = data['CLAVE_USU'];
                                     = data['DIRECCION_USU'];
                                     = data['CORREO_USU'];*/
                                    console.log("editar");

                      }  
                      else
                      {
                          if(this.CED_RUC_US ||this.NOMBRE_USU ||
                            this.APELLIDO_USU || this.TELEFONO_USU || this.ALIAS_USU
                            || this.CLAVE_USU || this.DIRECCION_USU || this.CORREO_USU)
                            {
                              console.log("nuevo");
                            }
                            else
                            {
                                console.log("kkkk");
                            }

                      }            
                  /**  */

                                    /**this.modal = 1;
                                    this.tituloModal = 'Actualizar Usuario';
                                    this.ID_USU = data['ID_USU'];
                                    this.CLAVE_USU = data['CLAVE_USU'];
                                    this.error = 0;
                                    this.errorMostrarMsj = [];
                                    this.cambiarTab(2);
                                    console.log(data['NOMBRE_USU']+" "+data['APELLIDO_USU']);
                                    jQuery('#lblUsuario').html(data['NOMBRE_USU']+" "+data['APELLIDO_USU']); */                                 
                                    //jQuery('#editar-tab').html('<i class="fa fa-pencil"></i>'+' Editar');
                                    break;
                                }    
                            }
                         }   
                        
                     }

                 }

             }
        }
</script>
<style>
.div-error{
display: flex;
justify-content: center;
}
.text-error{
color: red !important;
font-weight: bold;
}
</style>

