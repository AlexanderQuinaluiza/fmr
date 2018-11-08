/** preview img, para proceder a subirla */
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgup')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
$("#LOGO_AGE").change(function() {
    readURL(this);
  });

/**
 * FUNCIONES PARA LA GESTIÓN DE ROLES
 */

 /**
  *permite validar los datos de entrada para rol 
  * @param {int} opcion -1=registrar, 2=actualizar
  */
 var error_ruc=0;
 function validarDatos(opcion)
 {
     var error = 0;
     var errorMostrarMsj = [];
     if(!$('#RUC_AGE').val().trim()) errorMostrarMsj.push("El Ruc no puede estar vacío");
     if(error_ruc==0) errorMostrarMsj.push("El Ruc no es invalido");
     if(!$('#NOMBRE_AGE').val().trim()) errorMostrarMsj.push("El nombre de la agencia no puede estar vacío");
     if(!$('#DIRECCION_AGE').val().trim()) errorMostrarMsj.push("La dirección no puede estar vacío");
     if(!$('#TELEFONO_AGE').val().trim()) errorMostrarMsj.push("El teléfono de la agencia no puede estar vacío");
     if(!$('#CIUDAD_AGE').val().trim()) errorMostrarMsj.push("El nombre de la categoria no puede estar vacío");
     if(!$('#CORREO_AGE').val().trim()) errorMostrarMsj.push("El correo email no puede estar vacío");
     //if(!$('#lOGO_AGE').val().trim()) errorMostrarMsj.push("El  logo no puede estar vacío");

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
    $('#formagencia')[0].reset();
    $('#id').val('');
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
     var data = new FormData();
          var IMAGEN_PRO = document.getElementById("LOGO_AGE").files[0];    
          var settings = { headers: { 'content-type': 'multipart/form-data' } }
          var datos = {
           'NOMBRE_AGE': $('#NOMBRE_AGE').val().trim(),
           'DIRECCION_AGE': $('#DIRECCION_AGE').val().trim(),
           'RUC_AGE': $('#RUC_AGE').val().trim(),
           'CIUDAD_AGE': $('#CIUDAD_AGE').val().trim(),
           'TELEFONO_AGE': $('#TELEFONO_AGE').val().trim(),
           'CORREO_AGE': $('#CORREO_AGE').val().trim(),
          }
          data.append('datos',JSON.stringify(datos));
          data.append('LOGO_AGE',IMAGEN_PRO);
          console.log(data);
     //ID_AGE, NOMBRE_AGE, DIRECCION_AGE, RUC_AGE, CIUDAD_AGE, TELEFONO_AGE, CORREO_AGE, lOGO_AGE, ESTADO_AGE
      axios.post('/agencias/registrar',data,settings).then(function (response){
     //tabla.ajax.reload();
      listar();
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
    var data = new FormData();
    var IMAGEN_PRO = document.getElementById("LOGO_AGE").files[0];    
    var settings = { headers: { 'content-type': 'multipart/form-data' } }
    var datos = {
     'ID_AGE': $('#id').val().trim(),
     'NOMBRE_AGE': $('#NOMBRE_AGE').val().trim(),
     'DIRECCION_AGE': $('#DIRECCION_AGE').val().trim(),
     'RUC_AGE': $('#RUC_AGE').val().trim(),
     'CIUDAD_AGE': $('#CIUDAD_AGE').val().trim(),
     'TELEFONO_AGE': $('#TELEFONO_AGE').val().trim(),
     'CORREO_AGE': $('#CORREO_AGE').val().trim(),
    }
    data.append('datos',JSON.stringify(datos));
    data.append('LOGO_AGE',IMAGEN_PRO);
    console.log(data);
//ID_AGE, NOMBRE_AGE, DIRECCION_AGE, RUC_AGE, CIUDAD_AGE, TELEFONO_AGE, CORREO_AGE, lOGO_AGE, ESTADO_AGE
axios.post('/agencias/actualizar',data,settings).then(function (response){
//tabla.ajax.reload();
listar();
limpiarDatos();
toastr.success('Actualizado correctamente!')
})
.catch(function (error) {
//console.log(error);
toastr.error('No se ha podido guardar los cambios.', 'Error!')
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
     title: 'Esta seguro de desactivar esta Agencia?',
     type: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Aceptar!',
     cancelButtonText: 'Cancelar!',
     reverseButtons: true
     }).then((result) => {
     if (result.value) {
         axios.post('/agencias/desactivar',{
         'ID_AGE':idRegistro
         }).then(function (response){
           listar();
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
     axios.post('/agencias/activar',{
     'ID_AGE':idRegistro
     }).then(function (response){
     listar();
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
     var url = 'agencias/byid';
     axios.get(url, { params: { ID_AGE: idRegistro } }).then(function (response){
         $('#id').val(response.data.ID_AGE);
         $('#NOMBRE_AGE').val(response.data.NOMBRE_AGE);
         $('#DIRECCION_AGE').val(response.data.DIRECCION_AGE);
         $('#RUC_AGE').val(response.data.RUC_AGE);
         $('#CIUDAD_AGE').val(response.data.CIUDAD_AGE);
         $('#TELEFONO_AGE').val(response.data.TELEFONO_AGE);
         $('#CORREO_AGE').val(response.data.CORREO_AGE);
         $('#imgup').attr('src',response.data.LOGO_AGE);
        // $('#').val(response.data.);

        // $('#DESCRIPCION_ROL').val(response.data.DESCRIPCION_ROL);
         $('#btnCancelarActualizar').show();      
         //ID_AGE, NOMBRE_AGE, DIRECCION_AGE, RUC_AGE, CIUDAD_AGE, TELEFONO_AGE, CORREO_AGE, LOGO_AGE, ESTADO_AGE                                                                                                                     
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

 function listar(){
     var url='agencias';
     var divage='';
     $('#listaAge').html(divage);  
    axios.get(url).then(function (response){
       // tabla.ajax.reload();
       var result = response.data;
       //console.log(result.data);
      /* ID_AGE, , , , , , , , ESTADO_AGE*/
       for(var i=0;i< result.data.length; i++){
         /** */ 
         divage='<div class="card col-sm-5" style="padding:0; margin:5px;">' +
            '<img class="card-img-top" src='+result.data[i].LOGO_AGE+' alt="Card image cap">'+
                          '<div class="card-body">'+ 
                      '<h5 class="card-title" style="display:none;"> '+result.data[i].ID_AGE+' </h5>'+
                       '          <h5 class="card-title">'+result.data[i].NOMBRE_AGE+'</h5>'+
                   '<h6 class="card-subtitle mb-2 text-muted">'+result.data[i].CIUDAD_AGE+' </h6>'+
                  '<p class="card-text">'+result.data[i].DIRECCION_AGE+'</p>'+
                  '<ul class="list-group list-group-flush">'+
           '<li class="list-group-item"><b>RUC: </b>'+result.data[i].RUC_AGE+'</li>'+
            '<li class="list-group-item"><b>Email: </b>'+result.data[i].CORREO_AGE+'</li>'+
            '<li class="list-group-item"><b>Teléfono: </b>'+result.data[i].TELEFONO_AGE+'</li>'+
            '<li class="list-group-item"><b>Estado: </b>';
                  if(result.data[i].ESTADO_AGE>0){
                divage+=  '<span class="badge badge-success">Activado</span>'+
                 
                
                '</li>'+
                '</ul>';
            }else{
               divage+='<span class="badge badge-danger">Desactivado</span> '+
               '</li>'+
               '</ul>';
            }
            
            if(result.data[i].ESTADO_AGE>0){
                divage+='<div class="card-body">'+
                '<button class="bnt btn-primary btn-sm" onclick="cambiarTab(1,'+result.data[i].ID_AGE+');"><span class="fa fa-pencil-square-o"></span>Editar</button>'+
                '<button class="bnt btn-danger btn-sm" onclick="desactivar('+result.data[i].ID_AGE+');"><span class="fa fa-trash"></span>Desactivar</button>'+
                
              
                '</div>'+
                 '</div>'+
               '</div>';

            }else{
                divage+='<div class="card-body">'+
                '<button class="bnt btn-primary btn-sm" onclick="cambiarTab(1,'+result.data[i].ID_AGE+');"><span class="fa fa-pencil-square-o"></span>Editar</button>'+
                '<button class="bnt btn-success btn-sm" onclick="activar('+result.data[i].ID_AGE+');"><span class="fa fa-check"></span>Activar</button>'+
              
                '</div>'+
                 '</div>'+
               '</div>';
            }
             

        // console.log(divage);
        $('#listaAge').append(divage);  
        
       }
        })
        .catch(function (error) {
            console.log(error);
        });
 }
 
 listar();
 //configuracion inicial para tabla
 /*
 var tabla =   $('#table_categorias').DataTable(
 {
       'ajax'       : {
        "type"   : "GET",
        "url"    : "categorias",
        "dataSrc": function (json) {
          var return_data = new Array();
           var buttons = '';       
           var btn = '';
           var labelEstado = '';
          for(var i=0;i< json.data.length; i++){
           var ID_CAT = json.data[i].ID_CAT;
            if(json.data[i].ESTADO_CAT>0)
            {
              btn = '<button type="button" onclick="desactivar('+ID_CAT+');" class="btn btn-danger"><span class="fa fa-trash"></span> Desactivar</button>';
              labelEstado =  '<span  class="badge badge-success">Activo</span>';
            }
            else {
             //var saludo = new Saludar();
              btn = '<button type="button" onclick="activar('+ID_CAT+')" class="btn btn-success"><span class="fa fa-check"></span> Activar</button>';
              labelEstado = '<span  class="badge badge-danger">Inactivo</span>';
            }          
            buttons = '<div class="btn-group btn-group-sm">'+
            '<button class="btn btn-primary" onclick="cambiarTab(1,'+ID_CAT+');"><span class="fa fa-pencil-square-o"></span> Editar</button>'+btn+'</div>';
            //console.log("jaja");
            return_data.push({
              'ID_CAT': json.data[i].ID_CAT,
              'NOMBRE_CAT'  : json.data[i].NOMBRE_CAT,
              //'DESCRIPCION_ROL'  : json.data[i].DESCRIPCION_ROL,
              'ESTADO_CAT' : labelEstado,
              'ACCIONES' : buttons
            })
          }
          return return_data;
        }
      },
      "columns"    : [
        {'data': 'ID_CAT'},
        {'data': 'NOMBRE_CAT'},
        //{'data': 'DESCRIPCION_ROL'},
        {'data': 'ESTADO_CAT'},
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
 */

function validarcedula(){
    var i;
    var cedula;
    var acumulado;
    cedula=document.formagencia.RUC_AGE.value;
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
  
document.formagencia.RUC_AGE.focus();
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
 