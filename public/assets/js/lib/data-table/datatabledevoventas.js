/**
 * FUNCIONES PARA LA GESTIÓN DE devoluciones ventas
 */

/** datos factura */
function datosFac() {
    var parametros = {
        ID_USER: 1
    };
    axios.get('/ventas/cabecera', { params: parametros }).then(function (response) {
        //  console.log(response.data); 
       // $('#imglogofac').attr('src', response.data[0].LOGO_AGE);
       // $('#rucfac').html('R.U.C ' + response.data[0].RUC_AGE);
        //$('#numfac').html('001-00' + response.data[0].ID_AGE + '-00000###');
        //$('#direccionfac').html('Dirección: ' + response.data[0].DIRECCION_AGE);
        //$('#cajadesc').html(response.data[0].DESCRIPCION_CAJA);
        $('#idcaja').html(response.data[0].ID_CAJA);
        

    })
        .catch(function (error) {
            toastr.error('Error en el servidor: ' + error, 'Error!');
        });
}

datosFac();

/** funcion carga los datos de una factura, segun el numero de comprobante */
function cargarDatosFactura() {
    var num_venta = document.getElementById("NUM_FAC").value;
    getDatosFactura(num_venta);
   
}
/** obtiene los datos de la factura, tantos cabecera como detalles*/
function getDatosFactura(num_venta) {
    var resultado = 0;
    var parametros = {
        ID_VEN: num_venta
    };
    axios.get('/devoventas/datosfac', { params: parametros }).then(function (response) {
        // console.log();
        //console.log(response.data.detalles);
        if (response.data.miventa.length > 0) {
            crearFicha(response.data.miventa, response.data.detalles);
        } else {
            noexisteVenta();
        }


    })
        .catch(function (error) {
            console.log(error);
            toastr.error('Error en el servidor: ' + error, 'Error!');
        });
    return resultado;
}

function noexisteVenta() {
    document.getElementById("fichadev").innerHTML = '<div class="alert alert-danger">' +
        '<strong>Error!</strong> El código que ingreso no existe. Recuerde que debe ingresar el codigo de la factura, no el número de comprobante.</div>';
}
/**funcion qu carga los datos de la factura */
function crearFicha(datos, detalles) {
  
   
    var ficha = ' <h2>Factura: ' + datos[0].NUMERO_COM + '</h2>' +
        '<div class="col-md-6">' +
        '<div style="color: #000;">' +
        '<div id="dtcliente"><b>Cliente: </b> ' + datos[0].CLIENTE + '</div>' +
        '<div id="dtruc"><b>RUC/CI:</b> ' + datos[0].CED_RUC_CLI + '</div>' +
        '<b>Fecha Ven:</b>' + datos[0].FECHA_VEN + '<br>' +
        '<b>Usuario Ven:</b>' + datos[0].ALIAS_USU + '  <br>' +
        '</div>' +
        '</div>' +
        '<div class="col-md-6">' +
        ' <p style="color: #000;">' +
        '<b>Caja:</b>' + datos[0].DESCRIPCION_CAJA + ' <br>' +
        '<b>Subtotal:</b>' + (datos[0].SUBT_IVA * 1 + datos[0].SUBT_CERO * 1) + '<br>' +
        '<b>IVA:</b>' + datos[0].IVA_VEN + '<br>' +
        '<b>Total:</b>' + datos[0].TOTAL_VEN + '<br>' +
        '</p>' +
        '</div>';

    var tabladetails = ' <table class="table table-sm table-bordered">' +
        '<thead style="color:#fff;background:#546e7a">' +
        '<tr>' +
        '<th> <input type="checkbox" id="maincheck" onchange="toggle(this)">* </th>' +
        '<th style="display:none;">Id_det_vent </th>' +
        '<th style="display:none;">Id_producto </th>' +
        '<th>Descripción </th>' +
        '<th>P.Venta </th>' +
        '<th>Cantidad Ven </th>' +
        '<th>A. IVA </th>' +
        '<th>Cantidad Devolución </th>' +
        '<th>Observación </th>' +
        '<th>Precio Neto </th>' +
        '<th>Subtotal </th>' +
        '</tr>' +
        '</thead>' +
        '<tbody id="tablaDetalles">' +
        '</tbody>' +
        '</table>';

    var tablaTotales = '';
    document.getElementById("fichadev").innerHTML = ficha + tabladetails;

    addRow(detalles);
    desactivarControles();
    //var subtotal=(datos[0].SUBT_IVA * 1);
   // calPorcentajeIva(subtotal,datos[0].IVA_VEN);
}
var iva=0;

