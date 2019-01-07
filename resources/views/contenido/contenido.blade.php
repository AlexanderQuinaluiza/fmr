    @extends('principal')
    @section('contenido')
  <!-- <template v-if="menu==0">
        <h3>Contenido dashboard, summary</h3>
       </template> -->
       
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
       <modulo_comp></modulo_comp>
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
        <template v-if="menu==16">
        <ventas_comp></ventas_comp> 
        </template>
        <template v-if="menu==17">
        <cliente_comp></cliente_comp>
        </template> 
        <template v-if="menu==18">
        <dev_venta_comp></dev_venta_comp>
        </template> 


         <template v-if="menu==19">
         <inventario_comp></inventario_comp>
        </template>
        <template v-if="menu==20">
        <reporteventas_comp></reporteventas_comp>
        </template>
        <template v-if="menu==21">
        <!-- <reporte_compras_comp></reporte_compras_comp> -->
        <estadistica_compras_comp></estadistica_compras_comp>
        </template>

         <!-- <template v-if="menu==22">
        <estadistica_compras_comp></estadistica_compras_comp>
        </template> -->
        </template> 
         <template v-if="menu==23">
         <configuracion_comp></configuracion_comp>
        </template>
        <template v-if="menu==24">
         <cierre_caja_comp></cierre_caja_comp>
        </template>
        <template v-if="menu==25">
         <cierres_caja_comp></cierres_caja_comp>
        </template>
        <template v-if="menu==26">
         <comprobantes_comp></comprobantes_comp>
        </template>
        
        <template v-if="menu==28">
        <reporte_productos_comp></reporte_productos_comp>
        </template> 
        
        <template v-if="menu==30">
        <reportedevventas_comp></reportedevventas_comp>
        </template>
        <template v-if="menu==31">
        <movimiento_caja></movimiento_caja>
        </template>
        
        


   <!-- <pedido_comp></pedido_comp> 
  <compra_comp></compra_comp>   -->
  <!-- <producto_comp></producto_comp>  -->
   <!-- <dev_compra_comp></dev_compra_comp>   -->
  <!-- <caja_comp></caja_comp> -->

   <!-- <descuento_comp></descuento_comp> -->
  <!-- <cierre_caja_comp></cierre_caja_comp> -->
   <!--<cierres_caja_comp></cierres_caja_comp> -->

  <!-- <configuracion_comp></configuracion_comp> -->
  <!-- <usuario_comp></usuario_comp>  -->
  <!-- <rol_comp></rol_comp>--> 
  <!-- <proveedor_comp></proveedor_comp> -->
    <!-- <inventario_comp></inventario_comp> -->
    <!-- <estadistica_compras_comp></estadistica_compras_comp> -->
   
    <!-- <escritorio_comp></escritorio_comp> -->
     <!-- <reporte_compras_comp></reporte_compras_comp> -->
     <!-- <ventas_comp></ventas_comp> -->
     <!-- <home></home> -->
     <!-- <reporte_productos_comp></reporte_productos_comp> -->
    @endsection
 
