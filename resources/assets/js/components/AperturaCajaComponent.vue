<template>
    <div class="row">
      <div class="col-lg-6 offset-3">
                    <div class="card" style="width:100%">
                        <div class="card-header">&nbsp;
                            <!-- <strong class="card-title">Apertura de Caja</strong> -->
                        </div>
                        <div class="card-body">
                          <!-- Credit Card -->
                          <div id="pay-invoice">
                              <div class="card-body">
                                  <div class="card-title">
                                      <h3 class="text-center">Apertura de Caja</h3>
                                  </div>
                                  <hr>
                                  <form id="formAperturaCaja" novalidate="novalidate">
                                      
                                      <div class="form-group">
                                          <label for="cc-payment" class="control-label mb-1">Agencia</label>
                                           <select name="selector" class="form-control" id="ddlAgencia" required>                                                
                                           </select>
                                     </div>
                                      <div class="form-group has-success">
                                          <label for="cc-name" class="control-label mb-1">Caja</label>
                                        <select name="selector" class="form-control" id="ddlCajas" required>                                                
                                        </select>
                                      </div>
                                      
                                      <div class="form-group">
                                          <label for="cc-number" class="control-label mb-1">Depósito</label>
                                          <input id="DEPOSITO" name="DEPOSITO" type="text" class="form-control decimal" value="0.00" placeholder="Dinero para cambio o depósito">
                                       
                                      </div>
                                       <div class="row  div-error">
                                            <ul id="lstErrores"></ul>
                                      </div>
                                      
                                      <div>
                                          <button id="btnAbrirCaja" type="button" class="btn btn-lg btn-info btn-block">
                                              <i class="fa fa-unlock fa-lg"></i>&nbsp;
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
</style>
