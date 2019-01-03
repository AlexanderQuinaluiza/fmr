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
                            <a class="nav-item nav-link" id="listado-tab" data-toggle="tab" href="#listado" role="tab" aria-controls="listado" aria-selected="true"><i class="fa fa-list"></i> Listado</a>
                            <a class="nav-item nav-link" id="editar-tab" data-toggle="tab" href="#editar" role="tab" aria-controls="editar" aria-selected="false"><i class="fa fa-plus"></i> Nuevo</a>
                            <a class="nav-item nav-link" id="password-tab" data-toggle="tab" href="#password" role="tab" aria-controls="password" aria-selected="false"><i class="fa fa-key"></i> Cambiar Contraseña</a>
                            <a class="nav-item nav-link" id="caja-tab" data-toggle="tab" href="#caja" role="tab" aria-controls="caja" aria-selected="false"><i class="fa lock"></i> Asignar Caja</a>
                            </div>
                        </nav>
                        <div class="tab-content pl-3 pt-2" id="nav-tabContent">
                            <div class="tab-pane fade" id="listado" role="tabpanel" aria-labelledby="listado-tab">
                                <br>                          
                                <table id="bootstrap-data-table" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                    <thead style="color:#fff;background:#546e7a">
                                        <tr>
                                            <th v-for="cabecera in cabeceras" :key="cabecera">{{ cabecera }}</th>                                      
                                        </tr>
                                    </thead>
                                    <tbody>                                                              
                                    </tbody>
                                </table>                          
                            </div>                       
                            <div class="tab-pane fade" id="editar" role="tabpanel" aria-labelledby="editar-tab">
                                <br>
                                <form  id="formRegistro">
                                     <div class="row">
                                    <div class="col-md-6">
                                         <div class="form-group row">
                                            <label class="col-md-3 form-control-label" for="text-input">Ced/Ruc</label>
                                            <div class="col-md-9">
                                                <input autofocus tabindex="1" type="text" id="CED_RUC_USU" required class="form-control" placeholder="Cédula/Ruc de usuario" maxlength="13">                                           
                                            </div>
                                         </div>
                                         <div class="form-group row">
                                            <label class="col-md-3 form-control-label" for="email-input">Apellido</label>
                                            <div class="col-md-9">
                                                <input tabindex="3" type="text" id="APELLIDO_USU" required class="form-control" placeholder="Apellido de usuario" maxlength="90">
                                            </div>
                                         </div>
                                         <div class="form-group row">
                                            <label class="col-md-3 form-control-label" for="email-input">Alias</label>
                                            <div class="col-md-9">
                                                <input tabindex="5" type="text" id="ALIAS_USU" required class="form-control" placeholder="Alias de usuario" maxlength="120">
                                            </div>
                                         </div>
                                          <div class="form-group row">
                                            <label class="col-md-3 form-control-label" for="email-input">Dirección</label>
                                            <div class="col-md-9">
                                                <input tabindex="7" type="text" id="DIRECCION_USU" required class="form-control" placeholder="Dirección de usuario" maxlength="120">
                                            </div>
                                         </div>
                                         

                                    </div>
                                     <div class="col-md-6">
                                         <div class="form-group row">
                                            <label class="col-md-3 form-control-label" for="text-input">Nombre</label>
                                            <div class="col-md-9">
                                                <input tabindex="2" type="text" id="NOMBRE_USU" required class="form-control" placeholder="Nombre de usuario" maxlength="90">                                         
                                            </div>
                                         </div>
                                         <div class="form-group row">
                                            <label class="col-md-3 form-control-label" for="email-input">Teléfono</label>
                                            <div class="col-md-9">
                                                <input tabindex="4" type="text" id="TELEFONO_USU" required class="form-control" placeholder="Teléfono de usuario" maxlength="10">
                                            </div>
                                         </div>
                                         
                                         <div class="form-group row">
                                            <label class="col-md-3 form-control-label" for="email-input">Correo</label>
                                            <div class="col-md-9">
                                                <input tabindex="6" type="text" id="CORREO_USU" required class="form-control" placeholder="Correo de usuario" maxlength="110">
                                            </div>
                                         </div>                                  
                                    </div>
                                </div>

                                <div class="row form-group">
                                            <label class="col-md-2 form-control-label">Roles</label>
                                            <div class="col-md-10">                                          
                                                <div class="form-check" id="divchecks">
                                                </div>
                                            </div>
                                </div> 
                                <div class="row form-group" id="divPassword">
                                            <label class="col-md-2 form-control-label" for="email-input">Contraseña</label>
                                            <div class="col-md-7">
                                                 <input tabindex="9" type="password" id="CLAVE_USU"  required class="form-control" placeholder="Contraseña de usuario" maxlength="255">
                                            </div>
                                              <label class="col-md-3 form-control-label">
                                             <input type="checkbox" id="chkVerPassword" value="option1"> Ver contraseña </label>
                                </div>
                                    <div class="row clearfix div-error">
                                        <ul id="lstErrores"></ul>
                                    </div>                                                             
                                    <button type="button" id="btnGuardarUsuario" class="btn btn-primary"><i class="fa fa-floppy-o"></i> Guardar</button>
                                    <button type="button" id="btnCancelarActualizar" class="btn btn-warning"><i class="fa fa-times"></i> Cancelar</button>
                                </form>
                            </div>

                            <div class="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
                                <br>
                                 <form>
                                <input type="hidden" id="id" value="">
                                <div class="row form-group">
                                    <label class="col-md-3 form-control-label">Usuario seleccionado</label>
                                    <label class="col-md-9 form-control-label username" style="weight-bol" id="lblUsuario"> </label>                                       
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
                                <div class="row clearfix div-error">
                                        <ul id="lstErroresUpdateClave"></ul>
                                </div> 
                                 <button type="button" id="btnUpdateP" class="btn btn-primary"><i class="fa fa-key"></i> Actualizar Contraseña</button>
                                
                                </form>
                           
                            </div> 

                            <div class="tab-pane fade" id="caja" role="tabpanel" aria-labelledby="caja-tab">
                                <br>

                                <form  id="formAsignarCaja">
                                    <div class="row form-group">
                                        <label class="col-md-3 form-control-label">Usuario seleccionado:</label>
                                        <label class="col-md-9 form-control-label username" style="weight-bol"> </label>                                       
                                    </div>                                 
                                    <div class="row form-group">
                                        <div class="col-md-10">                                          
                                            <label>Seleccione la caja para asignación a usuario:</label><br>
                                            <div id="divCajasAsignar"></div>   
                                        </div>
                                    </div>                                                                                                                           
                                    <button type="button" id="btnGuardarAsignarCaja" class="btn btn-primary"><i class="fa fa-floppy-o"></i> Guardar</button>
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
                    cabeceras : ["Id","Ced/Ruc","Nombre","Apellido","Estado","Acciones"]
                }
            },
            mounted() {              
            let sa = document.createElement('script')
            sa.setAttribute('src', 'assets/js/lib/data-table/datatables-init.js')
            document.head.appendChild(sa)
            }
        }
