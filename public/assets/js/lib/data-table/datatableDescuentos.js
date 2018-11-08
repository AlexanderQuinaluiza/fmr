/*function allselect() {
  var table = document.getElementById('table_productos');
  for (var r = 1, n = table.rows.length; r < n; r++) {
    var x= table.rows[r].cells[0];
    x.checked=true;
    alert(table.rows[r].cells[0].innerHTML);
     // for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
          //alert(table.rows[r].cells[c].innerHTML);
     // }
  }
}
*/
/** Variables fechas */
var f_inicio='',f_fin='';
/** sacar los arrays necesarios para ingresar y eliminar */
//sacar();
function sacar(){
var actual = [1,2,4].sort;
var nuevo = [1,5,6,4].sort;
var borrar= actual.sort;
var insertar= nuevo.sort;
//var indices=[];
 for(var i=0; i< nuevo.length; i++){
    var idx = actual.indexOf(nuevo[i]);
    while (idx != -1) {
//      indices.push(idx);
      borrar.splice(idx,1);
      idx = actual.indexOf(nuevo[i], idx + 1);
    }    
 }
 
 for(var i=0; i< actual.length; i++){
    var idx = nuevo.indexOf(actual[i]);
    while (idx != -1) {
//      indices.push(idx);
      insertar.splice(idx,1);
      idx = nuevo.indexOf(actual[i], idx + 1);
    }    
 }
//console.log(borrar);
//console.log(insertar);
//console.log(insertar);

}
/** funcion recalculo de los elementos seleccionados para descuntos */
function calcular(){
  var num=  productosSeleccionados().length;
  document.getElementById("numselected").innerHTML=num;
}
/** funcion obtiene los productos seleccionados de la tabla productos */
function productosSeleccionados(){
    var arrayproductos = new Array();
    var cont=0;
    var table = document.getElementById('table_productos');
    checkboxes = document.getElementsByName('sld');
    
   
    for(var i=0 ,r=1, n=checkboxes.length;i<n;i++,r++) {
        if (checkboxes[i].checked) {
           cont = cont + 1;
            var id_prod= table.rows[r].cells[1].innerHTML;
            var item={};
            item.ID_PRO=id_prod;
            arrayproductos.push(item);
            
           }
      }
     // alert(arrayproductos);
    return arrayproductos;
}


/** funcion seleciona todos los checks productos */
function toggle(source) {
  checkboxes = document.getElementsByName('sld');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].checked = source.checked;
  }
  var num=  productosSeleccionados().length;
  document.getElementById("numselected").innerHTML=num;
}


