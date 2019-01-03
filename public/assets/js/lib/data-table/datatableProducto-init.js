/**
 * FUNCIONES PARA LA GESTIÓN DE PRODUCTOS
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
            var precioConIVA = 0;
            var precioPromocionalConIVA = 0;
            if(response.data[0].APLICA_IVA_PRO>0)
            {
                precioConIVA = (response.data[0].PRECIO_VENTA_PRO*iva)+response.data[0].PRECIO_VENTA_PRO;
                precioPromocionalConIVA = (response.data[0].PRECIO_PROMOCIONAL_PRO*iva)+response.data[0].PRECIO_PROMOCIONAL_PRO;
            }
            else{
                precioConIVA = response.data[0].PRECIO_VENTA_PRO;
                precioPromocionalConIVA = response.data[0].PRECIO_PROMOCIONAL_PRO;
            } 
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
            $('#lblGANANCIA_PRO').text(response.data[0].GANANCIA_PRO);
            $('#lblPRECIO_VENTA_PRO').text('$ '+precioConIVA.toFixed(2));
            $('#lblEXISTENCIA_MIN_PRO').text(response.data[0].EXISTENCIA_MIN_PRO);
            $('#lblEXISTENCIA_MAX_PRO').text(response.data[0].EXISTENCIA_MAX_PRO);
            if(response.data[0].APLICA_IVA_PRO==0)
            {
                $('#lblAPLICA_IVA_PRO').attr('class','fa fa-times');
                $('#lblAPLICA_IVA_PRO').attr('style','color:#c82333;font-size: 23px');
            }
            else
            {
                $('#lblAPLICA_IVA_PRO').attr('class','fa fa-check');
                $('#lblAPLICA_IVA_PRO').attr('style','color:#17a2b8;font-size: 23px');
            } 
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
            $('#lblPRECIO_PROMOCIONAL_PRO').text('$ '+precioPromocionalConIVA.toFixed(2));
            if(response.data[0].VENTA_CON_RECETA==0)
            {
                $('#lblVENTA_CON_RECETA').attr('class','fa fa-times');
                $('#lblVENTA_CON_RECETA').attr('style','color:#c82333;font-size: 23px');
            }
            else {
                $('#lblVENTA_CON_RECETA').attr('class','fa fa-check');
                $('#lblVENTA_CON_RECETA').attr('style','color:#17a2b8;font-size: 23px');
            }
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
/**
 * permite limpiar las entradas de texto
 */
function limpiarDatos()
{
    $('#formProducto')[0].reset();
    $('#id').val('');
    $('#lstErrores').empty();
}
/**
 * permite registrar un producto
 */
