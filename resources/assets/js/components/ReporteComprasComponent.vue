<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-cart-arrow-down"></i> Reportes Compras</h4>
                </div>
                <div class="card-body">                                         
                    <div class="custom-tab">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link" id="listado-tab" data-toggle="tab" href="#listado" role="tab" aria-controls="listado" aria-selected="true" ><i class="fa fa-list"></i> General</a>
                            <a class="nav-item nav-link" id="detalle-tab" data-toggle="tab" href="#detalleReportePorProducto" role="tab" aria-controls="detalle" aria-selected="false"><i class="fa fa-barcode"></i> Compra Productos</a>
                            </div>
                        </nav>
                        <div class="tab-content pl-3 pt-2" id="nav-tabContent">
                            <div class="tab-pane fade" id="listado" role="tabpanel" aria-labelledby="listado-tab">
                                <br>
                               <div class="row" id="divInputFechas">                                                    
                                    <div class="col-md-5">                                       
                                        <div class="row">
                                            <div class="col-md-3">
                                                 <label>Fecha Inicio</label>
                                            </div>
                                            <div class="col-md-9">
                                                 <input type="text" data-date-format="yyyy-mm-dd" id="FECHA_INICIO" class="form-control fecha-report" placeholder="yyyy-mm-dd" maxlength="12">
                                            </div>
                                        </div>                                                                          
                                    </div>
                                    <div class="col-md-5">
                                         <div class="row">
                                            <div class="col-md-3" >
                                                 <label>Fecha Fin</label>
                                            </div>
                                            <div class="col-md-9">
                                                 <input type="text" data-date-format="yyyy-mm-dd" id="FECHA_FIN" class="form-control fecha-report" placeholder="yyyy-mm-dd" maxlength="12">
                                            </div>
                                        </div>                                       
                                    </div>
                                    <div class="col-md-2">                                     
                                            <button type="button" id="btnGeneralCompras" class="btn btn-primary"><i class="fa fa-search"></i> Consultar</button>
                                   </div>                                                                                                                                
                                </div>                              
                                <br>                 
                                <div class="table-responsive">
                                    <table id="tabla-reporte-general-compras" class="table dataTable table-striped">
                                        <thead style="color:#fff;background:#546e7a">
                                            <tr>
                                                <th v-for="cabecera in cabecerasListado" :key="cabecera">{{ cabecera }}</th>                                      
                                            </tr>
                                        </thead>
                                        <tbody>                                                
                                        </tbody>
                                    </table>
                                </div>                          
                            </div>

                            <!-- inicio contenido TAB detalle-->
                             <div class="tab-pane fade" id="detalleReportePorProducto" role="tabpanel" aria-labelledby="detalle-tab">
                                <br>
                                <div class="row" id="divInputFechasProducto">
                                    <div class="col-md-5">                                       
                                        <div class="row">
                                            <div class="col-md-3">
                                                 <label>Fecha Inicio</label>
                                            </div>
                                            <div class="col-md-9">
                                                 <input type="text" data-date-format="yyyy-mm-dd" id="FECHA_INICIO_RPRODUCTO" class="form-control fecha-report" placeholder="yyyy-mm-dd" maxlength="12">
                                            </div>
                                        </div>                                                                          
                                    </div>
                                    <div class="col-md-5">
                                         <div class="row">
                                            <div class="col-md-3" >
                                                 <label>Fecha Fin</label>
                                            </div>
                                            <div class="col-md-9">
                                                 <input type="text" data-date-format="yyyy-mm-dd" id="FECHA_FIN_RPRODUCTO" class="form-control fecha-report" placeholder="yyyy-mm-dd" maxlength="12">
                                            </div>
                                        </div>                                       
                                    </div>
                                    <div class="col-md-2">                                     
                                            <button type="button" id="btnComprasxProductos" class="btn btn-primary"><i class="fa fa-search"></i> Consultar</button>
                                   </div>                                                                                                                                
                                </div>
                                <br>


                                <div id="divDetalle" class="table-responsive">
                                    <table id="tabla-reporte-compra-productos" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead style="color:#fff;background:#546e7a">
                                            <tr>
                                                <th v-for="cabecera in cabecerasReportePorProducto" :key="cabecera">{{ cabecera }}</th>                                      
                                            </tr>
                                        </thead>
                                        <tbody>                                                
                                        </tbody>
                                    </table>                                
                                </div>                                                       
                            </div>   <!-- fin contenido TAB detalle-->                                                                                                                                           
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
      cabecerasListado: [
        "",
        "Fecha",
        "Proveedor",
        "Usuario",
        "Caja",
        "Total",
        "Items",
        "Devolución"
      ],
      cabecerasReportePorProducto:[
        "Id",
        "Producto",
        "Marca",
        "Presentación",
        "Categoría",
        "Cantidad",
        "Precio",
        "Total"
      ]
    };
  },
  mounted() {
    let datatable = document.createElement("script");
    datatable.setAttribute(
      "src",
      "assets/js/lib/data-table/datatableReporteCompras.js"
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

