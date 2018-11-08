    @extends('principal')
    @section('contenido')
       
    <template v-if="menu==0">
        <h3>Contenido dashboard, summary</h3>
       </template>
        <!-- Start almacen menu -->
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
      <!-- Fin almacen menu -->
       <!-- Inicio seguridad -->
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
        <!-- Fin seguridad-->
        <template v-if="menu==17">
        <cliente_comp></cliente_comp>
        </template>

 

    
    @endsection
 <!--   <script src="js/toastr.min.js"></script>
    
    <script src="assets/js/lib/data-table/datatables.min.js"></script>
    <script src="assets/js/lib/data-table/dataTables.bootstrap.min.js"></script>
    <script src="assets/js/lib/data-table/dataTables.buttons.min.js"></script>
    <script src="assets/js/lib/data-table/buttons.bootstrap.min.js"></script>
    <script src="assets/js/lib/data-table/jszip.min.js"></script>
    <script src="assets/js/lib/data-table/pdfmake.min.js"></script>
    <script src="assets/js/lib/data-table/vfs_fonts.js"></script>
    <script src="assets/js/lib/data-table/buttons.html5.min.js"></script>
    <script src="assets/js/lib/data-table/buttons.print.min.js"></script>
    <script src="assets/js/lib/data-table/buttons.colVis.min.js"></script>
    <script src="js/sweetalert2/sweetalert2.js"></script>
    <script src="EasyAutocomplete/jquery.easy-autocomplete.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>

    -->
     <!-- Datepiker-->

   <!-- fin -->