function registrar(){
    var NOMBRE_PRO = $('#NOMBRE_PRO').val().trim();
    var DESCRIPCION_PRO = $('#DESCRIPCION_PRO').val().trim();
    var ETIQUETAS_PRO = $('#ETIQUETAS_PRO').val().trim();
    var CATEGORIA_PRO = $('#ddlCategoria option:selected').val().trim();
    var PRESENTACION_PRO = $('#ddlPresentacion option:selected').val().trim();
    var MARCA_PRO = $('#ddlMarca option:selected').val().trim();
    var GANANCIA_PRO = $('#GANANCIA_PRO').val().trim();
    var EXISTENCIA_MAX_PRO = $('#EXISTENCIA_MAX_PRO').val().trim();
    var EXISTENCIA_MIN_PRO = $('#EXISTENCIA_MIN_PRO').val().trim();
    var UBICACION_PRO = $('#UBICACION_PRO').val().trim();
    var LOTE_PRO = $('#LOTE_PRO').val().trim();
    var LABORATORIO_PRO = $('#LABORATORIO_PRO').val().trim();
    var APLICA_IVA_PRO = $('input[name=iva]:checked').val();
    var TIPO_PRO = $('input[name=tipo]:checked').val();
    var VENTA_CON_RECETA = $('input[name=receta]:checked').val();

    var errorMostrarMsj = [];
    if(!NOMBRE_PRO) errorMostrarMsj.push("El nombre de producto no puede estar vacío");
    if(!DESCRIPCION_PRO) errorMostrarMsj.push("La descripción de producto no puede estar vacío");
    if(CATEGORIA_PRO==0) errorMostrarMsj.push("Escoja una categoría");
    if(MARCA_PRO==0) errorMostrarMsj.push("Escoja una marca");
    if(PRESENTACION_PRO==0) errorMostrarMsj.push("Escoja una presentación");
    if(!GANANCIA_PRO || GANANCIA_PRO<=0) errorMostrarMsj.push("El porcentaje de ganancia no puede estar vacío");
    if(!UBICACION_PRO) errorMostrarMsj.push("La ubicación del producto no puede estar vacío");
    if(!LABORATORIO_PRO) errorMostrarMsj.push("Laboratorio que fabrica el producto no puede estar vacío");
    if(!APLICA_IVA_PRO) errorMostrarMsj.push("Marque si incluye o no IVA");
    if(!TIPO_PRO) errorMostrarMsj.push("Marque el tipo de producto");
    if(!VENTA_CON_RECETA) errorMostrarMsj.push("Marque si el producto se vende con receta médica o no");
    if(errorMostrarMsj.length){
        $('#lstErrores').empty();
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
          //REGISTRO DE PRODUCTO
          var data = new FormData();
          var IMAGEN_PRO = document.getElementById("IMAGEN_PRO").files[0];    
          var settings = { headers: { 'content-type': 'multipart/form-data' } }
          var datos = {
            'NOMBRE_PRO' : NOMBRE_PRO,
            'DESCRIPCION_PRO' : DESCRIPCION_PRO,
            'ETIQUETAS_PRO' : ETIQUETAS_PRO,
            'ID_CAT' : CATEGORIA_PRO,
            'ID_PRS' : PRESENTACION_PRO,
            'ID_MAR' : MARCA_PRO,
            'EXISTENCIA_MAX_PRO' : EXISTENCIA_MAX_PRO,
            'EXISTENCIA_MIN_PRO' : EXISTENCIA_MIN_PRO,
            'GANANCIA_PRO' : GANANCIA_PRO,
            'UBICACION_PRO' : UBICACION_PRO,
            'APLICA_IVA_PRO' : APLICA_IVA_PRO,
            'TIPO_PRO' : TIPO_PRO,
            'VENTA_CON_RECETA' : VENTA_CON_RECETA,
            'LOTE_PRO' : LOTE_PRO,
            'LABORATORIO_PRO' : LABORATORIO_PRO
          }
          data.append('datos',JSON.stringify(datos));
          data.append('IMAGEN_PRO',IMAGEN_PRO);
          axios.post('/productos/registrar',data,settings).then(function (response){
            tabla.ajax.reload();
            limpiarDatos();
            //console.log(response.data);
            toastr.success('Registrado correctamente!')
            })
            .catch(function (error) {
            //console.log(error);
            toastr.error('No se ha podido guardar el registro.', 'Error!')
            });
    }
    /**console.log(NOMBRE_PRO+" - "+" - "+DESCRIPCION_PRO+" - "
    +" - "+ETIQUETAS_PRO+" - "+CATEGORIA_PRO+" - "+PRESENTACION_PRO
    +" - "+MARCA_PRO+" - "+GANANCIA_PRO+" - "+EXISTENCIA_MAX_PRO
    +" - "+EXISTENCIA_MIN_PRO+" - "+UBICACION_PRO+" - "+LOTE_PRO
    +" - "+LABORATORIO_PRO+" - "+APLICA_IVA_PRO+" - "+TIPO_PRO+" - "+
    VENTA_CON_RECETA);*/
}

/**
 * permite actualizar un producto existente
 */
