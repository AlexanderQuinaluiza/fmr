/**
 * FUNCIONES PARA LA GESTIÓN DE LOS COMPROBANTES
 */

 /**
  *permite validar los datos de entrada para rol 
  * @param {int} opcion -1=registrar, 2=actualizar
  */
 function validarDatos(opcion)
 {
     var error = 0;
     var errorMostrarMsj = [];
     if(!$('#MOTIVO').val().trim()) errorMostrarMsj.push("Debe existir un motivo para anular la factura");
     if(!$('#ID_VEN').val().trim()) errorMostrarMsj.push("Debe seleccionar una factura de la tabla");
   
     
 
     if(errorMostrarMsj.length){
         $('#lstErrores').empty();
         error = 1;
         var lista = '';
         for(var i=0;i<errorMostrarMsj.length;i++)
         {
             lista+='<li style="color: red !important">'+errorMostrarMsj[i]+'</li>';
         }
         $('#lstErrores').append(lista);
     }
     else
     {
           $('#lstErrores').empty();
     }
     return error;
 }
 
 /**
  * permite limpiar las entradas de texto
  */
 function limpiarDatos()
 {
    // $('#id').val('');
     $('#MOTIVO').val('');
     $('#lstErrores').empty();
 }
 

 /**
  * permite actualizar el estado de la venta y seguir con el proceso 
  */
 function anular()
 {
     if(validarDatos(1)){
        return;
    }                   
    axios.post('anular',{
        'ID_VEN': $('#ID_VEN').val().trim(),
        'MOTIVO':$('#MOTIVO').val().trim(),
              }).then(function (response){
                
                  //Console.log(response.data.result);
                  
                  crearNotaCredito(response.data.cabecera,response.data.result);
                  vistaPreviaImprimir();
                  $('#btnfin').show();
                  $('#btnimprimir').show();
                  $('#btnanularfac').hide();
                  tablafacturas.ajax.reload();
                  tabla_notas.ajax.reload();
                  tablanulos.ajax.reload();
    toastr.info('se anuló correctamente la factura!');
    $('#btnanularfac').hide();
    })
    .catch(function (error) {
     console.log(error);
     toastr.error('No se puede anular la factura, comunique al administrador del sistema.', 'Error!')
    });
 }
  function finalizar(){
    $('#btnfin').hide();
    $('#btnimprimir').hide();
    $('#btnanularfac').show();
    document.getElementById("ridenc").innerHTML="";
    limpiarDatos();
  }
  /**
  * permite cambiar el nombre de clase de un tab
  * @param {string} idTab -identificador de tab
  * @param {string} clase -nombre de clase para el tab
  */
 function cambiarTabActivo(idTab,clase)
 {
     if(clase=='active show')
     {
         $(idTab).attr('class', 'tab-pane fade active show');
         $(idTab+'-tab').attr('class', 'nav-item nav-link active show');
     }
     else
     {
         $(idTab).attr('class', 'tab-pane fade');
         $(idTab+'-tab').attr('class', 'nav-item nav-link');
     }
 }
 
 function cambiarTab(indice)
{
    switch (indice)
    {
        case 0: //tab listado
        {
            cambiarTabActivo('#listado','active show');
            cambiarTabActivo('#listado1','');
            cambiarTabActivo('#listado2','');
            break;
        }
      
    }
}
 $("#btnimprimir").hide();
 $("#btnfin").hide();

