<!DOCTYPE html>
<html lang="es">
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Farmacia-Solidaria</title>
    <meta name="description" content="Farmacia-Solidaria">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="apple-touch-icon" href="apple-icon.png">
    <link rel="shortcut icon" href="favicon.ico">
 
    <link rel="stylesheet" href="assets/css/normalize.css">
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/css/themify-icons.css">
    <link rel="stylesheet" href="assets/css/flag-icon.min.css">
    <link rel="stylesheet" href="assets/css/cs-skin-elastic.css">
   <link rel="stylesheet" href="assets/css/lib/datatable/dataTables.bootstrapCP.css">
    <!--  <link rel="stylesheet" href="assets/css/bootstrap-select.less"> -->
    <link rel="stylesheet" href="assets/scss/style.css">
    
    <link rel="stylesheet" href="assets/css/styleButtonExport.css">

    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800' rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

<link href="assets/css/toastr.min.css" rel="stylesheet">
<link href="EasyAutocomplete/easy-autocomplete.css" rel="stylesheet">
<link href="EasyAutocomplete/easy-autocomplete.themes.css" rel="stylesheet">

   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.3/css/bootstrap-select.css" />
<!--inicio date time picker -->
<link href="assets/js/lib/bootstrap/bootstrap-datepicker.css" rel="stylesheet">
<!--fin date time picker -->

<!-- JQuery DataTable Css -->

<script src="assets/js/vendor/jquery-2.1.4.min.js"></script>
<!-- style datepiker -->
<!--fin-->


  


 <!-- fin external libs from cdnjs for pivotjtable -->
<style>
.container .details-row td {
  padding: 0;
  margin: 0;
}

.details-container {
  width: 100%;
  height: 100%;
  background-color: #556e7a;
  padding-top: 5px;
}

.details-table {
  width: 100%;
  background-color: #fff;
  margin: 5px;
}

.title {
  font-weight: bold;
}

.iconSettings, td.details-control:before, tr.shown td.details-control:before {
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 12px;
  position: relative;
  top: 1px;
  display: inline-block;
  font-family: "Glyphicons Halflings";
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
}

td.details-control {
  cursor: pointer;
  text-align: center;
}
td.details-control:before {
  content: "\2b";
}

tr.shown td.details-control:before {
  content: "\2212";
}

     </style>
</head>
<style>
.container .details-row td {
  padding: 0;
  margin: 0;
}

.details-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-top: 5px;
}

.details-table {
  width: 100%;
  background-color: #fff;
  margin: 5px;
}

.title {
  font-weight: bold;
}

.iconSettings, td.details-control:before, tr.shown td.details-control:before {
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 12px;
  position: relative;
  top: 1px;
  display: inline-block;
  font-family: "Glyphicons Halflings";
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
}

td.details-control {
  cursor: pointer;
  text-align: center;
}
td.details-control:before {
  content: "\2b";
}

tr.shown td.details-control:before {
  content: "\2212";
}

#app {
    overflow-x: hidden;
}
.custom-icon
{
    font-size:25px;
}
     </style> 
<body >
 <div id="app">
        <!-- Left Panel class="open" -->
    @include('plantilla.sidebar')
   <!-- /#left-panel -->

    <!-- Left Panel -->

    <!-- Right Panel -->

    <div id="right-panel" class="right-panel">

        <!-- Header-->
        <header id="header" class="header">

            <div class="header-menu">


<!--inicio modal notificacion productos caducar -->
<div class="modal fade" id="productoCaducarModal" tabindex="-1" role="dialog" aria-labelledby="productoCaducarModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-primary" role="document">
                            <div class="modal-content">
                                <div class="modal-header modal-header-primary">
                                    <h5 class="modal-title" id="productoCaducarModalLabel">PRODUCTOS A CADUCAR</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">

                                        <div class="form-row">
                                            <div class="form-group col-md-2">
                                                <label><strong>Id Producto:</strong>&nbsp;</label>
                                                <label id="lblIdProductoCaduca">1</label>
                                                 
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label><strong>Nombre:</strong>&nbsp;</label>
                                                <label id="lblNombreProductoCaduca">Nolotil</label>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label><strong>Descripción:</strong>&nbsp;</label>
                                                <label id="lblDescripciónProductoCaduca">Bisolgrip forte 10 sobres polvo</label>
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label><strong>Ubicación:</strong>&nbsp;</label>
                                                <label id="lblUbicacionProductoCaduca">Percha 5 nivel 6</label>
                                            </div>
                                        </div>
                                    <label>Ejemplares próximos a caducarse:</label>
                                     <div class="table-responsive">
                                            <table class="table datatables" id="tablaCaducaProducto">
                                            <thead  style="color:#fff;background:#546e7a">
                                            <tr>
                                                <th></th>
                                                <th>Código de barra</th>
                                                <th>Fecha caducidad</th>
                                                <th>Caduca en</th>
                                            </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div>
                                                                                             
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button>                                                                 
                                </div>
                            </div>
                        </div>
                    </div><!--fin modal  notificacion productos caducar -->

                    <!--inicio modal notificacion productos agotar -->
