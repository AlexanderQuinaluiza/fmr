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
                            
                            <li v-if="item.SECCION=='Almacén'" v-for="item in mi_menu" :key="mi_menu.ID_MOD">
                            
                             <i   v-bind:class="[item.ICONO_MOD]" ></i>
                                <a  href="javascript: void(0)" @click="menu=item.URL_MOD" v-text="item.NOMBRE_MOD"></a>
                              
                            </li>
                           
                           
                        </ul>
                    </li>
                  
                    <h3 class="menu-title">Seguridad</h3><!-- /.menu-title -->

                    <li class="menu-item-has-children dropdown">
                        <a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-tasks"></i>Usuarios y Accesos</a>
                        <ul class="sub-menu children dropdown-menu">
                        <li v-if="item.SECCION=='Seguridad'" v-for="item in mi_menu" :key="mi_menu.ID_MOD">
                            
                            <i   v-bind:class="[item.ICONO_MOD]" ></i>
                               <a  href="javascript: void(0)" @click="menu=item.URL_MOD" v-text="item.NOMBRE_MOD"></a>
                             
                           </li>
                          
                        </ul>
                    </li>
                   
                    <h3 class="menu-title"></h3><!-- /.menu-title -->
                    <li class="menu-item-has-children dropdown">
                        <a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-glass"></i>Compras</a>
                        <ul class="sub-menu children dropdown-menu">
                        <li v-if="item.SECCION=='Compras'" v-for="item in mi_menu" :key="mi_menu.ID_MOD">
                            
                            <i   v-bind:class="[item.ICONO_MOD]" ></i>
                               <a  href="javascript: void(0)" @click="menu=item.URL_MOD" v-text="item.NOMBRE_MOD"></a>
                             
                           </li>
                    
                        </ul>
                       </li>

                       <li class="menu-item-has-children dropdown">
                        <a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-table"></i>Ventas</a>
                        <ul class="sub-menu children dropdown-menu">
                        <li v-if="item.SECCION=='Ventas'" v-for="item in mi_menu" :key="mi_menu.ID_MOD">
                            
                            <i   v-bind:class="[item.ICONO_MOD]" ></i>
                               <a  href="javascript: void(0)" @click="menu=item.URL_MOD" v-text="item.NOMBRE_MOD"></a>
                             
                           </li>
                        
                      
                        </ul>
                      </li>    
                        <h3 class="menu-title"></h3><!-- /.menu-title -->
                        <li class="menu-item-has-children dropdown">
                        <a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-glass"></i>Contabilidad</a>
                        <ul class="sub-menu children dropdown-menu">
                        <li v-if="item.SECCION=='Contable'" v-for="item in mi_menu" :key="mi_menu.ID_MOD">
                            
                            <i   v-bind:class="[item.ICONO_MOD]" ></i>
                               <a  href="javascript: void(0)" @click="menu=item.URL_MOD" v-text="item.NOMBRE_MOD"></a>
                             
                           </li>  
                     
                        </ul>
                       </li>
                       <h3 class="menu-title"></h3><!-- /.menu-title -->
                        <li class="menu-item-has-children dropdown">
                        <a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-glass"></i>Inventarios</a>
                        <ul class="sub-menu children dropdown-menu">
                        <li v-if="item.SECCION=='Inventario'" v-for="item in mi_menu" :key="mi_menu.ID_MOD">
                            
                            <i   v-bind:class="[item.ICONO_MOD]" ></i>
                               <a  href="javascript: void(0)" @click="menu=item.URL_MOD" v-text="item.NOMBRE_MOD"></a>
                             
                           </li>  
                     
                        </ul>
                       </li>
                      
                    <h3 class="menu-title">Reportes</h3><!-- /.menu-title -->
                    <li class="menu-item-has-children dropdown">
                        <a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-glass"></i>Reportes Gerenciales</a>
                        <ul class="sub-menu children dropdown-menu">
                        <li v-if="item.SECCION=='Reportes'" v-for="item in mi_menu" :key="mi_menu.ID_MOD">
                            
                            <i   v-bind:class="[item.ICONO_MOD]" ></i>
                               <a  href="javascript: void(0)" @click="menu=item.URL_MOD" v-text="item.NOMBRE_MOD"></a>
                             
                           </li>  
                        </ul>
                       </li>
                    <h3 class="menu-title">Otros</h3><!-- /.menu-title -->
                    <li class="menu-item-has-children dropdown">
                        <a href="javascript: void(0)" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-glass"></i>Configuración</a>
                        <ul class="sub-menu children dropdown-menu">
                        <li v-if="item.SECCION=='Otros'" v-for="item in mi_menu" :key="mi_menu.ID_MOD">
                            
                            <i   v-bind:class="[item.ICONO_MOD]" ></i>
                               <a  href="javascript: void(0)" @click="menu=item.URL_MOD" v-text="item.NOMBRE_MOD"></a>
                             
                           </li>
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
 <!-- external libs from cdnjs for pivotjtable -->
 <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.11/c3.min.css">
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.11/c3.min.js"></script>

 <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/pivottable/2.13.0/pivot.min.css">
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
 
  
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pivottable/2.13.0/pivot.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pivottable/2.13.0/pivot.es.min.js"></script>
  <script type="text/javascript" src="https://pivottable.js.org/dist/c3_renderers.js"></script>
  <script type="text/javascript" src="https://pivottable.js.org/dist/export_renderers.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
  
  <!-- PivotTable.js libs from ../dist -->

<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-3d.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/drilldown.js"></script>