/** funcion para crear la Nota de credito  */
function crearNotaCredito(cabecera,miventa){
      var contenido= '<div class="card" style="width: 20rem;">'+
    '<div class="card-body">'+          
    '<div><center> <b> FARMACIA COMUNITARIA PUYO </b></center> </div>'+    
        ' <center><div>R.U.C:'+ cabecera[0].RUC_AGE+' </div>  </center>'+
        ' <center><div>'+ cabecera[0].DIRECCION_AGE+' </div>  </center>'+
          '<div id="numfac">Nota de Crédito: 0000'+miventa[0].NUMERO_COM+'</div>'+ 
          '<div id="numfac">Factura Anulada: 000'+miventa[0].NUM_FAC+'</div>'+ 
          '<div>Fecha: '+miventa[0].FECHA_COM+'   Codigo_NC: '+miventa[0].ID_COM+'</div>'+
         // '<div>'+document.getElementById("dtruc").innerHTML+'</div>'+
         // '<div> '+document.getElementById("dtcliente").innerHTML+'</div>'+
         //'<div>Motivo de Anulación:'+midev[0].OBSERVACION_COMP+'</div>'+  
          '<table class="table table-sm">'+
            '<tr style="font-size: smaller;">'+
                '<th>Motivo de anulación</th>'+
                //'<th>Cantidad</th>'+
                //'<th>Pre.Uni</th>'+
                '<th>Pre.Total</th>'+
            '</tr> <tbody>'+
            ' <tr> <td>'+ document.getElementById("MOTIVO").value +'</td> ' +
            ' <td>'+ document.getElementById("TOTAL_VEN").value +'</td> </tr>';
            //ID_DET_DEV_VEN, DESCRIPCION_PRO, ID_DEV_VEN, CANTIDAD, PRECIO_VEN, SUBTOTAL, PRODUCTO, OBSERVACION_DEV, ID_DET_VEN
           /* for (let i = 0; i < misdetalles.length; i++) {
               var fila= '<tr style="font-size: smaller;">'+
                '<td>'+misdetalles[i].DESCRIPCION_PRO+'</td>'+
                '<td>'+misdetalles[i].CANTIDAD+'</td>'+
                '<td>'+misdetalles[i].PRECIO_VEN+'</td>'+
                '<td>'+misdetalles[i].SUBTOTAL+'</td>'+
            '</tr>';
            contenido+=fila;
                
            }*/
            
            contenido+='</tbody>'+
                       '</table>'+
        '<table class="table table-sm" style="font-size: smaller;">'+
                '<tr>'+
                   
                        
                    '<th>TOTAL</th>'+
                    '<th>'+document.getElementById("TOTAL_VEN").value+'</th>'+
                '</tr>'+
       ' </table>'+
       ' <hr>'+
        '<div class="datosv" style="font-size: smaller;">Anulado por:'+ document.getElementById("h6UserName").innerHTML +' </div>'+
       ' <div class="datosv" style="font-size: smaller;">'+cabecera[0].DESCRIPCION_CAJA+'</div>'+
       '</div>'+
    '</div>';
    document.getElementById("ridenc").innerHTML=contenido;
}
/** funcion para imprimir la factura */
function vistaPreviaImprimir() {
    var elem="ridenc";
    var context = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2)); 
    var url =window.location.protocol+"//"+ window.location.host +context;
    var mywindow = window.open();
    var css = "";
    var myStylesLocation = url+"/assets/css/bootstrap.min.css";
    $.ajax({
        url: myStylesLocation,
        type: "POST",
        async: false
    }).done(function (data) {
        css += data;
    })
   // mywindow.document.write('<html><head><title>Pedidos</title>');
    mywindow.document.write('<style type="text/css">' + css + ' </style>');
    mywindow.document.write('</head><body >');
   // mywindow.document.write('<h1>' + 'Pedido: '+$('#lblID_PED').text() + '</h1>');
    var contenido = document.getElementById(elem).innerHTML;
    var $html = $('<div />',{html:contenido});
    //$html.find('button#btnPreview').hide();
    //$html.find('button#btnSendMail').hide();
   // $html.find('table#tabla-detalle>thead').attr('style','color:black;background:rgb(84, 110, 122);');
    mywindow.document.write($html.html());
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();
    return true;
}
/**funcion para abrir los detalles de una factura*/
function detallesFactura(idventa){
    document.getElementById("detallesFacModalLabel").innerHTML="Detalles de la Factura con ID .v["+idventa+"]";
    cargardetalleFac(idventa); 
}
 

 //----------------------------------INICIALIZACIÓN DE MÉTODOS-------------------------
 //detalles(18);
 $('#btnCancelarActualizar').hide();
 //tab activo por defecto
 cambiarTab(0);
 //getModulosActivosNuevo();
 
 
 function anulando(idventa,total){
     $('#ID_VEN').val(idventa);
     $('#TOTAL_VEN').val(total);
     $('#anularModalLabel').html("Anular la factura con ID:["+idventa+"]");
 }
 //configuracion inicial para tabla
 var tablafacturas =   $('#table_comprobantes').DataTable(
 {
       'ajax'       : {
        "type"   : "GET",
        "url"    : "comprobantes",
        "dataSrc": function (json) {
          var return_data = new Array();
           var buttons = '';       
           
           
          for(var i=0;i< json.data.length; i++){
           var ID_VEN = json.data[i].ID_VEN;
           var labelEstado = '';
          // var btnVerDetalles = '<button type="button" data-toggle="modal" data-target="#mediumModal" onclick="detalles('+ID_VEN+');" class="btn btn-primary"><span class="fa fa-eye"></span> Detalles</button>';   
            var btn = '';
            if(json.data[i].ESTADO=="Facturado")
            {
              btn = '<button type="button" data-toggle="modal" data-target="#anularModal"  onclick="anulando('+ID_VEN+','+json.data[i].TOTAL_VEN+')" class="btn btn-danger" title="Anular la factura: '+json.data[i].NUMERO_COM +'"><span class="fa fa-trash"></span> Anular</button>';
              labelEstado = '<span  class="badge badge-success">'+json.data[i].ESTADO+'</span>';
            }
            else {
             //var saludo = new Saludar();
             labelEstado = '<span  class="badge badge-danger">'+json.data[i].ESTADO+'</span>';
            }          
            buttons = '<div class="btn-group btn-group-sm">'+
            '<button data-toggle="modal" data-target="#detallesFacModal" onclick="detallesFactura('+ID_VEN+');" class="btn btn-primary" title="Detalles de la Factura:'+json.data[i].NUMERO_COM +'"><span class="fa fa-eye"></span></button>'+btn+'</div>';
            //console.log("jaja");
            //ID_VEN, ID_USU, ID_CLI, FECHA_VEN, DESCRIPCION_VEN, IVA_VEN, TOTAL_VEN, ESTADO, SUBT_IVA, SUBT_CERO, TOTAL_DESC, NUMERO_COM
            return_data.push({
              'ID_VEN': json.data[i].ID_VEN,
              'FECHA_VEN'  : json.data[i].FECHA_VEN,
              'NUMERO_COM'  : json.data[i].NUMERO_COM,
              'DESCRIPCION_VEN'  : json.data[i].DESCRIPCION_VEN,
              'SUBT_IVA'  : json.data[i].SUBT_IVA,
              'SUBT_CERO'  : json.data[i].SUBT_CERO,
              'TOTAL_DESC'  : json.data[i].TOTAL_DESC,
              'IVA_VEN'  : json.data[i].IVA_VEN,
              'TOTAL_VEN'  : json.data[i].TOTAL_VEN,
              'ESTADO' : labelEstado,
              'ACCIONES' : buttons
            })
          }
          return return_data;
        }
      },
      "columns"    : [
        {'data': 'ID_VEN'},
        {'data': 'FECHA_VEN'},
        {'data': 'NUMERO_COM'},
        {'data': 'DESCRIPCION_VEN'},
        {'data': 'SUBT_IVA'},
        {'data': 'SUBT_CERO'},
        {'data': 'TOTAL_DESC'},
        {'data': 'IVA_VEN'},
        {'data': 'TOTAL_VEN'},
        {'data': 'ESTADO'},
        {'data': 'ACCIONES'},
       
      ],
         dom: 'lBfrtip',
         lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "Todo"]],
         buttons: [
           {
                 extend:    'copyHtml5',
                 text:      '<i class="fa fa-files-o"></i> Copiar',
                 titleAttr: 'Copiar',
                 exportOptions: {
                   columns: 'th:not(:last-child)'
               }
             },
             {
                 extend:    'excelHtml5',
                 text:      '<i class="fa fa-file-excel-o"></i> Excel',
                 titleAttr: 'Excel',
                 exportOptions: {
                   columns: 'th:not(:last-child)'
               }
             },
             {
                 extend:    'csvHtml5',
                 text:      '<i class="fa fa-file-text-o"></i> CSV',
                 titleAttr: 'CSV',
                 exportOptions: {
                   columns: 'th:not(:last-child)'
               }
             },
             {
                 extend:    'pdfHtml5',
                 text:      '<i class="fa fa-file-pdf-o"></i> PDF',
                 titleAttr: 'PDF',
                 title: 'Listado de'+$('#titulo').text(),
                 exportOptions: {
                   columns: 'th:not(:last-child)'
               }
             },
             {
                 extend:    'print',
                 text:      '<i class="fa fa-print"></i> Imprimir',
                 titleAttr: 'Imprimir',
                 title: 'Listado de'+$('#titulo').text(),
                 className: 'btn btn-info btn-xs',
                 exportOptions: {
                   columns: 'th:not(:last-child)'
               }
             }
         ],
         "language": {
             "sProcessing":    "Procesando...",
             "sLengthMenu":    "Mostrar _MENU_ registros",
             "sZeroRecords":   "No se encontraron resultados",
             "sEmptyTable":    "Ningún dato disponible en esta tabla",
             "sInfo":          "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
             "sInfoEmpty":     "Mostrando registros del 0 al 0 de un total de 0 registros",
             "sInfoFiltered":  "(filtrado de un total de _MAX_ registros)",
             "sInfoPostFix":   "",
             "sSearch":        "Buscar:",
             "sUrl":           "",
             "sInfoThousands":  ",",
             "sLoadingRecords": "Cargando...",
             "oPaginate": {
                 "sFirst":    "Primero",
                 "sLast":    "Último",
                 "sNext":    "Siguiente",
                 "sPrevious": "Anterior"
             },
             "oAria": {
                 "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                 "sSortDescending": ": Activar para ordenar la columna de manera descendente"
             }
         }
 });

 //configuracion inicial para tabla notas de credito
