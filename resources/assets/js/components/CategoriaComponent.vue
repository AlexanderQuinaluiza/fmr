<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-users"></i> Categorias </h4>
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
                            <table id="table_categorias" class="table table-bordered table-striped table-hover dataTable js-exportable">
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
                                            <input type="text" id="NOMBRE_CAT" required class="form-control" placeholder="Nombre de la categoria" maxlength="110">
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
                   cabeceras : ["Id","Nombre","Estado","Acciones"]
                }
            },
            mounted() {
                
               // id_usuario = $('#idUsuario').val();
           let datatable = document.createElement('script')
            datatable.setAttribute('src', 'assets/js/lib/data-table/datatableCategoria-init.js')
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