/**
 * FUNCIONES PARA LA GESTIÓN DE COMPRAS
 */

//objeto que permite almacenar los item agregados a la compra
var jsonItems = {};
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

//contador para generar identificador de filas del objeto que almacena items compra
var Myindice = 0;
var indiceSeleccionado = -1;

/**
 * Permite contar la cantidad de items añadidos al detalle de la compra
 */
function contarItemsDetalleCompraNueva() {
    var dataItems = JSON.parse(localStorage.getItem("localStore"));
    var existeItems = 0;
    $.each(dataItems, function (key, value) {
        existeItems++;
    });
    return existeItems;
}

/**
 * Permite borrar un item de un objeto JSON
 * @param {int} key --representa un valor clave dentro del objeto json que permita ubicar el registro
 */
function deleteItem(key) {
    delete jsonItems[key];
}

/**
 * Permite mostrar los valores en cajas de texto correspondiente a precio,cantidad,iva (s/n) de una fila
 * seleccionada de la tabla detalle compras previo a modificar los datos
 * @param {int} idFila --representa el identificador de la fila seleccionada de la tabla detalle compras
 */
function editar(idFila) {
    $('#lstErroresEditItem').empty();
    indiceSeleccionado = idFila;
    var dataItems = JSON.parse(localStorage.getItem("localStore"));
    $.each(dataItems, function (key, value) {
        if (key == idFila) {
            $('#EDIT_CANTIDAD_PRO').val(value.CANTIDAD_PRO);
            $('#EDIT_PRECIO_COMP').val(value.PRECIO_COMP);
            if (value.INCLUYE_IVA == 0) $('#editivan').prop('checked', true);
            else $('#editivas').prop('checked', true);
        }
    });
}

/**
 * Permite determinar si todos los items de detalle compra tienen cantidad y
 * precio un valor diferente de 0
 */
function verificarPreciosCalculados() {
    var dataItems = JSON.parse(localStorage.getItem("localStore"));
    var cantidadItem = 0;
    var precioItem = 0;
    var banderin = 0;
    $.each(dataItems, function (key, value) {
        cantidadItem = parseInt(value.CANTIDAD_PRO);
        precioItem = parseFloat(value.PRECIO_COMP);
        if (cantidadItem <= 0 || precioItem <= 0) {
            banderin = 1;
            return false;
        }
    });
    return banderin;
}

/**
 * Permite volver a realizar los calculos de compra total
 * y mostrar en la tabla los nuevos cambios
 */
function reloadTablaDetalleCompras() {
    var btnEditar = '';
    var btnEliminar = '<button type="button" class="btn btn-danger btn-sm delete"><span class="fa fa-trash"></span> Eliminar</button>';
    tabla.clear();
    var datos = JSON.parse(localStorage.getItem("localStore"));
    $.each(datos, function (key, value) {
        var etiquetIVA = value.INCLUYE_IVA == 0 ? '<i class="fa fa-times" style="color:#c82333" aria-hidden="true"></i>' : '<i class="fa fa-check" style="color:#17a2b8" aria-hidden="true"></i>';
        var precioXcantidad = value.CANTIDAD_PRO * value.PRECIO_COMP;
        btnEditar = '<button data-toggle="modal" data-target="#itemCompraModal" class="btn btn-primary" onclick="editar(' + value.ID + ');"><span class="fa fa-pencil-square-o"></span> Editar</button>';
        var buttons = '<div class="btn-group btn-group-sm">' + btnEditar + btnEliminar + '</div>';
        tabla.row.add({
            "ID": key,
            "NOMBRE_PRODUCTO": value.NOMBRE_PRO,
            "PRECIO": '$ ' + value.PRECIO_COMP,
            "CANTIDAD": value.CANTIDAD_PRO,
            "SUBTOTAL": '$ ' + (precioXcantidad).toFixed(2),
            "IVA": etiquetIVA,
            "ACCIONES": buttons
        }).draw();
    })
    //fila subtotal
    tabla.row.add({
        "ID": -1,
        "NOMBRE_PRODUCTO": '',
        "PRECIO": '',
        "CANTIDAD": '<strong>SUBTOTAL</strong>',
        "SUBTOTAL": '$ ' + getSubTotales(1),
        "IVA": '',
        "ACCIONES": ''
    }).draw();
    //fila IVA
    tabla.row.add({
        "ID": -1,
        "NOMBRE_PRODUCTO": '',
        "PRECIO": '',
        "CANTIDAD": '<strong>IVA ('+iva+')</strong>',
        "SUBTOTAL": '$ ' + getSubTotales(2),
        "IVA": '',
        "ACCIONES": ''
    }).draw();
    //fila TOTAL
    tabla.row.add({
        "ID": -1,
        "NOMBRE_PRODUCTO": '',
        "PRECIO": '',
        "CANTIDAD": '<strong>TOTAL</strong>',
        "SUBTOTAL": '$ ' + getSubTotales(3),
        "IVA": '',
        "ACCIONES": ''
    }).draw();
}

