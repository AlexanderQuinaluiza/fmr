<!DOCTYPE html>
<html lang="es">
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title> {{ $agencias[0]->NOMBRE_AGE}} - Pedido {{$pedido->ID_PED }}</title>
    <meta name="description">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
  
  <script src="assets/js/lib/data-table/agencia.js"></script>
  <script src="js/app.js"></script>
  

<style>
table.blueTable {
  border: 1px solid #1C6EA4;
  background-color: #EEEEEE;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
table.blueTable td, table.blueTable th {
  border: 1px solid #AAAAAA;
  padding: 3px 2px;
}
table.blueTable tbody td {
  font-size: 13px;
}
table.blueTable tr:nth-child(even) {
  background: white;
}
     </style> 
</head>

<body>
<div class="container">
  <div class="row" id="divCabecera" >

    <div class="col-md-5">
        <div class="row text-right">
            <img id="LOGO_AGE" src="{{ $agencias[0]->LOGO_AGE }}" class="imagen" />
        </div>
    </div>
    <table style="width: 100%;text-align: left;border-collapse: collapse;">
            <tbody>
            <tr>
                <td>
                                            
                <label class="lblPedido nombre" id="lblNOMBRE_AGE"><strong>{{ $agencias[0]->NOMBRE_AGE }}</strong></label><br>
                <label class="form-label datoPedido">RUC:&nbsp; </label><label class="form-label datoPedido ruc" id="lblRUC_AGE">{{ $agencias[0]->RUC_AGE }}</label><br>
                <label class="form-label datoPedido">Dir:&nbsp; </label><label class="form-label datoPedido dir" id="lblDIRECCION_AGE">{{ $agencias[0]->DIRECCION_AGE }}</label><br>
                <label class="form-label datoPedido">Telf:&nbsp; </label><label class="form-label datoPedido telefono" id="lblTELEFONO_AGE">{{ $agencias[0]->TELEFONO_AGE }}</label><br>
                <label class="form-label datoPedido">Correo:&nbsp; </label><label class="form-label datoPedido correo" id="lblCORREO_AGE">{{ $agencias[0]->CORREO_AGE }}</label>                                                                                       
             

                </td>
          
          
                <td>
                                                 
                <label class="form-label datoPedido"><strong>Pedido:</strong>&nbsp; </label><label class="form-label datoPedido" >{{ $pedido->ID_PED }}</label><br>
                <label class="form-label datoPedido"><strong>Fecha:</strong>&nbsp; </label><label class="form-label datoPedido" >{{ $pedido->FECHA_PED }}</label><br>
                <label class="form-label datoPedido"><strong>Observación:</strong>&nbsp; </label><label class="form-label datoPedido" >{{ $pedido->OBSERVACION_PED }}</label><br>
                <label class="form-label datoPedido"><strong>Proveedor:</strong>&nbsp; </label><label class="form-label datoPedido">{{ $nombreProveedor }}</label>                                                                                       
             

                </td>
            </tr> 
            </tbody>
        </table>
     <div class="col-md-4">
         <div class="row">
             
         </div>
     </div>
     <div class="col-md-3" >
         <div class="row">

          
           
         </div>
       
     </div>
  </div><hr>

        <div id="divDetalle" class="table-responsive">
        <table id="tabla-detalle" class="blueTable">
            <thead style="color:#fff;background:#546e7a">
            <tr>
              <th>Producto</th>
              <th>Marca</th>
              <th>Presentación</th>
              <th>Cantidad</th>
            </tr>
            </thead>
            <tbody>

           @for ($i = 0 ; $i < count($data) ; $i++)
            <tr>
                <td> {{ strval($data[$i]['NOMBRE_PRO']) }}</td>
                <td>{{ strval($data[$i]['NOMBRE_MAR']) }}</td>
                <td>{{ strval($data[$i]['NOMBRE_PRS']) }}</td>
                <td>{{ strval($data[$i]['CANTIDAD_PRO']) }}</td>
            </tr>
          @endfor                                
            </tbody>
        </table>
    </div>  
</div>                     
</body>

</html>