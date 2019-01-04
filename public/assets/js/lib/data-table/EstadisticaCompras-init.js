/**
 * FUNCIONES PARA VISUALIZACIÓN DE INVENTARIO
 */
/**
 * permite cambiar el nombre de clase de un tab
 * @param {string} idTab -identificador de tab
 * @param {string} clase -nombre de clase para el tab
 */
var arrayDatos = [];
$.ajax({
    async: false,
    cache: false,
    dataType: "json",
    type: 'GET',
    url: "/reportes/comprasdevoluciones",
    success: function (respuesta) {
        //console.log(respuesta);
        var localArray = [];
        localArray.push("valor","tipo","fecha","mes","producto","cantidad","precio","proveedor");
        arrayDatos.push(localArray);
        $.each(respuesta,function(clave,value){
            localArray = [];
            localArray.push(value.valor,value.tipo,value.fecha,value.mes,value.producto,value.cantidad,
                value.precio,value.proveedor);
          //   console.log(localArray);   
          arrayDatos.push(localArray);
        });
        // console.log(compras);
        // console.log(subItems);
    },
    beforeSend: function () { },
    error: function (objXMLHttpRequest) { }
});
// console.log(arrayDatos);
//  var datos_ = [
//     ["valor","tipo","fecha","mes","producto","cantidad","precio","proveedor"],
//     [10,"compra","2018-11-01","noviembre","Nolotil",5,"2","Medicandos"],
//     [20.52,"compra","2018-11-01","noviembre","Bisolvon",4,"5.14","Medicandos"],
//     [100,"compra","2018-11-02","noviembre","Bisolgrip",20,"5","Cholito NG"],
//     [10,"devolucion","2018-11-02","noviembre","Bisolgrip",2,"5","Cholito NG"],
//     [5,"devolucion","2018-12-02","diciembre","Bisolgrip",1,"5","Cholito NG"],
//     [6,"devolucion","2018-12-04","diciembre","Nolotil",3,"2","Medicandos"]
//     ];

    var datos_ = [
        ["valor","tipo","fecha","mes","producto","cantidad","precio","proveedor"],
        [10,"compra","2018-11-01","noviembre","Nolotil",5,"2","Medicandos"],
        [15,"venta","2018-11-01","noviembre","Nolotil",5,"3","Medicandos"],
        [20.52,"compra","2018-11-01","noviembre","Bisolvon",4,"5.14","Medicandos"],
        [13.6,"venta","2018-11-01","noviembre","Bisolvon",2,"6.80","Medicandos"],
        [100,"compra","2018-12-02","diciembre","Bisolgrip",20,"5","Cholito NG"],
        [122,"venta","2018-12-02","diciembre","Bisolgrip",20,"6.10","Cholito NG"],
        [5,"utilidad","2018-11-01","noviembre","Nolotil",5,"3","Medicandos"],
        [-6.92,"utilidad","2018-11-01","noviembre","Bisolvon",2,"6.80","Medicandos"],
        [22,"utilidad","2018-12-02","diciembre","Bisolgrip",20,"6.10","Cholito NG"]
        ];
    console.log(datos_);//arrayDatos
$.pivotUtilities.tipsData = arrayDatos;
    $("#output").pivotUI(
      $.pivotUtilities.tipsData, {
        rows: ["tipo"],
        cols: ["producto"],
        vals: ["valor"],
        aggregatorName: "Sumar",
        rendererName: "Tabla",
        renderers: $.extend(
            $.pivotUtilities.renderers, 
          $.pivotUtilities.plotly_renderers
        )
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



/*--------------------------------INICIO GRAFICA ESTADISTICAS COMPRAS VS DEVOLUCIONES----------------------------*/
/*---------------------------------------------------------------------------------------------------------------*/