function actualizar(){
    var ID_PRO = $('#id').val().trim();
    var NOMBRE_PRO = $('#NOMBRE_PRO').val().trim();
    var DESCRIPCION_PRO = $('#DESCRIPCION_PRO').val().trim();
    var ETIQUETAS_PRO = $('#ETIQUETAS_PRO').val().trim();
    var CATEGORIA_PRO = $('#ddlCategoria option:selected').val().trim();
    var PRESENTACION_PRO = $('#ddlPresentacion option:selected').val().trim();
    var MARCA_PRO = $('#ddlMarca option:selected').val().trim();
    var GANANCIA_PRO = $('#GANANCIA_PRO').val().trim();
    var EXISTENCIA_MAX_PRO = $('#EXISTENCIA_MAX_PRO').val().trim();
    var EXISTENCIA_MIN_PRO = $('#EXISTENCIA_MIN_PRO').val().trim();
    var UBICACION_PRO = $('#UBICACION_PRO').val().trim();
    var LOTE_PRO = $('#LOTE_PRO').val().trim();
    var LABORATORIO_PRO = $('#LABORATORIO_PRO').val().trim();
    var APLICA_IVA_PRO = $('input[name=iva]:checked').val();
    var TIPO_PRO = $('input[name=tipo]:checked').val();
    var VENTA_CON_RECETA = $('input[name=receta]:checked').val();

    var errorMostrarMsj = [];
    if(!ID_PRO) errorMostrarMsj.push("Escoja un producto existente de la lista");
    if(!NOMBRE_PRO) errorMostrarMsj.push("El nombre de producto no puede estar vacío");
    if(!DESCRIPCION_PRO) errorMostrarMsj.push("La descripción de producto no puede estar vacío");
    if(CATEGORIA_PRO==0) errorMostrarMsj.push("Escoja una categoría");
    if(MARCA_PRO==0) errorMostrarMsj.push("Escoja una marca");
    if(PRESENTACION_PRO==0) errorMostrarMsj.push("Escoja una presentación");
    if(!GANANCIA_PRO || GANANCIA_PRO<=0) errorMostrarMsj.push("El porcentaje de ganancia no puede estar vacío");
    if(!UBICACION_PRO) errorMostrarMsj.push("La ubicación del producto no puede estar vacío");
    if(!LABORATORIO_PRO) errorMostrarMsj.push("Laboratorio que fabrica el producto no puede estar vacío");
    if(!APLICA_IVA_PRO) errorMostrarMsj.push("Marque si incluye o no IVA");
    if(!TIPO_PRO) errorMostrarMsj.push("Marque el tipo de producto");
    if(!VENTA_CON_RECETA) errorMostrarMsj.push("Marque si el producto se vende con receta médica o no");
    if(errorMostrarMsj.length){
        $('#lstErrores').empty();
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
          //ACTUALIZACION DE PRODUCTO
          var data = new FormData();
          var IMAGEN_PRO = document.getElementById("IMAGEN_PRO").files[0];    
          var settings = { headers: { 'content-type': 'multipart/form-data' } }
          var datos = {
            'ID_PRO' : ID_PRO,
            'NOMBRE_PRO' : NOMBRE_PRO,
            'DESCRIPCION_PRO' : DESCRIPCION_PRO,
            'ETIQUETAS_PRO' : ETIQUETAS_PRO,
            'ID_CAT' : CATEGORIA_PRO,
            'ID_PRS' : PRESENTACION_PRO,
            'ID_MAR' : MARCA_PRO,
            'EXISTENCIA_MAX_PRO' : EXISTENCIA_MAX_PRO,
            'EXISTENCIA_MIN_PRO' : EXISTENCIA_MIN_PRO,
            'GANANCIA_PRO' : GANANCIA_PRO,
            'UBICACION_PRO' : UBICACION_PRO,
            'APLICA_IVA_PRO' : APLICA_IVA_PRO,
            'TIPO_PRO' : TIPO_PRO,
            'VENTA_CON_RECETA' : VENTA_CON_RECETA,
            'LOTE_PRO' : LOTE_PRO,
            'LABORATORIO_PRO' : LABORATORIO_PRO
          }
          data.append('datos',JSON.stringify(datos));
          data.append('IMAGEN_PRO',IMAGEN_PRO);
          axios.post('/productos/actualizar',data,settings).then(function (response){
            tabla.ajax.reload();
            toastr.success('Actualizado correctamente!')
            })
            .catch(function (error) {
            console.log(error);
            toastr.error('No se ha podido actualizar el registro.', 'Error!')
            });
    }
}