/**
 * Permite guardar los datos de edición correspondiente a item compra
 */
function guardarCambiosEditItem() {
    var CANTIDAD_PRO = $('#EDIT_CANTIDAD_PRO').val().trim();
    var PRECIO_COMP = $('#EDIT_PRECIO_COMP').val().trim();
    var APLICA_IVA = $('input[name=editiva]:checked').val();
    var errorMostrarMsj = [];
    if (!PRECIO_COMP || PRECIO_COMP == 0) errorMostrarMsj.push("Precio de compra no puede estar vacío");
    if (!APLICA_IVA) errorMostrarMsj.push("Marque si incluye o no IVA");
    if (!CANTIDAD_PRO || CANTIDAD_PRO == 0) errorMostrarMsj.push("Cantidad de producto no puede estar vacío");
    if (errorMostrarMsj.length) {
        $('#lstErroresEditItem').empty();
        var lista = '';
        for (var i = 0; i < errorMostrarMsj.length; i++) {
            lista += '<li style="color: red !important">' + errorMostrarMsj[i] + '</li>';
        }
        $('#lstErroresEditItem').append(lista);
    }
    else {
        $('#lstErroresEditItem').empty();
        try {
            var dataItems = JSON.parse(localStorage.getItem("localStore"));
            $.each(dataItems, function (key, value) {
                if (key == indiceSeleccionado) {
                    value.CANTIDAD_PRO = $('#EDIT_CANTIDAD_PRO').val();
                    value.PRECIO_COMP = $('#EDIT_PRECIO_COMP').val();
                    value.INCLUYE_IVA = $('input[name=editiva]:checked').val();
                    var sub = value.CANTIDAD_PRO * value.PRECIO_COMP;
                    var porcentajeIVA = 0;
                    if (value.INCLUYE_IVA > 0)//item si incluye IVA
                    {
                        porcentajeIVA = (iva * sub);
                    }
                    value.PORCENTAJE_PRECIO_IVA = porcentajeIVA;
                    toastr.success('Item modificado correctamente!');
                }
            });
            localStorage.setItem("localStore", JSON.stringify(dataItems));
            reloadTablaDetalleCompras();
        } catch (error) {
            toastr.error('Error al modificar el item!' + " " + error);
        }
    }
}

$('#btnModificarItem').click(function () {
    guardarCambiosEditItem();
});
/**
*permite añadir un item a la tabla de detalle compra 
*/
function addItemTabla() {
    var ID_PRO = $('#ddlProducto option:selected').val().trim();
    var CANTIDAD_PRO = $('#CANTIDAD_PRO').val().trim();
    var PRECIO_COMP = $('#PRECIO_COMP').val().trim();
    var APLICA_IVA = $('input[name=iva]:checked').val();
    var errorMostrarMsj = [];
    if (!ID_PRO || ID_PRO == 0) errorMostrarMsj.push("Escoja una producto");
    if (!PRECIO_COMP || PRECIO_COMP == 0) errorMostrarMsj.push("Precio de compra no puede estar vacío");
    if (!APLICA_IVA) errorMostrarMsj.push("Marque si incluye o no IVA");
    if (!CANTIDAD_PRO || CANTIDAD_PRO == 0) errorMostrarMsj.push("Cantidad de producto no puede estar vacío");
    if (errorMostrarMsj.length) {
        $('#lstErrores').empty();
        var lista = '';
        for (var i = 0; i < errorMostrarMsj.length; i++) {
            lista += '<li style="color: red !important">' + errorMostrarMsj[i] + '</li>';
        }
        $('#lstErrores').append(lista);
    }
    else {
        $('#lstErrores').empty();
        var NOMBRE_PRO = $('#ddlProducto option:selected').text().trim();
        var item = {};
        item.ID = Myindice;
        item.ID_PRO = ID_PRO;
        item.PRECIO_COMP = PRECIO_COMP;
        item.NOMBRE_PRO = NOMBRE_PRO;
        item.CANTIDAD_PRO = CANTIDAD_PRO;
        item.DESCUENTO = '0';
        item.INCLUYE_IVA = APLICA_IVA;
        item.APLICA_IVA = APLICA_IVA == 0 ? 'No' : 'Si';
        var precioXcantidad = CANTIDAD_PRO * PRECIO_COMP;
        var porcentajeIVA = 0;
        if (APLICA_IVA > 0)//item si incluye IVA
        {
            porcentajeIVA = (iva * precioXcantidad);               
        }
        item.PORCENTAJE_PRECIO_IVA = porcentajeIVA;

        if (verificarRepetido(ID_PRO)) {
            var dataItems = JSON.parse(localStorage.getItem("localStore"));
            $.each(dataItems, function (key, value) {
                if (value.ID_PRO == ID_PRO) {
                    value.CANTIDAD_PRO = parseInt(value.CANTIDAD_PRO) + parseInt(CANTIDAD_PRO);
                    value.PRECIO_COMP = PRECIO_COMP;
                    return false;
                }
            });
            localStorage.setItem("localStore", JSON.stringify(dataItems));
        }
        else {
            jsonItems[Myindice] = item;
            localStorage.setItem("localStore", JSON.stringify(jsonItems));
            Myindice++;
        }
        reloadTablaDetalleCompras();
        $('#formulario')[0].reset();
    }
}