var tabla_notas = $('#table_nc').DataTable(
    {
        'ajax': {
            "type": "GET",
            "url": "devoventas",
            "dataSrc": function (json) {
                var return_data = new Array();
                var buttons = '';
                console.log(json);
                for (var i = 0; i < json.data.length; i++) {
                    //var ID_ROL = json.data[i].ID_ROL;
                    buttons = '<button type="button" data-toggle="modal" data-target="#mediumModal" onclick="detalles(' + json.data[i].ID_DEV_VEN + ');" class="btn btn-info btn-sm"><span class="fa fa-eye"></span> Detalles</button>';
                    //ID_DEV_VEN, ID_VEN, ID_USU, USUARIO, TOTAL_DEV, 
                    //ID_DEV_VEN, ID_VEN, ID_USU, USUARIO, TOTAL_DEV, IVA_DEV, SUBT_IVA, SUBT_CERO, OBSERVACION_DEV, FECHA_FAC, NUMERO_COM
                    return_data.push({
                        'ID_DEV_VEN': json.data[i].ID_DEV_VEN,
                        'NUMERO_COM': json.data[i].NUMERO_COM,
                       
                        'OBSERVACION_DEV': json.data[i].OBSERVACION_DEV,
                        'TOTAL_DEV': json.data[i].TOTAL_DEV,
                        'FECHA_COM': json.data[i].FECHA_COM,
                        'COM_ID_COM': json.data[i].COM_ID_COM,

                        // 'ESTADO_ROL' : labelEstado,
                        'ACCIONES': buttons
                    })
                }
                return return_data;
            }
        },
        "columns": [
            { 'data': 'ID_DEV_VEN' },
            { 'data': 'NUMERO_COM' },
            
            { 'data': 'OBSERVACION_DEV' },
            { 'data': 'TOTAL_DEV' },
            { 'data': 'FECHA_COM' },
            { 'data': 'COM_ID_COM' },
            { 'data': 'ACCIONES' }
        ],
        dom: 'lBfrtip',
        lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "Todo"]],
        buttons: [
            {
                extend: 'copyHtml5',
                text: '<i class="fa fa-files-o"></i> Copiar',
                titleAttr: 'Copiar',
                exportOptions: {
                    columns: 'th:not(:last-child)'
                }
            },
            {
                extend: 'excelHtml5',
                text: '<i class="fa fa-file-excel-o"></i> Excel',
                titleAttr: 'Excel',
                exportOptions: {
                    columns: 'th:not(:last-child)'
                }
            },
            {
                extend: 'csvHtml5',
                text: '<i class="fa fa-file-text-o"></i> CSV',
                titleAttr: 'CSV',
                exportOptions: {
                    columns: 'th:not(:last-child)'
                }
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fa fa-file-pdf-o"></i> PDF',
                titleAttr: 'PDF',
                title: 'Listado de' + $('#titulo').text(),
                exportOptions: {
                    columns: 'th:not(:last-child)'
                }
            },
            {
                extend: 'print',
                text: '<i class="fa fa-print"></i> Imprimir',
                titleAttr: 'Imprimir',
                title: 'Listado de' + $('#titulo').text(),
                className: 'btn btn-info btn-xs',
                exportOptions: {
                    columns: 'th:not(:last-child)'
                }
            }
        ],
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });


 var tablanulos =   $('#table_nc_anulado').DataTable(
        {
              'ajax'       : {
               "type"   : "GET",
               "url"    : "ncFacAnuladas",
               "dataSrc": function (json) {
                 var return_data = new Array();
                  var buttons = '';       
                  
                  
                 for(var i=0;i< json.data.length; i++){
                  var ID_VEN = json.data[i].ID_VEN;
                  var labelEstado = '';
                 // var btnVerDetalles = '<button type="button" data-toggle="modal" data-target="#mediumModal" onclick="detalles('+ID_VEN+');" class="btn btn-primary"><span class="fa fa-eye"></span> Detalles</button>';   
                  // var btn = '';
                   if(json.data[i].ESTADO=="Facturado")
                   {
                     //btn = '<button type="button" data-toggle="modal" data-target="#anularModal"  onclick="anulando('+ID_VEN+','+json.data[i].TOTAL_VEN+')" class="btn btn-danger" title="Anular la factura: '+json.data[i].NUMERO_COM +'"><span class="fa fa-trash"></span> Anular</button>';
                     labelEstado = '<span  class="badge badge-success">'+json.data[i].ESTADO+'</span>';
                   }
                   else {
                    //var saludo = new Saludar();
                    labelEstado = '<span  class="badge badge-danger">'+json.data[i].ESTADO+'</span>';
                   }          
                  // buttons = '<div class="btn-group btn-group-sm">'+
                  // '<button data-toggle="modal" data-target="#anularModal" onclick="detalles('+ID_VEN+');" class="btn btn-primary" title="Detalles de la Factura:'+json.data[i].NUMERO_COM +'"><span class="fa fa-eye"></span></button>'+btn+'</div>';
                   //console.log("jaja");
                   //ID_VEN, ID_USU, ID_CLI, FECHA_VEN, DESCRIPCION_VEN, IVA_VEN, TOTAL_VEN, ESTADO, SUBT_IVA, SUBT_CERO, TOTAL_DESC, NUMERO_COM
                   return_data.push({
                     'ID_VEN': json.data[i].ID_VEN,
                     'FECHA_COM'  : json.data[i].FECHA_COM,
                     'NUMERO_COM'  : json.data[i].NUMERO_COM,
                     'DESCRIPCION_VEN'  : json.data[i].DESCRIPCION_VEN,
                     'SUBT_IVA'  : json.data[i].SUBT_IVA,
                     'SUBT_CERO'  : json.data[i].SUBT_CERO,
                     'TOTAL_DESC'  : json.data[i].TOTAL_DESC,
                     'IVA_VEN'  : json.data[i].IVA_VEN,
                     'TOTAL_VEN'  : json.data[i].TOTAL_VEN,
                     'ESTADO' : labelEstado,
                     'NUM_NC' :json.data[i].NUM_NC
                   })
                 }
                 return return_data;
               }
             },
             "columns"    : [
               {'data': 'ID_VEN'},
               {'data': 'FECHA_COM'},
               {'data': 'NUMERO_COM'},
               {'data': 'DESCRIPCION_VEN'},
               {'data': 'SUBT_IVA'},
               {'data': 'SUBT_CERO'},
               {'data': 'TOTAL_DESC'},
               {'data': 'IVA_VEN'},
               {'data': 'TOTAL_VEN'},
               {'data': 'ESTADO'},
               {'data': 'NUM_NC'},
              
             ],
                dom: 'lBfrtip',
                lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "Todo"]],
                buttons: [
                  {
                        extend:    'copyHtml5',
                        text:      '<i class="fa fa-files-o"></i> Copiar',
                        titleAttr: 'Copiar',
                        exportOptions: {
                          columns: 'th:not(:last-child)'
                      }
                    },
                    {
                        extend:    'excelHtml5',
                        text:      '<i class="fa fa-file-excel-o"></i> Excel',
                        titleAttr: 'Excel',
                        exportOptions: {
                          columns: 'th:not(:last-child)'
                      }
                    },
                    {
                        extend:    'csvHtml5',
                        text:      '<i class="fa fa-file-text-o"></i> CSV',
                        titleAttr: 'CSV',
                        exportOptions: {
                          columns: 'th:not(:last-child)'
                      }
                    },
                    {
                        extend:    'pdfHtml5',
                        text:      '<i class="fa fa-file-pdf-o"></i> PDF',
                        titleAttr: 'PDF',
                        title: 'Listado de'+$('#titulo').text(),
                        exportOptions: {
                          columns: 'th:not(:last-child)'
                      }
                    },
                    {
                        extend:    'print',
                        text:      '<i class="fa fa-print"></i> Imprimir',
                        titleAttr: 'Imprimir',
                        title: 'Listado de'+$('#titulo').text(),
                        className: 'btn btn-info btn-xs',
                        exportOptions: {
                          columns: 'th:not(:last-child)'
                      }
                    }
                ],
                "language": {
                    "sProcessing":    "Procesando...",
                    "sLengthMenu":    "Mostrar _MENU_ registros",
                    "sZeroRecords":   "No se encontraron resultados",
                    "sEmptyTable":    "Ningún dato disponible en esta tabla",
                    "sInfo":          "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty":     "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered":  "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix":   "",
                    "sSearch":        "Buscar:",
                    "sUrl":           "",
                    "sInfoThousands":  ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst":    "Primero",
                        "sLast":    "Último",
                        "sNext":    "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                }
        });
