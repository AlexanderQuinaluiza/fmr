<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-truck"></i> Proveedores </h4>
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
                                            <label>RUC</label>
                                            <input type="text" id="RUC_PROV" maxlength="13" class="form-control" placeholder="RUC de Proveedor">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Nombre</label>
                                            <input type="text" id="NOMBRE_PROV" maxlength="140" class="form-control" placeholder="Nombre de Proveedor">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Razón Social</label>
                                            <input type="text" id="RAZON_SOCIAL_PROV" maxlength="200" class="form-control" placeholder="Razón social de Proveedor">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Dirección</label>
                                            <input type="text" id="DIRECCION_PROV" maxlength="120" class="form-control" placeholder="Dirección de Proveedor">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Correo</label>
                                            <input type="text" id="CORREO_PROV" maxlength="110" class="form-control" placeholder="Correo electrónico de Proveedor">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Teléfono</label>
                                            <input type="text" id="TELEFONO_PROV" maxlength="50" class="form-control" placeholder="Teléfono de Proveedor">
                                        </div>
                                    </div>
                                    <div class="form-row">
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


                                           
                                         <!--   <input type="text" id="NACIONALIDAD_PROV" maxlength="300" class="form-control" placeholder="Nacionalidad de Proveedor">-->
                                        

                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Provincia</label>
                                            <input type="text" id="PROVINCIA_PROV" maxlength="150" class="form-control" placeholder="Provincia de Proveedor">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Ciudad</label>
                                            <input type="text" id="CIUDAD_PROV" maxlength="150" class="form-control" placeholder="Ciudad de Proveedor">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Demora entrega (días)</label>
                                            <input type="text" id="DEMORA_ENTREGA" maxlength="10" class="form-control" placeholder="Días de demora entrega de productos">
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
                   cabeceras : ["Id","RUC","Nombre","R. Social","Correo","Estado","Acciones"]
                }
            },
            mounted() {              
           let datatable = document.createElement('script')
            datatable.setAttribute('src', 'assets/js/lib/data-table/datatableProveedor-init.js')
            document.head.appendChild(datatable)

         

            /** let au = document.createElement('script')
            au.setAttribute('src', 'autocomplete/scripts/jquery-1.8.2.min.js')
            document.head.appendChild(au)

            let auto1 = document.createElement('script')
            auto1.setAttribute('src', 'autocomplete/scripts/jquery.mockjax.js')
            document.head.appendChild(auto1)

            let auto2 = document.createElement('script')
            auto2.setAttribute('src', 'autocomplete/src/jquery.autocomplete.js')
            document.head.appendChild(auto2)

            let auto3 = document.createElement('script')
            auto3.setAttribute('src', 'autocomplete/scripts/countries.js')
            document.head.appendChild(auto3)

            let auto4 = document.createElement('script')
            auto4.setAttribute('src', 'autocomplete/scripts/demo.js')
            document.head.appendChild(auto4)*/
       

           

            }
        }
</script>
<style>
.div-error{
display: flex;
justify-content: center;
}
</style>

