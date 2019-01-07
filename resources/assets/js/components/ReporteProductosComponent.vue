<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-cart-arrow-down"></i> Reportes Productos</h4>
                </div>
                <div class="card-body">                                         
                    <div class="custom-tab">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link" id="existencia-producto-tab" data-toggle="tab" href="#existencia-producto" role="tab" aria-controls="existencia-producto" aria-selected="false"><i class="fa fa-cart-arrow-down"></i> Existencia Productos</a>
                            <a class="nav-item nav-link" id="inventario-producto-tab" data-toggle="tab" href="#inventario-producto" role="tab" aria-controls="inventario-producto" aria-selected="false"><i class="fa fa-shopping-cart"></i> Inventario</a>
                            <a class="nav-item nav-link" id="listado-precios-tab" data-toggle="tab" href="#listado-precios" role="tab" aria-controls="listado-precios" aria-selected="false"><i class="fa fa-usd"></i> Lista de Precios</a>
                            </div>
                        </nav>
                        <div class="tab-content pl-3 pt-2" id="nav-tabContent">                                              
                            <!-- inicio contenido TAB reporte existencia productos-->
                             <div class="tab-pane fade" id="existencia-producto" role="tabpanel" aria-labelledby="existencia-producto-tab">                                                         
                                <br>
                                 <div class="row">
                                       <div class="col-md-3">
                                            <div class="form-check">
                                                <label class="toggle" style="font-size:17px">
                                                    <input type="radio" hidden name="rdExistenciaProd" checked value="todos"> <span class="label-text">Todos los productos</span>
                                                </label>
                                            </div>
                                      </div>
                                       <div class="col-md-3">
                                           <div class="form-check">
                                                <label class="toggle" style="font-size:17px">
                                                    <input type="radio" hidden name="rdExistenciaProd" value="conexist"> <span class="label-text">Productos con existencia</span>
                                                </label>
                                            </div>
                                      </div>
                                       <div class="col-md-3">
                                             <div class="form-check">
                                                <label class="toggle" style="font-size:17px">
                                                    <input type="radio" hidden name="rdExistenciaProd" value="sinexist"> <span class="label-text">Productos sin existencia</span>
                                                </label>
                                            </div> 
                                      </div>
                                      
                                      <div class="col-md-3"></div>                                                                                                                                                                                                                                   
                                </div>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                           <div class="form-check">
                                                <label class="toggle" style="font-size:17px">
                                                    <input type="radio" hidden name="rdExistenciaProd" value="min"> <span class="label-text">Productos con existencia menor al mínimo de inventario</span>
                                                </label>
                                            </div>
                                      </div>
                                       <div class="col-md-6">
                                             <div class="form-check">
                                                <label class="toggle" style="font-size:17px">
                                                    <input type="radio" hidden name="rdExistenciaProd" value="max"> <span class="label-text">Productos que sobrepasan el máximo de inventario</span>
                                                </label>
                                            </div> 
                                      </div>
                                </div>
