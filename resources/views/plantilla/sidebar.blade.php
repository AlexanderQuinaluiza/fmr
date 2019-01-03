<aside id="left-panel" class="left-panel">
        <nav class="navbar navbar-expand-sm navbar-default">

            <div class="navbar-header">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="./"><img src="images/logo.png" alt="Logo"></a>
                <a class="navbar-brand hidden" href="./"><img src="images/logo2.png" alt="Logo"></a>
            </div>

            <div id="main-menu" class="main-menu collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="active">
                        <a href="javascript: void(0)" @click="menu=0"> <i class="menu-icon fa fa-dashboard"></i>Escritorio </a>
                    </li>
                    <h3 class="menu-title">Administración</h3><!-- /.menu-title -->
                    <li class="menu-item-has-children dropdown">
                        <a href="javascript: void(0)"  class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> <i class="menu-icon fa fa-laptop"></i>Almacen</a>
                        <ul class="sub-menu children dropdown-menu">
                            <li><i class="fa fa-puzzle-piece" ></i><a href="javascript: void(0)" @click="menu=1">Categorias</a></li>
                            <li><i class="fa fa-id-badge" ></i><a href="javascript: void(0)" @click="menu=2">Descuentos</a></li>
                            <li><i class="fa fa-bars" ></i><a href="javascript: void(0)" @click="menu=3">Presentaciones</a></li>
                            <li><i class="fa fa-share-square-o"></i><a href="javascript: void(0)" @click="menu=4">Productos</a></li>
                            <li><i class="fa fa-id-card-o"></i><a href="javascript: void(0)" @click="menu=5">Marcas</a></li>
                            <li><i class="fa fa-exclamation-triangle"></i><a href="javascript: void(0)" @click="menu=6">Agencias</a></li>
                            <li><i class="fa fa-spinner"></i><a href="javascript: void(0)" @click="menu=7">Cajas</a></li>
                           <!-- <li><i class="fa fa-fire"></i><a href="ui-modals.html">Modals</a></li>
                            <li><i class="fa fa-book"></i><a href="ui-switches.html">Switches</a></li>
                            <li><i class="fa fa-th"></i><a href="ui-grids.html">Grids</a></li>
                            <li><i class="fa fa-file-word-o"></i><a href="ui-typgraphy.html">Typography</a></li> -->
                        </ul>
                    </li>
                   <!-- <li class="menu-item-has-children dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-table"></i>Tables</a>
                        <ul class="sub-menu children dropdown-menu">
                            <li><i class="fa fa-table"></i><a href="tables-basic.html">Basic Table</a></li>
                            <li><i class="fa fa-table"></i><a href="tables-data.html">Data Table</a></li>
                        </ul>
                    </li>
                    <li class="menu-item-has-children dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-th"></i>Forms</a>
                        <ul class="sub-menu children dropdown-menu">
                            <li><i class="menu-icon fa fa-th"></i><a href="forms-basic.html">Basic Form</a></li>
                            <li><i class="menu-icon fa fa-th"></i><a href="forms-advanced.html">Advanced Form</a></li>
                        </ul>
                    </li>
