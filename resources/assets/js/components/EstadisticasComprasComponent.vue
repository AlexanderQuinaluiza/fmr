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
                            <a class="nav-item nav-link" id="editar-tab" data-toggle="tab" href="#editar" role="tab" aria-controls="editar" aria-selected="false"><i class="fa fa-info-circle"></i> Kardex</a>
                            </div>
                        </nav>
                        <div class="tab-content pl-3 pt-2" id="nav-tabContent">
                            <div class="tab-pane fade" id="listado" role="tabpanel" aria-labelledby="listado-tab">
                            <br>

                            <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Tipo de gráfico:&nbsp;</label>
                                            <select class="form-control" id="typeGraphic">
                                                <option value="column">Columna</option>
                                                <option value="bar">Barra</option>
                                                <option value="pie">Pastel</option>
                                                <option value="line">Linea</option>
                                            </select>                                 
                                        </div>                                                                        
                            </div>
    
                            <div id="container" ></div>
                                                     
                        </div>                       
                            <div class="tab-pane fade" id="editar" role="tabpanel" aria-labelledby="editar-tab">
                                <br>

                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label>Inventario producto:&nbsp;</label><label style="font-weight:bold"  id="lblNombreProducto"></label>                                    
                                        </div>                                                                        
                                    </div>

                                    <iframe class="chartjs-hidden-iframe" tabindex="-1" style="display: block; overflow: hidden; border: 0px; margin: 0px; top: 0px; left: 0px; bottom: 0px; right: 0px; height: 100%; width: 100%; position: absolute; pointer-events: none; z-index: -1;"></iframe>

                               

                               
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

