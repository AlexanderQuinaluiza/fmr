<?php

namespace App\Http\Controllers;
use Auth;
use Session;
use Redirect;
use Illuminate\Http\Request;
use App\Usuarios;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
       //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Auth::check())
        {
         
            return view("contenido/contenido");
        }
   	return redirect("login");
    }

    public function logout()
   {
      Auth::logout();
      return Redirect::to('login');
   }
    public function login(Request $request)
    {
        $inicioSesion = Auth::attempt(['CORREO_USU'=>$request->email,'CLAVE_USU'=>$request->password,'ESTADO_USU' => '1'] );
        if($inicioSesion)
        {
            
            $userId = Auth::id();
            $usuario = Usuarios::findOrFail($userId);   
            return redirect("home");               
        }
        else 
         {           
            Session::flash('mensaje', 'Credenciales incorrectas!');
           return redirect("login");
         }
    }
    
}
