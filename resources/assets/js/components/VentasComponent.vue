<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-file-text"></i> Ventas </h4>
                </div>
                <div class="card-body">
                   
                          <!--Inicio modal productos seleccionados para descuentos-->
                    <div class="modal fade" id="modalnewCl" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-primary" role="document">
                            <div class="modal-content">
                                <div class="modal-header modal-header-primary">
                                    <h5 class="modal-title" id="titulodescuento"> Nuevo Cliente</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">


                                           <form name="formcl"> 
                                <input type="hidden" id="id" value="">
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label>Cédula/RUC</label>
                                        <div class="input-group mb-3">
                  <input  type="text" class="form-control" placeholder="RUC/CED" id="CED_RUC_CLI" onkeyup="onlyvalidarcedula();" maxlength="13"  autofocus autocomplete="true" onfocus="this.select()">
                  <div class="input-group-append" id="indruc">
    
                  </div>
                        </div>
                                       <!-- <input type="text" id="CED_RUC_CLI" maxlength="13" class="form-control" placeholder="Cédula/RUC">-->
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label>Nombre</label>
                                        <input type="text" id="NOMBRE_CLI" maxlength="90" class="form-control" placeholder="Nombre">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputPassword4">Apellido</label>
                                        <input type="text" id="APELLIDO_CLI" maxlength="90" class="form-control" placeholder="Apellido">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label>Teléfono</label>
                                        <input type="text" id="TELEFONO_CLI" maxlength="10" class="form-control" placeholder="Teléfono">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label>Dirección</label>
                                        <input type="text" id="DIRECCION_CLI" maxlength="140" class="form-control" placeholder="Dirección">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label>Correo electrónico</label>
                                        <input type="text" id="CORREO_CLI" maxlength="100" class="form-control"  placeholder="Correo electrónico">
                                    </div>
                                </div>
  
                                    <div class="row clearfix div-error">
                                            <ul id="lstErrores"></ul>
                                    </div>                                                             
                                    <button type="button" id="btnGuardar" class="btn btn-primary" onclick="registrar();"><i class="fa fa-floppy-o"></i> Guardar</button>
                                    <!--<button type="button" id="btnCancelarActualizar" class="btn btn-warning"><i class="fa fa-times"></i> Cancelar</button>-->
                                </form>             
                                                       
                                 </div>
                                 <!-- footer modal comment 
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button>
                                
                                </div>
                                -->
                            </div>
                        </div>
                    </div> <!--Fin modal productos selecionados descuentos -->
                  



                    <div class="custom-tab">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link" id="listado-tab" data-toggle="tab" href="#listado" role="tab" aria-controls="listado" aria-selected="true" ><i class="fa fa-list"></i> Buscar</a>
                            <a class="nav-item nav-link" id="editar-tab" data-toggle="tab" href="#editar" role="tab" aria-controls="editar" aria-selected="false"><i class="fa fa-file-text"></i> Facturar</a>
                            </div>
                        </nav>
                        <div class="tab-content pl-3 pt-2" id="nav-tabContent">
                            <div class="tab-pane fade" id="listado" role="tabpanel" aria-labelledby="listado-tab">
                            <br>
                            
                            <div class="table-responsive">
                            <table id="table_busqueda" class="table table-bordered table-hover dataTable js-exportable">
                                <thead style="color:#fff;background:#546e7a;">
                                    <tr>
                                        
                                        <th v-for="cabecera in cabeceras" :key="cabecera">{{ cabecera }}</th>                                      
                                    </tr>
                                </thead>
                                <tbody>                                                
                                </tbody>
                             </table>
                            </div>                            
                        </div>                       
                            <div class="tab-pane fade" id="editar" role="tabpanel" aria-labelledby="editar-tab">
                                <br>
                                
                                <!-- inicio edicion -->
                                <form name="formfact" >
                                    <input type="hidden" id="id" value="">
                                      
                                     <div class="row">
                                        <div class="col-md-3" >
           <!-- datos farmacia-->
<div class="card" style="width: 18rem;">
<img class="card-img-top" id="imglogofac" src="https://image.freepik.com/vector-gratis/set-logos-farmacia_1198-60.jpg" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title" id="rucfac">R.U.C: 1760013210001</h5>  
    <h6 class="card-title">Factura</h6>
    <div id="numfac">001-222-000000###</div>
    <p class="card-text" id="direccionfac">Direccion: efasf aefasfaf <br> Dirección sucursal: na/na</p>
    
  </div>
</div>
</div >
                                             <!-- fi: na/nan datos -->

                                        <div class="col-md-9">
                                           

                 <!-- div clientes cabecera -->
                                             <div class="card">
  <div class="card-header">
    Datos Clientes
  </div>
  <div class="card-body">
   <div class="form-row">
                                        <div class="form-group col-md-4">
                                             <label>RUC/CED</label>
                                            
                                            
                                           <!-- <input type="text" id="RUC_AGE" required class="form-control" placeholder="RUC" maxlength="13"  @change="validarcedula()" width="auto"><span class="fa fa-check"></span>-->
                                            

 <div class="input-group mb-3">
  <input  type="text" class="form-control" placeholder="RUC/CED" id="RUC" onkeyup="validarcedula();" maxlength="13" value="9999999999999" autofocus autocomplete="true" onfocus="this.select()">
  <div class="input-group-append" id="rucced">
    
  </div>
 </div>
 <hr>

  <label for="">Código de barras</label>
  <input type="text" class="form-control" id="barcode" onchange="verificarEjemplar();" autofocus>
  </div>
  <div class="form-group col-md-8">                                       
  <!-- etiquetas del usuario-->                                       