<div class="modal fade" id="productoAgotarModal" tabindex="-1" role="dialog" aria-labelledby="productoAgotarModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-primary" role="document">
                            <div class="modal-content">
                                <div class="modal-header modal-header-primary">
                                    <h5 class="modal-title" id="productoAgotarModalLabel">PRODUCTO PRÓXIMO A AGOTARSE</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">

                                        <div class="form-row">
                                            <div class="form-group col-md-2">
                                                <label><strong>Id Producto:</strong>&nbsp;</label>
                                                <label id="lblIdProductoAgotar">1</label>                                                
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label><strong>Nombre:</strong>&nbsp;</label>
                                                <label id="lblNombreProductoAgotar">Nolotil</label>
                                            </div>
                                            <div class="form-group col-md-4">
                                                <label><strong>Descripción:</strong>&nbsp;</label>
                                                <label id="lblDescripciónProductoAgotar">Bisolgrip forte 10 sobres polvo</label>
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label><strong>Ubicación:</strong>&nbsp;</label>
                                                <label id="lblUbicacionProductoAgotar">Percha 5 nivel 6</label>
                                            </div>
                                        </div>

                                        <div class="form-row">
                                            <div class="form-group col-md-4">
                                                <label><strong>Existencia mínima:</strong>&nbsp;</label>
                                                <label id="lblMinProductoAgotar">1</label>                                                
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label><strong>Stock actual:</strong>&nbsp;</label>
                                                <label id="lblStockProductoAgotar">Nolotil</label>
                                            </div>
                                            <div class="form-group col-md-3">                                          
                                                <img id="imgProductoAgotar" />
                                            </div>                                          
                                        </div>
                                    
                                     <!-- <div class="table-responsive">
                                            <table class="table datatables" id="tablaCaducaProducto">
                                            <thead  style="color:#fff;background:#546e7a">
                                            <tr>
                                                <th></th>
                                                <th>Código de barra</th>
                                                <th>Fecha caducidad</th>
                                                <th>Caduca en</th>
                                            </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                    </div> -->
                                                                                             
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-info" data-dismiss="modal">Cerrar</button>                                                                 
                                </div>
                            </div>
                        </div>
                    </div><!--fin modal  notificacion productos caducar -->


                <div class="col-sm-7">
                    <a id="menuToggle" class="menutoggle pull-left"><i class="fa fa fa-tasks"></i></a>
                    <div class="header-left">
                        <!-- <button class="search-trigger"><i class="fa fa-search"></i></button>
                        <div class="form-inline">
                            <form class="search-form">
                                <input class="form-control mr-sm-2" type="text" placeholder="Search ..." aria-label="Search">
                                <button class="search-close" type="submit"><i class="fa fa-close"></i></button>
                            </form>
                        </div> -->

                        <div class="dropdown for-notification">
                          <button class="btn btn-secondary dropdown-toggle" type="button" id="notification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-bell"></i>
                            <span id="not1" class="count bg-danger"></span>
                          </button>
                          <div id="divNotificacion1" style="border:1px solid rgba(0,0,0,.15);" class="dropdown-menu" aria-labelledby="notification">
                            <p id="numNotificaciones" class="red"></p>
                            <!-- <a class="dropdown-item media bg-flat-color-1" href="#">
                                <i class="fa fa-check"></i>
                                <p>Server #1 overloaded.</p>
                            </a>
                            <a class="dropdown-item media bg-flat-color-4" href="#">
                                <i class="fa fa-info"></i>
                                <p>Server #2 overloaded.</p>
                            </a>-->
                            <!-- <a data-toggle="modal" data-target="#productoCaducarModal" class="dropdown-item media bg-flat-color-5" href="#">
                                <i class="fa fa-warning"></i>
                                <p>Server #3 overloaded.</p>
                            </a>  -->
                          </div>
                        </div>

                        <div class="dropdown for-message">
                          <button class="btn btn-secondary dropdown-toggle" type="button"
                                id="message"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-archive"></i>
                            <span id="not2" class="count bg-primary"></span>
                          </button>
                          <div id="divNotificacion2" style="border:1px solid rgba(0,0,0,.15);box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);" class="dropdown-menu" aria-labelledby="message">
                            <p class="red" id="numNotificaciones2"></p>
                            <!-- <a class="dropdown-item media bg-flat-color-1" href="#">
                                <span class="photo media-left"><img alt="avatar" src="images/avatar/1.jpg"></span>
                                <span class="message media-body">
                                    <span class="name float-left">Jonathan Smith</span>
                                    <span class="time float-right">Just now</span>
                                        <p>Hello, this is an example msg</p>
                                </span>
                            </a>
                            <a class="dropdown-item media bg-flat-color-4" href="#">
                                <span class="photo media-left"><img alt="avatar" src="images/avatar/2.jpg"></span>
                                <span class="message media-body">
                                    <span class="name float-left">Jack Sanders</span>
                                    <span class="time float-right">5 minutes ago</span>
                                        <p>Lorem ipsum dolor sit amet, consectetur</p>
                                </span>
                            </a>
                            <a class="dropdown-item media bg-flat-color-5" href="#">
                                <span class="photo media-left"><img alt="avatar" src="images/avatar/3.jpg"></span>
                                <span class="message media-body">
                                    <span class="name float-left">Cheryl Wheeler</span>
                                    <span class="time float-right">10 minutes ago</span>
                                        <p>Hello, this is an example msg</p>
                                </span>
                            </a>
                            <a class="dropdown-item media bg-flat-color-3" href="#">
                                <span class="photo media-left"><img alt="avatar" src="images/avatar/4.jpg"></span>
                                <span class="message media-body">
                                    <span class="name float-left">Rachel Santos</span>
                                    <span class="time float-right">15 minutes ago</span>
                                        <p>Lorem ipsum dolor sit amet, consectetur</p>
                                </span>
                            </a> -->
                          </div>
                        </div>
                    </div>
                </div>

                <div class="col-sm-5">
                    <div class="user-area dropdown float-right">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img class="user-avatar rounded-circle" src="images/img1.jpg" alt="Usuario actual">
                        </a>
                        
                        <div class="user-menu dropdown-menu">
                                <!-- <a class="nav-link" href="#"><i class="fa fa- user"></i>My Profile</a>

                                <a class="nav-link" href="#"><i class="fa fa- user"></i>Notifications <span class="count">13</span></a>

                                <a class="nav-link" href="#"><i class="fa fa -cog"></i>Settings</a> -->

                                <a class="nav-link" href="{{ route('logout') }}"><i class="fa fa-power -off"></i>Cerrar sesión</a>
                        </div>
                    </div>

                    <!-- <div class="language-select dropdown" id="language-select">
                        <a class="dropdown-toggle" href="#" data-toggle="dropdown"  id="language" aria-haspopup="true" aria-expanded="true">
                            <i class="flag-icon flag-icon-us"></i>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="language" >
                            <div class="dropdown-item">
                                <span class="flag-icon flag-icon-fr"></span>
                            </div>
                            <div class="dropdown-item">
                                <i class="flag-icon flag-icon-es"></i>
                            </div>
                            <div class="dropdown-item">
                                <i class="flag-icon flag-icon-us"></i>
                            </div>
                            <div class="dropdown-item">
                                <i class="flag-icon flag-icon-it"></i>
                            </div>
                        </div>
                    </div> -->

                </div>
            </div>

        </header><!-- /header -->
        <!-- Header-->

        <div class="breadcrumbs" style="">
            <div class="col-sm-4">
                <div class="page-header float-left">
                    <div class="page-title">
                        <h1>Bienvenido al sistema</h1>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="page-header float-right">
                    <div class="page-title">
                        <ol class="breadcrumb text-right">
                            <h6 id="h6UserName"> 
                            <input id="idUsuario" value="{{ Auth::user()->ID_USU }}" type="hidden" > {{ Auth::user()->NOMBRE_USU }} {{ Auth::user()->APELLIDO_USU }} <span class="badge badge-success" id="spanRol"></span> </h6>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
          
        <div class="content mt-3">
            <div class="animated"  >
            @yield('contenido')
           
            </div>  <!-- .animated -->
        </div>     <!-- .content -->


    </div><!-- /#right-panel -->


    <!-- Right Panel -->
  </div>
  </div>
    <!-- <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script> -->

    
  <!-- -->
  <script src="assets/js/vendor/jquery-2.1.4.min.js"></script>
  
    <script src="assets/js/popper.min.js"></script>
    <script src="assets/js/plugins.js"></script>
    <script src="assets/js/main.js"></script>
    <!-- <script src="assets/js/widgets.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.3/js/bootstrap-select.js"></script>
  
    
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="js/app.js"></script>
    
   
   <script>
    $('.entero').on('keydown', function(e){
           -1!==$.inArray(e.keyCode,[46,8,9,27,13,110])||(/65|67|86|88/.test(e.keyCode)&&(e.ctrlKey===true||e.metaKey===true))&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()
    });

    function isNumber(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (
    (charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
    (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
    (charCode < 48 || charCode > 57) )
    return false;
    return true;
    }

     $('.decimal').keypress(function (event) {
            return isNumber(event, this)
        });

// $('.menu-item-has-children').click(function(){
// console.log('jaja');
// });

// Restricts input for the given jQuery object to the given inputFilter.
function setInputFilter(obj, inputFilter) {
  obj.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
    if (inputFilter(this.value)) {
      this.oldValue = this.value;
      this.oldSelectionStart = this.selectionStart;
      this.oldSelectionEnd = this.selectionEnd;
    } else if (this.hasOwnProperty("oldValue")) {
      this.value = this.oldValue;
      this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
    }
  });
}
function setPatternFilter(obj, pattern) {
  setInputFilter(obj, function(value) { return pattern.test(value); });
}
setPatternFilter($("#PRECIO_COMP"), /^-?\d*\.?\d{0,2}$/);
setPatternFilter($("#EDIT_PRECIO_COMP"), /^-?\d*\.?\d{0,2}$/);

       
   </script>
   
   <script src="assets/js/lib/data-table/notificacionesProductos.js"></script>
   
  </body>
</html>
