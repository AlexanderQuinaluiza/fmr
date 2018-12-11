    @extends('principal')
    @section('contenido')
  <template v-if="menu==0">
        <h3>Contenido dashboard, summary</h3>
       </template>
       
          <template v-if="menu==1"> 
            
        <categoria_comp></categoria_comp> 

       </template>
        <template v-if="menu==2">
        <descuento_comp></descuento_comp>
        </template>

        <template v-if="menu==3">
        <presentacion_comp><presentacion_comp>
        </template>

        <template v-if="menu==4">
        <producto_comp></producto_comp>
        </template>

        <template v-if="menu==5">
        <marca_comp><marca_comp>
        </template>

         <template v-if="menu==6">
        <agencia_comp></agencia_comp>
        </template>

        <template v-if="menu==7">
        <caja_comp></caja_comp>
        </template>
     
       
       <template v-if="menu==8">
        <h3> Modulos</h3>
        </template>
        <template v-if="menu==9">
        <h3> Acceso</h3>
        </template>
        <template v-if="menu==10">
        <rol_comp></rol_comp>
        </template>
        <template v-if="menu==11">
        <usuario_comp></usuario_comp>
        </template>

        <template v-if="menu==12">
        <proveedor_comp></proveedor_comp>
        </template>
        <template v-if="menu==13">
        <pedido_comp></pedido_comp>
        </template>
        <template v-if="menu==14">
        <compra_comp></compra_comp>
        </template>
        <template v-if="menu==15">
        <dev_compra_comp></dev_compra_comp> 
        </template>
        
        <template v-if="menu==17">
        <cliente_comp></cliente_comp>
        </template> 

         <template v-if="menu==19">
         <inventario_comp></inventario_comp>
        </template>
        
        <template v-if="menu==21">
        <reporte_compras_comp></reporte_compras_comp>
        </template>

         <template v-if="menu==18">
        <dev_venta_comp></dev_venta_comp>
        </template>
        </template> 
         <template v-if="menu==25">
         <cierre_caja_comp></cierre_caja_comp>
        </template>
        <template v-if="menu==26">
         <cierres_caja_comp></cierres_caja_comp>
        </template>
        <template v-if="menu==27">
        <apertura_caja_comp></apertura_caja_comp>
        </template>   

         


   <!-- <pedido_comp></pedido_comp> 
  <compra_comp></compra_comp>   -->
  <!-- <producto_comp></producto_comp>  -->
  <!-- <dev_compra_comp></dev_compra_comp>  -->
  <!-- <caja_comp></caja_comp> -->
  <!-- <apertura_caja_comp></apertura_caja_comp> -->

   <!-- <descuento_comp></descuento_comp> -->
  <!-- <cierre_caja_comp></cierre_caja_comp> -->
   <cierres_caja_comp></cierres_caja_comp> 

  <!-- <configuracion_comp></configuracion_comp> -->
  <!-- <usuario_comp></usuario_comp> -->
  <!-- <rol_comp></rol_comp>  -->
  <!-- <proveedor_comp></proveedor_comp> -->
    <!-- <inventario_comp></inventario_comp> -->
    <!-- <estadistica_compras_comp></estadistica_compras_comp> -->
     <!-- <reportes_comp></reportes_comp> -->

     <!-- <reporte_compras_comp></reporte_compras_comp> -->
     <!-- <home></home> -->
     
    @endsection
 