/**funcion obtener el valor del iva actual */
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
           //document.getElementById("etiva").innerHTML="Tarifa "+toFixedTrunc( iva*100,0)+"%";
        },
        beforeSend: function () { },
        error: function (objXMLHttpRequest) { }
    });
}
getSetting('iva');
function addRow(datos) {
    // var arraycodigos = new Array();
    // var existe=0;
    //var cont=0;
    var table = document.getElementById('tablaDetalles');
    // console.log("agregando fila "+datos.data[0].DESCRIPCION_PRO);
    // var table = document.getElementById("table_detalles");
    for (var j = 0; j < datos.length; j++) {



        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(0);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:

        for (var i = 0; i < 11; i++) {
            var cell = row.insertCell(i);

            switch (i) {
                case 0:
                    cell.innerHTML = '<div class="form-check">' +
                        '<input type="checkbox" name="sld" class="form-check-input" onchange="activarfila(' + datos[j].ID_DET_VEN + ',this);" value="">' +
                        '</div>';
                    break;
                case 1:
                    cell.style = "display:none;";
                    cell.innerHTML = datos[j].ID_DET_VEN;
                    break;
                case 2:
                    cell.style = "display:none;";
                    cell.innerHTML = datos[j].ID_PRO;

                    break;

                case 3:
                    cell.innerHTML = datos[j].DESCRIPCION_PRO;
                    break;

                case 4:
                    cell.innerHTML = datos[j].PRECIO_VEN;
                    // cell.innerHTML=toFixedTrunc(1,2);
                    // if(datos.data[0].ID_PRS==1 || datos.data[0].ID_PRS==3 || datos.data[0].ID_PRS==4  || datos.data[0].ID_PRS==5 || datos.data[0].ID_PRS==6)
                    // cell.innerHTML='<input class="form-control form-control-sm" required type="number" placeholder="" min="1.00" max="'+datos.data[0].STOCK_PRO+'" step="1.00" value="1.00" onchange="recalcularFila('+datos.data[0].ID_PRO+');"></input>';
                    //  else
                    //cell.name="simpecant"; 
                    //  cell.innerHTML=1;
                    break;

                case 5:

                    cell.innerHTML = datos[j].CANTIDAD_PRO;
                    break;
                case 6:
                    if (datos[j].APLICA_IVA_PRO == 1)
                        cell.innerHTML = '<span class="badge badge-success">Si</span>';
                    else
                        cell.innerHTML = '<span class="badge badge-danger">No</span>';
                    break;
                case 7:
                    //cell.style="display:none;";
                    cell.innerHTML = '<input class="form-control form-control-sm" id="cantidad_dev" name="cantidad_dev" required type="number" placeholder="" min="1.00" max="' + datos[j].CANTIDAD_PRO + '" step="1.00" value="1.00" onchange="calcularTotales();" readonly></input>';;
                    break;
                case 8:
                    //cell.style="display:none;";
                    cell.innerHTML = '<input class="form-control form-control-sm" id="observacion_detail" name="observacion_detail" required type="Text" placeholder="Observación" max="120" readonly></input>';;
                    break;
                case 9:
                    var devolucion = (datos[j].SUBTOTAL * 1 - datos[j].AHORRO * 1) / datos[j].CANTIDAD_PRO * 1;
                    cell.innerHTML = toFixedTrunc(devolucion,2);
                    break;

                case 10:
                    var devolucion = (datos[j].SUBTOTAL * 1 - datos[j].AHORRO * 1) / datos[j].CANTIDAD_PRO * 1;
                    cell.innerHTML = toFixedTrunc(devolucion,2);
                    break;
                default:
                    break;
            }

        }
       // calcularTotales();
    }
    // var cell1 = row.insertCell(0);
    // var cell2 = row.insertCell(1);
    //recalculartotales 

    //totalArticulosVendidos();
    // Add some text to the new cells:
    // cell1.innerHTML = "NEW CELL1";
    // cell2.innerHTML = "NEW CELL2";
}
/** funcion que desabilita los inputs una vez realizada la consulta*/
function desactivarControles() {
    document.getElementById("NUM_FAC").readOnly = true;
    document.getElementById("btnbuscarventa").disabled = true;
    // document.getElementById("cantidad_dev").readOnly=true;
    //document.getElementById("observacion_detail").readOnly=true;
    $('#btnCancelarActualizar').show();
}
/** funcion para seleccionar todos los detalles de una factura */
/** funcion seleciona todos los checks productos */
function toggle(source) {
    var table = document.getElementById('tablaDetalles');
    checkboxes = document.getElementsByName('sld');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = source.checked;
        if (source.checked) {
            table.rows[i].cells[10].style="background-color: #3eb34f";
            table.rows[i].cells[7].getElementsByTagName("input")[0].readOnly = false;
            table.rows[i].cells[8].getElementsByTagName("input")[0].readOnly = false;
            calcularTotales();

        } else {
            table.rows[i].cells[10].style="background-color: #fff";
            table.rows[i].cells[7].getElementsByTagName("input")[0].readOnly = true;
            table.rows[i].cells[8].getElementsByTagName("input")[0].readOnly = true;
           calcularTotales();

        }
    }
    //var num=  productosSeleccionados().length;
    //document.getElementById("numselected").innerHTML=num;
}
/** función para truncar los valores */
function toFixedTrunc(value, n) {
    const v = value.toString().split('.');
    if (n <= 0) return v[0];
    let f = v[1] || '';
    if (f.length > n) return `${v[0]}.${f.substr(0,n)}`;
    while (f.length < n) f += '0';
    return `${v[0]}.${f}`
  }
