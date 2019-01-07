<template>
    <div class="row">
        <div class="col-lg-12">
            
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-files"></i> Comprobantes </h4>
                </div>
                <div class="card-body">
                    <!-- <div id="output"></div> -->
                  <div id="ridenc" style="display:none;"></div>
                     <!--Inicio modal detalle producto -->

                    <div class="modal fade" id="anularModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-primary" role="document">
                            <div class="modal-content">
                                <div class="modal-header modal-header-primary">
                                    <h5 class="modal-title" id="anularModalLabel">Anular la factura</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="form-row">
                                         <input type="hidden" id="TOTAL_VEN">
                                        <input type="hidden" id="ID_VEN">
                                        <div class="form-group col-md-12">
                                            <label > Motivo de anulación </label>
                                                <input
                        type="text"
                        id="MOTIVO"
                        required
                        class="form-control"
                        placeholder="Ejemplo: no se aplicaron descuentos"
                        maxlength="200"
                      >
                                        </div>                                                                            
                                    </div> 
                                     <div class="row clearfix div-error">
                                            <ul id="lstErrores"></ul>
                                    </div>                                                                                                                                                                                                     
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" title="Anular la factura seleccionada" onclick="anular();" id="btnanularfac"><i class="fa fa-trash"></i> Anular</button>
                                    <button type="button" class="btn btn-primary"  onclick="vistaPreviaImprimir();" id="btnimprimir"> <i class="fa fa-print"></i> Imprimir</button>
                                    <button type="button" class="btn btn-info" data-dismiss="modal" onclick="finalizar();" id="btnfin">Finalizar</button>
                                
                                </div>
                            </div>
                        </div>
                    </div> <!--Fin modal detalles producto -->
                     <!--Inicio modal detalle venta -->

                    <div class="modal fade" id="detallesFacModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-primary" role="document">
                            <div class="modal-content">
                                <div class="modal-header modal-header-primary">
                                    <h5 class="modal-title" id="detallesFacModalLabel">Detalles de la factura</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                          <div class="table-responsive">
                            <table id="table_detalles_fac" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                <thead style="color:#fff;background:#546e7a">
                                    <tr>
                                        <th v-for="cabecera in cabecerasdtfac" :key="cabecera">{{ cabecera }}</th>                                      
                                    </tr>
                                </thead>
                                <tbody>                                                
                                </tbody>
                             </table>
                            </div>                                                                                                                                                                               
                                </div>
                                <div class="modal-footer">
                                   
                                    <button type="button" class="btn btn-info" data-dismiss="modal" id="btnfin">Cerrar</button>
                                
                                </div>
                            </div>
                        </div>
                    </div> <!--Fin modal detalles venta -->
                      <!--Inicio modal detalle devoluciones -->



 <div class="modal fade" id="detallesFacModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">

     <div class="modal-dialog modal-lg modal-primary" role="document">

         <div class="modal-content">

             <div class="modal-header modal-header-primary">

                 <h5 class="modal-title" id="detallesFacModalLabel">Detalles de la factura</h5>

                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">

                     <span aria-hidden="true">&times;</span>

                 </button>

             </div>

             <div class="modal-body">

                       <div class="table-responsive">

         <table id="table_detalles_fac" class="table table-bordered table-striped table-hover dataTable js-exportable">

             <thead style="color:#fff;background:#546e7a">

                 <tr>

                     <th v-for="cabecera in cabecerasdtfac" :key="cabecera">{{ cabecera }}</th>                                      

                 </tr>

             </thead>

             <tbody>                                                

             </tbody>

          </table>

         </div>                                                                                                                                                                               

             </div>

             <div class="modal-footer">

                

                 <button type="button" class="btn btn-info" data-dismiss="modal" id="btnfin">Cerrar</button>

             

             </div>

         </div>

     </div>

 </div> <!--Fin modal detalles devoluciones -->


                    <div class="custom-tab">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link" id="listado-tab" data-toggle="tab" href="#listado" role="tab" aria-controls="listado" aria-selected="true" ><i class="fa fa-list"></i> Facturas</a>
                            <a class="nav-item nav-link" id="editar-tab" data-toggle="tab" href="#listado1" role="tab" aria-controls="listado1" aria-selected="false"><i class="fa fa-list"></i> Notas de crédito Devoluciones</a>
                            <a class="nav-item nav-link" id="editar-tab" data-toggle="tab" href="#listado2" role="tab" aria-controls="listado2" aria-selected="false"><i class="fa fa-list"></i> Notas de crédito Anulaciones</a>
                            </div>
                        </nav>
                        <div class="tab-content pl-3 pt-2" id="nav-tabContent">
                            <div class="tab-pane fade" id="listado" role="tabpanel" aria-labelledby="listado-tab">
                                                        
                            <div class="table-responsive">
                            <table id="table_comprobantes" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                <thead style="color:#fff;background:#546e7a">
                                    <tr>
                                        <th v-for="cabecera in cabeceras" :key="cabecera">{{ cabecera }}</th>                                      
                                    </tr>
                                </thead>
                                <tbody>                                                
                                </tbody>
                             </table>
                            </div>                            
                        </div>                       
                            <div class="tab-pane fade" id="listado1" role="tabpanel" aria-labelledby="listado1-tab">
                             <table id="table_nc" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                <thead style="color:#fff;background:#546e7a">
                                    <tr>
                                        <th v-for="cabecera in cabecerasnc" :key="cabecera">{{ cabecera }}</th>                                      
                                    </tr>
                                </thead>
                                <tbody>                                                
                                </tbody>
                             </table>
                            </div>

                            <div class="tab-pane fade" id="listado2" role="tabpanel" aria-labelledby="listado2-tab">
                             <table id="table_nc_anulado" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                <thead style="color:#fff;background:#546e7a">
                                    <tr>
                                        <th v-for="cabecera in cabecerascnfac" :key="cabecera">{{ cabecera }}</th>                                      
                                    </tr>
                                </thead>
                                <tbody>                                                
                                </tbody>
                             </table>
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
                //ID_VEN, ID_USU, ID_CLI, FECHA_VEN, DESCRIPCION_VEN, IVA_VEN, TOTAL_VEN, ESTADO, SUBT_IVA, SUBT_CERO, TOTAL_DESC, NUMERO_COM
                   cabeceras : ["Id v.","Fecha","#Factura","Descripción","Subiva","Subcero","Descuentos","IVA","Total","Estado","Acciones"],
                   //ID_DEV_VEN, ID_VEN, ID_USU, USUARIO, TOTAL_DEV, IVA_DEV, SUBT_IVA, SUBT_CERO, OBSERVACION_DEV, FECHA_FAC, ID_VEN, FECHA_COM, NUMERO_COM, TIPO_DOC, COM_ID_COM
                   cabecerasnc : ["Id dv.",
                   "#Factura","Motivo","Valor",
                   "Fecha Emi.","#N.C.","Acciones"],
                   cabecerascnfac:["Id v.","Fecha","#Factura","Descripción","Subiva","Subcero","Descuentos","IVA","Total","Estado","#NC"],
                   cabecerasdtfac:["id dtv.","Descripción","Cantidad","P. Venta","Ahorro","Subtotal","A. IVA"],
                }
            },
            mounted() {              
           let datatable = document.createElement('script')
            datatable.setAttribute('src', 'assets/js/lib/data-table/datatableComprobantes.js')
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