<br>
                                <div class="table-responsive">
                                    <table id="tabla-reporte-existencia-productos" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead style="color:#fff;background:#546e7a">
                                            <tr>
                                                <th v-for="cabecera in cabecerasReporteExistenciaProducto" :key="cabecera">{{ cabecera }}</th>                                      
                                            </tr>
                                        </thead>
                                        <tbody>                                                
                                        </tbody>
                                    </table>                                
                                </div>                                                       
                            </div>   <!-- fin contenido TAB reporte existencia productos-->

                             <!-- inicio contenido TAB inventario de productos-->
                             <div class="tab-pane fade" id="inventario-producto" role="tabpanel" aria-labelledby="inventario-producto-tab">                                                         
                                <br>
                                 <div class="row">
                                       <div class="col-md-4">
                                            <div class="form-check">
                                                <label class="toggle" style="font-size:17px">
                                                    <input type="radio" hidden name="rdInventarioProd" checked value="compras"> <span class="label-text">Precios promedio de compra</span>
                                                </label>
                                            </div>
                                      </div>
                                       <!-- <div class="col-md-3">
                                           <div class="form-check">
                                                <label class="toggle" style="font-size:17px">
                                                    <input type="radio" hidden name="rdInventarioProd" value="ventas"> <span class="label-text">Precios de venta</span>
                                                </label>
                                            </div>
                                      </div>                                                                                                                                                                                                                                                                -->
                                </div>                            
                                <br>
                                <div class="table-responsive">
                                    <table id="tabla-reporte-inventario-productos" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead style="color:#fff;background:#546e7a">
                                            <tr>
                                                <th v-for="cabecera in cabecerasReporteInventarioProducto" :key="cabecera">{{ cabecera }}</th>                                      
                                            </tr>
                                        </thead>
                                        <tbody>                                                
                                        </tbody>
                                    </table>                                
                                </div>                                                       
                            </div>   <!-- fin contenido TAB reporte inventario de productos-->                  
                            
                             <!-- inicio contenido TAB listado de precios-->
                             <div class="tab-pane fade" id="listado-precios" role="tabpanel" aria-labelledby="listado-precios-tab">                                                        
                                <br>
                                <div class="table-responsive">
                                    <table id="tabla-reporte-lista-precios" class="table table-bordered table-striped table-hover js-exportable">
                                        <thead style="color:#fff;background:#546e7a">
                                            <tr>
                                                <th v-for="cabecera in cabecerasListaPrecios" :key="cabecera">{{ cabecera }}</th>                                      
                                            </tr>
                                        </thead>
                                        <tbody>                                                
                                        </tbody>
                                    </table>                                
                                </div>                                                       
                            </div>   <!-- fin contenido TAB reporte inventario de productos-->  
                            
                        </div>
                    </div>
                </div>
            </div>                
        </div>
    </div>    
</template>

<script>
export default {
  data() {
    return {
       cabecerasReporteExistenciaProducto:[
        "Id",
        "Producto",
        "Ubicación",
        "Mínimo",
        "Máximo",
        "Existencia"
      ],
      cabecerasReporteInventarioProducto:[
        "Id",
        "Producto",
        "Precio U.",
        "Existencia",
        "Total"
      ],
      cabecerasListaPrecios:[
        "Id",
        "Producto",
        "Descripción",
        "Existencia",
        "Precio"
      ]
    };
  },
  mounted() {
    let datatable = document.createElement("script");
    datatable.setAttribute(
      "src",
      "assets/js/lib/data-table/datatableReporteProductos.js"
    );
    document.head.appendChild(datatable);
  }
};
</script>
<style>
.div-error {
  display: flex;
  justify-content: center;
}
.lblPedido {
  font-weight: bold;
  margin-bottom: 0px;
}
.datoPedido {
  margin-bottom: 0px;
}
.modal-header-primary {
  color: #fff;
  padding: 9px 15px;
  border-bottom: 1px solid #eee;
  background-color: #17a2b8;
  -webkit-border-top-left-radius: 5px;
  -webkit-border-top-right-radius: 5px;
  -moz-border-radius-topleft: 5px;
  -moz-border-radius-topright: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.bordeDetalle {
  border-style: solid;
  border-width: 5px;
  border-bottom: #455a64 1px;
  border-color: #455a64;
}
input[type="radio"] + .label-text:before{
	content: "\f10c";
	font-family: "FontAwesome";
	speak: none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
	-webkit-font-smoothing:antialiased;
	width: 1em;
	display: inline-block;
	margin-right: 5px;
}

input[type="radio"]:checked + .label-text:before{
	content: "\f192";
	color: #8e44ad;
	animation: effect 250ms ease-in;
}

input[type="radio"]:disabled + .label-text{
	color: #aaa;
}

input[type="radio"]:disabled + .label-text:before{
	content: "\f111";
	color: #ccc;
}

/*Radio Toggle*/

.toggle input[type="radio"] + .label-text:before{
	content: "\f204";
	font-family: "FontAwesome";
	speak: none;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	line-height: 1;
	-webkit-font-smoothing:antialiased;
	width: 1em;
	display: inline-block;
	margin-right: 10px;
}

.toggle input[type="radio"]:checked + .label-text:before{
	content: "\f205";
	color: #16a085;
	animation: effect 250ms ease-in;
}

.toggle input[type="radio"]:disabled + .label-text{
	color: #aaa;
}

.toggle input[type="radio"]:disabled + .label-text:before{
	content: "\f204";
	color: #ccc;
}
.toggle{
font-size: 18px;
}
@keyframes effect{
	0%{transform: scale(0);}
	25%{transform: scale(1.3);}
	75%{transform: scale(1.4);}
	100%{transform: scale(1);}
}
</style>

