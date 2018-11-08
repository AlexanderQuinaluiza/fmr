<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-truck"></i> Productos </h4>
                </div>

  <button type="button" class="btn btn-secondary mb-1" data-toggle="modal" data-target="#smallmodal">
                          Small
                      </button>

                        <div class="modal fade" id="smallmodal" tabindex="-1" role="dialog" aria-labelledby="smallmodalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-sm" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="smallmodalLabel">Small Modal</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>
                                    There are three species of zebras: the plains zebra, the mountain zebra and the Grévy's zebra. The plains zebra
                                    and the mountain zebra belong to the subgenus Hippotigris, but Grévy's zebra is the sole species of subgenus
                                    Dolichohippus. The latter resembles an ass, to which it is closely related, while the former two are more
                                    horse-like. All three belong to the genus Equus, along with other living equids.
                                </p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary">Confirm</button>
                            </div>
                        </div>
                    </div>
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
                                <form>
                                    <input type="hidden" id="id" value="">


                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Nombre</label>
                                            <input type="text" id="NOMBRE_PRO" maxlength="70" class="form-control" placeholder="Nombre de producto">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Descripción</label>
                                            <input type="text" id="DESCRIPCION_PRO" maxlength="130" class="form-control" placeholder="Descripción de producto">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Categoría</label>
                                            <input type="text" id="ID_CAT" maxlength="200" class="form-control" placeholder="">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Marca</label>
                                            <input type="text" id="ID_MAR" maxlength="120" class="form-control" placeholder="">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Presentación</label>
                                            <input type="text" id="ID_PRS" maxlength="110" class="form-control" placeholder="">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Ganancia (%)</label>
                                            <input type="text" id="GANANCIA_PRO" maxlength="10" class="form-control" placeholder="Ganancia de producto">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Precio venta </label>
                                            <input type="text" id="PRECIO_VENTA_PRO" maxlength="10" class="form-control" placeholder="Precio de venta">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Existencia mínima</label>
                                            <input type="text" id="EXISTENCIA_MIN_PRO" maxlength="10" class="form-control" placeholder="EXistencia mínima de producto">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Existencia máxima </label>
                                            <input type="text" id="EXISTENCIA_MAX_PRO" maxlength="10" class="form-control" placeholder="Existencia máxima de producto">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Recomendado para</label>
                                            <input type="text" id="ETIQUETAS_PRO" maxlength="300" class="form-control" placeholder="Recomendaciones de producto">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Ubicación </label>
                                            <input type="text" id="UBICACION_PRO" maxlength="125" class="form-control" placeholder="Ubicación de producto">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Imagen</label>
                                            <input type="text" id="IMAGEN_PRO" maxlength="200" class="form-control" placeholder="Imagen de producto">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Aplica IVA </label>
                                            <input type="text" id="APLICA_IVA_PRO" maxlength="10" class="form-control" placeholder="IVA">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Lote</label>
                                            <input type="text" id="LOTE_PRO" maxlength="15" class="form-control" placeholder="Lote de producto">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Laboratorio </label>
                                            <input type="text" id="LABORATORIO_PRO" maxlength="200" class="form-control" placeholder="Laboratorio que fabrica producto">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Tipo</label>
                                            <input type="text" id="TIPO_PRO" maxlength="8" class="form-control" placeholder="Tipo de producto">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Precio promocional </label>
                                            <input type="text" id="PRECIO_PROMOCIONAL_PRO" maxlength="10" class="form-control" placeholder="Precio promocional de producto">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Venta con receta</label>
                                            <input type="text" id="VENTA_CON_RECETA" maxlength="10" class="form-control" placeholder="Venta bajo receta">
                                        </div>
                                    </div>

                                    <!--<div class="form-row">
                                        <div class="form-group col-md-6">

                                              <div class="row form-group">
                                                <label class="col-md-4 form-control-label">Origen</label>
                                                <div class="col-md-8">                                          
                                                    <div class="form-check" id="divchecks">
                                                         <div class="radio">
                                                            <label class="form-check-label ">
                                                            <input type="radio" checked name="nacionalidad" id="nacional" value="nacional" class="form-check-input">Nacional</label>
                                                        </div>
                                                        <div class="radio">
                                                            <label class="form-check-label ">
                                                            <input type="radio" name="nacionalidad" id="extranjero" value="extranjero" class="form-check-input">Extranjero</label>
                                                        </div>
                                                    </div>
                                                </div>
                                              </div> 
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Provincia</label>
                                            <input type="text" id="PROVINCIA_PROV" maxlength="150" class="form-control" placeholder="Provincia de Proveedor">
                                        </div>
                                    </div>-->
                                    
                                    <div class="row clearfix div-error">
                                            <ul id="lstErrores"></ul>
                                    </div>                                                             
                                     <button type="button" id="btnGuardar" class="btn btn-primary"><i class="fa fa-floppy-o"></i> Guardar</button>
                                    <button type="button" id="btnCancelarActualizar" class="btn btn-warning"><i class="fa fa-times"></i> Cancelar</button>
                                </form>

                                <!--inicio modal detalles -->
 
                                <!--<div class="modal fade" id="myModal" role="dialog">
                                    <div class="modal-dialog modal-primary modal-lg" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title">Detalles de Producto</h4>
                                                <button type="button" class="close" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="form-row">
                                                    <div class="form-group col-md-6">
                                                        <label class="col-md-3 form-control-label" style="font-weight:bold">Nombre</label>
                                                        <label class="form-control" id="lblNombre"></label> 
                                                    </div>
                                                    <div class="form-group col-md-6">
                                                        <label class="col-md-3 form-control-label" style="font-weight:bold">Nombre</label>
                                                        <label class="form-control" id="lblDescripcion"></label> 
                                                    </div>
                                                </div>                                                      
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>-->
                                <!--fin modal detalles -->
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
</style>

