<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-lock"></i> Cierres de Caja </h4>
                </div>
                <div class="card-body">
                 <!--Inicio modal detalle producto -->
                    <div class="modal fade" id="denominacionEfectivoModal" tabindex="-1" role="dialog" aria-labelledby="denominacionEfectivoModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-primary" role="document">
                            <div class="modal-content">
                                <div class="modal-header modal-header-primary">
                                    <h5 class="modal-title" id="denominacionEfectivoModalLabel">CONTADOR DE EFECTIVO</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form id="formDenominaciones">
                                    <div class="form-row">
                                        
                                        <div class="form-group col-lg-5" id="divCantidades">
                                             <label class="lblDenominacion" style="padding-left:100px">CANTIDAD </label>
                                            </div>
                                        
                                        <div class="form-group col-lg-2 text-center" id="divDenominaciones">
                                            <label class="lblDenominacion">DENOMINACIÓN </label>                                  
                                        </div>
                                        
                                        <div class="form-group col-lg-5" id="divTotales">
                                            <label class="lblDenominacion" style="padding-left:100px">TOTAL </label>
                                            </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-lg-5">&nbsp;
                                        </div>
                                        <div class="form-group col-lg-2">
                                             <label class="lblProducto" style="font-weight:bold">TOTAL: </label>
                                        </div>
                                        <div class="form-group col-lg-5" id="divTotal">
                                            <input type="text" disabled id="totalContado" maxlength="13" class="form-control text-center" placeholder="0.00" value="0.00"> 
                                        </div>
                                    </div>
                                    </form>                                                                                                                                                                                                                                                                                                                                                                                                                  
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-info" data-dismiss="modal"><span class="fa fa-times"></span> Cerrar</button>
                                     <button type="button" data-dismiss="modal" id="btnOK" class="btn btn-primary" ><span class="fa fa-check"></span> Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div> <!--Fin modal detalles producto -->       
                    
                    

                    <div class="custom-tab">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link" id="listado-tab" data-toggle="tab" href="#listado" role="tab" aria-controls="listado" aria-selected="true" ><i class="fa fa-list"></i> Listado</a>
                            <a class="nav-item nav-link" id="detalle-tab" data-toggle="tab" href="#detalle" role="tab" aria-controls="detalle" aria-selected="false"><i class="fa fa-info-circle"></i> Detalle</a>
                            <a class="nav-item nav-link" id="editar-tab" data-toggle="tab" href="#editar" role="tab" aria-controls="editar" aria-selected="false"><i class="fa fa-plus"></i> Nuevo</a>
                            </div>
                        </nav>
                        <div class="tab-content pl-3 pt-2" id="nav-tabContent">
                            <div class="tab-pane fade" id="listado" role="tabpanel" aria-labelledby="listado-tab">
                                <br>                      
                                <div class="table-responsive">
                                    <table id="tabla-listado" class="table table-bordered table-striped table-hover dataTable js-exportable">
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

                                <div class="form-row" id="divCabecera" >
                                      
                                        <div class="col-md-6">
                                            <div class="row">
                                                <div class="col-md-12" >
                                                    <label class="form-label lblPedido">Cierre de Caja N°:&nbsp; </label><label class="form-label" id="lblID_CCJ"></label><br>
                                                    <label class="form-label lblPedido">Fecha:&nbsp; </label><label class="form-label" id="lblFECHA_CCJ"></label><br>
                                                    <label class="form-label lblPedido">Caja:&nbsp; </label><label class="form-label" id="lblCAJA_CCJ"></label><br>
                                                    <label class="form-label lblPedido">Responsable:&nbsp; </label><label class="form-label" id="lblRESPONSABLE_CCJ"></label><br>
                                                                                                 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-6">
                                             <div class="row">
                                                <div class="col-md-12" >
                                                    <label class="form-label lblPedido">Contado:&nbsp; </label><label class="form-label" id="lblCONTADO_CCJ"></label><br>
                                                    <label class="form-label lblPedido">Calculado:&nbsp; </label><label class="form-label" id="lblCALCULADO_CCJ"></label><br>
                                                    <label class="form-label lblPedido">Diferencia:&nbsp; </label><span  class="badge badge-success" id="DIFERENCIA_CCJ"></span><br>
                                                    <label class="form-label lblPedido">Retirado:&nbsp; </label><label class="form-label" id="lblRETIRADO_CCJ"></label>                                             
                                                </div>
                                            </div>
                                        </div>     
                                </div>                        
                            </div>   <!-- fin contenido TAB detalle-->                       
                            
                            <div class="tab-pane fade" id="editar" role="tabpanel" aria-labelledby="editar-tab">
                                    <br>
                                    
                                   <form id="formCierreCaja" novalidate="novalidate">

                                    <div class="form-row">
                                         <div class="form-group col-lg-12">
                                            <label>Caja</label>
                                            <select id="ddlCaja" style="width:100%" data-placeholder="Escoja una caja..." class="form-control" data-live-search="true">                                              
                                            </select>
                                         </div>
                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-lg-4">
                                            <label>Contado (*)</label>
                                            <div class="row">
                                                <div class="form-group col-lg-2">
                                                    <button type="button" data-toggle="modal" data-target="#denominacionEfectivoModal" class="btn btn-info"><span class="fa fa-calculator"></span> </button>
                                                </div>
                                                 <div class="form-group col-lg-10">
                                                    <input type="text" id="CONTADO" maxlength="13" class="form-control decimal inputcaja" placeholder="0.00" value="0.00">
                                                 </div>
                                            </div>
                                           
                                        </div>
                                        <div class="form-group col-lg-4">
                                            <label>Calculado (*)</label>
                                           <div class="row">
                                               <div class="form-group col-lg-12">
                                                 <input type="text" id="CALCULADO" maxlength="13" class="form-control decimal inputcaja" placeholder="0.00" value="0.00">
                                               </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4">
                                            <label>Diferencia (*)</label>
                                            <div class="row">
                                                <div class="form-group col-lg-12">
                                                 <input type="text" id="DIFERENCIA" maxlength="13" class="form-control" placeholder="0.00" value="0.00">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                     <div class="form-row">
                                          <div class="form-group col-lg-12">
                                            <label>Retiro por corte (*)</label>
                                            <div class="row">
                                                <div class="form-group col-lg-12">
                                                    <input type="text" id="RETIRADO" maxlength="13" class="form-control decimal" placeholder="0.00" value="0.00">
                                                </div>
                                            </div>
                                          </div>
                                     </div>
                                      
                                      <div>
                                          <button id="btnCorteCaja" type="button" class="btn btn-lg btn-info btn-block">
                                              <i class="fa fa-lock fa-lg"></i>&nbsp;
                                              <span id="payment-button-amount">Aceptar</span>
                                            
                                          </button>
                                      </div>
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
  data() {
    return {
      cabeceras: [
        "Producto",
        "Marca",
        "Presentación",
        "Cantidad",
        "Acciones"
      ],
      cabecerasListado: ["#", "Caja", "Fecha","Responsable", "Contado","Calculado","Diferencia", "Acciones"]
    };
  },
  mounted() {
    let datatable = document.createElement("script");
    datatable.setAttribute(
      "src",
      "assets/js/lib/data-table/datatableCierresCaja-init.js"
    );
    document.head.appendChild(datatable);

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
  /*margin-bottom: 0px;*/
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
.lblDenominacion {
  font-weight: bold;
  margin-top: 6px;
}
</style>

