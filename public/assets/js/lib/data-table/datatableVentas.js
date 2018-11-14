/**
 * FUNCIONES DE VENTAS
 */



 /**
  *permite validar los datos de entrada para rol 
  * @param {int} opcion -1=registrar, 2=actualizar
  * 
  * 
  */
 function validarDatos(opcion)
 {
     var error = 0;
     var errorMostrarMsj = [];
     if(!$('#NOMBRE_CAT').val().trim()) errorMostrarMsj.push("El nombre de la categoria no puede estar vacío");
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
     $('#id').val('');
     $('#NOMBRE_CAT').val('');
    // $('#DESCRIPCION_ROL').val('');
     $('#lstErrores').empty();
 }
 
 /**
  * permite registrar un rol
  */
 function registrar()
 {
     if(validarDatos(1)){
         return;
     }
     axios.post('/categorias/registrar',{
         'NOMBRE_CAT': $('#NOMBRE_CAT').val().trim(),
         //'DESCRIPCION_ROL' : $('#DESCRIPCION_ROL').val().trim()
     }).then(function (response){
     tabla.ajax.reload();
     limpiarDatos();
     toastr.success('Registrado correctamente!')
     })
     .catch(function (error) {
      //console.log(error);
      toastr.error('No se ha podido guardar el registro.', 'Error!')
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
         tabla.ajax.reload();
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

 
 var tablaproductos =   $('#table_busqueda').DataTable(
    { 
           
          'ajax'       : {
           "type"   : "GET",
           "url"    : "/ventas/productosventas",
           "dataSrc": function (json) {
             var return_data = new Array();
           
              
              var labelreceta = '';
             for(var i=0;i< json.data.length; i++){
             // var ID_PRO = json.data[i].ID_PRO;
             // var NOMBRE_PRO = '"'+String(json.data[i].NOMBRE_PRO)+'"';
              format(json.data[i]);
              var img_url = '<img src="'+json.data[i].IMAGEN_PRO+'" alt="Img" width="50" height="50" style="border-radius: 50%;">';
              
               if(json.data[i].VENTA_CON_RECETA>0)
               {
                // btn = '<button type="button" onclick="desactivar('+ID_PRO+');" class="btn btn-danger"><span class="fa fa-trash"></span> Desactivar</button>';
                 labelreceta =  '<span  class="badge badge-danger">con receta</span>';
               }
               else {
                 //btn = '<button type="button" onclick="activar('+ID_PRO+')" class="btn btn-success"><span class="fa fa-check"></span> Activar</button>';
                 labelreceta= '<span  class="badge badge-success">publico</span>';
               }          
               /*buttons = '<div class="btn-group btn-group-sm">'+
               '<button class="btn btn-primary" onclick="cambiarTab(1,'+ID_PRO+');"><span class="fa fa-pencil-square-o"></span> Editar</button>'+btnVerDetalles+btnAgregarEjemplar+btn+'</div>';
               */
              //ID_PRO, ID_CAT, ID_PRS, ID_MAR, NOMBRE_PRO, DESCRIPCION_PRO, COSTO_PRO, GANANCIA_PRO, PRECIO_VENTA_PRO, EXISTENCIA_MIN_PRO, EXISTENCIA_MAX_PRO, ETIQUETAS_PRO, UBICACION_PRO, IMAGEN_PRO, APLICA_IVA_PRO, STOCK_PRO, LOTE_PRO, LABORATORIO_PRO, ESTADO_PRO, FECHA_REGISTRO_PRO, TIPO_PRO, PRECIO_PROMOCIONAL_PRO, VENTA_CON_RECETA, USU_REGISTRO
               return_data.push({
                 'ID_PRO': json.data[i].ID_PRO,
                 'IMAGEN_PRO': img_url,
                 'NOMBRE_PRO'  : json.data[i].NOMBRE_PRO,
                 'DESCRIPCION_PRO'  : json.data[i].DESCRIPCION_PRO,
                 'MARCA_PRO': json.data[i].MARCA_PRO,
                 'CATEGORIA_PRO':json.data[i].CATEGORIA_PRO,
                 'PRESENTACION_PRO':json.data[i].PRESENTACION_PRO,
                 'LABORATORIO_PRO':json.data[i].LABORATORIO_PRO,
                 'STOCK_PRO':json.data[i].STOCK_PRO,
                 'TIPO_PRO':json.data[i].TIPO_PRO,
                 'VENTA_CON_RECETA':labelreceta,
                 'PRECIO_VENTA_PRO' : json.data[i].PRECIO_VENTA_PRO,
                 'PRECIO_PROMOCIONAL_PRO': json.data[i].PRECIO_PROMOCIONAL_PRO,
                 'UBICACION_PRO': json.data[i].UBICACION_PRO,
                 'ETIQUETAS_PRO'  : json.data[i].ETIQUETAS_PRO,
                 //'ESTADO_PRO' : labelEstado,
                 //'ACCIONES_PRO' : btnVerDetalles,
                 //'SELECCIONAR': checkbox
               })
             }
             return return_data;
           }
         },
         "columns"    : [
            {
                className: 'details-control',
                defaultContent: '',
                data: null,
                orderable: false
            },
           {'data': 'ID_PRO'},
           {'data':'IMAGEN_PRO'},
           {'data': 'NOMBRE_PRO'},
           {'data': 'DESCRIPCION_PRO'},
           {'data':'MARCA_PRO'},
           {'data':'CATEGORIA_PRO'},
           {'data':'PRESENTACION_PRO'},
           {'data':'LABORATORIO_PRO'},
           {'data':'STOCK_PRO'},
           {'data':'TIPO_PRO'},
           {'data':'VENTA_CON_RECETA'},
           {'data':'PRECIO_VENTA_PRO' },
           {'data':'PRECIO_PROMOCIONAL_PRO'},
           {'data':'UBICACION_PRO'},
           {'data':'ETIQUETAS_PRO' }, 
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
            "columnDefs": [
                { "visible": false, "targets": [15,4,6,8,10,11] }
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
 

    /** funcion retorna las demas etiquetas de los productos */
 function format(data) {
        // var fila = "";
        console.log(data);
        var filas = '';
        var paneles="";
        //     var url = '/detallepedidos';
        //     axios.get(url,{
        //         params:{
        //             ID_PED:2
        //         }
        //     }).then(function (response) {
        //         console.log(response.data.data);
        //var longitud = Object.keys(data.ITEMS).length;
        //console.log(longitud);
        //for (var index = 0; index < longitud; index++) {
            var estilo = "";
            
    console.log(data.NOMBRE_PRO);
            filas = filas + '<tr>' +
                '<td style="border-top:none ;padding:0px" class="title">Descripción:</td>' +
                '<td style="border-top:none;padding:0px">' + data.DESCRIPCION_PRO + '</td>' +
                '<td style="border-top:none ;padding:0px" class="title">Tipo:</td>' +
                '<td style="border-top:none;padding:0px">' + data.TIPO_PRO + '</td>' +
                '</tr>' +
                '<tr >' +
                '<td style="border-top:none ;padding:0px" class="title">Marca:</td>' +
                '<td style="border-top:none;padding:0px">' + data.MARCA_PRO + '</td>' +
                '<td style="border-top:none ;padding:0px" class="title">Categoria:</td>' +
                '<td style="border-top:none;padding:0px">' + data.CATEGORIA_PRO + '</td>' +
                '</tr>  ' +
                
                '<tr>'+ 
                '<td style="border-top:none ;padding:0px" class="title">Laboratorio:</td>' +
                '<td style="border-top:none;padding:0px">' + data.LABORATORIO_PRO + '</td>' +
                '<td style="border-top:none ;padding:0px" class="title">Venta:</td>' +
                '<td style="border-top:none;padding:0px">' + data.VENTA_CON_RECETA + '</td>' +
                           
                '</tr>'+
                '<td style="border-top:none ;padding:0px" class="title">Trata:</td>' +
                '<td style="border-top:none;padding:0px">' + data.ETIQUETAS_PRO + '</td>' +
                '</tr>';
    
                paneles+= 
                '<div class="panel panel-primary">'+
                '<div class="panel-heading">Panel with panel-primary class</div>'+
                '<div class="panel-body">Panel Content</div>'+
                '</div>';
            // filas+=fila;
        
    
        //         return '<div class="details-container">'+
        //         '<table cellpadding="5" cellspacing="0" border="0" class="details-table">'+
        //             filas+
        //         '</table>'+
        //       '</div>';
    
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    
        return '<div class="details-container">' +
            '<table cellpadding="5" cellspacing="0" border="0" class="details-table ">' +
            filas +
            '</table>' +
            '</div>';
    
    
    }

/**
 * agrega el boton + a la tabla principal para mostrar los detalles 
 */
    $('#table_busqueda tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr'),
            row = tablaproductos.row(tr);
    
        if (row.child.isShown()) {
            tr.next('tr').removeClass('details-row');
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            row.child(format(row.data())).show();
            tr.next('tr').addClass('details-row');
            tr.addClass('shown');
        }
    });

    //tablaproductos.column(1).visible(false);
   
    function validarcedula(){
        var i;
        var cedula;
        var acumulado;
        cedula=document.formfact.RUC.value;
        var instancia;
        acumulado=0;
        for (i=1;i<=9;i++)
        {
         if (i%2!=0)
         {
          instancia=cedula.substring(i-1,i)*2;
          if (instancia>9) instancia-=9;
         }
         else instancia=cedula.substring(i-1,i);
         acumulado+=parseInt(instancia);
    }
    while (acumulado>0)
     acumulado-=10;
    if (cedula.substring(9,10)!=(acumulado*-1))
    {
        $('#indruc').html('<span class="input-group-text"><span class="fa fa-times" style="color:red;"></span></span>');
    //alert("Cedula no valida!!");
       error_ruc=0;
      
    document.formfact.RUC.focus();
     // this.focused=true;
     //this.$refs.ruc.focus();
    }else{
        $('#indruc').html('<span class="input-group-text"><span  class="fa fa-check" style="color:green;"></span></span>');
    //alert("Cedula valida !!");
    //this.focused=false;
    //this.ok=true;
    error_ruc=1;
    }
    
       }
       /**
        * aperturar la caja, esto se realiza una solo vez al dia,
        * ingresa
        */
       function aperturarCaja(){
        axios.post('/ventas/apertura').then(function (response){
            console.log(response.data);  
            toastr.warning('El registro ha sido desactivado con éxito!')
        })
        .catch(function (error) {
         toastr.error('Error en el servidor: '+error, 'Error!')
        }); 
       }
       aperturarCaja();