</script>
<style>
.div-error{
display: flex;
justify-content: center;
}
input[type="radio"] + .label-text:before{
	content: "\f10c";
	font-family: "FontAwesome";
	speak: none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
	-webkit-font-smoothing:antialiased;
	width: 1em;
	display: inline-block;
	margin-right: 5px;
}

input[type="radio"]:checked + .label-text:before{
	content: "\f192";
	color: #8e44ad;
	animation: effect 250ms ease-in;
}

input[type="radio"]:disabled + .label-text{
	color: #aaa;
}

input[type="radio"]:disabled + .label-text:before{
	content: "\f111";
	color: #ccc;
}

/*Radio Toggle*/

.toggle input[type="radio"] + .label-text:before{
	content: "\f204";
	font-family: "FontAwesome";
	speak: none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
	-webkit-font-smoothing:antialiased;
	width: 1em;
	display: inline-block;
	margin-right: 10px;
}

.toggle input[type="radio"]:checked + .label-text:before{
	content: "\f205";
	color: #16a085;
	animation: effect 250ms ease-in;
}

.toggle input[type="radio"]:disabled + .label-text{
	color: #aaa;
}

.toggle input[type="radio"]:disabled + .label-text:before{
	content: "\f204";
	color: #ccc;
}
.toggle{
font-size: 18px;
}
@keyframes effect{
	0%{transform: scale(0);}
	25%{transform: scale(1.3);}
	75%{transform: scale(1.4);}
	100%{transform: scale(1);}
}
</style>

