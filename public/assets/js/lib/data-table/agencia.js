/**
 * FUNCIONES PARA LEER DATOS DE AGENCIA QUE VAN EN LA CABECERA DE DOCUMENTOS
 */
function getDatosAgencia()
{
    var url = '/agencias';
    axios.get(url).then(function (response){
    datos = response.data;
    //console.log(response.data.data);
    var longitud = Object.keys(response.data.data).length;
    if(longitud>0)
    {
        $('.imagen').attr('src',response.data.data[0].LOGO_AGE);
        $('.imagen').attr('alt',response.data.data[0].NOMBRE_AGE);

        $('.nombre').html(response.data.data[0].NOMBRE_AGE);
        $('.ruc').html(response.data.data[0].RUC_AGE); 
        $('.dir').html(response.data.data[0].DIRECCION_AGE); 
        $('.telefono').html(response.data.data[0].TELEFONO_AGE); 
        $('.correo').html(response.data.data[0].CORREO_AGE); 
     
        
    }
    })
    .catch(function (error) {
        console.log(error);
    });
}
getDatosAgencia();