/**
 * permite eliminar la fila seleccionada de la tabla detalle compra
 * @param {int} idFila --representa el indice de la fila seleccionada
 */
function elimiarFilaCompra(idFila) {
    deleteItem(idFila);
    localStorage.setItem("localStore", JSON.stringify(jsonItems));
    reloadTablaDetalleCompras();
    if (contarItemsDetalleCompraNueva() == 0) {
        tabla.clear().draw();
        Myindice = 0;
        jsonItems = {};
    }
}

/**
  *permite validar los datos de entrada para proveedor 
  */
function validarDatosProveedor() {
    var error = 0;
    var errorMostrarMsj = [];
    if (!$('#RUC_PROV').val().trim()) errorMostrarMsj.push("El RUC de proveedor no puede estar vacío");
    if (!$('#NOMBRE_PROV').val().trim()) errorMostrarMsj.push("El nombre de proveedor no puede estar vacío");
    if (!$('#RAZON_SOCIAL_PROV').val().trim()) errorMostrarMsj.push("La razón social de proveedor no puede estar vacío");
    if (!$('#DIRECCION_PROV').val().trim()) errorMostrarMsj.push("La dirección de proveedor no puede estar vacío");
    if (!$('#TELEFONO_PROV').val().trim()) errorMostrarMsj.push("El teléfono de proveedor no puede estar vacío");
    if (!$('#CORREO_PROV').val().trim()) errorMostrarMsj.push("El correo de proveedor no puede estar vacío");
    if (!$('#DEMORA_ENTREGA').val().trim()) errorMostrarMsj.push("Los días demora entrega no puede estar vacío");
    if (errorMostrarMsj.length) {
        $('#lstErroresProveedor').empty();
        error = 1;
        var lista = '';
        for (var i = 0; i < errorMostrarMsj.length; i++) {
            lista += '<li style="color: red !important">' + errorMostrarMsj[i] + '</li>';
        }
        $('#lstErroresProveedor').append(lista);
    }
    else {
        $('#lstErroresProveedor').empty();
    }
    return error;
}
/**
 * permite limpiar las entradas de texto para nuevo PROVEEDOR
 */
function limpiarDatosProveedor() {
    $('#id').val('');
    $('#formAddProveedor')[0].reset();
    $('#lstErroresProveedor').empty();
}

/**
 * permite obtener datos para las listas desplegables de ,
 * PRODUCTO Y PROVEEDOR
 */
function loadDataDropDownList() {
    var ddlProductos = $('#ddlProducto');
    $.getJSON('/productos/activos', function (data) {
        ddlProductos.append($('<option></option>').attr('value', '0').text('--Seleccione producto--'));
        $.each(data.data, function (key, entry) {
            ddlProductos.append($('<option></option>').attr('value', entry.ID_PRO).text(entry.NOMBRE_PRO));
        })
    });
    var ddlProveedor = $('#ddlProveedor');
    $.getJSON('/proveedores/activos', function (data) {
        ddlProveedor.append($('<option></option>').attr('value', '0').text('--Seleccione proveedor--'));
        $.each(data.data, function (key, entry) {
            ddlProveedor.append($('<option></option>').attr('value', entry.ID_PROV).text(entry.NOMBRE_PROV));
        })
    });
}

