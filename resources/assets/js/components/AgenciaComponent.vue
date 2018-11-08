<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-users"></i> Agencias </h4>
                </div>
                <div class="card-body">
                    <div class="custom-tab">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link" id="listado-tab" data-toggle="tab" href="#listado" role="tab" aria-controls="listado" aria-selected="true" ><i class="fa fa-list"></i> Listado</a>
                            <a class="nav-item nav-link" id="editar-tab" data-toggle="tab" href="#editar" role="tab" aria-controls="editar" aria-selected="false"><i class="fa fa-plus"></i> Nuevo</a>
                            </div>
                        </nav>
                        <div class="tab-content pl-3 pt-2" id="nav-tabContent">
                            <div class="tab-pane fade" id="listado" role="tabpanel" aria-labelledby="listado-tab">
                            <br>
                            <div id="listaAge">   </div>
                             


<!-- modal-->

<!--fin modal-->
                            <div class="table-responsive">
                            
                            </div>                            
                        </div>                       
                            <div class="tab-pane fade" id="editar" role="tabpanel" aria-labelledby="editar-tab">
                                <br>
                                <form id="formagencia" name="formagencia">
                                    <input type="hidden" id="id" value="">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>RUC</label>
                                            
                                            
                                           <!-- <input type="text" id="RUC_AGE" required class="form-control" placeholder="RUC" maxlength="13"  @change="validarcedula()" width="auto"><span class="fa fa-check"></span>-->
                                            

                                            <div class="input-group mb-3">
  <input  type="text" class="form-control" placeholder="RUC" id="RUC_AGE" onkeyup="validarcedula();" maxlength="13">
  <div class="input-group-append" id="indruc">
    
  </div>
 </div>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Nombre</label>
                                            <input type="text"  id="NOMBRE_AGE" required class="form-control" placeholder="Nombre de la Agencia" maxlength="110">
                                        </div>
                                        
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Dirección</label>
                                            <input type="text"  id="DIRECCION_AGE" required class="form-control" placeholder="Dirección de la agencia" maxlength="110">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Cuidad</label>
                                            <input type="text"  id="CIUDAD_AGE" required class="form-control" placeholder="Cuidad" maxlength="110">
                                        </div>
                                        
                                    </div>

                                     <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Teléfono</label>
                                            <input type="tel"  id="TELEFONO_AGE" required class="form-control" placeholder="Teléfono" maxlength="10">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Email</label>
                                            <input type="email"  id="CORREO_AGE" required class="form-control" placeholder="Email" maxlength="110">
                                        </div>

                                        
                                    </div>

                                      <div class="form-row">
                                      <div class="form-group col-md-6">
                                      <label>Logo</label>                    
                                     <!-- imagen para subir -->
                   <div >
                   <input type='file'  id="LOGO_AGE"  class="form-control-file border" />
                       </div>
                       <div >
                           <img id="imgup"  alt="Logo Agencia" />
                       </div>
                                     <!--end imagen subir -->
                                        </div>

                                        
                                        
                                    </div>
                                     <div class="row clearfix div-error">
                                            <ul id="lstErrores"></ul>
                                    </div>  
                                    <hr>                                                             
                                     <button type="button" id="btnGuardarCategoria"  class="btn btn-primary"><i class="fa fa-floppy-o"></i> Guardar</button>
                                     <button type="button" id="btnCancelarActualizar" class="btn btn-warning"><i class="fa fa-times"></i> Cancelar</button>
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
            
            mounted() {         
            /*let sweetalert = document.createElement('script')
            sweetalert.setAttribute('src', 'js/sweetalert2/sweetalert2.js')
            document.head.appendChild(sweetalert)*/     
            let datatable = document.createElement('script')
            datatable.setAttribute('src', 'assets/js/lib/data-table/datatableAgencia.js')
            document.head.appendChild(datatable)
            //this.listarDatos();
            }/*
            methods:{
                Operaciones(){
                 let me=this;
                 me.registrar();
                },
                 registrar(){
                    let me=this;
                    //console.log($('.js-example-responsive').val());  
                   // if(me.validarDatos()){
                    //    return;
                   // }
                                

                   // let me = this;
                    axios.post('/agencias/registrar',{
                        'RUC_AGE':this.RUC_AGE,
                        'NOMBRE_AGE':this.NOMBRE_AGE,
                        'DIRECCION_AGE':this.DIRECCION_AGE,
                        'TELEFONO_AGE':this.TELEFONO_AGE,
                        'CIUDAD_AGE':this.CIUDAD_AGE,
                        'CORREO_AGE':this.CORREO_AGE,
                        'lOGO_AGE':this.lOGO_AGE,
                       // 'ESTADO_AGE':this.ESTADO_AGE                        

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

                    if(!this.RUC_AGE) this.errorMostrarMsj.push("El Ruc no puede estar vacío");
                    if(this.ok==false) this.errorMostrarMsj.push("El Ruc no es valido.");
                    if(!this.NOMBRE_AGE) this.errorMostrarMsj.push("El nombre de la agencia no puede estar vacío");
                    if(!this.DIRECCION_AGE) this.errorMostrarMsj.push("La dirección no puede estar vacío");
                    if(!this.TELEFONO_AGE) this.errorMostrarMsj.push("El teléfono de la agencia no puede estar vacío");
                    if(!this.CIUDAD_AGE) this.errorMostrarMsj.push("La ubicación de la agencia no puede estar vacío"); 
                    if(!this.CORREO_AGE) this.errorMostrarMsj.push("El correo email no puede estar vacío");
                    if(!this.lOGO_AGE) this.errorMostrarMsj.push("El logo no puede estar vacío"); 
                    //console.log(this.contarRoles());
                    if(this.errorMostrarMsj.length) this.error = 1;
                    return this.error;
                },
                limpiarDatos(){
                   // this.modal = 0;
                     //ID_AGE=0;
                     this.NOMBRE_AGE='';
                     this.DIRECCION_AGE='';
                     this.RUC_AGE='' ;
                     this.CIUDAD_AGE='';
                     this.TELEFONO_AGE=''; 
                     this.CORREO_AGE='';
                     this.lOGO_AGE='';
                    // this.ESTADO_AGE='';
                },
          
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
              return;
            this.createImage(files[0]);
             },
            createImage(file) {
              var image = new Image();
              var reader = new FileReader();
              var vm = this;

            reader.onload = (e) => {
              vm.lOGO_AGE = e.target.result;
            };
            reader.readAsDataURL(file);
        },
          removeImage() {
          this.lOGO_AGE = '';
           },

        listarDatos(){
             let me = this;
          var url = '/agencias';
         axios.get(url).then(function (response){
        var respuesta = response.data;
        me.arrayDatos = respuesta.data;
       // me.pagination = 1;
    })
    .catch(function (error) {
     console.log(error);
    });
               },
               
                  
             
        
        }
        */
        }
</script>
<style>
.div-error{
display: flex;
justify-content: center;
}
#imgup{
  max-width:180px;
  border-radius: 5%;
  padding-top: 5px;
}
input[type=file]{
padding:10px;
overflow: hidden;
content: center;
}

</style>