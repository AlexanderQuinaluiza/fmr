<template>
    <div class="row">
      <div class="col-lg-8 offset-2">
                    <div class="card" style="width:100%">
                        <div class="card-header">&nbsp;
                            <!-- <strong class="card-title">Apertura de Caja</strong> -->
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
                                            <!--<input type="text" name="0" maxlength="13" class="form-control cant" placeholder="0.00">
                                            <input type="text" name="1" maxlength="13" class="form-control cant" placeholder="0.00">
                                            <input type="text" name="2"  maxlength="13" class="form-control cant" placeholder="0.00">   -->
                                             <!-- <div id="divContar" class="form-row">

                                             </div>
                                            <label class="lblProducto">Total: </label>
                                            <label id="lblTOTAL_CONTADO" class="form-label datoProducto"></label> -->
                                        </div>
                                        
                                        <div class="form-group col-lg-2 text-center" id="divDenominaciones">
                                            <label class="lblDenominacion">DENOMINACIÓN </label>
                                             <!--<label class="lblDenominacion den">x $ 100 </label><br>
                                            <label class="lblDenominacion den">x $ 50 </label><br>
                                            <label class="lblDenominacion den">x $ 20 </label><br> -->
                                        </div>
                                        
                                        <div class="form-group col-lg-5" id="divTotales">
                                            <label class="lblDenominacion" style="padding-left:100px">TOTAL </label>
                                             <!-- <input type="text" disabled id="0total" maxlength="13" class="form-control total" placeholder="0.00">
                                            <input type="text" disabled id="1total" maxlength="13" class="form-control total" placeholder="0.00">
                                            <input type="text" disabled id="2total" maxlength="13" class="form-control total" placeholder="0.00">  -->
                                        </div>
                                        <!-- <div class="form-group col-md-6">
                                            <label class="lblProducto">Descripción: </label>
                                                <label id="lblDESCRIPCION_PRO" class="form-label datoProducto"></label>
                                        </div> -->
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
                                     <button type="button" id="btnOK" class="btn btn-primary" ><span class="fa fa-check"></span> Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div> <!--Fin modal detalles producto -->

                         
                          <div id="pay-invoice">
                              <div class="card-body">
                                  <div class="card-title">
                                      <h3 class="text-center">Cierre de Caja</h3>
                                  </div>
                                  <hr>
                                  <form id="formCierreCaja" novalidate="novalidate">

                                    <div class="form-row">
                                        <div class="form-group col-lg-4">
                                            <label>Contado</label>
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
                                            <label>Calculado</label>
                                           <div class="row">
                                               <div class="form-group col-lg-12">
                                                 <input type="text" id="CALCULADO" maxlength="13" class="form-control decimal inputcaja" placeholder="0.00" value="0.00">
                                               </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4">
                                            <label>Diferencia</label>
                                            <div class="row">
                                                <div class="form-group col-lg-12">
                                                 <input type="text" id="DIFERENCIA" maxlength="13" class="form-control" placeholder="0.00">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                             
                                       <div class="row  div-error">
                                            <ul id="lstErrores"></ul>
                                      </div>
                                      
                                      <div>
                                          <button id="btnAbrirCaja" type="button" class="btn btn-lg btn-info btn-block">
                                              <i class="fa fa-lock fa-lg"></i>&nbsp;
                                              <span id="payment-button-amount">Aceptar</span>
                                            
                                          </button>
                                      </div>
                                  </form>
                              </div>
                          </div>

                        </div>
                    </div> <!-- .card -->

                  </div><!--/.col-->                
    </div>
</template>

<script>
export default {
  data() {
    return {
      cabeceras: ["Id", "Descripción", "Agencia", "Estado", "Acciones"]
    };
  },
  mounted() {
    let datatable = document.createElement("script");
    datatable.setAttribute("src", "assets/js/lib/data-table/aperturaCaja.js");
    document.head.appendChild(datatable);
  }
};
</script>
<style>
.div-error {
  display: flex;
  justify-content: center;
}
.modal-header-primary {
	color:#fff;
    padding:9px 15px;
    border-bottom:1px solid #eee;
    background-color: #17a2b8;
    -webkit-border-top-left-radius: 5px;
    -webkit-border-top-right-radius: 5px;
    -moz-border-radius-topleft: 5px;
    -moz-border-radius-topright: 5px;
     border-top-left-radius: 5px;
     border-top-right-radius: 5px;
}
.lblDenominacion{
    font-weight:bold;
    margin-top:6px;
}
</style>
