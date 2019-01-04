<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <h4 id="titulo">
            <i class="fa fa-file"></i> Reportes Devoluciones Ventas
          </h4>
        </div>

        <div class="card-body">
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
                  <i class="fa fa-list"></i> B.I. Devoluciones Ventas Usuarios
                </a>
                <a
                  class="nav-item nav-link"
                  id="listado1-tab"
                  data-toggle="tab"
                  href="#listado1"
                  role="tab"
                  aria-controls="listado1"
                  aria-selected="false"
                >
                  <i class="fa fa-list"></i> B.I. Devoluciones Ventas Productos
                </a>
              </div>
            </nav>
            <div class="tab-content pl-3 pt-2" id="nav-tabContent">
              <div class="tab-pane fade" id="listado" role="tabpanel" aria-labelledby="listado-tab">
                <div id="output" style="margin:30px;"></div>
              </div>
              <div
                class="tab-pane fade"
                id="listado1"
                role="tabpanel"
                aria-labelledby="listado1-tab"
              >
                <div id="output1" style="margin:30px;"></div>
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
      cabeceras: ["Id", "Nombre", "Descripción", "Estado", "Acciones"]
    };
  },
  mounted() {
    this.cambiarTab(0);
    this.biDevVentasUsuarios();
    this.biDevVentasProductos();
  },
  methods: {
    utilidades() {
      var derivers = $.pivotUtilities.derivers;
      var renderers = $.extend(
        $.pivotUtilities.renderers,
        $.pivotUtilities.c3_renderers,
        $.pivotUtilities.export_renderers
      );

      $.getJSON("reporte/utilidades", function(mps) {
        $("#output2").pivotUI(
          mps,
          {
            renderers: renderers,
            cols: ["Productos"],
            rows: ["fechas"],
            rendererName: "Horizontal Stacked Bar Chart",
            rowOrder: "value_z_to_a",
            colOrder: "value_z_to_a",
            rendererOptions: {
              /* c3: {
                data: {
                  colors: {
                    Liberal: "#dc3912",
                    Conservative: "#3366cc",
                    NDP: "#ff9900",
                    Green: "#109618",
                    "Bloc Quebecois": "#990099"
                  }
                }
              }*/
            }
          },
          false,
          "es"
        );
      });
    },

    biDevVentasUsuarios() {
      var derivers = $.pivotUtilities.derivers;
      var renderers = $.extend(
        $.pivotUtilities.renderers,
        $.pivotUtilities.c3_renderers,
        $.pivotUtilities.export_renderers
      );

      $.getJSON("reporte/devoluciones_ventas", function(mps) {
        $("#output").pivotUI(
          mps,
          {
            renderers: renderers,
            cols: ["Usuario"],
            rows: ["Fechas"],
            rendererName: "Horizontal Stacked Bar Chart",
            rowOrder: "value_z_to_a",
            colOrder: "value_z_to_a",
            rendererOptions: {
              /* c3: {
                data: {
                  colors: {
                    Liberal: "#dc3912",
                    Conservative: "#3366cc",
                    NDP: "#ff9900",
                    Green: "#109618",
                    "Bloc Quebecois": "#990099"
                  }
                }
              }*/
            }
          },
          false,
          "es"
        );
      });
    },
    biDevVentasProductos() {
      var derivers = $.pivotUtilities.derivers;
      var renderers = $.extend(
        $.pivotUtilities.renderers,
        $.pivotUtilities.c3_renderers,
        $.pivotUtilities.export_renderers
      );

      $.getJSON("reporte/devoluciones_ventas/productos", function(mps) {
        $("#output1").pivotUI(
          mps,
          {
            renderers: renderers,
            cols: ["Usuarios"],
            rows: ["Productos"],
            rendererName: "Table",
            rowOrder: "value_z_to_a",
            colOrder: "value_z_to_a",
            rendererOptions: {
              /* c3: {
                data: {
                  colors: {
                    Liberal: "#dc3912",
                    Conservative: "#3366cc",
                    NDP: "#ff9900",
                    Green: "#109618",
                    "Bloc Quebecois": "#990099"
                  }
                }
              }*/
            }
          },
          false,
          "es"
        );
      });
    },
    cambiarTab(indice) {
      switch (indice) {
        case 0: {
          //tab listado
          this.cambiarTabActivo("#listado", "active show");
          this.cambiarTabActivo("#listado1", "");
         // this.cambiarTabActivo("#listado2", "");
          break;
        }
      }
    },
    cambiarTabActivo(idTab, clase) {
      if (clase == "active show") {
        $(idTab).attr("class", "tab-pane fade active show");
        $(idTab + "-tab").attr("class", "nav-item nav-link active show");
      } else {
        $(idTab).attr("class", "tab-pane fade");
        $(idTab + "-tab").attr("class", "nav-item nav-link");
      }
    }
  }
};
</script>
<style>
.div-error {
  display: flex;
  justify-content: center;
}
.pvtRenderer,
.pvtAggregator {
  width: 150px;
}
</style>