/**
 * permite actualizar el estado de un producto de activo a inactivo
 * @param {int} idRegistro -identificador de producto
 */
function desactivar(idRegistro)
{
    const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
    })

    swalWithBootstrapButtons({
    title: 'Esta seguro de desactivar este producto?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aceptar!',
    cancelButtonText: 'Cancelar!',
    reverseButtons: true
    }).then((result) => {
    if (result.value) {
        axios.post('/productos/desactivar',{
        'ID_PRO':idRegistro
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
 * permite actualizar el estado de un producto de inactivo a activo
 * @param {int} idRegistro -identificador de producto
 */
function activar(idRegistro)
{
    axios.post('/productos/activar',{
    'ID_PRO':idRegistro
    }).then(function (response){
    tabla.ajax.reload();
    })
    .catch(function (error) {
        console.log(error);
    });
}

/**
 * permite llenar de datos los controles de listas desplegables
 * para categorías, presentaciones y marcas de productos
 */
function getDataDropDownList()
{
    var dropdown = $('#ddlCategoria');
    $.getJSON('/categorias/activas', function (data) {
        dropdown.append($('<option></option>').attr('value', '0').text('--Seleccione categoría--'));
        $.each(data.data, function (key, entry) {
          dropdown.append($('<option></option>').attr('value', entry.ID_CAT).text(entry.NOMBRE_CAT));
        })
      });

    var dropdown1 = $('#ddlPresentacion');
    $.getJSON('/presentaciones/activas', function (data) {
        dropdown1.append($('<option></option>').attr('value', '0').text('--Seleccione presentación--'));
        $.each(data.data, function (key, entry) {
          dropdown1.append($('<option></option>').attr('value', entry.ID_PRS).text(entry.NOMBRE_PRS));
        })
      });

      var dropdown2 = $('#ddlMarca');
      $.getJSON('/marcas/activas', function (data) {
        dropdown2.append($('<option></option>').attr('value', '0').text('--Seleccione marca--'));
          $.each(data.data, function (key, entry) {
            dropdown2.append($('<option></option>').attr('value', entry.ID_MAR).text(entry.NOMBRE_MAR));
          })
        });
}

/**
 * permite abrir la ventana modal para registro de ejemplar
 * @param {int} idRegistro -id de producto
 * @param {string} nombreRegistro  -nombre de producto
 */
function mostrarModalEjemplar(idRegistro,nombreRegistro)
{
    $('#idP').val(idRegistro);
    $('#lstErroresEjemplar').empty();
    $('#lblNombreProductoEjm').text(nombreRegistro);
}

/**
 * permite añadir ejemplar de producto
 */
function addEjemplar()
{
    var ID_PRO = $('#idP').val().trim();
    var COD_BARRAS_EJM = $('#COD_BARRAS_EJM').val().trim();
    var FECHA_CADUCIDAD_EJM = $('#FECHA_CADUCIDAD_EJM').val().trim();
    var errorMostrarMsj = [];
    if(!ID_PRO) errorMostrarMsj.push("Escoja un producto existente de la lista");
    if(!COD_BARRAS_EJM) errorMostrarMsj.push("Código de barras del ejemplar no puede estar vacío");
    if(!FECHA_CADUCIDAD_EJM) errorMostrarMsj.push("La fecha de caducidad no puede estar vacío");
    if(errorMostrarMsj.length){
        $('#lstErroresEjemplar').empty();
        var lista = '';
        for(var i=0;i<errorMostrarMsj.length;i++)
        {
            lista+='<li style="color: red !important">'+errorMostrarMsj[i]+'</li>';
        }
        $('#lstErroresEjemplar').append(lista);
    }
    else
        {
            $('#lstErroresEjemplar').empty();
            var datos = {
                'ID_PRO' : ID_PRO,
                'COD_BARRAS_EJM' : COD_BARRAS_EJM,
                'FECHA_CADUCIDAD_EJM' : FECHA_CADUCIDAD_EJM
              }
              axios.post('/ejemplares/registrar',datos).then(function (response){
                tabla.ajax.reload();
                $('#formAddEjemplar')[0].reset();
                toastr.success('Ejemplar agregado correctamente!')
                })
                .catch(function (error) {
                console.log(error);
                toastr.error('No se ha podido agregar el registro.', 'Error!')
                });
        }
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
 * @param {int} idRegistro -identificador de proveedor
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
            getRegistroById(idRegistro,2);
            $('#btnCancelarActualizar').show();
            $('#lstErrores').empty();
            break;
        }
    }
}

function detalles(idRegistro)
{
   getRegistroById(idRegistro,1);
}


//----------------------------------INICIALIZACIÓN DE MÉTODOS-------------------------
$('#btnCancelarActualizar').hide();
//tab activo por defecto
cambiarTab(0,0);

$('#btnGuardar').click(function(){
    var esEditar = $('#id').val().trim();
    if(!esEditar)
    registrar();
    else actualizar();
});
$('#btnCancelarActualizar').click(function(){
    limpiarDatos();
    $('#editar-tab').html('<i class="fa fa-plus"></i>'+' Nuevo');
    $(this).hide();
});
$('#btnAgregarEjemplar').click(function(){
    addEjemplar();
})
    
getDataDropDownList();

//configuracion inicial para tabla
var tabla =   $('#bootstrap-data-table').DataTable(
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
          
          var btnVerDetalles = '<button type="button" data-toggle="modal" data-target="#mediumModal" onclick="detalles('+ID_PRO+');" class="btn btn-info"><span class="fa fa-info-circle"></span> </button>';
          var btnAgregarEjemplar = "<button type='button' data-toggle='modal' data-target='#addEjemplarModal' onclick='mostrarModalEjemplar("+ID_PRO+","+NOMBRE_PRO+");' class='btn btn-success'><span class='fa fa-plus'></span> </button>";
          if(json.data[i].ESTADO_PRO>0)
           {
             btn = '<button type="button" onclick="desactivar('+ID_PRO+');" class="btn btn-danger"><span class="fa fa-trash"></span> Desactivar</button>';
             labelEstado =  '<span  class="badge badge-success">Activo</span>';
           }
           else {
             btn = '<button type="button" onclick="activar('+ID_PRO+')" class="btn btn-success"><span class="fa fa-check"></span> Activar</button>';
             labelEstado = '<span  class="badge badge-danger">Inactivo</span>';
           }          
           buttons = '<div class="btn-group btn-group-sm">'+
           '<button class="btn btn-primary" onclick="cambiarTab(1,'+ID_PRO+');"><span class="fa fa-pencil-square-o"></span> Editar</button>'+btnVerDetalles+btnAgregarEjemplar+btn+'</div>';
           return_data.push({
             'ID_PRO': json.data[i].ID_PRO,
             'NOMBRE_PRO'  : json.data[i].NOMBRE_PRO,
             'DESCRIPCION_PRO'  : json.data[i].DESCRIPCION_PRO,
             'ETIQUETAS_PRO'  : json.data[i].ETIQUETAS_PRO,
             'STOCK_PRO'  : json.data[i].STOCK_PRO,
             'ESTADO_PRO' : labelEstado,
             'ACCIONES_PRO' : buttons
           })
         }
         return return_data;
       }
     },
     "columns"    : [
       {'data': 'ID_PRO'},
       {'data': 'NOMBRE_PRO'},
       {'data': 'DESCRIPCION_PRO'},
       {'data': 'ETIQUETAS_PRO'},
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
$('.table').attr('style','width:100%');