/** funcion rango de fechas para aplicar los descuentos */
$(function() {
    $('input[name="daterange"]').daterangepicker({
      opens: 'left'
    }, function(start, end, label) {
        f_inicio=start.format('YYYY-MM-DD');
        f_fin=end.format('YYYY-MM-DD');
      console.log("Nueva fecha: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
  });
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  
  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd;
  } 
  if(mm<10){
      mm='0'+mm;
  } 
  var today = mm+'/'+dd+'/'+yyyy;
  document.getElementById('fechas').value = today +'-'+ today;

  /** crud descuentos */

  /**
 * FUNCIONES PARA LA GESTIÓN DE ROLES
 */

 /**
  *permite validar los datos de entrada para rol 
  * @param {int} opcion -1=registrar, 2=actualizar
  */
 function validarDatos(opcion)
 {
     var error = 0;
     var errorMostrarMsj = [];
    var selecionados=productosSeleccionados().length;
     if(!$('#DESCRIPCION_DESC').val().trim()) errorMostrarMsj.push("La descripcion del descuento no puede estar vacío");
     if(!$('#PORCENTAJE_DESC').val().trim()) errorMostrarMsj.push("El porcentaje del descuento no puede estar vacío");
     if(!$('#fechas').val().trim()) errorMostrarMsj.push("El rango de fechas al que se aplica el descuento no puede estar vacío");
     if(selecionados==0) errorMostrarMsj.push("Debe seleccionar al menos un producto");
    // if(!$('#DESCRIPCION_DESC').val().trim()) errorMostrarMsj.push("El nombre de la categoria no puede estar vacío");
   
     /*if(!$('#DESCRIPCION_ROL').val().trim()) errorMostrarMsj.push("La descripción de rol no puede estar vacío");*/
     if(opcion==2) //opcion para editar
     {
         if(!$('#id').val().trim()) errorMostrarMsj.push("Escoja una categoria existente de la lista");
     }
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
    $('#frmdescuentos')[0].reset();
    $('#id').val('');
    $('#lstErrores').empty();
    f_fin='';
    f_inicio='';
 }
 
 /**
  * permite registrar un rol
  */
 function registrar()
 {
     if(validarDatos(1)){
         return;
     }
     //
     //ID_DESC, PORCENTAJE_DESC, FECHA_INICIO_DESC, FECHA_FIN_DESC, ESTADO_DESC, DESCRIPCION_DESC
        var data = new FormData();
        
        data.append('datos',JSON.stringify(productosSeleccionados()));
        data.append('DESCRIPCION_DESC',$('#DESCRIPCION_DESC').val().trim());
        data.append('PORCENTAJE_DESC',$('#PORCENTAJE_DESC').val().trim());
        data.append('FECHA_INICIO_DESC',f_inicio);
        data.append('FECHA_FIN_DESC',f_fin);
        
        axios.post('/descuentos/registrar',data).then(function (response){
            if(response.data>0)
            {
                toastr.success('Registrado correctamente!');
                limpiarDatos();
                tabladescuentos.ajax.reload();
                //tabladescuentos.clear().draw();
            }
            else
            {
                toastr.error('No se ha podido guardar el registro.', 'Error!')
            }
            //console.log(response.data);
        })
        .catch(function (error) {
         console.log(error);
         toastr.error('Existen errores de integridad referencial, consulte con el administrador.', 'Error!')
        });
 }
 
 /**
  * permite actualizar un rol existente
  */
 function actualizar()
 {
     if(validarDatos(2)){
        return;
    }                   
    axios.post('/categorias/actualizar',{
        'ID_CAT': $('#id').val().trim(),
        'NOMBRE_CAT':$('#NOMBRE_CAT').val().trim(),
        //'DESCRIPCION_ROL' : $('#DESCRIPCION_ROL').val().trim()
    }).then(function (response){
    tabla.ajax.reload();
    toastr.info('Actualizado correctamente!')
    })
    .catch(function (error) {
     console.log(error);
     toastr.error('No se ha podido actualizar el registro.', 'Error!')
    });
 }
 
 /**
  * permite actualizar el estado de un rol de activo a inactivo
  * @param {int} idRegistro -identificador de rol
  */
 function desactivar(idRegistro)
 {
     const swalWithBootstrapButtons = swal.mixin({
     confirmButtonClass: 'btn btn-success',
     cancelButtonClass: 'btn btn-danger',
     buttonsStyling: false,
     })
 
     swalWithBootstrapButtons({
     title: 'Esta seguro de desactivar esta caegoria?',
     type: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Aceptar!',
     cancelButtonText: 'Cancelar!',
     reverseButtons: true
     }).then((result) => {
     if (result.value) {
         axios.post('/categorias/desactivar',{
         'ID_CAT':idRegistro
         }).then(function (response){
            tabladescuentos.ajax.reload();
         toastr.warning('El registro ha sido desactivado con éxito!')
     })
     .catch(function (error) {
      toastr.error('No se ha podido desactivar el registro.', 'Error!')
     });                       
     }
     })
 }
 
 /**
  * permite actualizar el estado de un rol de inactivo a activo
  * @param {int} idRegistro -identificador de rol
  */
 function activar(idRegistro)
 {
     axios.post('/categorias/activar',{
     'ID_CAT':idRegistro
     }).then(function (response){
     tabla.ajax.reload();
     })
     .catch(function (error) {
         console.log(error);
     });
 }
 
 /**
  * permite obtener un rol dado su id
  * @param {int} idRegistro - id de rol
  */
 function getRegistroById(idRegistro){
     var url = '/categorias/byid';
     axios.get(url, { params: { ID_CAT: idRegistro } }).then(function (response){
         $('#id').val(response.data.ID_CAT);
         $('#NOMBRE_CAT').val(response.data.NOMBRE_CAT);
        // $('#DESCRIPCION_ROL').val(response.data.DESCRIPCION_ROL);
         $('#btnCancelarActualizar').show();                                                                                                                      
     })
     .catch(function (error) {
         console.log(error);
     });                     
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
 
 /**
  * permite cambiar un tab de activo a inactivo o viceversa
  * @param {int} indice -indice de tab
  * @param {int} idRegistro -identificador de usuario
  */
 function cambiarTab(indice,idRegistro)
 {
     switch (indice)
     {
         case 0: //tab listado
         {
             cambiarTabActivo('#listado','active show');
             cambiarTabActivo('#editar','');
             break;
         }
         case 1: //tab nuevo/editar
         {
             cambiarTabActivo('#editar','active show');
             cambiarTabActivo('#listado','');
             $('#editar-tab').html('<i class="fa fa-edit"></i>'+' Editar');
             getRegistroById(idRegistro);
             $('#lstErrores').empty();
             break;
         }
     }
 }
 
 //----------------------------------INICIALIZACIÓN DE MÉTODOS-------------------------
 $('#btnCancelarActualizar').hide();
 //tab activo por defecto
 cambiarTab(0,0);
 
 $('#btnGuardarCategoria').click(function(){
     var esEditar = $('#id').val().trim();
     if(!esEditar)
     registrar();
     else actualizar();
 });
 
 $('#btnCancelarActualizar').click(function(){
     limpiarDatos();
     $('#editar-tab').html('<i class="fa fa-plus"></i>'+' Nuevo');
     $('#btnCancelarActualizar').hide();
 });
 /** listar las agencias que existen */
//  ID_DESC, PORCENTAJE_DESC, FECHA_INICIO_DESC, FECHA_FIN_DESC, ESTADO_DESC, DESCRIPCION_DESC
 
 //configuracion inicial para tabla
 var tabladescuentos =   $('#table_desc').DataTable(
 {
       'ajax'       : {
        "type"   : "GET",
        "url"    : "descuentos",
        "dataSrc": function (json) {
          var return_data = new Array();
           var buttons = '';       
           var btn = '';
           var labelEstado = '';
           var btnVer = '<button type="button" data-toggle="modal" data-target="#mediumModal" onclick="detallesdesc('+ID_DESC+');" class="btn btn-info btn-sm"><span class="fa fa-info-circle"></span></button>';
          for(var i=0;i< json.data.length; i++){
           var ID_DESC = json.data[i].ID_DESC;
            if(json.data[i].ESTADO_DESC>0)
            {
              btn = '<button type="button" onclick="desactivar('+ID_DESC+');" class="btn btn-danger"><span class="fa fa-trash"></span> Desactivar</button>';
              labelEstado =  '<span  class="badge badge-success">Activo</span>';
            }
            else {
             //var saludo = new Saludar();
              btn = '<button type="button" onclick="activar('+ID_DESC+')" class="btn btn-success"><span class="fa fa-check"></span> Activar</button>';
              labelEstado = '<span  class="badge badge-danger">Inactivo</span>';
            }          
            buttons = '<div class="btn-group btn-group-sm">'+
            '<button class="btn btn-primary" onclick="cambiarTab(1,'+ID_DESC+');"><span class="fa fa-pencil-square-o"></span> Editar</button>'+btnVer+btn+'</div>';
            //console.log("jaja"); 
            //ID_DESC, PORCENTAJE_DESC, FECHA_INICIO_DESC, FECHA_FIN_DESC, ESTADO_DESC, DESCRIPCION_DESC
            return_data.push({
              'ID_DESC': json.data[i].ID_DESC,
              'DESCRIPCION_DESC'  : json.data[i].DESCRIPCION_DESC,
              'FECHA_INICIO_DESC'  : json.data[i].FECHA_INICIO_DESC,
              'FECHA_FIN_DESC'  : json.data[i].FECHA_FIN_DESC,
              'PORCENTAJE_DESC'  : json.data[i].PORCENTAJE_DESC,
              'ESTADO_DESC' : labelEstado,
              'ACCIONES' : buttons
            })
          }
          return return_data;
        }
      },
      "columns"    : [
        {'data': 'ID_DESC'},
        {'data': 'DESCRIPCION_DESC'},
        {'data': 'FECHA_INICIO_DESC'},
        {'data': 'FECHA_FIN_DESC'},
        {'data': 'PORCENTAJE_DESC'},
        //{'data': 'DESCRIPCION_ROL'},
        {'data': 'ESTADO_DESC'},
        {'data': 'ACCIONES'}
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

 var tablaproductos =   $('#table_productos').DataTable(
  {
        'ajax'       : {
         "type"   : "GET",
         "url"    : "productos",
         "dataSrc": function (json) {
           var return_data = new Array();
            var buttons = '';       
            var btn = '';
            
            var labelEstado = '';
           for(var i=0;i< json.data.length; i++){
            var ID_PRO = json.data[i].ID_PRO;
            var NOMBRE_PRO = '"'+String(json.data[i].NOMBRE_PRO)+'"';
            
            var checkbox=' <div class="form-check">   <label class="form-check-label"> <input type="checkbox" name="sld" onchange="calcular();" class="form-check-input" value="" data-toggle="tooltip"  title="Seleciona todos los productos"></label> </div>';
            var btnVerDetalles = '<button type="button" data-toggle="modal" data-target="#mediumModal" onclick="detalles('+ID_PRO+');" class="btn btn-info btn-sm"><span class="fa fa-info-circle"></span> Detalles </button>';
            var btnAgregarEjemplar = "<button type='button' data-toggle='modal' data-target='#addEjemplarModal' onclick='mostrarModalEjemplar("+ID_PRO+","+NOMBRE_PRO+");' class='btn btn-success'><span class='fa fa-plus'></span> </button>";
            if(json.data[i].ESTADO_PRO>0)
             {
              // btn = '<button type="button" onclick="desactivar('+ID_PRO+');" class="btn btn-danger"><span class="fa fa-trash"></span> Desactivar</button>';
               labelEstado =  '<span  class="badge badge-success">Activo</span>';
             }
             else {
               //btn = '<button type="button" onclick="activar('+ID_PRO+')" class="btn btn-success"><span class="fa fa-check"></span> Activar</button>';
               labelEstado = '<span  class="badge badge-danger">Inactivo</span>';
             }          
             /*buttons = '<div class="btn-group btn-group-sm">'+
             '<button class="btn btn-primary" onclick="cambiarTab(1,'+ID_PRO+');"><span class="fa fa-pencil-square-o"></span> Editar</button>'+btnVerDetalles+btnAgregarEjemplar+btn+'</div>';
             */
             return_data.push({
               'ID_PRO': json.data[i].ID_PRO,
               'NOMBRE_PRO'  : json.data[i].NOMBRE_PRO,
               'DESCRIPCION_PRO'  : json.data[i].DESCRIPCION_PRO,
               //'ETIQUETAS_PRO'  : json.data[i].ETIQUETAS_PRO,
               'STOCK_PRO'  : json.data[i].STOCK_PRO,
               'ESTADO_PRO' : labelEstado,
               'ACCIONES_PRO' : btnVerDetalles,
               'SELECCIONAR': checkbox
             })
           }
           return return_data;
         }
       },
       "columns"    : [
         {'data':'SELECCIONAR'},
         {'data': 'ID_PRO'},
         {'data': 'NOMBRE_PRO'},
         {'data': 'DESCRIPCION_PRO'},
        // {'data': 'ETIQUETAS_PRO'},
         {'data': 'STOCK_PRO'},
         {'data': 'ESTADO_PRO'},
         {'data': 'ACCIONES_PRO'}
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

   /**
 * permite obtener un producto dado su id
 * @param {int} idRegistro - id de producto
 * @param {int} opcion - opciones 1=ver detalles 2=editar
 */
function getRegistroById(idRegistro,opcion){
    var url = '/productos/byid';
    axios.get(url, { params: { ID_PRO: idRegistro } }).then(function (response){
        try {
        if(opcion==1) //detalles de producto
        {
            $('#lblNOMBRE_PRO').text(response.data[0].NOMBRE_PRO);
            $('#lblDESCRIPCION_PRO').text(response.data[0].DESCRIPCION_PRO);
            $('#lblPRESENTACION_PRO').text(response.data[0].PRESENTACION_PRO);
            $('#lblMARCA_PRO').text(response.data[0].MARCA_PRO);
            $('#lblCATEGORIA_PRO').text(response.data[0].CATEGORIA_PRO);
            $('#lblETIQUETAS_PRO').text(response.data[0].ETIQUETAS_PRO);
            $('#lblUBICACION_PRO').text(response.data[0].UBICACION_PRO);
            $('#limgIMAGEN_PRO').prop('src',response.data[0].IMAGEN_PRO);
            $('#lblLOTE_PRO').text(response.data[0].LOTE_PRO);
            $('#lblCOSTO_PRO').text('$ '+response.data[0].COSTO_PRO);
            $('#lblGANANCIA_PRO').text('% '+response.data[0].GANANCIA_PRO);
            $('#lblPRECIO_VENTA_PRO').text('$ '+response.data[0].PRECIO_VENTA_PRO);
            $('#lblEXISTENCIA_MIN_PRO').text(response.data[0].EXISTENCIA_MIN_PRO);
            $('#lblEXISTENCIA_MAX_PRO').text(response.data[0].EXISTENCIA_MAX_PRO);
            if(response.data[0].APLICA_IVA_PRO==0)$('#lblAPLICA_IVA_PRO').text('No');
            else $('#lblAPLICA_IVA_PRO').text('Si');
            $('#lblSTOCK_PRO').text(response.data[0].STOCK_PRO);
            $('#lblLABORATORIO_PRO').text(response.data[0].LABORATORIO_PRO);
            if(response.data[0].ESTADO_PRO==0) 
            {
                $('#estado').prop('class','badge badge-danger');
                $('#estado').text('Inactivo');
            }
            else
            {
                $('#estado').prop('class','badge badge-success');
                $('#estado').text('Activo');
            } 
            $('#lblFECHA_REGISTRO_PRO').text(response.data[0].FECHA_REGISTRO_PRO);
            $('#lblTIPO_PRO').text(response.data[0].TIPO_PRO);
            $('#lblPRECIO_PROMOCIONAL_PRO').text('$ '+response.data[0].PRECIO_PROMOCIONAL_PRO);
            if(response.data[0].VENTA_CON_RECETA==0)$('#lblVENTA_CON_RECETA').text('No');
            else $('#lblVENTA_CON_RECETA').text('Si');
            $('#lblUSU_REGISTRO').text(response.data[0].NOMBRE_USU+" "+response.data[0].APELLIDO_USU);
        }
        else //editar
        {
            $('#id').val(response.data[0].ID_PRO);
            $('#NOMBRE_PRO').val(response.data[0].NOMBRE_PRO);
            $('#DESCRIPCION_PRO').val(response.data[0].DESCRIPCION_PRO);
            $('#ETIQUETAS_PRO').val(response.data[0].ETIQUETAS_PRO);
            $('#UBICACION_PRO').val(response.data[0].UBICACION_PRO);
            $('#LOTE_PRO').val(response.data[0].LOTE_PRO);
            $('#COSTO_PRO').val(response.data[0].COSTO_PRO);
            $('#GANANCIA_PRO').val(response.data[0].GANANCIA_PRO);
            $('#PRECIO_VENTA_PRO').val(response.data[0].PRECIO_VENTA_PRO);
            $('#EXISTENCIA_MIN_PRO').val(response.data[0].EXISTENCIA_MIN_PRO);
            $('#EXISTENCIA_MAX_PRO').val(response.data[0].EXISTENCIA_MAX_PRO);
            $('#STOCK_PRO').val(response.data[0].STOCK_PRO);
            $('#LABORATORIO_PRO').val(response.data[0].LABORATORIO_PRO);
            $('#PRECIO_PROMOCIONAL_PRO').val(response.data[0].PRECIO_PROMOCIONAL_PRO);        
            $('#btnCancelarActualizar').show();

            //marcar radio button IVA
            $('#ivas').prop('checked',false);
            $('#ivan').prop('checked',false);
            if(response.data[0].APLICA_IVA_PRO==0)
                $('#ivan').prop('checked',true);
            else
                $('#ivas').prop('checked',true);

            //marcar radio button tipo de producto
            $('#tipoo').prop('checked',false);
            $('#tipog').prop('checked',false);
            if( (response.data[0].TIPO_PRO).toLowerCase()=='original')
                $('#tipoo').prop('checked',true);
            else
                $('#tipog').prop('checked',true);

             //marcar radio button venta con receta
             $('#recetan').prop('checked',false);
             $('#recetas').prop('checked',false);
             if(response.data[0].VENTA_CON_RECETA==0)
                 $('#recetan').prop('checked',true);
             else
                 $('#recetas').prop('checked',true);
            
            //marcar opcion lista desplegable categoria
            $('#ddlCategoria > option').each(function(){
                if(this.value==response.data[0].ID_CAT)
                $(this).prop('selected',true);
            });
            //marcar opcion lista desplegable presentación
            $('#ddlPresentacion > option').each(function(){
                if(this.value==response.data[0].ID_PRS)
                $(this).prop('selected',true);
            });
            //marcar opcion lista desplegable marca
            $('#ddlMarca > option').each(function(){
                if(this.value==response.data[0].ID_MAR)
                $(this).prop('selected',true);
            });
        }
    } catch (error) {       
    }
    })
    .catch(function (error) {
        console.log(error);
    });                     
}

function detalles(idRegistro)
{
   getRegistroById(idRegistro,1);
}