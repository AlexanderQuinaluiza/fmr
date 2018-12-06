@extends('layouts.app')

@section('contenido')

                <div class="login-form" >
                    <form method="POST" action="{{ route('login') }}" >
                    {{ csrf_field() }}
                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label>Correo</label>
                            <input id="email" type="email" class="form-control" placeholder="Correo electrónico"  name="email" value="carlos@hotmail.com" required autofocus>
                            @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                            @endif
                        </div>
                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label>Contraseña</label>
                            <input type="password" name="password" id="password" class="form-control" placeholder="Contraseña" required value="universal">
                            @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                            @endif
                        </div>
                        <!-- <div class="checkbox">
                            <label class="pull-right">
                                <a href="{{ route('password.request') }}">Olvidó su contraseña?</a>
                            </label>

                        </div> -->

                    @if (Session::has('mensaje'))    
                    <div class="row" style="margin-left: 10px">
                    <div class="col-lg-12">   
                        <div class="alert alert-danger alert-dismissible">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            {{ Session::get('mensaje') }}
                        </div>
                    </div>
                    </div>
                   @endif

                        <button type="submit" id="btnLogin" class="btn btn-success btn-flat m-b-30 m-t-30">Iniciar sesión</button>
                    </form>
                </div>
@endsection