//cargardetalleFac(2);
 function cargardetalleFac(id){
     
 $('#table_detalles_fac').DataTable(
     {
                       destroy: true,
                      'ajax'       : {
                       "type"   : "GET",
                       "data": { 
                        "ID_VEN": id
                        },
                       "url"    : "ventas/detalles",
                       "dataSrc": function (json) {
                         var return_data = new Array();
                        // console.log(json.data);
                         // var buttons = '';       
                         var labelEstado = '';
                          
                         for(var i=0;i< json.data.length; i++){
                          
                           if(json.data[i].APLICA_IVA_PRO>0)
                           {
                             //btn = '<button type="button" data-toggle="modal" data-target="#anularModal"  onclick="anulando('+ID_VEN+','+json.data[i].TOTAL_VEN+')" class="btn btn-danger" title="Anular la factura: '+json.data[i].NUMERO_COM +'"><span class="fa fa-trash"></span> Anular</button>';
                             labelEstado = '<span  class="badge badge-success">Si</span>';
                           }
                           else {
                            //var saludo = new Saludar();
                            labelEstado = '<span  class="badge badge-danger">No</span>';
                           }          
                          // buttons = '<div class="btn-group btn-group-sm">'+
                          // '<button data-toggle="modal" data-target="#anularModal" onclick="detalles('+ID_VEN+');" class="btn btn-primary" title="Detalles de la Factura:'+json.data[i].NUMERO_COM +'"><span class="fa fa-eye"></span></button>'+btn+'</div>';
                           //console.log("jaja");
                           //ID_VEN, ID_USU, ID_CLI, FECHA_VEN, DESCRIPCION_VEN, IVA_VEN, TOTAL_VEN, ESTADO, SUBT_IVA, SUBT_CERO, TOTAL_DESC, NUMERO_COM
                           return_data.push({
                             'ID_DET_VEN': json.data[i].ID_DET_VEN,
                             'DESCRIPCION_PRO': json.data[i].DESCRIPCION_PRO,
                             'CANTIDAD_PRO'  : json.data[i].CANTIDAD_PRO,
                             'PRECIO_VEN'  : json.data[i].PRECIO_VEN,
                             'AHORRO'  : json.data[i].AHORRO,
                             'SUBTOTAL'  : json.data[i].SUBTOTAL,
                             'APLICA_IVA' : labelEstado,
                             
                           })
                         }
                         return return_data;
                       }
                     },
                     "columns"    : [
                       {'data': 'ID_DET_VEN'},
                       {'data': 'DESCRIPCION_PRO'},
                       {'data': 'CANTIDAD_PRO'},
                       {'data': 'PRECIO_VEN'},
                       {'data': 'AHORRO'},
                       {'data': 'SUBTOTAL'},
                       {'data': 'APLICA_IVA'},
                       
                      
                     ],
                        dom: 'lBfrtip',
                        lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "Todo"]],
                        buttons: [
                          {
                                extend:    'copyHtml5',
                                text:      '<i class="fa fa-files-o"></i> Copiar',
                                titleAttr: 'Copiar',
                                exportOptions: {
                                  columns: 'th:not(:last-child)'
                              }
                            },
                            {
                                extend:    'excelHtml5',
                                text:      '<i class="fa fa-file-excel-o"></i> Excel',
                                titleAttr: 'Excel',
                                exportOptions: {
                                  columns: 'th:not(:last-child)'
                              }
                            },
                            {
                                extend:    'csvHtml5',
                                text:      '<i class="fa fa-file-text-o"></i> CSV',
                                titleAttr: 'CSV',
                                exportOptions: {
                                  columns: 'th:not(:last-child)'
                              }
                            },
                            {
                                extend:    'pdfHtml5',
                                text:      '<i class="fa fa-file-pdf-o"></i> PDF',
                                titleAttr: 'PDF',
                                title: 'Listado de'+$('#titulo').text(),
                                exportOptions: {
                                  columns: 'th:not(:last-child)'
                              }
                            },
                            {
                                extend:    'print',
                                text:      '<i class="fa fa-print"></i> Imprimir',
                                titleAttr: 'Imprimir',
                                title: 'Listado de'+$('#titulo').text(),
                                className: 'btn btn-info btn-xs',
                                exportOptions: {
                                  columns: 'th:not(:last-child)'
                              }
                            }
                        ],
                        "language": {
                            "sProcessing":    "Procesando...",
                            "sLengthMenu":    "Mostrar _MENU_ registros",
                            "sZeroRecords":   "No se encontraron resultados",
                            "sEmptyTable":    "Ningún dato disponible en esta tabla",
                            "sInfo":          "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                            "sInfoEmpty":     "Mostrando registros del 0 al 0 de un total de 0 registros",
                            "sInfoFiltered":  "(filtrado de un total de _MAX_ registros)",
                            "sInfoPostFix":   "",
                            "sSearch":        "Buscar:",
                            "sUrl":           "",
                            "sInfoThousands":  ",",
                            "sLoadingRecords": "Cargando...",
                            "oPaginate": {
                                "sFirst":    "Primero",
                                "sLast":    "Último",
                                "sNext":    "Siguiente",
                                "sPrevious": "Anterior"
                            },
                            "oAria": {
                                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                            }
                        }
                });
        }
       
    
 $('.table').attr('style','width:100%');
 /** cargar reporte */
 $("#output").pivotUI(
    $.pivotUtilities.tipsData, {
      rows: ["sex"],
      cols: ["smoker"],
      vals: ["tip", "total_bill"],
      aggregatorName: "Sum over Sum",
      rendererName: "Bar Chart",
      renderers: $.extend(
          $.pivotUtilities.renderers, 
        $.pivotUtilities.plotly_renderers
      )
    });
 
 
 