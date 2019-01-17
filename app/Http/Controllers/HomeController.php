<?php

namespace App\Http\Controllers;
use Auth;
use Session;
use Redirect;
use Illuminate\Http\Request;
use App\Usuarios;
use Illuminate\Support\Facades\Mail;
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

   public function getResetPassword()
   {
      return view('auth/reset');
   }
   public function setResetPassword(Request $request)
   {
    $randomString = $this->generateRandomString();
    $CORREO = $request->email;
    $ALIAS_USU = '';
    $usuario = Usuarios::All()
    ->where('CORREO_USU','=',$CORREO)
    ->take(1);
    $estado = 0;
    if(count($usuario)>0)
    {
        
        try
        {
        $ALIAS_USU = '';
        $USUARIO = '';
        $PASSWORD = '';
        $USUARIO_ID = 0;
        foreach ($usuario as $user) {
            $ALIAS_USU = $user->ALIAS_USU;
            $USUARIO = $user->NOMBRE_USU." ".$user->APELLIDO_USU;
            $PASSWORD = $ALIAS_USU.$randomString;
            $USUARIO_ID = $user->ID_USU;
         }
         //Actualizar contraseña de usuario
         $usuario_ = Usuarios::findOrFail($USUARIO_ID);
         $passwordEncrypt = bcrypt($PASSWORD); 
         $usuario_->CLAVE_USU = $passwordEncrypt;
         $usuario_->save();
        $data = array('name'=>"Farmacia Solidaria",
        'usuario'=>$USUARIO,
        'correo'=>$CORREO,
        'alias'=>$ALIAS_USU,
        'password'=>$PASSWORD);
        Mail::send('mails.name', $data, function($message) use($data) {
           $message->to($data['correo'], $data['usuario'])->subject
              ('Contraseña nueva para inicio de sesión')
              ->setBody('<h2>Hola, esta es tu nueva contraseña para el inicio de sesión:</h2>'.
              '<h1 style="color:#5cb85c">'.$data['password'].'</h1>', 'text/html');
           $message->from(env('MAIL_USERNAME'),'Farmacia Solidaria');
        });
        $estado = 1;
        }catch(\Exception $e)
        {
            $estado = 0;
        }
        
    }

    if($estado==0)
    {
        Session::flash('mensaje-error', 'No ha sido posible enviar el correo electrónico con la nueva contraseña a la siguiente dirección: '.$CORREO.' Recuerde que solo se podra enviar el código al correo que fue ingresado en el sistema.');
        return redirect("reset");
    }
    else
    {
        Session::flash('mensaje', 'Se ha enviado un correo electrónico con la nueva contraseña a la siguiente dirección: '.$CORREO);
        return redirect("reset");
    }
   }
   function generateRandomString() 
   {
    $length = 4;
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
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
