<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <h4 id="titulo">
            <i class="fa fa-undo" aria-hidden="true"></i> Devoluciones
          </h4>
        </div>
        <div class="card-body">
          <div id="ridenc" style="display:none;"></div>
          <!--Inicio modal detalle producto -->
          <div
            class="modal fade"
            id="mediumModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="mediumModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg modal-primary" role="document">
              <div class="modal-content">
                <div class="modal-header modal-header-primary">
                  <h5 class="modal-title" id="mediumModalLabel">DETALLE ROL</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label id="lblNombreRol"></label>
                      <ul id="lstModulos"></ul>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button>
                </div>
              </div>
            </div>
          </div>
          <!--Fin modal detalles producto -->
          <div class="custom-tab">
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a
                  class="nav-item nav-link"
                  id="listado-tab"
                  data-toggle="tab"
                  href="#listado"
                  role="tab"
                  aria-controls="listado"
                  aria-selected="true"
                >
                  <i class="fa fa-list"></i> Listado
                </a>
                <a
                  class="nav-item nav-link"
                  id="editar-tab"
                  data-toggle="tab"
                  href="#editar"
                  role="tab"
                  aria-controls="editar"
                  aria-selected="false"
                >
                  <i class="fa fa-plus"></i> Nuevo
                </a>
              </div>
            </nav>
            <div class="tab-content pl-3 pt-2" id="nav-tabContent">
              <div class="tab-pane fade" id="listado" role="tabpanel" aria-labelledby="listado-tab">
                <br>

                <div class="table-responsive">
                  <table
                    id="table_devoventas"
                    class="table table-bordered table-striped table-hover dataTable js-exportable"
                  >
                    <thead style="color:#fff;background:#546e7a">
                      <tr>
                        <th v-for="cabecera in cabeceras" :key="cabecera">{{ cabecera }}</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" id="editar" role="tabpanel" aria-labelledby="editar-tab">
                <br>
                <form id="form">
                  <input type="hidden" id="id" value>
                  <div class="form-row">
                      <div class="form-group col-md-3">
                          <label>Código de la Factura</label>
                    <div class="input-group mb-3">
                      
                      <input
                        type="text"
                        id="NUM_FAC"
                        required
                        class="form-control"
                        placeholder="12345"
                        maxlength="20"
                        autofocus
                       >
                      <div class="input-group-append">
                        <button class="btn btn-success" id="btnbuscarventa" type="button" onclick="cargarDatosFactura();"><i class="fa fa-search" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                    </div>
                    <div class="form-group col-md-9">
                      <label>Motivo devolución</label>
                      <input
                        type="text"
                        id="MOTIVO"
                        required
                        class="form-control"
                        placeholder="Ejemplo: Producto equivocado"
                        maxlength="200"
                      >
                    </div>
                  </div>

                  <div id="fichadev"></div>

                  <hr style="margin-top: 0px;margin-bottom: 0px;">
                  <div class="col-md-9">
                    <div class="row clearfix div-error">
                    <ul id="lstErrores"></ul>
                    </div>
                  <button type="button" id="btnGuardarDev" class="btn btn-primary">
                    <i class="fa fa-floppy-o"></i> Guardar
                  </button>
                  <button type="button" id="btnImprimirDev" onclick="vistaPreviaImprimir();" class="btn btn-primary">
                    <i class="fa fa-print"></i> Imprimir
                  </button>
                  <button type="button" id="btnFinalDev" onclick="finalizar();" class="btn btn-primary">
                    Finalizar
                  </button>
                  <button type="button" id="btnCancelarActualizar" class="btn btn-warning">
                    <i class="fa fa-times"></i> Cancelar
                  </button>

                  </div>
                  <div class="col-md-3" style="padding-right: 0px;">
                    <table class="table table-sm table-bordered">
                      <tr>
                        <td style="color: white;background-color: #546e7a;">Tarifa 0%</td>
                        <td id="tarcero">0.00</td>
                      </tr>
                      <tr>
                        <td style="color: white;background-color: #546e7a;">Tarifa iva</td>
                        <td id="tariva">0.00</td>
                      </tr>
                      <tr>
                        <td style="color: white;background-color: #546e7a;">IVA</td>
                        <td id="iva_dev">0.00</td>
                      </tr>
                      <tr>
                        <td style="color: white;background-color: #546e7a;"><b>TOTAL</b> </td>
                        <td id="total_dev" style="color: white;background-color: #000; text-align: center;font-size: x-large;">0.00</td>
                      </tr>
                    </table>
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
      //ID_DEV_VEN, ID_VEN, ID_USU, TOTAL_DEV, IVA_DEV, SUBT_IVA, SUBT_CERO, OBSERVACION_DEV, FECHA_DEV
      cabeceras: [
        "Id",
        "#Factura",
        "Fecha Venta",
        "Motivo",
        "Valor Devuelto",
        "Fecha Dev.",
        "#N.C.",
        "Acciones"
      ]
    };
  },
  mounted() {
    let datatable = document.createElement("script");
    datatable.setAttribute(
      "src",
      "assets/js/lib/data-table/datatabledevoventas.js"
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
</style>