/**funcion activar fila, en primera instacia debe elegir */
function activarfila(id_detalle, source) {
    //console.log(source);
    // console.log(id_detalle);

    var table = document.getElementById('tablaDetalles');
    if (source.checked) {
        // alert(source.checked);
        for (var i = 0; i < table.rows.length; i++) {
            var id_val = table.rows[i].cells[1].innerHTML;
            // alert(id_val);
            if (id_val == id_detalle) {
                // alert('hallo el valor');background-color: #3eb34f;
                table.rows[i].cells[10].style="background-color: #3eb34f";
                table.rows[i].cells[7].getElementsByTagName("input")[0].readOnly = false;
                table.rows[i].cells[8].getElementsByTagName("input")[0].readOnly = false;
                calcularTotales();
                break;
            }

        }
    } else {
        for (var i = 0; i < table.rows.length; i++) {
            var id_val = table.rows[i].cells[1].innerHTML;
            //  alert('valor buscado:'+id_val);
            if (id_val == id_detalle) {
                //   alert('hallo el valor');
                table.rows[i].cells[10].style="background-color: #fff";
                table.rows[i].cells[7].getElementsByTagName("input")[0].readOnly = true;
                table.rows[i].cells[8].getElementsByTagName("input")[0].readOnly = true;
                calcularTotales();
                break;
            }

        }
    }
}
function validarDatos() {
    var error = 0;
    var errorMostrarMsj = [];
    if (!$('#NUM_FAC').val().trim()) errorMostrarMsj.push("El numero de comprobante no puede estar vacío");
    if (!$('#MOTIVO').val().trim()) errorMostrarMsj.push("El motivo de la devolución no puede estar vacío");
    if(parseFloat($('#total_dev').html())==0) errorMostrarMsj.push("Debe seleccionar al menos un producto para realizar una devolución.");
    if (errorMostrarMsj.length) {
        $('#lstErrores').empty();
        error = 1;
        var lista = '';
        for (var i = 0; i < errorMostrarMsj.length; i++) {
            lista += '<li style="color: red !important">' + errorMostrarMsj[i] + '</li>';
        }
        $('#lstErrores').append(lista);
    }
    else {
        $('#lstErrores').empty();
    }
    return error;
}

