/**
 * FUNCIONES PARA VISUALIZACIÓN DE INVENTARIO
 */
/**
 * permite cambiar el nombre de clase de un tab
 * @param {string} idTab -identificador de tab
 * @param {string} clase -nombre de clase para el tab
 */
var arrayDatos = [];

        var derivers = $.pivotUtilities.derivers;
        var renderers = $.extend(
        $.pivotUtilities.renderers,
        $.pivotUtilities.c3_renderers,
        $.pivotUtilities.export_renderers
        );

      $.getJSON("reportes/comprasdevoluciones", function(mps) {
        $("#output").pivotUI(
          mps,
          {
            renderers: renderers,
            cols: ["producto"],
            rows: ["tipo"],
            rendererName: "Table",
            rowOrder: "value_z_to_a",
            colOrder: "value_z_to_a",
            rendererOptions: {
            }
          },
          false,
          "es"
        );
      });

function cambiarTabActivo(idTab, clase) {
    if (clase == 'active show') {
        $(idTab).attr('class', 'tab-pane fade active show');
        $(idTab + '-tab').attr('class', 'nav-item nav-link active show');
    }
    else {
        $(idTab).attr('class', 'tab-pane fade');
        $(idTab + '-tab').attr('class', 'nav-item nav-link');
    }
}

/**
* permite cambiar un tab de activo a inactivo o viceversa
* @param {int} indice -indice de tab
* @param {int} idRegistro -identificador de usuario
*/
function cambiarTab(indice, idRegistro) {
    switch (indice) {
        case 0: //tab listado
            {
                cambiarTabActivo('#listado', 'active show');
                cambiarTabActivo('#devolucion', '');
                cambiarTabActivo('#detalleReportePorProducto', '');
                break;
            }
        case 1:
            {
                cambiarTabActivo('#detalleReportePorProducto', 'active show');
                cambiarTabActivo('#listado', '');
                cambiarTabActivo('#devolucion', '');
                getDetalleByIdCompra(idRegistro);
                break;
            }
        case 2:
            {
                cambiarTabActivo('#devolucion', 'active show');
                cambiarTabActivo('#listado', '');
                cambiarTabActivo('#detalleReportePorProducto', '');
                // getDetalleByIdCompra(idRegistro);
                break;
            }
    }
}
cambiarTab(0, 0);