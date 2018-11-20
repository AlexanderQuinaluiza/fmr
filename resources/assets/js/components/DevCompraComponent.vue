<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-cart-arrow-down"></i> Devolución Compras </h4>
                </div>
                <div class="card-body">                      

                      <!--inicio modal agregar proveedor -->
                    <div class="modal fade" id="addProveedorModal" tabindex="-1" role="dialog" aria-labelledby="addProveedorModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-primary" role="document">
                            <div class="modal-content">
                                <div class="modal-header modal-header-primary">
                                    <h5 class="modal-title" id="addProveedorModalLabel">AGREGAR PROVEEDOR</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form id="formAddProveedor">
                                         <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>RUC</label>
                                                <input type="text" id="RUC_PROV" maxlength="13" class="form-control entero" placeholder="RUC de Proveedor">
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
                                                <input type="text" id="DEMORA_ENTREGA" maxlength="10" class="form-control entero" placeholder="Días de demora entrega de productos">
                                            </div>
                                        </div>
                                        <div class="row clearfix div-error">
                                                <ul id="lstErroresProveedor"></ul>
                                        </div> 
                                    </form>                                                            
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button>                               
                                    <button type="button" class="btn btn-primary" id="btnAgregarProveedor" ><span class="fa fa-floppy-o"></span> Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div><!--fin modal agregar proveedor -->

                    <!--inicio modal buscar compras -->
                    <div class="modal fade" id="buscarComprasModal" tabindex="-1" role="dialog" aria-labelledby="buscarComprasModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-primary" role="document">
                            <div class="modal-content">
                                <div class="modal-header modal-header-primary">
                                    <h5 class="modal-title" id="buscarComprasModalLabel">BUSCAR COMPRAS</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                     <div class="table-responsive">
                                            <table class="table datatables" id="tablaPedido">
                                            <thead  style="color:#fff;background:#546e7a">
                                            <tr>
                                                <th></th>
                                                <th>#</th>
                                                <th>Fecha</th>
                                                <th>Proveedor</th>
                                                <th>Descripción</th>
                                                <th>Detalle</th>
                                                <th>IdProveedor</th>
                                                <th>Acciones</th>
                                            </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                                                                             
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button>                                                                 
                                </div>
                            </div>
                        </div>
                    </div><!--fin modal buscar pedidos -->

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
                                                   <button type="button" id="inCantidad" class="btn btn-success btn-sm"><span class="fa fa-plus"></span></button> 
                                                   <button type="button" id="deCantidad" class="btn btn-danger btn-sm"><span class="fa fa-minus"></span></button>
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
                            <a class="nav-item nav-link" id="detalle-tab" data-toggle="tab" href="#detalle" role="tab" aria-controls="detalle" aria-selected="false"><i class="fa fa-info-circle"></i> Devolver compra</a>
                            <!-- <a class="nav-item nav-link" id="editar-tab" data-toggle="tab" href="#editar" role="tab" aria-controls="editar" aria-selected="false"><i class="fa fa-plus"></i> Nuevo</a> -->
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
                                            <div class="form-group col-md-9">
                                                <label>Nota de Crédito</label>
                                                 <input type="text" id="NOTA_CREDITO_DEV" required class="form-control" placeholder="Número Nota de crédito proporcionado por proveedor" maxlength="120">
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label>Fecha</label>
                                                 <input type="text" data-date-format="dd/mm/yyyy" id="FECHA_DEV" class="form-control" placeholder="Fecha devolución" maxlength="12">
                                             </div>                                                                                                                                 
                                        </div>
                                        <div class="form-row">                                         
                                            <div class="form-group col-md-2 offset-5">
                                               <button type="button" id="btnFinalizarDevolucion" class="btn btn-primary"><i class="fa fa-floppy-o"></i> Finalizar Devolución</button>
                                            </div>
                                        </div>
                                         <div class="row clearfix div-error">
                                                <ul id="lstErroresDevolucion"></ul>
                                        </div>                                                                                                                                                  
                                    </form>

                                                       
                            </div>   <!-- fin contenido TAB detalle-->                       
                            
                            <!-- <div class="tab-pane fade" id="editar" role="tabpanel" aria-labelledby="editar-tab">
                                    <br>
                                    <form id="formulario">
                                        <div class="form-row">
                                            <div class="form-group col-md-3">
                                                <label>Producto</label>
                                                <select id="ddlProducto" style="width:100%" data-placeholder="Escoja un producto..." class="form-control" data-live-search="true">                                              
                                                </select>
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label>Precio compra</label>
                                                <input type="text" id="PRECIO_COMP" required class="form-control decimal" placeholder="Precio de compra" maxlength="9">
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label>Cantidad</label>
                                                <input type="text" id="CANTIDAD_PRO" required class="form-control entero" placeholder="Cantidad de producto" maxlength="9">
                                            </div>
                                            <div class="form-group col-md-3">                               
                                                <label>Incluye IVA </label>   <br>
                                                <label class="radio-inline"><input type="radio" name="iva" id="ivan" checked value="0">No</label>
                                                <label class="radio-inline"><input type="radio" name="iva" id="ivas" value="1">Si</label>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="col-md-2"></div>                                                                                                                            
                                            <div class="col-md-4">
                                           

                                                <button style="width:100%" data-toggle="modal" data-target="#buscarPedidosModal" type="button" id="btnImportarPedido" class="btn btn-primary"><i class="fa fa-download"></i> Importar desde pedidos</button>
                                            </div>
                                            <div class="col-md-4">                                               
                                                <button style="width:100%" type="button" id="btnAdd" class="btn btn-success"><i class="fa fa-plus"></i> Añadir Item</button>
                                            </div>
                                            <div class="col-md-2"></div>
                                        </div>
                                    
                                        <div class="row clearfix div-error">
                                                <ul id="lstErrores"></ul>
                                        </div>                                   
                                    </form>
                                <hr>
                                <div class="table-responsive">
                                    <table id="bootstrap-data-table" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead style="color:#fff;background:#546e7a">
                                            <tr>
                                                <th></th>
                                                <th v-for="cabecera in cabeceras" :key="cabecera">{{ cabecera }}</th>                                      
                                            </tr>
                                        </thead>
                                        <tbody>                                                
                                        </tbody>
                                    </table> 
                                                                
                                </div>
                                 
                            </div> -->
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
        "Devolver",
        "Precio",
        "Subtotal",
        "IVA",
        "Acciones"
      ],
      cabecerasPedidos: [
        "",
        "#",
        "Fecha",
        "Observación",
        "Proveedor",
        "Acciones"
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
</style>