/**
 * permite limpiar las entradas de texto
 */
function limpiarDatos() {
    $('#id').val('');
    //$('#form')[0].reset();
    $('#lstErrores').empty();
    
    document.getElementById("NUM_FAC").readOnly = false;
    document.getElementById("MOTIVO").value = "";
    document.getElementById("btnbuscarventa").disabled = false;
    document.getElementById("fichadev").innerHTML = "";
    document.getElementById("iva_dev").innerHTML = "0.00";
    document.getElementById("total_dev").innerHTML = "0.00";
    document.getElementById("tariva").innerHTML = "0.00";
    document.getElementById("tarcero").innerHTML = "0.00";
    document.getElementById("ridenc").innerHTML = "";
    $('#btnImprimirDev').hide();
    $('#btnFinalDev').hide();
    $('#btnGuardarDev').show();


}
/** funcion que calcula el total a devolver aplicando los descuentos y si tiene iva o no*/

function calcularTotales() {
    var table = document.getElementById('tablaDetalles');
    
    var subtotaliva = 0; var subtotalcero = 0;
    for (var i = 0; i < table.rows.length; i++) {
        //const element = array[i];
        var mycheck = table.rows[i].cells[0].getElementsByTagName("input")[0];
        //console.log("recorriendo los checks"+mycheck);
        if (mycheck.checked) {
          //  console.log("entro al check true");
            var aplicaiva = table.rows[i].cells[6].getElementsByTagName("span")[0].innerHTML;
            var cantidad_dev = table.rows[i].cells[7].getElementsByTagName("input")[0].value;
            var precioneto=table.rows[i].cells[9].innerHTML;
            
            if (aplicaiva == "Si") {
                subtotaliva +=  cantidad_dev * precioneto;
                table.rows[i].cells[10].innerHTML =toFixedTrunc(cantidad_dev * precioneto,2);
            }
            else {
                subtotalcero += cantidad_dev * precioneto;
                table.rows[i].cells[10].innerHTML =toFixedTrunc(cantidad_dev * precioneto,2);
            }
           /* document.getElementById("tarcero").innerHTML = toFixedTrunc(subtotalcero,2);
            document.getElementById("tariva").innerHTML = toFixedTrunc(subtotaliva,2);
            document.getElementById("iva_dev").innerHTML = toFixedTrunc(subtotaliva * 0.12,2);
            document.getElementById("total_dev").innerHTML =toFixedTrunc( subtotaliva * 1.12 + subtotalcero * 1,2);
            */

           document.getElementById("tarcero").innerHTML = toFixedTrunc(subtotalcero,2);
           document.getElementById("tariva").innerHTML = toFixedTrunc(subtotaliva,2);
           document.getElementById("iva_dev").innerHTML = toFixedTrunc(subtotaliva * iva,2);
           document.getElementById("total_dev").innerHTML =toFixedTrunc( subtotaliva * (iva+1) + subtotalcero * 1,2);
        } else {
           // console.log("entro al check false");
           document.getElementById("tarcero").innerHTML = toFixedTrunc(subtotalcero,2);
           document.getElementById("tariva").innerHTML = toFixedTrunc(subtotaliva,2);
            document.getElementById("iva_dev").innerHTML = toFixedTrunc(subtotaliva * iva,2);
            document.getElementById("total_dev").innerHTML =toFixedTrunc(subtotaliva * (iva+1) + subtotalcero* 1,2);
        }

    }
}


