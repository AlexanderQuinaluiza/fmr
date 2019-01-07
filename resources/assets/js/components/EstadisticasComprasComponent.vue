<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-bar-chart"></i> Estadísticas Compras </h4>
                </div>
                <div class="card-body">
                    <div class="custom-tab">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link" id="listado-tab" data-toggle="tab" href="#listado" role="tab" aria-controls="listado" aria-selected="true" ><i class="fa fa-list"></i> General</a>
                            <!-- <a class="nav-item nav-link" id="editar-tab" data-toggle="tab" href="#editar" role="tab" aria-controls="editar" aria-selected="false"><i class="fa fa-truck"></i> Proveedores</a>
                            <a class="nav-item nav-link" id="devolucion-tab" data-toggle="tab" href="#devolucion" role="tab" aria-controls="devolucion" aria-selected="false"><i class="fa fa-line-chart"></i> Compras vs Devoluciones</a> -->
                            </div>
                        </nav>
                        <div class="tab-content pl-3 pt-2" id="nav-tabContent">
                            <div class="tab-pane fade" id="listado" role="tabpanel" aria-labelledby="listado-tab">
                            <br>
                            <div id="output"></div>                                                    
                        </div>                       
                            <div class="tab-pane fade" id="editar" role="tabpanel" aria-labelledby="editar-tab">
                                <br>                                                                                             
                            </div>
                            <div class="tab-pane fade" id="devolucion" role="tabpanel" aria-labelledby="devolucion-tab">
                                <br>                                                                                             
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
                  
                }
            },
            mounted() {              
          
  let datatable = document.createElement('script')
            datatable.setAttribute('src', 'assets/js/lib/data-table/EstadisticaCompras-init.js')
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

