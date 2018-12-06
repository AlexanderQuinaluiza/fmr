/**
 * FUNCIONES PARA VISUALIZACIÓN DE INVENTARIO
 */
/**
 * permite cambiar el nombre de clase de un tab
 * @param {string} idTab -identificador de tab
 * @param {string} clase -nombre de clase para el tab
 */
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
              //cambiarTabActivo('#editar', '');
              cambiarTabActivo('#detalleReportePorProducto', '');
              break;
          }
      case 1: //tab detalle
          {
              cambiarTabActivo('#detalleReportePorProducto', 'active show');
              cambiarTabActivo('#listado', '');
              //cambiarTabActivo('#editar', '');
              getDetalleByIdCompra(idRegistro);
              break;
          }
      case 2: //tab detalle
          {
             // cambiarTabActivo('#editar', 'active show');
              cambiarTabActivo('#listado', '');
              cambiarTabActivo('#detalleReportePorProducto', '');
              // getDetalleByIdCompra(idRegistro);
              break;
          }
  }
}
cambiarTab(0, 0);
var compras = [];
var subItems = [];
function getEstadisticasComprasGeneral() {
  
  $.ajax({
      async: false,
      cache: false,
      dataType: "json",
      type: 'GET',
      url: "/estadisticas/compras",
      success: function (respuesta) {
        $.each(respuesta,function(key,value){
          console.log(value);
          var item ={};
          item.name = value.name;
          item.y = value.y;
          item.drilldown = value.drilldown;
          compras.push(item);
          var arrayRootProductos = [];
          var itemProducto = {};
          $.each(value.ITEMS,function(clave,valor){
            itemProducto.id = value.name;
            itemProducto.name = 'Productos';
            var arrayProductos = [];
            arrayProductos.push(valor.PRODUCTO,valor.SUBTOTAL)
            arrayRootProductos.push(arrayProductos);
          });
          itemProducto.data = arrayRootProductos;
          subItems.push(itemProducto);
        });
        // console.log(compras);
        // console.log(subItems);
      },
      beforeSend: function () { },
      error: function (objXMLHttpRequest) { }
  });
}getEstadisticasComprasGeneral();

var defaultTitle = 'Estadística General Compras';
var drilldownTitle = "Compras de Productos en: ";
var options = {
  chart: {
     events: {
          drilldown: function (e) {
            this.setTitle({ text: drilldownTitle+ e.point.name });
              if (!e.seriesOptions) {
                  var chart = this;
                  // Show the loading label
                  chart.showLoading('Loading ...');
                  setTimeout(function () {
                      chart.hideLoading();
                      chart.addSeriesAsDrilldown(e.point, series);
                  }, 1000); 
              }
          },
          drillup: function(e) {
            this.setTitle({ text: defaultTitle });
        }
      },
      plotBorderWidth: 0
  },

  title: {
      text: defaultTitle,
  },
  subtitle: {
          text: 'Compras realizadas a contado '+(new Date()).getFullYear()
  },
  xAxis: {
          type: 'category',
  },
  yAxis: {
            title: {
              text: 'Total Compras'
            },
            labels: 
            {
              formatter: function () {
                  return '$ ' + this.axis.defaultLabelFormatter.call(this);
              }            
            }
          },
  legend: {
    enabled: false
  },
  plotOptions: {
      series: {
          pointPadding: 0.2,
          borderWidth: 0,
          dataLabels: {
              enabled: true
          }
      },
      pie: {
          plotBorderWidth: 0,
          allowPointSelect: true,
          cursor: 'pointer',
          size: '100%',
          dataLabels: {
              enabled: true,
              format: '{point.name}: <b>$ {point.y}</b>'
          }
      }
  },
   series: [{
        name: 'Compras',
        colorByPoint: true,
        data: compras
      }],
      drilldown: {
            series: subItems
          }
};
options.chart.renderTo = 'container';
var defaulTypeGraphic = $('#typeGraphic option:selected').val();
options.chart.type = defaulTypeGraphic;
var chart1 = new Highcharts.Chart(options);

$('#typeGraphic').change(function(){
  var tipoGrafico = $(this).val();
  options.chart.renderTo = 'container';
  options.chart.type = tipoGrafico;
  var chart1 = new Highcharts.Chart(options);
  $('.highcharts-credits').hide();
})
$('.highcharts-credits').hide();