$('#btnImprimirDev').hide();
$('#btnFinalDev').hide();

/**
 * permite registrar una devolucion
 */
function registrar() {
    if (validarDatos()) {
        return;
    }
    var url='devoventas/registrar';
    var data = new FormData();
       
        data.append('detalles',JSON.stringify(productosDevolver()));
        data.append('ID_CAJA', $('#idcaja').html());
        data.append('ID_VEN',$('#NUM_FAC').val());
        data.append('TOTAL_DEV',$('#total_dev').html());
        data.append('IVA_DEV',$('#iva_dev').html());
        data.append('SUBT_IVA',$('#tariva').html());
        data.append('SUBT_CERO',$('#tarcero').html());
        data.append('OBSERVACION_DEV',$('#MOTIVO').val());
        
        //console.log("datos para enviar al server",data);
        //['result'=>$success,'cabfarma'=>$cabecera,'ncvalores'=>$valores,'ncdetalles'=>$detalles
   axios.post(url,data).then(function (response) {
       console.log(response.data.result);
       console.log(response.data.cabfarma);
       console.log(response.data.ncvalores);
       console.log(response.data.ncdetalles);
       if(response.data.result>0){
        toastr.success('Se realizo una devolucion de forma correcta!. Recuerde que solo se puede realizar una devolución por factura.');
        tabla.ajax.reload();
        bloqueartodo();
        crearNotaCredito(response.data.cabfarma,response.data.ncvalores,response.data.ncdetalles);
        vistaPreviaImprimir();
       }else{
        toastr.error('No se pudo realizar la devolución!. Comuniquese con el administrador del sistema',"Error");
       }
        
        //limpiarDatos();
        
    })
        .catch(function (error) {
            console.log(error);
            toastr.error('No se ha podido guardar el registro.', 'Error!')
        });
}

/** funcion que bloquea todos los controles y aprecen los botones elementales para continuar trabajando */
function bloqueartodo(){
    var table = document.getElementById('tablaDetalles');
    checkboxes = document.getElementsByName('sld');
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].disabled =true;
        var inputcant=table.rows[i].cells[7].getElementsByTagName("input")[0];
        inputcant.readOnly=true;
        var inputobser=table.rows[i].cells[8].getElementsByTagName("input")[0];
        inputobser.readOnly=true;
    }
    $('#btnGuardarDev').hide();
    $('#btnCancelarActualizar').hide();
    $('#btnImprimirDev').show();
    $('#btnFinalDev').show();
    $('#lstErrores').empty();
    document.getElementById("maincheck").disabled=true;
}

