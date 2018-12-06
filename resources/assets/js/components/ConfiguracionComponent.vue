<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-cogs"></i> Configuraciones </h4>
                </div>
                <div class="card-body">
                  
                    
                    

                    <div class="custom-tab">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active show" id="editar-tab" data-toggle="tab" href="#editar" role="tab" aria-controls="editar" aria-selected="false"><i class="fa fa-pencil"></i> Editar</a>
                            </div>
                        </nav>
                        <div class="tab-content pl-3 pt-2" id="nav-tabContent">                                                                              
                           <div class="tab-pane fade active show" id="editar" role="tabpanel" aria-labelledby="editar-tab">
                                    <br>
                                    
                                   <form id="formCierreCaja" novalidate="novalidate">

                                    <div class="form-row">
                                        <div class="form-group col-lg-6">
                                            <label>Configuración</label>
                                            <select id="ddlConfig" style="width:100%" data-placeholder="Escoja una configuración..." class="form-control" data-live-search="true">                                              
                                            </select>
                                        </div>
                                        <div class="form-group col-lg-6">
                                            <label>Valor</label>
                                            <input type="text" id="VALOR_CONF" maxlength="200" class="form-control" placeholder="Valor configuración" >                                                
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-lg-4 offset-4">
                                         <button id="btnGuardar" type="button" class="btn btn-lg btn-info btn-block">
                                              <i class="fa fa-floppy-o fa-sm"></i>&nbsp;
                                              <span id="payment-button-amount">Guardar</span>                                          
                                          </button>
                                        </div>
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
      
    };
  },
  mounted() {
    let config = document.createElement("script");
    config.setAttribute(
      "src",
      "assets/js/lib/data-table/configuraciones.js"
    );
    document.head.appendChild(config);
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