<div class="card">
  <!--<h5 class="card-header">Alexander Ivan</h5>-->
  <div class="card-body" id="carddatoscl">
    
   <!-- <a href="#" class="btn btn-primary">Go somewhere</a>-->
  </div>
</div>

  <!-- fin eqtiquetas del usuario -->
  </div>
                                    </div>
    <hr>
    <div class="table-responsive">
                            <table class="table table-bordered table-hover dataTable js-exportable">
                                <thead style="color:#fff;background:#546e7a;">
                                    <tr>
                                        
                                        <th v-for="cabecera in cabeceras_detalles" :key="cabecera" v-bind:style="[cabecera=='Código' || cabecera=='Precio prom'?{'display':'none'}:{ }]"> {{ cabecera }} </th>                                      
                                    </tr>
                                </thead>
                                <tbody id="table_detalles">                                                 
                                </tbody>
                             </table>
                            </div>  
 <!-- subtotales--> 
                            <hr>
                          <div class="form-row">
                               <div class="col-md-6">
                                 <div class="row clearfix div-error">
                                            <ul id="lstErrores"></ul>
                                    </div>  
                                    <div class="row">
                                        <div class="col-md-6">
                                         <input type="text" class="form-control decimal" name="recibe" id="recibe" placeholder="Paga con" onkeyup="calculaCambio(this.value);">      
                                        </div>
                                           <div class="col-md-6">
                                         <p class="form-control" id="cambio">Cambio: <b> 0.00 </b> </p>     
                                        </div> 
                                     
                                    </div>   
                                    <hr>
                               <button type="button" class="btn btn-primary" id="btnGuardarVenta" ><i class="fa fa-floppy-o"></i> Guardar</button> 
                                <button type="button" class="btn btn-primary">Imprimir</button>
                                 <button type="button" class="btn btn-primary">Finalizar</button>  
                                  <button type="button" id="btnCancelarActualizar" class="btn btn-warning"><i class="fa fa-times"></i> Cancelar</button>    
                               </div>
                              <div class="col-md-6"> 
                         <!-- <div class="card">-->
  <!--<h5 class="card-header">Alexander Ivan</h5>-->
 <!-- <div class="card-body"> -->
       <table id="table_detalles" class="table table-bordered table-hover table-sm">
                                <thead>
                                  
                                </thead>
                                <tbody> 
                                     <tr>
                                    <th style="color:#fff;background:#546e7a;">Valor</th>
                                     <th id="valorfac">0.00 </th>                                         
                                    </tr>  
                                    <tr>
                                    <th style="color:#fff;background:#546e7a;">Subtotal IVA</th>
                                     <th id="subtotalivafac">0.00 </th>                                         
                                    </tr>
                                      <tr>
                                    <th style="color:#fff;background:#546e7a;">Subtotal 0%</th>
                                     <th id="subtotalcerofac">0.00 </th>                                         
                                    </tr>   
                                     <tr>
                                    <th style="color:#fff;background:#546e7a;">Descuentos</th>
                                     <th id="descfac"> 0.00</th>                                         
                                    </tr>  
                                   
                                    <tr>
                                    <th style="color:#fff;background:#546e7a;">Tarifa 0%</th>
                                     <th id="subcero">0.00 </th>                                         
                                    </tr> 
                                    <tr>
                                    <th style="color:#fff;background:#546e7a;">Tarifa 12%</th>
                                     <th id="sub12">0.00 </th>                                         
                                    </tr>
                                                          
                                    <tr>
                                    <th style="color:#fff;background:#546e7a;"> TOTAL</th>
                                     <th id="total" style="text-align: center;font-size: x-large;background-color: black;color: white;">0.00 </th>                                         
                                    </tr> 
                                </tbody>
                             </table>
    
   <!-- <a href="#" class="btn btn-primary">Go somewhere</a>-->
<!--  </div>
</div>-->
</div>
                         
                          </div>
                                                         
  </div>
</div>
                                        
                                         <!-- fin de clienetes cabecera -->
                                        </div>
                                    </div>
                                                                                  
                                  
                                   
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
                 cabeceras : ["","Id","Imagen","Nombre","Descripción","Marca","Categoria","Presentación","Lab","Stock","Tipo","Venta","P. Normal","P. Desc","Ubicación","Trata"],
                 cabeceras_detalles:["","Id","Código","Descripción","Cantidad","Precio c/u","IVA","Precio prom","Ahorro","Total"]
                  // cabeceras : ["Id","Imagen","Nombre","Presentación","Venta","Precio N","Precio P","Ubicación"]
                }
            },
            mounted() {              
           let datatable = document.createElement('script')
            datatable.setAttribute('src', 'assets/js/lib/data-table/datatableVentas.js')
            document.head.appendChild(datatable)
            }
        }
</script>
<style>
.div-error{
display: flex;
justify-content: center;
}

.modal-header-primary {
	color:#fff;
    padding:9px 15px;
    border-bottom:1px solid #eee;
    background-color: #17a2b8;
    -webkit-border-top-left-radius: 5px;
    -webkit-border-top-right-radius: 5px;
    -moz-border-radius-topleft: 5px;
    -moz-border-radius-topright: 5px;
     border-top-left-radius: 5px;
     border-top-right-radius: 5px;
}
</style>