/** funcion para crear la Nota de credito  */
function crearNotaCredito(cabecera,midev,misdetalles){
    //ID_AGE, NOMBRE_AGE, DIRECCION_AGE, RUC_AGE, LOGO_AGE, DESCRIPCION_CAJA
    //ID_COM, TIPO_DOC, ID_VEN, COM_ID_COM, NUMERO_COM, NUM_FAC, FECHA_COM, OBSERVACION_COMP
    //var conten=document.getElementById("ridenc");
    //var numcomprobante=document.getElementById("numfac").innerHTML;
   // var nuevocomp=numcomprobante.replace('###',midev[0].NUMERO_COM);

    var contenido= '<div class="card" style="width: 20rem;">'+
    '<div class="card-body">'+          
    '<div><center> <b> FARMACIA COMUNITARIA PUYO </b></center> </div>'+    
        ' <center><div>'+ cabecera[0].RUC_AGE+' </div>  </center>'+
        ' <center><div>'+ cabecera[0].DIRECCION_AGE+' </div>  </center>'+
          '<div id="numfac">Nota de Crédito: 0000'+midev[0].NUMERO_COM+'</div>'+ 
          '<div id="numfac">Factura Modificada: 000'+midev[0].NUM_FAC+'</div>'+ 
          '<div>Fecha: '+midev[0].FECHA_COM+'   Codigo_NC: '+midev[0].ID_COM+'</div>'+
          '<div>'+document.getElementById("dtruc").innerHTML+'</div>'+
          '<div> '+document.getElementById("dtcliente").innerHTML+'</div>'+
         '<div>Motivo de Modificación:'+midev[0].OBSERVACION_DEV+'</div>'+  
          '<table class="table table-sm">'+
            '<tr style="font-size: smaller;">'+
                '<th>Descripción</th>'+
                '<th>Cantidad</th>'+
                '<th>Pre.Uni</th>'+
                '<th>Pre.Total</th>'+
            '</tr> <tbody>';
            //ID_DET_DEV_VEN, DESCRIPCION_PRO, ID_DEV_VEN, CANTIDAD, PRECIO_VEN, SUBTOTAL, PRODUCTO, OBSERVACION_DEV, ID_DET_VEN
            for (let i = 0; i < misdetalles.length; i++) {
               var fila= '<tr style="font-size: smaller;">'+
                '<td>'+misdetalles[i].DESCRIPCION_PRO+'</td>'+
                '<td>'+misdetalles[i].CANTIDAD+'</td>'+
                '<td>'+misdetalles[i].PRECIO_VEN+'</td>'+
                '<td>'+misdetalles[i].SUBTOTAL+'</td>'+
            '</tr>';
            contenido+=fila;
                
            }
            
            contenido+='</tbody>'+
                       '</table>'+
        '<table class="table table-sm" style="font-size: smaller;">'+
                '<tr>'+
                   
                    '<td class="datosv">Tarifa 0%</td>'+
                    '<td class="datosv">'+document.getElementById("tarcero").innerHTML+'</td>'+
                '</tr>'+
                 '<tr>'+
                    
                    '<td class="datosv">Tarifa iva </td>'+
                    '<td class="datosv">'+document.getElementById("tariva").innerHTML+'</td>'+
                '</tr>'+
                '<tr>'+
                    
                    '<td class="datosv">IVA</td>'+
                   ' <td class="datosv">'+document.getElementById("iva_dev").innerHTML+'</td>'+
                 '</tr>'+
                ' <tr>'+
                     
                    '<th>TOTAL</th>'+
                    '<th>'+document.getElementById("total_dev").innerHTML+'</th>'+
                '</tr>'+
       ' </table>'+
       ' <hr>'+
        '<div class="datosv" style="font-size: smaller;">Atendido por:'+ document.getElementById("h6UserName").innerHTML+' </div>'+
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
/**funcion que selecciona los productos que todos las devoluciones */

function productosDevolver(){
    try {
        var arrayproductos = new Array();
        
        var cont=0;
        var table = document.getElementById('tablaDetalles');
       
          
        for(var i=0, n=table.rows.length;i<n ;i++) {
            var item={};
            var mycheck=table.rows[i].cells[0].getElementsByTagName("input")[0];

            if(mycheck.checked){
                //var cantidad=0;
                item.ID_DET_VEN= table.rows[i].cells[1].innerHTML
                var id_prod= table.rows[i].cells[2].innerHTML;
                item.ID_PRO=id_prod;
                item.CANTIDAD= table.rows[i].cells[7].getElementsByTagName("input")[0].value;
                item.OBSERV= table.rows[i].cells[8].getElementsByTagName("input")[0].value;
                item.PRECIO_VENTA= table.rows[i].cells[9].innerHTML;
                item.SUBTOTAL= table.rows[i].cells[10].innerHTML;
                arrayproductos.push(item);
            }
           
                  
          }
    } catch (error) {
        console.log(error);
    }
    console.log(arrayproductos);
    return arrayproductos; 
    
}

/***funcion que limpia todo y lo pone listo para iniciar nuevamente */
function finalizar(){
    limpiarDatos();
}
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
                //cambiarTabActivo('#editar','');
                break;
            }
        case 1: //tab nuevo/editar
            {
                cambiarTabActivo('#editar', 'active show');
                cambiarTabActivo('#listado', '');
                $('#editar-tab').html('<i class="fa fa-edit"></i>' + ' Editar');
                $('#lstErrores').empty();
                //if(!$('#id').val())getModulosActivosNuevo();

                break;
            }
    }
}