/**
 * permite registrar un proveedor
 */
function registrarProveedor() {
    var nacionalidad = '';
    if (this.validarDatosProveedor()) {
        return;
    }

    if ($('#extranjero').is(':checked') && $('#extranjero').val() == 'extranjero') {
        nacionalidad = 'extranjero';
    }
    else {
        nacionalidad = 'nacional';
    }
    axios.post('/proveedores/registrar', {
        'RUC_PROV': $('#RUC_PROV').val().trim(),
        'NOMBRE_PROV': $('#NOMBRE_PROV').val().trim(),
        'RAZON_SOCIAL_PROV': $('#RAZON_SOCIAL_PROV').val().trim(),
        'DIRECCION_PROV': $('#DIRECCION_PROV').val().trim(),
        'TELEFONO_PROV': $('#TELEFONO_PROV').val().trim(),
        'CORREO_PROV': $('#CORREO_PROV').val().trim(),
        'NACIONALIDAD_PROV': nacionalidad,
        'PROVINCIA_PROV': $('#PROVINCIA_PROV').val().trim(),
        'CIUDAD_PROV': $('#CIUDAD_PROV').val().trim(),
        'DEMORA_ENTREGA': $('#DEMORA_ENTREGA').val().trim()
    }).then(function (response) {
        var ID_PROV = response.data.ID_PROV;
        var NOMBRE_PROV = response.data.NOMBRE_PROV;
        limpiarDatosProveedor();
        //añadir proveedor recien creado y preseleccionar por defecto
        $('<option value="' + ID_PROV + '">' + NOMBRE_PROV + '</option>').appendTo("#ddlProveedor");
        $('#ddlProveedor option[value="' + ID_PROV + '"]').attr("selected", true);
        toastr.success('Registrado correctamente!')
    })
        .catch(function (error) {
            console.log(error);
            toastr.error('No se ha podido guardar el registro.', 'Error!')
        });
}

/**
 * Permite obtener los valores de SUBTOTAL,IVA y TOTAL de la compra
 * @param {int} opcion --opcion 1=subtotal, 2=IVA, 3=total
 */
function getSubTotales(opcion) {
    var valorRetorno = 0;
    var dataItems = JSON.parse(localStorage.getItem("localStore"));
    var itemSubtotal = 0;
    var subtotal = 0;
    var subtotalIVA = 0;
    $.each(dataItems, function (key, value) {
        itemSubtotal = parseInt(value.CANTIDAD_PRO) * parseFloat(value.PRECIO_COMP);
        if (value.INCLUYE_IVA > 0) {
            subtotalIVA += (iva * itemSubtotal);
        }
        subtotal += itemSubtotal;
    });
    if (opcion == 1)
        valorRetorno = subtotal;
    else if (opcion == 2)
        valorRetorno = subtotalIVA;
    else if (opcion == 3)
        valorRetorno = subtotal + subtotalIVA;

    return valorRetorno.toFixed(2);
}

/**
 * Permite el registro de una compra
 */
