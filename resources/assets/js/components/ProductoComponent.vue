<template>
<div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-truck"></i> Productos </h4>
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

                    <!--inicio modal agregar ejemplar -->
                    <div class="modal fade" id="addEjemplarModal" tabindex="-1" role="dialog" aria-labelledby="addEjemplarModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-primary" role="document">
                            <div class="modal-content">
                                <div class="modal-header modal-header-primary">
                                    <h5 class="modal-title" id="addEjemplarModalLabel">AGREGAR EJEMPLAR PRODUCTO</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form id="formAddEjemplar">
                                         <input type="hidden" id="idP" value="">
                                         <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>Producto seleccionado: </label>                                              
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label style="font-weight:bold" id="lblNombreProductoEjm"> </label>                                              
                                            </div>
                                         </div>
                                         
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label style="font-weight:bold">Código de Barras </label>
                                                <input type="text" id="COD_BARRAS_EJM" maxlength="100" class="form-control" placeholder="Código de barras">
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label style="font-weight:bold">Fecha caducidad</label>
                                                <input type="text" id="FECHA_CADUCIDAD_EJM" maxlength="19" class="form-control" placeholder="yyyy-mm-dd">
                                            </div>
                                        </div>
                                            <div class="row clearfix div-error">
                                                <ul id="lstErroresEjemplar"></ul>
                                        </div> 
                                    </form>                                                            
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button>                               
                                    <button type="button" class="btn btn-primary" id="btnAgregarEjemplar" ><span class="fa fa-plus"></span> Agregar</button>
                                </div>
                            </div>
                        </div>
                    </div><!--fin modal agregar ejemplar -->
 

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
                        </div>                       
                            <div class="tab-pane fade" id="editar" role="tabpanel" aria-labelledby="editar-tab">
                                <br>
                                <form id="formProducto" method="post" enctype="multipart/form-data">
                                    <input type="hidden" id="id" value="">


                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label style="font-weight:bold">Nombre</label>
                                            <input type="text" id="NOMBRE_PRO" maxlength="70" class="form-control" placeholder="Nombre de producto">
                                        </div>
                                    </div>
                                    <div class="form-row">                                    
                                        <div class="form-group col-md-12">
                                            <label style="font-weight:bold">Descripción</label>
                                            <input type="text" id="DESCRIPCION_PRO" maxlength="130" class="form-control" placeholder="Descripción de producto">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label style="font-weight:bold">Recomendado para</label>
                                            <input type="text" id="ETIQUETAS_PRO" maxlength="300" class="form-control" placeholder="Recomendaciones de producto">
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-md-4" id="divCategoria">
                                            <label style="font-weight:bold">Categoría</label>
                                             <select id="ddlCategoria" style="width:100%" data-placeholder="Escoja una marca..." class="form-control" data-live-search="true" tabindex="1">                                              
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label style="font-weight:bold">Marca</label>
                                            <select id="ddlMarca" style="width:100%" data-placeholder="Escoja una marca..." class="form-control" data-live-search="true">                                              
                                            </select>
                                        </div>
                                        <div class="form-group col-md-4">
                                             <label style="font-weight:bold">Presentación</label>
                                            <select id="ddlPresentacion" style="width:100%" data-placeholder="Escoja una presentación..." class="form-control" data-live-search="true">                                             
                                            </select>
                                        </div>
                                    </div>                                  
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                          <label style="font-weight:bold">Existencia máxima </label>
                                            <input type="text" id="EXISTENCIA_MAX_PRO" maxlength="10" class="form-control entero" value="0" placeholder="Existencia máxima">
                                        </div>
                                        <div class="form-group col-md-4">
                                             <label style="font-weight:bold">Existencia mínima</label>
                                            <input type="text" id="EXISTENCIA_MIN_PRO" maxlength="10" class="form-control entero" value="0" placeholder="Existencia mínima">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label style="font-weight:bold">Ganancia (%)</label>
                                            <input type="text" id="GANANCIA_PRO" maxlength="10" class="form-control decimal" value="0" placeholder="Ganancia de producto">                                        
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label style="font-weight:bold">Ubicación </label>
                                            <input type="text" id="UBICACION_PRO" maxlength="125" class="form-control" placeholder="Ubicación de producto">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label style="font-weight:bold">Imagen</label>
                                            <input type="file" id="IMAGEN_PRO" name="IMAGEN_PRO" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label style="margin-right:10px;font-weight:bold">Aplica IVA </label>   
                                            <label class="radio-inline"><input type="radio" name="iva" id="ivan" checked value="0">No</label>
                                            <label class="radio-inline"><input type="radio" name="iva" id="ivas" value="1">Si</label> 
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label style="margin-right:10px;font-weight:bold">Tipo</label>
                                            <label class="radio-inline"><input type="radio" name="tipo" id="tipoo" checked value="original">Original</label>
                                            <label class="radio-inline"><input type="radio" name="tipo" id="tipog" value="generico">Genérico</label> 
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label style="margin-right:10px;font-weight:bold">Venta con receta</label>
                                            <label class="radio-inline"><input type="radio" name="receta" id="recetan" checked value="0">No</label>
                                            <label class="radio-inline"><input type="radio" name="receta" id="recetas" value="1">Si</label>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                               <label style="font-weight:bold">Lote</label>               
                                            <input type="text" id="LOTE_PRO" maxlength="15" class="form-control" placeholder="Lote de producto">                                                                                                                                                    
                                        </div>
                                        <div class="form-group col-md-6">
                                             <label style="font-weight:bold">Laboratorio </label>
                                            <input type="text" id="LABORATORIO_PRO" maxlength="200" class="form-control" placeholder="Laboratorio que fabrica producto">
                                        </div>
                                    </div>                                                                    
                                    <div class="row clearfix div-error">
                                            <ul id="lstErrores"></ul>
                                    </div>                                                             
                                     <button type="button" id="btnGuardar" class="btn btn-primary"><i class="fa fa-floppy-o"></i> Guardar</button>
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
                   cabeceras : ["Id","Nombre","Descripción","Combate","Stock","Estado","Acciones"]
                }
            },
            mounted() {


           /**     let dt1 = document.createElement('script')
            dt1.setAttribute('src', 'assets/js/lib/data-table/datatables.min.js')
            document.head.appendChild(dt1)
            let dt2 = document.createElement('script')
            dt2.setAttribute('src', 'assets/js/lib/data-table/dataTables.bootstrap.min.js')
            document.head.appendChild(dt2)
            let dt3 = document.createElement('script')
            datatable.setAttribute('src', 'assets/js/lib/data-table/dataTables.buttons.min.js')
            document.head.appendChild(dt3)
            let dt4 = document.createElement('script')
            dt4.setAttribute('src', 'assets/js/lib/data-table/buttons.bootstrap.min.js')
            document.head.appendChild(dt4)
            let dt5 = document.createElement('script')
            dt5.setAttribute('src', 'assets/js/lib/data-table/jszip.min.js')
            document.head.appendChild(dt5)
            let dt6 = document.createElement('script')
            dt6.setAttribute('src', 'assets/js/lib/data-table/pdfmake.min.js')
            document.head.appendChild(dt6)
            let dt7 = document.createElement('script')
            dt7.setAttribute('src', 'assets/js/lib/data-table/vfs_fonts.js')
            document.head.appendChild(dt7)
            let dt8 = document.createElement('script')
            dt8.setAttribute('src', 'assets/js/lib/data-table/buttons.html5.min.js')
            document.head.appendChild(dt8)
            let dt9 = document.createElement('script')
            dt9.setAttribute('src', 'assets/js/lib/data-table/buttons.print.min.js')
            document.head.appendChild(dt9)
            let dt10 = document.createElement('script')
            dt10.setAttribute('src', 'assets/js/lib/data-table/buttons.colVis.min.js')
            document.head.appendChild(dt10)
      

           
             let dt0 = document.createElement('script')
            dt0.setAttribute('src', 'js/iziModal/js/iziModal.min.js')
            document.head.appendChild(dt0)*/

            /** let dt1 = document.createElement('script')
            dt1.setAttribute('src', 'js/iziModal/js/iziModal.js')
            document.head.appendChild(dt1)*/

    

let datatable = document.createElement('script')
            datatable.setAttribute('src', 'assets/js/lib/data-table/datatableProducto-init.js')
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

