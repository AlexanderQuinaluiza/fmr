<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-file-text"></i> Ventas </h4>
                </div>
                <div class="card-body">
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
                                <form name="formfact">
                                    <input type="hidden" id="id" value="">
                                      
                                     <div class="row">
                                        <div class="col-md-3" >
           <!-- datos farmacia-->
<div class="card" style="width: 18rem;">
<img class="card-img-top" src="https://image.freepik.com/vector-gratis/set-logos-farmacia_1198-60.jpg" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">R.U.C: 1760013210001</h5>  
    <h6 class="card-title">Factura</h6>
    <div>001-222-0000001034</div>
    <p class="card-text">Direccion: efasf aefasfaf <br> Dirección sucursal: na/na</p>
    
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
  <div class="input-group-append" id="indruc">
    
  </div>
 </div>
 <hr>

  <label for="">Código de barras</label>
  <input type="text" class="form-control" id="barcode" autofocus>
  </div>
  <div class="form-group col-md-8">                                       
  <!-- etiquetas del usuario-->                                       
<div class="card">
  <!--<h5 class="card-header">Alexander Ivan</h5>-->
  <div class="card-body">
    <h5 class="card-title">Alexander Ivan Quinaluiza Arias</h5>
    <p class="card-text">1805240304</p>
    <p class="card-text">alexanderq@hotmail.com.ar</p>
    <p class="card-text">El Puyo, 0986019417</p>
   <!-- <a href="#" class="btn btn-primary">Go somewhere</a>-->
  </div>
</div>

  <!-- fin eqtiquetas del usuario -->
  </div>
                                    </div>
    <hr>
    <div class="table-responsive">
                            <table id="table_detalles" class="table table-bordered table-hover dataTable js-exportable">
                                <thead style="color:#fff;background:#546e7a;">
                                    <tr>
                                        
                                        <th v-for="cabecera in cabeceras_detalles" :key="cabecera">{{ cabecera }}</th>                                      
                                    </tr>
                                </thead>
                                <tbody>                                                
                                </tbody>
                             </table>
                            </div>  
 <!-- subtotales--> 
                            <hr>
                          <div class="row">
                               <div class="col-md-6">
                               <button class="btn btn-primary">Guardar</button> 
                                <button class="btn btn-primary">Imprimir</button>
                                 <button class="btn btn-primary">Finalizar</button>      
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
                                     <th>1.69 </th>                                         
                                    </tr>   
                                     <tr>
                                    <th style="color:#fff;background:#546e7a;">Descuentos</th>
                                     <th> 0.00</th>                                         
                                    </tr>  
                                     <tr>
                                    <th style="color:#fff;background:#546e7a;">Subtotal</th>
                                     <th>1.69 </th>                                         
                                    </tr> 
                                    <tr>
                                    <th style="color:#fff;background:#546e7a;">Tarifa 0%</th>
                                     <th>0.00 </th>                                         
                                    </tr> 
                                    <tr>
                                    <th style="color:#fff;background:#546e7a;">Tarifa 12%</th>
                                     <th>1.69 </th>                                         
                                    </tr>
                                    <tr>
                                    <th style="color:#fff;background:#546e7a;"> 12% IVA</th>
                                     <th>0.20 </th>                                         
                                    </tr>   
                                    <tr>
                                    <th style="color:#fff;background:#546e7a;"> TOTAL</th>
                                     <th>1.89 </th>                                         
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
                                    <div class="row clearfix div-error">
                                            <ul id="lstErrores"></ul>
                                    </div>                                                             
                                     <button type="button" id="btnGuardarCategoria" class="btn btn-primary"><i class="fa fa-floppy-o"></i> Guardar</button>
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
            data(){
                return{
                 cabeceras : ["","Id","Imagen","Nombre","Descripción","Marca","Categoria","Presentación","Lab","Stock","Tipo","Venta","P. Normal","P. Desc","Ubicación","Trata"],
                 cabeceras_detalles:["Id","Descripción","Cantidad","Precio c/u","Total"]
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
</style>