function registrar() {
    var error = 0;
    var totalFilas = tabla.page.info().recordsTotal;
    var errorMostrarMsj = [];
    if (totalFilas <= 0) {
        $('#lstErrores').empty();
        errorMostrarMsj.push("Añada al menos un item");
        var lista = '';
        for (var i = 0; i < errorMostrarMsj.length; i++) {
            lista += '<li style="color: red !important">' + errorMostrarMsj[i] + '</li>';
        }
        $('#lstErrores').append(lista);
    }
    else {

        if (verificarPreciosCalculados() == 1) //no todas las filas tienen cantidad y precio dieferente de 0
        {
            toastr.warning("Complete todos los valores para cada item de compra CANTIDAD & PRECIO");
            $('#lstErrores').empty();
        }
        else {
            $('#lstErroresCompra').empty();
            errorMostrarMsj = [];
            var ID_PROV = $('#ddlProveedor option:selected').val().trim();
            var DESCRIPCION_COMP = $('#DESCRIPCION_COMP').val().trim();
            var DESCUENTO = $('#DESCUENTO').val().trim();
            if (!DESCUENTO) DESCUENTO = 0;
            var FACTURA_PROV = $('#FACTURA_PROV').val().trim();
            if (!ID_PROV || ID_PROV == 0) {
                errorMostrarMsj.push("Seleccione un proveedor de la lista");
                error = 1;
            }
            if (!FACTURA_PROV) {
                errorMostrarMsj.push("Ingrese la factura proporcionado por proveedor");
                error = 1;
            }
            var lista = '';
            for (var i = 0; i < errorMostrarMsj.length; i++) {
                lista += '<li style="color: red !important">' + errorMostrarMsj[i] + '</li>';
            }
            $('#lstErroresCompra').append(lista);
            if (error == 0) { //si no hay ningún error
                var dataItems = JSON.parse(localStorage.getItem("localStore"));
                var arreglo = [];
                $.each(dataItems, function (key, value) {
                    arreglo.push(value);
                });
                var data = new FormData();
                data.append('datos', JSON.stringify(arreglo));
                data.append('ID_PROV', ID_PROV);
                data.append('DESCRIPCION_COMP', DESCRIPCION_COMP);
                data.append('DESCUENTO_COMP', DESCUENTO);
                data.append('FACTURA_PROV', FACTURA_PROV);
                data.append('IVA_COMP', getSubTotales(2));
                data.append('TOTAL_COMP', getSubTotales(3));
                axios.post('/compras/registrar', data).then(function (response) {
                    if (response.data > 0) {
                        toastr.success('Compra registrado correctamente!');
                        limpiarDatos();
                        $('#secondFormCompra')[0].reset();
                        $('#lstErrores').empty();
                        $('#lstErroresCompra').empty();
                        tablaCompras.ajax.reload();
                        tabla.clear().draw();
                        jsonItems = {};
                        localStorage.clear();
                    }
                    else {
                        console.log(response.data);
                        toastr.error('No se ha podido guardar el registro.', 'Error!')
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                        toastr.error('No se ha podido guardar el registro.', 'Error!')
                    });
            }
        }
    }
}

/**
 * permite actualizar la cantidad de producto a comprar en caso 
 * que se añada un item repetido
 * @param {int} ID_PRO  --identificador de producto
 */
function verificarRepetido(ID_PRO) {
    var igual = false;
    var dataItems = JSON.parse(localStorage.getItem("localStore"));
    console.log(dataItems);
    if(dataItems!=null){
    // console.log(Object.keys(dataItems).length);
    $.each(dataItems, function (key, value) {
        if (value.ID_PRO == ID_PRO) {
            igual = true;
            return false;
        }
    });
    }
    return igual;
}

/**
 * permite limpiar las entradas de texto
 */
function limpiarDatos() {
    $('#formulario')[0].reset();
    $('#OBSERVACION_PED').val('');
}

/**
 * Permite obtener una compra dado su id
 * @param {int} idRegistro -identificador de compra
 */
function getCompraById(idRegistro) {
    var url = '/compras/byid';
    axios.get(url, {
        params: {
            ID_COMP: idRegistro
        }
    }).then(function (response) {
        $('#lblID_COMP').html(response.data.data[0].ID_COMP);
        $('#lblNOMBRE_PROV').html(response.data.data[0].NOMBRE_PROV);
        $('#lblNOMBRE_USU').html(response.data.data[0].NOMBRE_USU + " " + response.data.data[0].APELLIDO_USU);
        $('#lblFACTURA_PROV').html(response.data.data[0].FACTURA_PROV);
        $('#lblFECHA_COMP').html(response.data.data[0].FECHA_COMP);
        var porcentajeDescuento = response.data.data[0].DESCUENTO_COMP;
        var totalCompra = response.data.data[0].TOTAL_COMP;
        var descuentoPorc = porcentajeDescuento * totalCompra;
        var totalConDescuento = totalCompra - descuentoPorc;
        $('#lblTOTALCONDESCUENTO').html(totalConDescuento);
        $('#lblDESCUENTO_COMP').html(porcentajeDescuento);
        if (!porcentajeDescuento)
            $('#divDescuento').hide();
        else
            $('#divDescuento').show();
    })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * Permite obtener los detalles de una compra
 * @param {int} idRegistro -identificador de compra
 */
function getDetalleByIdCompra(idRegistro) {
    getCompraById(idRegistro);

    var url = '/compras/detalle/byid';
    axios.get(url, {
        params: {
            ID_COMP: idRegistro
        }
    }).then(function (response) {
        var longitud = Object.keys(response.data.data).length;
        var subtotal = 0;
        var subtotalIVA = 0;
        var total = 0;
        var itemIVA = 0;
        for (var index = 0; index < longitud; index++) {
            if (response.data.data[index].INCLUYE_IVA > 0) {
                itemIVA = (iva * parseFloat(response.data.data[index].SUBTOTAL));
                console.log(response.data.data[index].SUBTOTAL);
            }
            else itemIVA = 0;
            subtotalIVA += itemIVA;
            response.data.data[index].INCLUYE_IVA = response.data.data[index].INCLUYE_IVA == 0 ? '<i class="fa fa-times" style="color:#c82333" aria-hidden="true"></i>' : '<i class="fa fa-check" style="color:#17a2b8" aria-hidden="true"></i>';
            subtotal += parseFloat(response.data.data[index].SUBTOTAL);
            response.data.data[index].PRECIO_COMP = '$ ' + response.data.data[index].PRECIO_COMP;
            response.data.data[index].SUBTOTAL = '$ ' + response.data.data[index].SUBTOTAL;
        }
        total = subtotal + subtotalIVA;
        if (longitud > 0) {
            $('#tabla-detalle').dataTable().fnClearTable();
            $('#tabla-detalle').dataTable().fnAddData(response.data.data);

            //fila subtotal
            tablaDetallePedidos.row.add({
                "NOMBRE_PRO": '&nbsp;',
                "PRECIO_COMP": '&nbsp;',
                "CANTIDAD_PRO": '<strong>SUBTOTAL</strong>',
                "SUBTOTAL": '$ ' + (subtotal).toFixed(2),
                "INCLUYE_IVA": ''
            }).draw();
            //fila IVA
            tablaDetallePedidos.row.add({
                "NOMBRE_PRO": '&nbsp;',
                "PRECIO_COMP": '&nbsp;',
                "CANTIDAD_PRO": '<strong>IVA ('+iva+')</strong>',
                "SUBTOTAL": '$ ' + (subtotalIVA).toFixed(2),
                "INCLUYE_IVA": ''
            }).draw();
            //fila TOTAL
            tablaDetallePedidos.row.add({
                "NOMBRE_PRO": '&nbsp;',
                "PRECIO_COMP": '&nbsp;',
                "CANTIDAD_PRO": '<strong>TOTAL</strong>',
                "SUBTOTAL": '$ ' + (total).toFixed(2),
                "INCLUYE_IVA": ''
            }).draw();
        }
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
                cambiarTabActivo('#editar', '');
                cambiarTabActivo('#detalle', '');
                break;
            }
        case 1: //tab detalle
            {
                cambiarTabActivo('#detalle', 'active show');
                cambiarTabActivo('#listado', '');
                cambiarTabActivo('#editar', '');
                getDetalleByIdCompra(idRegistro);
                break;
            }
        case 2: //tab detalle
            {
                cambiarTabActivo('#editar', 'active show');
                cambiarTabActivo('#listado', '');
                cambiarTabActivo('#detalle', '');
                // getDetalleByIdCompra(idRegistro);
                break;
            }
    }
}



//----------------------------------INICIALIZACIÓN DE MÉTODOS-------------------------
$('#btnCancelarActualizar').hide();
//tab activo por defecto
cambiarTab(2, 0);

loadDataDropDownList();

$('#btnGuardar').click(function () {
    registrar();
});

$('#btnAdd').click(function () {
    addItemTabla();
});

$('#btnAgregarProveedor').click(function () {
    registrarProveedor();
});

/**
 * permite decrementar o incrementar la cantidad de producto en uno
 * @param {int} opcion --1=decrementar cantidad en uno, 2=incrementar cantidad en uno
 */
function masMenosCantidad(opcion) {
    var cantidadActual = $('#EDIT_CANTIDAD_PRO').val().trim();
    if (!cantidadActual) cantidadActual = 0;
    var cantidadProducto = opcion == 1 ? parseFloat(cantidadActual) - 1 : parseFloat(cantidadActual) + 1;
    $('#EDIT_CANTIDAD_PRO').val(cantidadProducto);
}

$('#inCantidad').click(function () {
    //aumentar cantidad producto en uno
    masMenosCantidad(2);
});

$('#deCantidad').click(function () {
    //decrementar cantidad en uno
    var cantidadActual = $('#EDIT_CANTIDAD_PRO').val().trim();
    //valor mínimo hasta el que se puede decrementar 1
    if (cantidadActual >= 2)
        masMenosCantidad(1);
});

//permite borrar un item de la tabla pedido cuando pulsa sobre el boton Eliminar
$('#bootstrap-data-table tbody').on('click', 'button.delete', function () {
    var datoFila = tabla.row($(this).parents('tr')).data();
    var idFila = datoFila.ID;
    elimiarFilaCompra(idFila);
});

//configuración inicial para tabla COMPRA NUEVA
var tabla = $('#bootstrap-data-table').DataTable(
    {
        "paging": false,
        "searching": false,
        "info": false,
        "ordering": false,
        "columns": [
            { 'data': 'ID' },
            { 'data': 'NOMBRE_PRODUCTO' },
            { 'data': 'PRECIO' },
            { 'data': 'CANTIDAD' },
            { 'data': 'SUBTOTAL' },
            { 'data': 'IVA' },
            { 'data': 'ACCIONES' }
        ],
        lengthMenu: [[10, 20, 50, -1], [10, 20, 50, "Todo"]],
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

//configuración inicial para tabla listado de COMPRAS
var tablaCompras = $('#tabla-listado').DataTable(
    {
        'ajax': {
            "type": "GET",
            "url": "compras",
            "dataSrc": function (json) {
                var return_data = new Array();
                var buttons = '';
                var btn = '';
                var labelEstado = '';
                for (var i = 0; i < json.data.length; i++) {
                    var ID_COMP = json.data[i].ID_COMP;
                    var btnVerDetalles = '<button type="button" onclick="cambiarTab(1,' + ID_COMP + ');" class="btn btn-info"><span class="fa fa-info-circle"></span> Detalles</button>';
                    buttons = '<div class="btn-group btn-group-sm">' + btnVerDetalles + '</div>';
                    return_data.push({
                        'ID_COMP': json.data[i].ID_COMP,
                        'FECHA_COMP': json.data[i].FECHA_COMP,
                        'FACTURA_PROV': json.data[i].FACTURA_PROV,
                        'DESCRIPCION_COMP': json.data[i].DESCRIPCION_COMP,
                        'TOTAL_COMP': '$ ' + json.data[i].TOTAL_COMP,
                        'ACCIONES_COMP': buttons
                    })
                }
                return return_data;
            }
        },
        "columns": [
            { 'data': 'ID_COMP' },
            { 'data': 'FECHA_COMP' },
            { 'data': 'FACTURA_PROV' },
            { 'data': 'DESCRIPCION_COMP' },
            { 'data': 'TOTAL_COMP' },
            { 'data': 'ACCIONES_COMP' }
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

//configuración inicial para tabla DETALLE DE COMPRA
var tablaDetallePedidos = $('#tabla-detalle').DataTable(
    {
        "paging": false,
        "searching": false,
        "info": false,
        "ordering": false,
        "columns": [
            { 'data': 'NOMBRE_PRO' },
            { 'data': 'PRECIO_COMP' },
            { 'data': 'CANTIDAD_PRO' },
            { 'data': 'SUBTOTAL' },
            { 'data': 'INCLUYE_IVA' }
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

//columna ID de tabla compra nueva, se hace no visible
tabla.column(0).visible(false);

/**
 * Permite crear una sección de detalle para cada fila de la tabla pedidos
 * @param {json} data --objeto que contiene el detalle de cada pedido
 */
function format(data) {
    var filas = '';
    var estilo = "";
    var longitud = Object.keys(data.ITEMS).length;
    for (var index = 0; index < longitud; index++) {
        estilo = index == longitud - 1 ? "" : "border-bottom: 1px solid #cfd8dc";
        filas = filas + '<tr >' +
            '<td style="border-top:none ;padding:0px" class="title">Producto:</td>' +
            '<td style="border-top:none;padding:0px">' + data.ITEMS[index].NOMBRE_PRO + '</td>' +
            '</tr>' +
            '<tr style="' + estilo + '">' +
            '<td style="border-top:none ;padding:0px" class="title">Presentación:</td>' +
            '<td style="border-top:none;padding:0px">' + data.ITEMS[index].NOMBRE_PRS + '</td>' +
            '<td style="border-top:none ;padding:0px" class="title">Marca:</td>' +
            '<td style="border-top:none;padding:0px">' + data.ITEMS[index].NOMBRE_MAR + '</td>' +
            '<td style="border-top:none ;padding:0px" class="title">Cantidad:</td>' +
            '<td style="border-top:none;padding:0px">' + data.ITEMS[index].CANTIDAD_PRO + '</td>' +
            '</tr>';
    }
    return '<div class="details-container">' +
        '<table cellpadding="5" cellspacing="0" border="0" class="details-table ">' +
        filas + '</table>' + '</div>';
};

/**
 * Permite obtener los detalles de un pedido, para cargarlos a la tabla detalle compra
 * @param {int} idRegistro -identificador de pedido
 */
function getDetalleByIdPedido(idRegistro) {
    var url = '/pedidos/detalle/byid';
    axios.get(url, {
        params: {
            ID_PED: idRegistro
        }
    }).then(function (response) {
        var longitud = Object.keys(response.data.data).length;
        if (longitud > 0) {
            tabla.clear();
            jsonItems = {};
            Myindice = 0;
            for (var i = 0; i < longitud; i++) {
                var item = {};
                item.ID = Myindice;
                item.ID_PRO = response.data.data[i].ID_PRO;
                item.PRECIO_COMP = 0;
                item.NOMBRE_PRO = response.data.data[i].NOMBRE_PRO;
                item.CANTIDAD_PRO = response.data.data[i].CANTIDAD_PRO;
                item.DESCUENTO = '0';
                item.INCLUYE_IVA = 0;
                item.APLICA_IVA = item.INCLUYE_IVA == 0 ? 'No' : 'Si';
                item.PORCENTAJE_PRECIO_IVA = 0;
                jsonItems[Myindice] = item;
                Myindice++;
            }
            localStorage.setItem("localStore", JSON.stringify(jsonItems));
            reloadTablaDetalleCompras();
            toastr.success('Items importados correctamente!');
        }
    })
        .catch(function (error) {
            toastr.error('Error al cargar los items a la tabla compra!');
        });
}

/**
 * Permite marcar el proveedor correspondiente al pedido seleccionado
 * @param {int} idProveedor --identificador de proveedor
 * @param {int} idPedido  --identificador de pedido
 */
function checkProveedorDePedido(idProveedor, idPedido) {
    try {
        getDetalleByIdPedido(parseInt(idPedido));
        $("#ddlProveedor").val(parseInt(idProveedor));
    } catch (error) {
        console.log(error);
    }
}

var table = null;
/**
 * permite cargas los pedidos, para su posterior importacion a tabla compra
 */
function getPedidos() {
    table = $('.datatables').DataTable({
        'ajax': {
            "type": "GET",
            "url": "pedidos",
            "dataSrc": function (json) {
                var return_data = new Array();
                var buttons = '';
                for (var i = 0; i < json.data.length; i++) {
                    var datos = "'" + json.data[i].ID_PROV + "','" + json.data[i].ID_PED + "'";
                    var btnVerDetalles = '<button data-dismiss="modal" type="button" onclick="checkProveedorDePedido(' + datos + ');" class="btn btn-success"><span class="fa fa-check"></span> Seleccionar</button>';
                    buttons = '<div class="btn-group btn-group-sm">' + btnVerDetalles + '</div>';
                    return_data.push({
                        'ID_PED': json.data[i].ID_PED,
                        'FECHA_PED': json.data[i].FECHA_PED,
                        'NOMBRE_PROV': json.data[i].NOMBRE_PROV,
                        'OBSERVACION_PED': json.data[i].OBSERVACION_PED,
                        'ID_PROV': json.data[i].ID_PROV,
                        'ITEMS': json.data[i].ITEMS,
                        'ACCIONES': buttons
                    })
                }
                return return_data;
            }
        },
        // Definición de columnas
        columns: [
            {
                className: 'details-control',
                defaultContent: '',
                data: null,
                orderable: false
            },
            { data: 'ID_PED' },
            { data: 'FECHA_PED', className: 'editable' },
            { data: 'NOMBRE_PROV' },
            { data: 'OBSERVACION_PED' },
            { data: 'ID_PROV' },
            { data: 'ITEMS' },
            { data: 'ACCIONES' }
        ], //permite que la columna con indice 5 no se muestre
        "columnDefs": [
            { "visible": false, "targets": 5 },
            { "visible": false, "targets": 6 }
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
} getPedidos();

//permite desplegar un detalle en cada fila de la tabla pedidos
$('.datatables tbody').on('click', 'td.details-control', function () {
    var tr = $(this).closest('tr'),
        row = table.row(tr);

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
$('.table').attr('style','width:100%');