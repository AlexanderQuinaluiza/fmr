<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-users"></i> Clientes </h4>
                </div>
                <div class="card-body">
                    <div class="custom-tab">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" clientee="tablist">
                            <a class="nav-item nav-link" id="listado-tab" data-toggle="tab" href="#listado" clientee="tab" aria-contclientes="listado" aria-selected="true"><i class="fa fa-list"></i> Listado</a>
                            <a class="nav-item nav-link" id="editar-tab" data-toggle="tab" href="#editar" clientee="tab" aria-contclientes="editar" aria-selected="false"><i class="fa fa-plus"></i> Nuevo</a>
                            </div>
                        </nav>
                        <div class="tab-content pl-3 pt-2" id="nav-tabContent">
                            <div class="tab-pane fade" id="listado" clientee="tabpanel" aria-labelledby="listado-tab">
                            <br>
                            <table id="bootstrap-data-table" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                <thead>
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
                                <form>
                                <input type="hidden" id="id" value="">
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label>Cédula/RUC</label>
                                        <input type="text" id="CED_RUC_CLI" maxlength="13" class="form-control" placeholder="Cédula/RUC">
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
                  cabeceras : ["Id","Ced/RUC","Nombre","Apellido","Correo","Estado","Acciones"]
                }
            },
            mounted() {              
                
            let datatable = document.createElement('script')
            datatable.setAttribute('src', 'assets/js/lib/data-table/datatableCliente-init.js')
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

