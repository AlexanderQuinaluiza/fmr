/**
 * FUNCIONES PARA MOSTRAR NOTIFICACIONES DE PRODUCTOS
 */

/**
 * Permite mostrar el detalle de aquellos productos que están próximos a caducar
 * @param {int} idProducto  --identificador de producto
 */
function getDetalleNotificacionCaducar(idProducto)
{
    tablaCaducaProducto.clear();
    var url = '/notificacion/ejemplaresByProductoProximoCaducar';
    var ID_PRO = 0;
    var NOMBRE_PRO = '';
    var DESCRIPCION_PRO='';
    var UBICACION_PRO='';
    axios.get(url, {
        params: {
            ID_PRO: idProducto
        }
    }).then(function (response) {
        $.each(response.data,function(key,value){
            ID_PRO = value.ID_PRO;
            NOMBRE_PRO = value.NOMBRE_PRO;
            DESCRIPCION_PRO = value.DESCRIPCION_PRO;
            UBICACION_PRO = value.UBICACION_PRO;
            tablaCaducaProducto.row.add({
                "ICON_COD_BARRA": '<i style="font-size:28px" class="fa fa-barcode"></i>',
                "COD_BARRA": value.CODIGO_BARRA,
                "FECHA_CADUCA": value.FECHA_CADUCIDAD,
                "CADUCA_EN": value.CADUCA
            }).draw();
        });
        if(response.status==200)
        {
            $('#lblIdProductoCaduca').text(ID_PRO);
            $('#lblNombreProductoCaduca').text(NOMBRE_PRO);
            $('#lblDescripciónProductoCaduca').text(DESCRIPCION_PRO);
            $('#lblUbicacionProductoCaduca').text(UBICACION_PRO);
        }
        else
        {
            $('#lblIdProductoCaduca').text('');$('#lblNombreProductoCaduca').text('');$('#lblDescripciónProductoCaduca').text('');$('#lblUbicacionProductoCaduca').text(''); 
        }
    })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * Permite mostrar aquellos productos que están próximos a caducar
 */
function getProductosProximosCaducar() {
    var url = '/notificacion/productosProximoCaducar';
    var numeroProductos = 0;
    var itemNotificacion = '';
    axios.get(url).then(function (response) {
        $.each(response.data,function(key,value){
            numeroProductos++;
            var textoNotificacion = value.PRODUCTO+' '+value.N_EJEMPLARES+' ejemplares a caducarse.'
            itemNotificacion += '<a id="'+value.ID_PRO+'" data-toggle="modal" data-target="#productoCaducarModal" class="dropdown-item media bg-flat-color-'+(numeroProductos+1)+' notifi" href="#"><i class="fa fa-exclamation-triangle"></i><p style="color:#455a64">'+textoNotificacion+'</p></a>';
         
        });
        if(response.status==200 && numeroProductos>0)
        {
            $('#not1').text(numeroProductos);
            $('#numNotificaciones').text('Tienes '+numeroProductos +' productos por caducar');
            $('#divNotificacion1').append(itemNotificacion);
            
        }
        else
        {
            $('#not1').text('');
            $('#numNotificaciones').text('');
        }
    })
        .catch(function (error) {
            console.log(error);
        });
}getProductosProximosCaducar();

/**
 * Permite mostrar el detalle del producto cuyo stock está próximo a agotarse
 * @param {int} idProducto --identificador de producto 
 */
function getProductoByIdStockMinimo(idProducto)
{
    var url = '/notificacion/productoByIdStockMinimo';
    var ID_PRO = 0;
    var NOMBRE_PRO = '';
    var DESCRIPCION_PRO='';
    var UBICACION_PRO='';
    var EXISTENCIA_MIN_PRO = 0;
    var STOCK_PRO = 0;
    var IMAGEN_PRO = '';
    axios.get(url, {
        params: {
            ID_PRO: idProducto
        }
    }).then(function (response) {
        $.each(response.data,function(key,value){
            ID_PRO = value.ID_PRO;
            NOMBRE_PRO = value.NOMBRE_PRO;
            DESCRIPCION_PRO = value.DESCRIPCION_PRO;
            UBICACION_PRO = value.UBICACION_PRO;
            EXISTENCIA_MIN_PRO = value.EXISTENCIA_MIN_PRO;
            STOCK_PRO = value.STOCK_PRO;
            IMAGEN_PRO = value.IMAGEN_PRO;
        });
        if(response.status==200)
        {
            $('#lblIdProductoAgotar').text(ID_PRO);
            $('#lblNombreProductoAgotar').text(NOMBRE_PRO);
            $('#lblDescripciónProductoAgotar').text(DESCRIPCION_PRO);
            $('#lblUbicacionProductoAgotar').text(UBICACION_PRO);
            $('#lblMinProductoAgotar').text(EXISTENCIA_MIN_PRO);
            $('#lblStockProductoAgotar').text(STOCK_PRO);
            $('#imgProductoAgotar').attr('src',IMAGEN_PRO);
        }
        else
        {
            $('#lblIdProductoAgotar').text('');$('#lblNombreProductoAgotar').text('');$('#lblDescripciónProductoAgotar').text('');$('#lblUbicacionProductoAgotar').text('');
            $('#lblMinProductoAgotar').text('');
            $('#lblStockProductoAgotar').text('');
            $('#imgProductoAgotar').attr('src','');
        }
    })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * Permite mostrar los productos cuyo stock está próximo a agotarse
 */
function getProductoStockMinimo() {
    var url = '/notificacion/productosStockMinimo';
    var numeroProductos = 0;
    var itemNotificacion = '';
    axios.get(url).then(function (response) {
        $.each(response.data,function(key,value){
            numeroProductos++;
            itemNotificacion += '<a id="'+value.ID_PRO+'" data-toggle="modal" data-target="#productoAgotarModal" class="dropdown-item media bg-flat-color-'+(numeroProductos+1)+' stock" href="#">'+
            '<span class="photo media-left"><img alt="'+value.NOMBRE_PRO+'" src="'+value.IMAGEN_PRO+'"></span>'+
            '<span class="message media-body">'+
                '<span class="name float-left" style="color:#455a64">'+value.NOMBRE_PRO+'</span>'+
                '<span class="time float-right" style="color:#455a64">'+value.STOCK_PRO+' en stock</span>'+
                    '<p style="color:#455a64">'+value.DESCRIPCION_PRO+'</p>'+
            '</span></a>';
         
        });
        if(response.status==200 && numeroProductos>0)
        {
            $('#not2').text(numeroProductos);
            $('#numNotificaciones2').text('Tienes '+numeroProductos +' productos por agotarse');
            $('#divNotificacion2').append(itemNotificacion);
            
        }
        else
        {
            $('#not2').text('');
            $('#numNotificaciones2').text('');
        }
    })
        .catch(function (error) {
            console.log(error);
        });
}getProductoStockMinimo();

//configuración inicial para tabla EJEMPLARES DE PRODUCTOS A CADUCAR
var tablaCaducaProducto = $('#tablaCaducaProducto').DataTable(
    {

        "paging": false,
        "searching": false,
        "info": false,
        "ordering": false,
        "columns": [
            { 'data': 'ICON_COD_BARRA' },
            { 'data': 'COD_BARRA' },
            { 'data': 'FECHA_CADUCA' },
            { 'data': 'CADUCA_EN' }
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


$(document).on('click', '.notifi', function () {
    var idProducto = parseInt($(this).attr('id'));
    getDetalleNotificacionCaducar(idProducto);
});
$(document).on('click', '.stock', function () {
    var idProducto = parseInt($(this).attr('id'));
    getProductoByIdStockMinimo(idProducto);
});

function setNombreRol()
{
   var usuario =  $('#idUsuario').val();
   var url = '/usuario/rol';
    axios.get(url, {
        params: {
            ID_USU: usuario
        }
    }).then(function (response) {
       $('#spanRol').text(response.data);
        
    })
        .catch(function (error) {
            console.log(error);
        });

}setNombreRol();