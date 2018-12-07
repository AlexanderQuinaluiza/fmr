<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-list-alt"></i> Inventarios </h4>
                </div>
                <div class="card-body">
                    <div class="custom-tab">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link" id="listado-tab" data-toggle="tab" href="#listado" role="tab" aria-controls="listado" aria-selected="true" ><i class="fa fa-list"></i> Listado Productos</a>
                            <a class="nav-item nav-link" id="editar-tab" data-toggle="tab" href="#editar" role="tab" aria-controls="editar" aria-selected="false"><i class="fa fa-info-circle"></i> Kardex</a>
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

                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label>Inventario producto:&nbsp;</label><label style="font-weight:bold"  id="lblNombreProducto"></label>                                    
                                        </div>                                                                        
                                    </div>

                                <div class="table-responsive">
                                    <table id="tabla-inventario" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead style="color:#fff;background:#546e7a">
                                             <tr>
                                                <th style="border-bottom: 0px solid #dee2e6">&nbsp;</th>
                                                <th style="border-bottom: 0px solid #dee2e6">&nbsp;</th>
                                                <th style="border-bottom: 0px solid #dee2e6">&nbsp;</th>
                                                <th colspan="3" class="text-center" style="border-bottom: 0px solid #dee2e6">Entradas</th>
                                                <th colspan="3" class="text-center" style="border-bottom: 0px solid #dee2e6">Salidas</th>
                                                <th colspan="3" class="text-center" style="border-bottom: 0px solid #dee2e6">Totales</th>
                                            </tr>
                                            <tr>
                                                <th v-for="cabecera in cabecerasInventario" :key="cabecera">{{ cabecera }}</th>                                      
                                            </tr>
                                        </thead>
                                        <tbody>                                                
                                        </tbody>
                                    </table>
                                </div>

                                <!-- <form id="form">
                                    <input type="hidden" id="id" value="">
                                    <div class="form-row">
                                        <div class="form-group col-md-4">
                                            <label>Nombre</label>
                                            <input type="text" id="NOMBRE_MOD" required class="form-control" placeholder="Nombre de módulo" maxlength="100">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label>Icono</label>
                                            <input type="text" id="ICONO_MOD" required class="form-control" placeholder="Icono de módulo" maxlength="100">
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label>Identificador</label>
                                            <input type="text" id="URL_MOD" required class="form-control entero" placeholder="Identificador de módulo" maxlength="4">
                                        </div>
                                    </div>
                                    <div class="row clearfix div-error">
                                            <ul id="lstErrores"></ul>
                                    </div>                                                             
                                     <button type="button" id="btnGuardar" class="btn btn-primary"><i class="fa fa-floppy-o"></i> Guardar</button>
                                    <button type="button" id="btnCancelarActualizar" class="btn btn-warning"><i class="fa fa-times"></i> Cancelar</button>
                                </form> -->
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
                   cabeceras : ["#","Nombre","Descripción","Stock","Costo","Laboratorio","Acciones"],
                   cabecerasInventario : [
                       "#",
                       "Fecha",
                       "Descripción",
                       "Cantidad",
                       "Valor Unitario",
                       "Valor Total",
                       "Cantidad",
                       "Valor Unitario",
                       "Valor Total",
                       "Cantidad",
                       "Valor Unitario",
                       "Valor Total"]
                }
            },
            mounted() {              
           let datatable = document.createElement('script')
            datatable.setAttribute('src', 'assets/js/lib/data-table/datatableInventario-init.js')
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