-->
                    <h3 class="menu-title">Seguridad</h3><!-- /.menu-title -->

                    <li class="menu-item-has-children dropdown">
                        <a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-tasks"></i>Usuarios y Accesos</a>
                        <ul class="sub-menu children dropdown-menu">
                            <li><i class="menu-icon fa fa-fort-awesome"></i><a href="javascript: void(0)" @click="menu=8">Módulos</a></li>
                            <li><i class="menu-icon ti-themify-logo"></i><a href="javascript: void(0)" @click="menu=9">Acceso</a></li>
                            <li><i class="menu-icon fa fa-map-o"></i><a href="javascript: void(0)" @click="menu=10">Roles</a></li>
                            <li><i class="menu-icon fa fa-street-view"></i><a href="javascript: void(0)" @click="menu=11">Usuarios</a></li>
                        
                        </ul>
                    </li>
                   <!-- <li>
                        <a href="widgets.html"> <i class="menu-icon ti-email"></i>Widgets </a>
                    </li>
                    <li class="menu-item-has-children dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-bar-chart"></i>Charts</a>
                        <ul class="sub-menu children dropdown-menu">
                            <li><i class="menu-icon fa fa-line-chart"></i><a href="charts-chartjs.html">Chart JS</a></li>
                            <li><i class="menu-icon fa fa-area-chart"></i><a href="charts-flot.html">Flot Chart</a></li>
                            <li><i class="menu-icon fa fa-pie-chart"></i><a href="charts-peity.html">Peity Chart</a></li>
                        </ul>
                    </li> 

                    <li class="menu-item-has-children dropdown">
                        <a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-area-chart"></i>Maps</a>
                        <ul class="sub-menu children dropdown-menu">
                            <li><i class="menu-icon fa fa-map-o"></i><a href="maps-gmap.html">Google Maps</a></li>
                            <li><i class="menu-icon fa fa-street-view"></i><a href="maps-vector.html">Vector Maps</a></li>
                        </ul>
                    </li>-->
                    <h3 class="menu-title">Transacciones</h3><!-- /.menu-title -->
                    <li class="menu-item-has-children dropdown">
                        <a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-glass"></i>Compras</a>
                        <ul class="sub-menu children dropdown-menu">
                        <li><i class="menu-icon fa fa-fort-awesome"></i><a href="javascript: void(0)" @click="menu=12">Proveedores</a></li>
                            <li><i class="menu-icon ti-themify-logo"></i><a href="javascript: void(0)" @click="menu=13">Pedidos</a></li>
                            <li><i class="menu-icon fa fa-map-o"></i><a href="javascript: void(0)" @click="menu=14">Compras</a></li>
                            <li><i class="menu-icon fa fa-street-view"></i><a href="javascript: void(0)" @click="menu=15">Devoluciones</a></li>
                            
                        </ul>
                       </li>

                       <li class="menu-item-has-children dropdown">
                        <a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-table"></i>Ventas</a>
                        <ul class="sub-menu children dropdown-menu">
                            <li><i class="fa fa-table"></i><a href="javascript: void(0)" @click="menu=16">Clientes</a></li>
                            <li><i class="fa fa-table"></i><a href="javascript: void(0)" @click="menu=17">Ventas</a></li>
                            <li><i class="menu-icon fa fa-map-o"></i><a href="javascript: void(0)" @click="menu=18">Devoluciones</a></li>

                        </ul>
                        <li>
                        <a href="javascript: void(0)"  @click="menu=25"> <i class="menu-icon fa fa-lock"></i>Cierre caja</a>
                       </li>
                       <li>
                        <a href="javascript: void(0)"  @click="menu=26"> <i class="menu-icon fa fa-lock"></i>Cierres caja (Cuadre) </a>
                       </li>
                       <li>
                        <a href="javascript: void(0)"  @click="menu=27"> <i class="menu-icon fa fa-money"></i>Movimiento Caja </a>
                       </li>
                       

                    <h3 class="menu-title">Inventarios</h3><!-- /.menu-title -->
                    <li> 
                     <a href="javascript: void(0)" @click="menu=19" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-table"></i>Kardex</a>
                     </li> 
                     <!--  <ul class="sub-menu children dropdown-menu">
                    <li><i class="menu-icon fa fa-map-o" ></i><a  href="javascript: void(0)" @click="menu=19" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-table">>Kardex</a></li>
                       
                    </li>
                    </ul> -->

                    <h3 class="menu-title">Reportes</h3><!-- /.menu-title -->
                    <li class="menu-item-has-children dropdown">
                        <a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-glass"></i>Reportes Gerenciales</a>
                        <ul class="sub-menu children dropdown-menu">
                        <li><i class="menu-icon fa fa-fort-awesome"></i><a href="javascript: void(0)" @click="menu=20">Reportes Ingresos</a></li>
                            <li><i class="menu-icon ti-themify-logo"></i><a href="javascript: void(0)" @click="menu=21">Reportes Compras</a></li>
                            <li><i class="menu-icon ti-themify-logo"></i><a href="javascript: void(0)" @click="menu=28">Reportes Productos</a></li>
                            <li><i class="menu-icon fa fa-map-o"></i><a href="javascript: void(0)" @click="menu=22">Estadisticas Compras</a></li>
                            <li><i class="menu-icon fa fa-street-view"></i><a href="javascript: void(0)" @click="menu=23">Reportes Productividad</a></li>                         
                        </ul>
                       </li>
                    <h3 class="menu-title">Otros</h3><!-- /.menu-title -->
                    <li class="menu-item-has-children dropdown">
                        <a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-glass"></i>Información</a>
                        <ul class="sub-menu children dropdown-menu">
                        <li><i class="menu-icon fa fa-fort-awesome"></i><a href="javascript: void(0)" @click="menu=23">Configuraciones</a></li>
                            <li><i class="menu-icon ti-themify-logo"></i><a href="javascript: void(0)" @click="menu=24">Acerca de</a></li>                           
                         <!--   <li><i class="menu-icon fa fa-street-view"></i><a href="javascript: void(0)" @click="menu=23">Reportes Productos</a></li> -->                          
                        </ul>
                       </li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </nav>
    </aside>
    
    <script src="js/toastr.min.js"></script>
    
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

  <!--  <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script> -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
<!-- external libs from cdnjs for pivotjtable -->

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
        <script type="text/javascript" src="https://cdn.plot.ly/plotly-basic-latest.min.js"></script>

 <link rel="stylesheet" type="text/css" href="assets/css/pivot.css">
  <script type="text/javascript" src="assets/js/pivot.js"></script>
 
  
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pivottable/2.22.0/plotly_renderers.min.js"></script>

  <!-- PivotTable.js libs from ../dist -->

<script src="assets/js/lib/bootstrap/bootstrap-datepicker.min.js"></script>
<script src="assets/js/lib/bootstrap/es.js"></script>

 
 
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-3d.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/drilldown.js"></script>



