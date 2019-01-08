/**
 * FUNCIONES PARA REPORTES DE PRODUCTOS
 */

var iva = 0;
/**
 * FUNCION PARA LEER DATOS DE CONFIGURACIONES DADO UN ID
 * @param {string} key --nombre de configuracion
 */
function getSetting(key) {
    $.ajax({
        async: false,
        cache: false,
        dataType: "html",
        type: 'GET',
        url: "/settings",
        data: { setting: key },
        success: function (respuesta) {
            iva =  parseFloat(respuesta.trim());
        },
        beforeSend: function () { },
        error: function (objXMLHttpRequest) { }
    });
}getSetting('iva');
/**
 * Permite obtener las existencias de productos y almacenarlos 
 * en la cache del navegador
 */
function consultarExistenciaProductos() {
    var url = '/productos';
    var jsonItems = {};
    var Myindice = 0;
    axios.get(url).then(function (response) {
        var longitud = Object.keys(response.data.data).length;
        for (var i = 0; i < longitud; i++) {
            var item = {};
            item.ID = response.data.data[i].ID_PRO;
            item.PRODUCTO = response.data.data[i].NOMBRE_PRO;
            item.UBICACION = response.data.data[i].UBICACION_PRO;
            item.MINIMO = response.data.data[i].EXISTENCIA_MIN_PRO;
            item.MAXIMO = response.data.data[i].EXISTENCIA_MAX_PRO;
            item.EXISTENCIA = response.data.data[i].STOCK_PRO==null?0:response.data.data[i].STOCK_PRO;
            jsonItems[Myindice] = item;
            Myindice++;
        }
        localStorage.setItem("existenciaProductos", JSON.stringify(jsonItems));
    })
        .catch(function (error) {
            console.log(error);
        });
} consultarExistenciaProductos();




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
                cambiarTabActivo('#existencia-producto', 'active show');
                cambiarTabActivo('#inventario-producto', '');
                cambiarTabActivo('#listado-precios', '');
                break;
            }
        case 1: //tab detalle
            {
                cambiarTabActivo('#detalleReportePorProducto', 'active show');
                cambiarTabActivo('#listado', '');
                //cambiarTabActivo('#editar', '');
                
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


//----------------------------------INICIALIZACIÓN DE MÉTODOS-------------------------
//tab activo por defecto
cambiarTab(0, 0);

var tablaExistenciaProducto = $('#tabla-reporte-existencia-productos').DataTable(
    {
        "ordering": false,
        "columns":
            [
                { data: 'ID' },
                { data: 'PRODUCTO' },
                { data: 'UBICACION' },
                { data: 'MINIMO' },
                { data: 'MAXIMO' },
                { data: 'EXISTENCIA' }
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
                extend: 'print',
                text: '<i class="fa fa-print"></i> Imprimir',
                titleAttr: 'Imprimir',
                title: 'Reporte Existencia de Productos',
                className: 'btn btn-info btn-xs'
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

var tablaInventarioProducto = $('#tabla-reporte-inventario-productos').DataTable(
    {
        "ordering": false,
        "columns":
            [
                { data: 'ID' },
                { data: 'PRODUCTO' },
                { data: 'PRECIO' },
                { data: 'EXISTENCIA' },
                { data: 'TOTAL' }
            ],
        dom: 'lBfrtip',
        lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "Todo"]],
        buttons: [
            {
                extend: 'copyHtml5',
                text: '<i class="fa fa-files-o"></i> Copiar',
                titleAttr: 'Copiar',
            },
            {
                extend: 'print',
                text: '<i class="fa fa-print"></i> Imprimir',
                titleAttr: 'Imprimir',
                title: 'Reporte de Inventario',
                className: 'btn btn-info btn-xs'
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

var tablaListaPrecios = $('#tabla-reporte-lista-precios').DataTable(
    {
        "ordering": false,
        "columns":
            [
                { data: 'ID' },
                { data: 'PRODUCTO' },
                { data: 'DESCRIPCION' },
                { data: 'EXISTENCIA' },
                { data: 'PRECIO' }
            ],
        dom: 'lBfrtip',
        lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "Todo"]],
        buttons: [
            {
                extend: 'copyHtml5',
                text: '<i class="fa fa-files-o"></i> Copiar',
                titleAttr: 'Copiar',
            },
            {
                extend: 'print',
                text: '<i class="fa fa-print"></i> Imprimir',
                titleAttr: 'Imprimir',
                title: 'Lista de Precios',
                className: 'btn btn-info btn-xs'
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

/**
 * Permite obtener listado de precios de productos
 */
function consultarPreciosProductos() {
    //$('#tabla-reporte-lista-precios').dataTable().fnClearTable();
    var url = '/productos';
    axios.get(url).then(function (response) {
       $.each(response.data.data,function(key,value){
           var PRECIO_CON_IVA = 0;
           var PRECIO_PROMOCIONAL = value.PRECIO_PROMOCIONAL_PRO==null?0:value.PRECIO_PROMOCIONAL_PRO;
           if(value.APLICA_IVA_PRO==1)
           {
            PRECIO_CON_IVA = PRECIO_PROMOCIONAL +(PRECIO_PROMOCIONAL*iva)
           }
           else{
            PRECIO_CON_IVA = PRECIO_PROMOCIONAL;
           }
        tablaListaPrecios.row.add({
            "ID": value.ID_PRO,
            "PRODUCTO": value.NOMBRE_PRO,
            "DESCRIPCION": value.DESCRIPCION_PRO,
            "EXISTENCIA": value.STOCK_PRO==null?0:value.STOCK_PRO,
            "PRECIO": '$ ' + (PRECIO_PROMOCIONAL).toFixed(2)
        }).draw();
        // console.log(value.ID_PRO+" "+value.NOMBRE_PRO+" "+
        // value.STOCK_PRO+" "+value.PRECIO_PROMOCIONAL_PRO);
       });
    })
        .catch(function (error) {
            console.log(error);
        });
} consultarPreciosProductos();

/**
 * Permite obtener inventario de productos
 */
function consultarInventarioProductos() {
    $('#tabla-reporte-inventario-productos').dataTable().fnClearTable();
    var url = '/reportes/inventarioproducto';
    axios.get(url).then(function (response) {
        $.each(response.data, function (key, value) {
            tablaInventarioProducto.row.add({
                "ID": value.ID_PRO,
                "PRODUCTO": value.NOMBRE_PRO,
                "PRECIO": '$ ' + value.VALOR_EXIST.toFixed(2),
                "EXISTENCIA": value.CANTIDAD_EXIST,
                "TOTAL": '$ ' + value.TOTAL_EXIST
            }).draw();
        });
    })
        .catch(function (error) {
            console.log(error);
        });
} consultarInventarioProductos();

/**
 * Permite llenar la tabla de existencias productos según el 
 * radio button seleccionado
 * @param {int} opcion --1=todos los productos, 2=con existencias, 3=sin existencias
 */
function fillTablaExistenciaProductos(opcion) {
    $('#tabla-reporte-existencia-productos').dataTable().fnClearTable();
    var datos = JSON.parse(localStorage.getItem("existenciaProductos"));
    $.each(datos, function (key, value) {
        if (opcion == 1)
            tablaExistenciaProducto.row.add({ "ID": value.ID, "PRODUCTO": value.PRODUCTO, "UBICACION": value.UBICACION, "MINIMO": value.MINIMO, "MAXIMO": value.MAXIMO, "EXISTENCIA": value.EXISTENCIA }).draw();
        else if (opcion == 2 && value.EXISTENCIA > 0)
            tablaExistenciaProducto.row.add({ "ID": value.ID, "PRODUCTO": value.PRODUCTO, "UBICACION": value.UBICACION, "MINIMO": value.MINIMO, "MAXIMO": value.MAXIMO, "EXISTENCIA": value.EXISTENCIA }).draw();
        else if (opcion == 3 && value.EXISTENCIA <= 0)
            tablaExistenciaProducto.row.add({ "ID": value.ID, "PRODUCTO": value.PRODUCTO, "UBICACION": value.UBICACION, "MINIMO": value.MINIMO, "MAXIMO": value.MAXIMO, "EXISTENCIA": value.EXISTENCIA }).draw();
        else if (opcion == 4 && (value.EXISTENCIA < value.MINIMO))
            tablaExistenciaProducto.row.add({ "ID": value.ID, "PRODUCTO": value.PRODUCTO, "UBICACION": value.UBICACION, "MINIMO": value.MINIMO, "MAXIMO": value.MAXIMO, "EXISTENCIA": value.EXISTENCIA }).draw();
        else if (opcion == 5 && (value.EXISTENCIA > value.MAXIMO))
            tablaExistenciaProducto.row.add({ "ID": value.ID, "PRODUCTO": value.PRODUCTO, "UBICACION": value.UBICACION, "MINIMO": value.MINIMO, "MAXIMO": value.MAXIMO, "EXISTENCIA": value.EXISTENCIA }).draw();
    })
} fillTablaExistenciaProductos(1);

$('input[type=radio][name=rdExistenciaProd]').change(function () {
    if (this.value == 'todos') {
        fillTablaExistenciaProductos(1);
    }
    else if (this.value == 'conexist') {
        fillTablaExistenciaProductos(2); //productos con existencias
    }
    else if (this.value == 'sinexist') {
        fillTablaExistenciaProductos(3); //productos sin existencias
    }
    else if (this.value == 'min') {
        fillTablaExistenciaProductos(4); //productos sin minimo inventario
    }
    else if (this.value == 'max') {
        fillTablaExistenciaProductos(5); //productos sin maximo inventario
    }
});

$('.table').attr('style', 'width:100%');



