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
    <!-- google recaptcha -->
    <script src='https://www.google.com/recaptcha/api.js'></script>

    <link rel="stylesheet" href="{{ asset('assets/css/normalize.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/font-awesome.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/themify-icons.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/flag-icon.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/cs-skin-elastic.css') }}">
   <link rel="stylesheet" href="{{ asset('assets/css/lib/datatable/dataTables.bootstrapCP.css') }}">
    <!--  <link rel="stylesheet" href="assets/css/bootstrap-select.less"> -->
    <link rel="stylesheet" href="{{ asset('assets/scss/style.css') }}">
    
    <link rel="stylesheet" href="{{ asset('assets/css/styleButtonExport.css') }}">


    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800' rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

<link href="{{ asset('assets/css/toastr.min.css') }}" rel="stylesheet">

<link href="{{ asset('EasyAutocomplete/easy-autocomplete.css') }}" rel="stylesheet">
<link href="{{ asset('EasyAutocomplete/easy-autocomplete.themes.css') }}" rel="stylesheet">

   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.3/css/bootstrap-select.css" />
<!--inicio date time picker -->
<link href="{{ asset('assets/js/lib/bootstrap/bootstrap-datepicker.css') }}" rel="stylesheet">
<!--fin date time picker -->

<!-- JQuery DataTable Css -->
<script src="{{ asset('assets/js/vendor/jquery-2.1.4.min.js') }}"></script>
<!-- style datepiker -->
<!--fin-->
</head>

<body class="bg-dark">


<div class="sufee-login d-flex align-content-center flex-wrap">
    <div class="container">
        <div class="login-content">
            <div class="login-logo">
            <p style="color:#fff;font-weight:bold;font-size:20px">INICIO DE SESIÓN</p>
            </div>
            @yield('contenido')
        </div>
    </div>
</div>






  <script src="{{ asset('assets/js/vendor/jquery-2.1.4.min.js') }}"></script>
    <script src="{{ asset('assets/js/popper.min.js') }}"></script>
    <script src="{{ asset('assets/js/plugins.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.3/js/bootstrap-select.js"></script>
  
    
    <script src="{{ asset('assets/js/main.js') }}"></script>
    <script src="{{ asset('js/app.js') }}"></script>
 
   <script src="{{ asset('assets/js/lib/data-table/login-init.js') }}"></script>
  </body>
</html>
