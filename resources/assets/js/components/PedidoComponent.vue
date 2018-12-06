<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4 id="titulo"><i class="fa fa-cart-arrow-down"></i> Pedidos </h4>
                </div>
                <div class="card-body">
                        
                    
                    

                    <div class="custom-tab">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link" id="listado-tab" data-toggle="tab" href="#listado" role="tab" aria-controls="listado" aria-selected="true" ><i class="fa fa-list"></i> Listado</a>
                            <a class="nav-item nav-link" id="detalle-tab" data-toggle="tab" href="#detalle" role="tab" aria-controls="detalle" aria-selected="false"><i class="fa fa-info-circle"></i> Detalle</a>
                            <a class="nav-item nav-link" id="editar-tab" data-toggle="tab" href="#editar" role="tab" aria-controls="editar" aria-selected="false"><i class="fa fa-plus"></i> Nuevo</a>
                            </div>
                        </nav>
                        <div class="tab-content pl-3 pt-2" id="nav-tabContent">
                            <div class="tab-pane fade" id="listado" role="tabpanel" aria-labelledby="listado-tab">
                                <br>                      
                                <div class="table-responsive">
                                    <table id="tabla-listado" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead style="color:#fff;background:#546e7a">
                                            <tr>
                                                <th v-for="cabecera in cabecerasListado" :key="cabecera">{{ cabecera }}</th>                                      
                                            </tr>
                                        </thead>
                                        <tbody>                                                
                                        </tbody>
                                    </table>
                                </div>                          
                            </div>

                            <!-- inicio contenido TAB detalle-->
                             <div class="tab-pane fade" id="detalle" role="tabpanel" aria-labelledby="detalle-tab">
                                <br>

                                <div class="form-row" id="divCabecera" >
                                        <div class="form-group col-md-5">
                                            <div class="row">
                                                <img id="LOGO_AGE" class="imagen" />
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="row">
                                                <div class="col-md-12" >
                                                    <label class="lblPedido nombre" id="lblNOMBRE_AGE"></label><br>
                                                    <label class="form-label datoPedido">RUC:&nbsp; </label><label class="form-label datoPedido ruc" id="lblRUC_AGE"></label><br>
                                                    <label class="form-label datoPedido">Dir:&nbsp; </label><label class="form-label datoPedido dir" id="lblDIRECCION_AGE"></label><br>
                                                    <label class="form-label datoPedido">Telf:&nbsp; </label><label class="form-label datoPedido telefono" id="lblTELEFONO_AGE"></label><br>
                                                    <label class="form-label datoPedido">Correo:&nbsp; </label><label class="form-label datoPedido correo" id="lblCORREO_AGE"></label>                                             
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-3" >
                                            <div class="row">
                                                <div class="col-md-12" >
                                                    <label class="form-label datoPedido"><strong>Pedido:</strong>&nbsp; </label><label id="lblID_PED" class="form-label datoPedido numero"></label><br>
                                                    <label class="form-label datoPedido"><strong>Fecha:</strong>&nbsp; </label><label  id="lblFECHA_PED" class="form-label datoPedido fecha"></label><br>
                                                    <label class="form-label datoPedido"><strong>Observación:</strong>&nbsp; </label><label id="lblOBSERVACION_PED" class="form-label datoPedido"></label><br>
                                                    <label class="form-label datoPedido"><strong>Proveedor:</strong>&nbsp; </label><label id="lblPROVEEDOR_PED" class="form-label datoPedido"></label>                                             
                                                </div>
                                            </div>
                                        </div>
                                </div><hr>
                                <div id="divDetalle" class="table-responsive">
                                    <button type="button" id="btnPreview"   class="btn btn-info"><i class="fa fa-print"></i> Vista previa</button>
                                    <button type="button" id="btnSendMail" class="btn btn-info"><i class="fa fa-envelope" id="mailIcon1"></i><i class="fa fa-spinner fa-spin" id="loadingImage1" style="font-size:19px"></i> <span id="btnText1">Enviar por correo</span></button> 
                                    <table id="tabla-detalle" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead id="head-detalle" style="color:#fff;background:#546e7a">
                                            <tr>
                                                <th v-for="cabecera in cabecerasDetalle" :key="cabecera">{{ cabecera }}</th>                                      
                                            </tr>
                                        </thead>
                                        <tbody>                                                
                                        </tbody>
                                    </table>
                                </div>                          
                            </div>   <!-- fin contenido TAB detalle-->                       
                            
                            <div class="tab-pane fade" id="editar" role="tabpanel" aria-labelledby="editar-tab">
                                    <br>
                                    <form id="formulario">
                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label>Producto</label>
                                                <select id="ddlProducto" style="width:100%" data-placeholder="Escoja un producto..." class="form-control" data-live-search="true">                                              
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label>Marca</label>
                                                <select id="ddlMarca" style="width:100%" data-placeholder="Escoja una marca..." class="form-control" data-live-search="true">                                              
                                                </select>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label>Presentación</label>
                                                <select id="ddlPresentacion" style="width:100%" data-placeholder="Escoja una presentación..." class="form-control" data-live-search="true">                                              
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            
                                            
                                            <div class="form-group col-md-4">
                                                <label>Cantidad</label>
                                                <input type="text" id="CANTIDAD_PRO" required class="form-control entero" placeholder="Cantidad de producto" maxlength="9">
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label>&nbsp;</label><br>
                                                <button type="button" id="btnAdd" class="btn btn-success"><i class="fa fa-plus"></i> Añadir</button>
                                            </div>
                                        </div>
                                    
                                        <div class="row clearfix div-error">
                                                <ul id="lstErrores"></ul>
                                        </div>                                   
                                    </form>
                                <hr>
                                <div class="table-responsive">
                                    <table id="bootstrap-data-table" class="table table-bordered table-striped table-hover dataTable js-exportable">
                                        <thead style="color:#fff;background:#546e7a">
                                            <tr>
                                                <th v-for="cabecera in cabeceras" :key="cabecera">{{ cabecera }}</th>                                      
                                            </tr>
                                        </thead>
                                        <tbody>                                                
                                        </tbody>
                                    </table> 
                                                                
                                </div>
                                 <form>
                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label>Proveedor</label>
                                                <select id="ddlProveedor" style="width:100%" data-placeholder="Escoja un proveedor..." class="form-control" data-live-search="true">                                              
                                                </select>
                                            </div>
                                            <div class="form-group col-md-8">
                                                <label>Observación</label>
                                                 <input type="text" id="OBSERVACION_PED" required class="form-control" placeholder="Observación de pedido" maxlength="300">
                                            </div>
                                            
                                        </div>

                                         <div class="form-row">
                                            <div class="form-group col-md-4 offset-4">
                                               <button type="button" id="btnEnviarCorreo" class="btn btn-info"><i class="fa fa-envelope" id="mailIcon"></i><i class="fa fa-spinner fa-spin" id="loadingImage" style="font-size:19px"></i> <span id="btnText">Enviar por correo</span></button>
                                               <button type="button" id="btnGuardar" class="btn btn-primary"><i class="fa fa-floppy-o"></i> Guardar</button>
                                                
                                            </div>
                                            
                                        </div> 

                                    </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                
        </div>
    </div>    
</template>

<script>
export default {
  data() {
    return {
      cabeceras: [
        "Producto",
        "Marca",
        "Presentación",
        "Cantidad",
        "Acciones"
      ],
      cabecerasListado: ["#", "Fecha", "Observación", "Proveedor", "Acciones"],
      cabecerasDetalle: [
        "Producto",
        "Marca",
        "Presentación",
        "Cantidad"
      ]
    };
  },
  mounted() {
    let datatable = document.createElement("script");
    datatable.setAttribute(
      "src",
      "assets/js/lib/data-table/datatablePedido-init.js"
    );
    document.head.appendChild(datatable);

    let agencia = document.createElement("script");
    agencia.setAttribute(
      "src",
      "assets/js/lib/data-table/agencia.js"
    );
    document.head.appendChild(agencia);
  },
   methods:{
       imprimir(divName)
       {
            var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
       }
   }
};
</script>
<style>
.div-error {
  display: flex;
  justify-content: center;
}
.lblPedido {
  font-weight: bold;
  margin-bottom: 0px;
}
.datoPedido {
  margin-bottom: 0px;
}
</style>

