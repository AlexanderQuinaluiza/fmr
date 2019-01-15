<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-money"></i> Movimientos de Caja </h4>
                </div>
                <div class="card-body">                                                                
                    <div class="custom-tab">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link" id="listado-tab" data-toggle="tab" href="#listado" role="tab" aria-controls="listado" aria-selected="true" ><i class="fa fa-list"></i> Listado</a>
                            <a class="nav-item nav-link" id="editar-tab" data-toggle="tab" href="#editar" role="tab" aria-controls="editar" aria-selected="false"><i class="fa fa-plus"></i> Nuevo</a>
                            </div>
                        </nav>
                        <div class="tab-content pl-3 pt-2" id="nav-tabContent">
                            <div class="tab-pane fade" id="listado" role="tabpanel" aria-labelledby="listado-tab">
                                <br>                      
                                <div class="table-responsive">
                                    <table id="tabla-movimientos-caja" class="table table-bordered table-striped table-hover dataTable js-exportable">
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
                            <div class="tab-pane fade" id="editar" role="tabpanel" aria-labelledby="editar-tab">
                                    <br>
                                    <form id="formulario">
                                        <div class="form-row">
                                            <div class="form-group col-md-2">
                                                <label>Valor</label>
                                                <i class="fa fa-question-circle" data-toggle="tooltip" title="Valor monetario de movimiento de caja" style="color:#007bff"></i>
                                                <input type="text" id="VALOR_MOV" required class="form-control decimal" placeholder="0.00 " maxlength="9">
                                            </div>
                                            <div class="form-group col-md-5">
                                                <label>Descripción</label>
                                                <input type="text" id="DESCRIPCION_MOV" required class="form-control" placeholder="Descripción movimiento" maxlength="255">
                                            </div>

                                              <div class="form-group col-md-3">                                          
                                                <label>Seleccione la caja:</label><br>
                                                <div id="divCajas"></div>   
                                             </div>

                                            <div class="form-group col-md-2 text-center">
                                                <label>Tipo</label>
                                                <i class="fa fa-question-circle" data-toggle="tooltip" title="Tipo de movimiento entrada o salida de dinero" style="color:#007bff"></i>
                                                <div class="form-check">
                                                    <label class="toggle">
                                                        <input hidden type="radio" name="radioMovCaja" value="1" class="radioBtnMovCaj"> 
                                                        <span class="label-text">Entrada</span>
                                                    </label>
                                                </div>
                                                 <div class="form-check">
                                                    <label class="toggle">
                                                        <input hidden type="radio" name="radioMovCaja" value="2" class="radioBtnMovCaj"> 
                                                        <span class="label-text">Salida</span>
                                                    </label>
                                                </div>
                                            </div>
                                             
                                        </div>
                                        <div class="row clearfix div-error">
                                                <ul id="lstErrores"></ul>
                                        </div> 
                                       
                                        <div class="form-row">
                                            <div class="form-group col-md-2 offset-5">
                                                <button id="btnGuardarMov" type="button" class="btn btn-lg btn-primary btn-block">
                                                    <i class="fa fa-floppy-o fa-lg"></i>&nbsp;
                                                    <span>Guardar</span>
                                            
                                                </button>
                                            </div>
                                        </div>                                                                                                                                                  
                                    </form>
                                <hr>
                                
                                 
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
      cabecerasListado: ["#", "Fecha", "Descripción","Caja", "Tipo", "Transacción","Valor"],
    };
  },
  mounted() {
    let datatable = document.createElement("script");
    datatable.setAttribute(
      "src",
      "assets/js/lib/data-table/datatableMovimientoCaja-init.js"
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
  margin-bottom: 0px;
}
.datoPedido {
  margin-bottom: 0px;
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