//----------------------------------INICIALIZACIÓN DE MÉTODOS-------------------------
//detalles(18);
$('#btnCancelarActualizar').hide();
//tab activo por defecto
cambiarTab(0, 0);
//getModulosActivosNuevo();
$('#btnGuardarDev').click(function () {
    registrar();

});

$('#btnCancelarActualizar').click(function () {
    limpiarDatos();
    //$('#editar-tab').html('<i class="fa fa-plus"></i>'+' Nuevo');
    $('#btnCancelarActualizar').hide();


});

//configuracion inicial para tabla
var tabla = $('#table_devoventas').DataTable(
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
                    //IVA_DEV, SUBT_IVA, SUBT_CERO, OBSERVACION_DEV, FECHA_DEV, ID_VEN, FECHA_VEN, NUMERO_COM, TIPO_DOC
                    return_data.push({
                        'ID_DEV_VEN': json.data[i].ID_DEV_VEN,
                        'NUMERO_COM': json.data[i].NUMERO_COM,
                        'FECHA_FAC': json.data[i].FECHA_FAC,
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
            { 'data': 'FECHA_FAC' },
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


    function llenarDetallesDev(id){
        // alert(id);
        // $('#tabladescuentos_productos').html='';
        
          $('#tablaDevVentas').DataTable(
             { 
                 destroy: true,    
                 
                   'ajax': {
                    "type"   : "GET",
                    "data": { 
                     "ID_DEV_VEN": id
                     },
                     "url"    : "devoventas/detalles",
                     "dataSrc": function (json) {
                      var return_data = new Array();
                      // alert(json.data);
                      var labelIva= '';
                      for(var i=0;i< json.data.length; i++){

                        if (json.data[i].APLICA_IVA_PRO>0) {
                            labelIva='<span  class="badge badge-success">Si</span>';
                        }else{
                            labelIva='<span  class="badge badge-danger">No</span>';

                        }
                       // "Id dev.","Descripción","Cantidad dev","P. unitario","A. Iva","Subtotal"
                       // ID_DET_DEV_VEN, PRODUCTO, CANTIDAD, PRECIO_VEN, SUBTOTAL, DESCRIPCION_PRO, APLICA_IVA_PRO, OBS
                         return_data.push({
                          'ID_DET_DEV_VEN': json.data[i].ID_DET_DEV_VEN,
                          'DESCRIPCION_PRO'  : json.data[i].DESCRIPCION_PRO,
                          'CANTIDAD'  : json.data[i].CANTIDAD,
                          'PRECIO_VEN'  : json.data[i].PRECIO_VEN,
                          'APLICA_IVA_PRO'  : labelIva,
                          'SUBTOTAL': json.data[i].SUBTOTAL,
                          //'ESTADO_PRO' : labelEstado,
                          //'ACCIONES_PRO' : btnVerDetalles,
                          //'SELECCIONAR': checkbox
                        })
                      }
                      return return_data;
                    }
                  },
                  "columns"    : [
                   // {'data':'SELECCIONAR'},
                    {'data': 'ID_DET_DEV_VEN'},
                    {'data': 'DESCRIPCION_PRO'},
                    {'data': 'CANTIDAD' },
                    {'data': 'PRECIO_VEN'},
                    {'data': 'APLICA_IVA_PRO'},
                    {'data': 'SUBTOTAL'},
                    
                   
                    //{'data': 'ACCIONES_PRO'}
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
   function detalles(id){
    document.getElementById("mediumModalLabel").innerHTML = "Detalles de la devolución con ID: ["+id+"]"; 
    llenarDetallesDev(id);
   }
$('.table').attr('style', 'width:100%');