<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-users"></i> Descuentos </h4>
                </div>
                <div class="card-body">

   <!--Inicio modal detalle producto -->
                    <div class="modal fade" id="mediumModal" tabindex="-1" role="dialog" aria-labelledby="mediumModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-primary" role="document">
                            <div class="modal-content">
                                <div class="modal-header modal-header-primary">
                                    <h5 class="modal-title" id="mediumModalLabel">DETALLE PRODUCTO</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Nombre: </label>
                                            <label id="lblNOMBRE_PRO" class="form-label datoProducto"></label>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Descripción: </label>
                                                <label id="lblDESCRIPCION_PRO" class="form-label datoProducto"></label>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Presentación: </label>
                                            <label id="lblPRESENTACION_PRO" class="form-label datoProducto"></label>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Marca: </label>
                                                <label id="lblMARCA_PRO" class="form-label datoProducto"></label>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Categoría: </label>
                                            <label id="lblCATEGORIA_PRO" class="form-label datoProducto"></label>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Laboratorio: </label>
                                                <label id="lblLABORATORIO_PRO" class="form-label datoProducto"></label>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label class="lblProducto">Recomendado para: </label>
                                            <label id="lblETIQUETAS_PRO" class="form-label datoProducto"></label>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Venta con receta: </label>
                                            <label id="lblVENTA_CON_RECETA" class="form-label datoProducto"></label>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Imagen: </label>
                                            <img id="limgIMAGEN_PRO" src="" alt="imagen producto no disponible"/>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Existencia mínima: </label>
                                            <label id="lblEXISTENCIA_MIN_PRO" class="form-label datoProducto"></label>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Existencia máxima: </label>
                                                <label id="lblEXISTENCIA_MAX_PRO" class="form-label datoProducto"></label>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Costo: </label>
                                            <label id="lblCOSTO_PRO" class="form-label datoProducto"></label>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Ganancia: </label>
                                                <label id="lblGANANCIA_PRO" class="form-label datoProducto"></label>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Precio venta: </label>
                                            <label id="lblPRECIO_VENTA_PRO" class="form-label datoProducto"></label>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Aplica IVA: </label>
                                                <label id="lblAPLICA_IVA_PRO" class="form-label datoProducto"></label>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Tipo Producto: </label>
                                            <label id="lblTIPO_PRO" class="form-label datoProducto"></label>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Lote: </label>
                                                <label id="lblLOTE_PRO" class="form-label datoProducto"></label>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Estado: </label>
                                            <span id="estado"  class="badge badge-success"></span>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Stock: </label>
                                                <label id="lblSTOCK_PRO" class="form-label datoProducto"></label>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Precio promocional: </label>
                                            <label id="lblPRECIO_PROMOCIONAL_PRO" class="form-label datoProducto"></label>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Ubicación: </label>
                                                <label id="lblUBICACION_PRO" class="form-label datoProducto"></label>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Usuario quien registro: </label>
                                            <label id="lblUSU_REGISTRO" class="form-label datoProducto"></label>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label class="lblProducto">Fecha de registro: </label>
                                                <label id="lblFECHA_REGISTRO_PRO" class="form-label datoProducto"></label>
                                        </div>
                                    </div>                                                               
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button>
                                
                                </div>
                            </div>
                        </div>
                    </div> <!--Fin modal detalles producto -->

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
                            
                            <div class="table-responsive">
                            <table id="table_desc" class="table table-bordered table-striped table-hover dataTable js-exportable">
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
                            <div class="tab-pane fade" id="editar" role="tabpanel" aria-labelledby="editar-tab">
                                <br>
                                <form name="frmdescuentos" id="frmdescuentos">
                                    <input type="hidden" id="id" value="">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            
                                            <label>Descripción del descuento</label>
                                            <input type="text" id="DESCRIPCION_DESC" data-toggle="tooltip"  title="La descripción del descuento no se puede repetir" required class="form-control" placeholder="Descripción del descuento" maxlength="200">
                                        </div>
                                        <div class="form-group col-md-3">
                                            
                                            <label>Rango de fechas</label>
                                        <!--date range init -->
                                        <input type="text" name="daterange" id="fechas" class="form-control" required />
                                        <!--date range finish -->                                       
                                      
                                    </div>
                                    <div class="form-group col-md-3">
                                            <!--ID_DESC, ID_PRO, PORCENTAJE_DESC, FECHA_INICIO_DESC, FECHA_FIN_DESC, ESTADO_DESC-->
                                            <label> %/100 descuento</label>
                                            <input type="number" id="PORCENTAJE_DESC" data-toggle="tooltip"  title="El descuento por defecto es del 30%" required class="form-control" min="0.01" max="0.80" value="0.10" step="0.01">
                                        </div>

                                        <div class="form-group col-md-12">
                                            <label>Productos selecionados <span id="numselected"  class="badge badge-success"></span></label> 
                                            <div class="table-responsive">
                                  <table id="table_productos" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                    <thead style="color:#fff;background:#546e7a">
                                    <tr> 
                                        <th> 
                                            <div class="form-check">
  <label class="form-check-label">
    <input type="checkbox" class="form-check-input" onchange="toggle(this)" id="select" data-toggle="tooltip"  title="Seleciona todos los productos" >*
  </label>
</div> </th>
                                        <th v-for="cabecera in cabeceras_prod" :key="cabecera">{{ cabecera }}</th>                                      
                                    </tr>
                                </thead>
                                <tbody>                                                
                                </tbody>
                             </table>
                            </div>     
                                        </div>
                                    </div>
                                    
                                    <div class="row clearfix div-error">
                                            <ul id="lstErrores"></ul>
                                    </div> 
                                    <hr> 
                                     <input type="button" value="nada" onclick="sacar()" >                                                           
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
                   cabeceras : ["Id","Descripción","Fecha Inicio","Fecha Fin","Porcentaje","Estado","Acciones"],
                   cabeceras_prod:["Id","Nombre","Descripción","Stock","Estado","Acciones"]
                }
            },
            mounted() {              
           let datatable = document.createElement('script')
            datatable.setAttribute('src', 'assets/js/lib/data-table/datatableDescuentos.js')
            document.head.appendChild(datatable)
                      }
        }
</script>

<style>
.div-error{
display: flex;
justify-content: center;
}
.lblProducto{
    font-weight:bold;
    margin-bottom:0px;
}
.datoProducto{
   margin-bottom:0px;
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















