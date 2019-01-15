<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-cart-arrow-down"></i> Devolución Compras </h4>
                </div>
                <div class="card-body">                      
                     <!--inicio modal editar item compra -->
                    <div class="modal fade" id="itemCompraModal" tabindex="-1" role="dialog" aria-labelledby="itemCompraModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-primary" role="document">
                            <div class="modal-content">
                                <div class="modal-header modal-header-primary">
                                    <h5 class="modal-title" id="itemCompraModalLabel">EDITAR ITEM DEVOLUCIÓN COMPRA</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                     <form id="formEditarItem">
                                        <div class="form-row">                           
                                            <div class="form-group col-md-8">
                                                <label>Cantidad a devolver</label>
                                                <input type="text" id="EDIT_CANTIDAD_PRO" required class="form-control entero" placeholder="Cantidad de producto a devolver" maxlength="9">
                                            </div>
                                            <div class="form-group col-md-4" style="padding-top:10px"><br>
                                                <div class="btn-group btn-group-sm">
                                                   <button type="button" id="deCantidad" class="btn btn-danger btn-sm"><span class="fa fa-minus"></span></button>
                                                    <button type="button" id="inCantidad" class="btn btn-success btn-sm"><span class="fa fa-plus"></span></button> 
                                                   
                                                </div>
                                            </div>                                           
                                        </div>                                      
                                        <div class="row clearfix div-error">
                                                <ul id="lstErroresEditItem"></ul>
                                        </div>                                   
                                    </form>
                                                                                             
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button>                                                                 
                                     <button type="button" class="btn btn-primary" id="btnModificarItem" ><span class="fa fa-floppy-o"></span> Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div><!--fin modal editar item compra -->

                    <div class="custom-tab">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link" id="listado-tab" data-toggle="tab" href="#listado" role="tab" aria-controls="listado" aria-selected="true" ><i class="fa fa-list"></i> Listado compras</a>
                            <a class="nav-item nav-link" id="detalle-tab" data-toggle="tab" href="#detalle" role="tab" aria-controls="detalle" aria-selected="false"><i class="fa fa-undo"></i> Devolver compra</a>
                            <a class="nav-item nav-link" id="devolucion-tab" data-toggle="tab" href="#devolucion" role="tab" aria-controls="devolucion" aria-selected="false"><i class="fa fa-cart-arrow-down"></i> Listado devoluciones</a>
                            <a class="nav-item nav-link" id="devoluciond-tab" data-toggle="tab" href="#devoluciond" role="tab" aria-controls="devoluciond" aria-selected="false"><i class="fa fa-info-circle"></i> Detalle devolución</a>
                            </div>
                        </nav>
                        <div class="tab-content pl-3 pt-2" id="nav-tabContent">
                            <div class="tab-pane fade" id="listado" role="tabpanel" aria-labelledby="listado-tab">
                                <br>                      
                                <div class="table-responsive">
                                    <table id="tabla-listado-compras" class="table table-bordered table-striped table-hover dataTable js-exportable">
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
                             <div class="tab-pane fade" id="detalle" role="tabpanel" aria-labelledby="detalle-tab">
                                <br>
                                <div class="form-row" id="divCabecera"><!--Inicio cabecera compra -->
                                        <div class="form-group col-md-4">
                                            <div class="row text-right">
                                                <img id="LOGO_AGE" class="imagen" />
                                            </div>
                                        </div>
                                        <div class="col-md-4">                                          
                                                    <label class="lblPedido nombre" id="lblNOMBRE_AGE"></label><br>
                                                    <label class="form-label datoPedido">RUC:&nbsp; </label><label class="form-label datoPedido ruc" id="lblRUC_AGE"></label><br>
                                                    <label class="form-label datoPedido">Dir:&nbsp; </label><label class="form-label datoPedido dir" id="lblDIRECCION_AGE"></label><br>
                                                    <label class="form-label datoPedido">Telf:&nbsp; </label><label class="form-label datoPedido telefono" id="lblTELEFONO_AGE"></label><br>                                                  
                                                    <label class="form-label datoPedido">Correo:&nbsp; </label><label class="form-label datoPedido correo" id="lblCORREO_AGE"></label>                                          
                                        </div>
                                        <div class="form-group col-md-4" >                                             
                                                    <label class="lblPedido">Número compra:&nbsp;</label><label id="lblID_COMP" class="form-label datoPedido numero"></label><br>
                                                    <label class="lblPedido">Fecha:&nbsp;</label><label id="lblFECHA_COMP" class="form-label datoPedido fecha"></label><br>
                                                    <label class="lblPedido">Proveedor:&nbsp;</label><label id="lblNOMBRE_PROV" class="form-label datoPedido numero"></label><br>
                                                    <label class="lblPedido">Factura Prov.:&nbsp;</label><label id="lblFACTURA_PROV" class="form-label datoPedido fecha"></label><br>
                                                    <label class="lblPedido">Responsable:&nbsp;</label><label id="lblNOMBRE_USU" class="form-label datoPedido numero"></label><br>                                                                                 
                                        </div>
                                </div> <!--Fin cabecera compra -->
                                <hr>


                                <div id="divDetalle" class="table-responsive">
                                    <table id="tabla-detalle-compra" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead style="color:#fff;background:#546e7a">
                                            <tr>
                                                <th> 
                                                    <div class="form-check">
                                                        <label class="form-check-label">
                                                            <input type="checkbox" class="form-check-input" onchange="toggle(this)" id="select" data-toggle="tooltip"  title="Seleciona todos los items" >*
                                                        </label>
                                                    </div>
                                                </th>
                                                <th v-for="cabecera in cabecerasDetalle" :key="cabecera">{{ cabecera }}</th>                                      
                                            </tr>
                                        </thead>
                                        <tbody>                                                
                                        </tbody>
                                    </table>                                
                                </div>

                                <form id="secondFormDevolucion">
                                        <div class="form-row">
                                            <div class="form-group col-md-12">
                                                <label>Observación</label>
                                                 <input type="text" id="OBSERVACION_DEV" required class="form-control" placeholder="Observación para devolución" maxlength="120">
                                            </div>                                                                                                                                                                         
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-5">
                                                <label>Nota de Crédito (*)</label>
                                                 <input type="text" id="NOTA_CREDITO_DEV" required class="form-control entero" placeholder="Número Nota de crédito proporcionado por proveedor" maxlength="120">
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label>Fecha devolución (*)</label>
                                                 <input type="text" data-date-format="yyyy/mm/dd" id="FECHA_DEV" class="form-control" placeholder="yyyy/mm/dd" maxlength="12">
                                             </div>                                                                                                                                                                       
                                        </div>
                                        
                                        <div class="form-row">
                                            <div class="form-group col-md-4 offset-4">
                                                <button id="btnFinalizarDevolucion" type="button" class="btn btn-lg btn-primary btn-block">
                                                    <i class="fa fa-floppy-o fa-lg"></i>&nbsp;
                                                    <span>Finalizar Devolución</span>                                        
                                                </button>
                                            </div>
                                        </div>

                                         <div class="row clearfix div-error">
                                                <ul id="lstErroresDevolucion"></ul>
                                        </div>                                                                                                                                                  
                                    </form>

                                                       
                            </div>   <!-- fin contenido TAB detalle--> 

                             <!-- fin contenido TAB listado devoluciones--> 
                            <div class="tab-pane fade" id="devolucion" role="tabpanel" aria-labelledby="devolucion-tab">
                                <br>                      
                                <div class="table-responsive">
                                    <table id="tabla-listado-devoluciones" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead style="color:#fff;background:#546e7a">
                                            <tr>
                                                <th v-for="cabecera in cabecerasDevoluciones" :key="cabecera">{{ cabecera }}</th>                                      
                                            </tr>
                                        </thead>
                                        <tbody>                                                
                                        </tbody>
                                    </table>
                                </div>                          
                            </div> <!-- fin contenido TAB listado devoluciones-->

                             <!-- inicio contenido TAB detalle devolución-->
                             <div class="tab-pane fade" id="devoluciond" role="tabpanel" aria-labelledby="devoluciond-tab">
                                <br>
                                <div class="form-row" id="divCabecera"><!--Inicio cabecera detalle devolución -->
                                        <div class="form-group col-md-4">
                                            <div class="row text-right">
                                                <img class="imagen" />
                                            </div>
                                        </div>
                                        <div class="col-md-4">                                          
                                                    <label class="lblPedido nombre" id="lblNOMBRE_AGE"></label><br>
                                                    <label class="form-label datoPedido">RUC:&nbsp; </label><label class="form-label datoPedido ruc" id="lblRUC_AGE"></label><br>
                                                    <label class="form-label datoPedido">Dir:&nbsp; </label><label class="form-label datoPedido dir" id="lblDIRECCION_AGE"></label><br>
                                                    <label class="form-label datoPedido">Telf:&nbsp; </label><label class="form-label datoPedido telefono" id="lblTELEFONO_AGE"></label><br>                                                  
                                                    <label class="form-label datoPedido">Correo:&nbsp; </label><label class="form-label datoPedido correo" id="lblCORREO_AGE"></label>                                          
                                        </div>
                                        <div class="form-group col-md-4" >                                             
                                                    <label class="lblPedido">Número devolución:&nbsp;</label><label id="lblID_DEV" class="form-label datoPedido numero"></label><br>
                                                    <label class="lblPedido">Fecha:&nbsp;</label><label id="lblFECHA_DEV" class="form-label datoPedido fecha"></label><br>
                                                    <label class="lblPedido">Proveedor:&nbsp;</label><label id="lblNOMBRE_PROV_DEV" class="form-label datoPedido numero"></label><br>
                                                    <label class="lblPedido">Nota Crédito Prov.:&nbsp;</label><label id="lblNOTA_CREDITO_PROV" class="form-label datoPedido fecha"></label><br>
                                                    <label class="lblPedido">Responsable:&nbsp;</label><label id="lblNOMBRE_USU_DEV" class="form-label datoPedido numero"></label><br>
                                                    <label class="lblPedido">Caja:&nbsp;</label><label id="lblCAJA" class="form-label datoPedido numero"></label><br>                                                                                 
                                        </div>
                                </div> <!--Fin cabecera compra -->
                                <hr>


                                <div id="divDetalleDevolucion" class="table-responsive">
                                    <table id="tabla-detalle-devolucion" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead style="color:#fff;background:#546e7a">
                                            <tr>
                                                <th v-for="cabecera in cabecerasDetalleDevolucion" :key="cabecera">{{ cabecera }}</th>                                      
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
      cabeceras: [
        "Producto",
        "Precio",
        "Cantidad",
        "Subtotal",
        "IVA",
        "Acciones"
      ],
      cabecerasListado: [
        "#",
        "Proveedor",
        "Fecha",
        "Factura",
        "Descripción",
        "Total",
        "Acciones"
      ],
      cabecerasDetalle: [
        "#",
        "IdProducto",
        "Producto",
        "Comprado",
        "Devuelto",
        "Devolver",
        "Precio",
        "Subtotal",
        "Acciones"
      ],
      cabecerasDevoluciones: [
        "#",
        "Fecha",
        "Observación",
        "Responsable",
        "Caja",
        "Proveedor",
        "Total",
        "Acciones"
      ],
      cabecerasDetalleDevolucion: [
        "#",
        "Producto",
        "Cantidad",
        "Precio",
        "Subtotal",
      ]
    };
  },
  mounted() {
    let datatable = document.createElement("script");
    datatable.setAttribute(
      "src",
      "assets/js/lib/data-table/datatableDevCompra-init.js"
    );
    document.head.appendChild(datatable);

    let agencia = document.createElement("script");
    agencia.setAttribute("src", "assets/js/lib/data-table/agencia.js");
    document.head.appendChild(agencia);

      let validacion = document.createElement("script");
    validacion.setAttribute("src", "assets/js/lib/data-table/validaciones.js");
    document.head.appendChild(validacion);
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

