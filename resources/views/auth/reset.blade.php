@extends('layouts.app')

@section('contenido')

                <div class="login-form" >
                    <form method="POST" action="reset" >
                    {{ csrf_field() }}
                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label>Correo</label>
                            <input id="email" type="email" class="form-control" placeholder="Correo electrónico"  name="email" value="" required autofocus 
                            title="Ingrese el correo con el que fue registrado en el sistema">
                            @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                            @endif
                        </div>
                        <div class="checkbox">
                            <label class="pull-left">
                                <p style="color:#5cb85c;align-text:justify;font-weight:bold"> Un correo electrónico será enviado a su bandeja de entrada, 
                                con una nueva contraseña para el inicio de sesión. </p>
                            </label>

                        </div>
                        <a href="login"><li class="fa fa-arrow-left"></li> Atrás</a>
<br>
                    @if (Session::has('mensaje'))    
                    <div class="row" style="margin-left: 10px">
                    <div class="col-lg-12">   
                        <div class="alert alert-success alert-dismissible">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            {{ Session::get('mensaje') }}
                        </div>
                    </div>
                    </div>
                   @endif
                   @if (Session::has('mensaje-error'))    
                    <div class="row" style="margin-left: 10px">
                    <div class="col-lg-12">   
                        <div class="alert alert-danger alert-dismissible">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            {{ Session::get('mensaje-error') }}
                        </div>
                    </div>
                    </div>
                   @endif
<br>
                        <button type="submit" id="btnLogin" class="btn btn-primary btn-flat m-b-30 m-t-30">Restablecer contraseña</button>
                    </form>
                </div>
@endsection
