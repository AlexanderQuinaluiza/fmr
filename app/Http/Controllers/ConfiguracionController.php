<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Configuraciones;
class ConfiguracionController extends Controller
{
    public function __construct()
    {
       $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $configuraciones = Configuraciones::All();
        return response()->json(['data'=>$configuraciones],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $config = Configuraciones::findOrFail($request->NOMBRE_CONF);
        $config->VALOR_CONF = $request->VALOR_CONF;
     
        // switch ($request->NOMBRE_CONF) {
        //     case 'driver correo':
        //                 Config::set('MAIL_DRIVER', $config->VALOR_CONF);
        //         break;
        //     case 'host correo':
        //                 Config::set('MAIL_HOST', $config->VALOR_CONF);
        //         break;
        //     case 'puerto correo':
        //                 Config::set('MAIL_PORT', $config->VALOR_CONF);
        //         break; 
        //     case 'usuario correo':
        //                 Config::set('MAIL_USERNAME', $config->VALOR_CONF);
        //         break;           
        //     case 'contraseña correo':
           
        //     Config::set('MAIL_PASSWORD', $config->VALOR_CONF);
        //         break;
        //     default:
        //         # code...
        //         break;
        // }
           $config->save();
    }

    public static function changeEnvironmentVariable($key,$value)
    {
        $path = base_path('.env');
    
        if(is_bool(env($key)))
        {
            $old = env($key)? 'true' : 'false';
        }
        elseif(env($key)===null){
            $old = 'null';
        }
        else{
            $old = env($key);
        }
    
        if (file_exists($path)) {
            file_put_contents($path, str_replace(
                "$key=".$old, "$key=".$value, file_get_contents($path)
            ));
        }
    }

    public function getSetting()
    {   
        $valueReturn = '';
        try
        {
            $clave = $_GET['setting'];
            $configuracion = Configuraciones::where('NOMBRE_CONF','=', $clave)
            ->take(1)
            ->get();
            $valueReturn = $configuracion[0]->VALOR_CONF;
        }catch(\Exception $e)
        {
           $valueReturn = '';
        }
        return $valueReturn;
    }
}
