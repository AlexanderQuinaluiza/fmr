<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-cart-arrow-down"></i> Reportes Ventas</h4>
                </div>
                <div class="card-body">                                         
                    <div class="custom-tab">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link" id="listado-tab" data-toggle="tab" href="#listado" role="tab" aria-controls="listado" aria-selected="true" ><i class="fa fa-list"></i> General</a>
                            <a class="nav-item nav-link" id="detalle-tab" data-toggle="tab" href="#detalle" role="tab" aria-controls="detalle" aria-selected="false"><i class="fa fa-info-circle"></i> Devolver compra</a>
                            <!-- <a class="nav-item nav-link" id="editar-tab" data-toggle="tab" href="#editar" role="tab" aria-controls="editar" aria-selected="false"><i class="fa fa-plus"></i> Nuevo</a> -->
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
                                                 <input type="text" data-date-format="yyyy-mm-dd" id="FECHA_INICIO" class="form-control" placeholder="yyyy-mm-dd" maxlength="12">
                                            </div>
                                        </div>                                                                          
                                    </div>
                                    <div class="col-md-5">
                                         <div class="row">
                                            <div class="col-md-3" >
                                                 <label>Fecha Inicio</label>
                                            </div>
                                            <div class="col-md-9">
                                                 <input type="text" data-date-format="yyyy-mm-dd" id="FECHA_FIN" class="form-control" placeholder="yyyy-mm-dd" maxlength="12">
                                            </div>
                                        </div>                                       
                                    </div>
                                    <div class="col-md-2">                                     
                                            <button type="button" id="btnGeneralVentas" class="btn btn-primary"><i class="fa fa-search"></i> Consultar</button>
                                   </div>                                                                                                                                
                                </div>
                                <hr>                 
                                <div class="table-responsive">
                                    <table id="tabla-reporte-general-ventas" class="table table-bordered table-striped table-hover dataTable js-exportable">
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
                                                <label>Nota de Crédito (*)</label>
                                                 <input type="text" id="NOTA_CREDITO_DEV" required class="form-control entero" placeholder="Número Nota de crédito proporcionado por proveedor" maxlength="120">
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label>Fecha devolución (*)</label>
                                                 <input type="text" data-date-format="yyyy/mm/dd" id="FECHA_DEV" class="form-control" placeholder="yyyy/mm/dd" maxlength="12">
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
        "Documento",
        "Fecha",
        "Cliente",
        "Caja",
        "Usuario",
        "Total"
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
      "assets/js/lib/data-table/datatableReportes-init.js"
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

