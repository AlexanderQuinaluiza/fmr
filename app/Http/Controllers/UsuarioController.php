<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Usuarios;
use App\UsuarioRol;
use Illuminate\Support\Facades\DB;
class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
       $this->middleware('auth');
    }
    public function index()
    {
        $usuarios = DB::table('USUARIOS')->select('ID_USU', 
         'CED_RUC_USU','NOMBRE_USU',
        'APELLIDO_USU','ESTADO_USU')
        ->get();
      return response()->json(['data'=>$usuarios],200);
    }
    public function usuarioById()
    {
        $id = (int) $_GET['ID_USU'];
        $usuario = Usuarios::findOrFail($id);
      return $usuario;
    }

    public function getNombreRolByUsuario()
    {
        $ID_USU = $_GET['ID_USU'];
        $nombreRol = DB::table('ROLES as r')->select('r.NOMBRE_ROL')
        ->join('USUARIO_ROLES as u','u.ID_ROL','=','r.ID_ROL')
        ->where('u.ID_USU','=',$ID_USU)
        ->limit(1)
        ->get();
        return $nombreRol[0]->NOMBRE_ROL;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $usuario = new Usuarios;
        $usuario->CED_RUC_USU = $request->CED_RUC_USU;
        $usuario->NOMBRE_USU = $request->NOMBRE_USU;
        $usuario->APELLIDO_USU = $request->APELLIDO_USU;
        $usuario->TELEFONO_USU = $request->TELEFONO_USU;
        $usuario->ALIAS_USU = $request->ALIAS_USU;
        $passwordEncrypt = bcrypt($request->CLAVE_USU);  
        $usuario->CLAVE_USU = $passwordEncrypt;
        $usuario->DIRECCION_USU = $request->DIRECCION_USU;
        $usuario->CORREO_USU = $request->CORREO_USU;
        $usuario->ESTADO_USU = 1;
        
        $usuario->save();
       foreach ($request->ROLES_USU as $value) {          
               $this->registrarUsuarioRol((int)$value,(int)$usuario->ID_USU);
        }
        return $usuario;
    }
    public function registrarUsuarioRol($idRol,$idUsuario)
    {
        $usuarioRol = new UsuarioRol;
        $usuarioRol->ID_ROL = $idRol;
        $usuarioRol->ID_USU = $idUsuario;
        $usuarioRol->save();
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
        $usuario = Usuarios::findOrFail($request->ID_USU);
        $usuario->CED_RUC_USU = $request->CED_RUC_USU;
        $usuario->NOMBRE_USU = $request->NOMBRE_USU;
        $usuario->APELLIDO_USU = $request->APELLIDO_USU;
        $usuario->TELEFONO_USU = $request->TELEFONO_USU;
        $usuario->ALIAS_USU = $request->ALIAS_USU;
        //$usuario->CLAVE_USU = $request->CLAVE_USU;
        $usuario->DIRECCION_USU = $request->DIRECCION_USU;
        $usuario->CORREO_USU = $request->CORREO_USU;
        $usuario->save();
        foreach ($request->ROLES_USU as $rol) 
        {
            $existeUsuarioRol = $this->existenEnUsuarioRoles((int)$usuario->ID_USU,(int)$rol);
            if((int)$existeUsuarioRol==0) //usuario ni rol esta en tabla USUARIOS_ROL
            {
                $this->registrarUsuarioRol((int)$rol,(int)$usuario->ID_USU);
            }
        }
        $dat = '';
        //obtiene los roles que tiene asignado a un determinado usuario
        $stringUsuarioRol = $this->getStringUsuarioRol((int)$usuario->ID_USU);
        $arrayUsuarioRol = explode(",",$stringUsuarioRol);
        if(!empty($arrayUsuarioRol)) //si el array no esta vacío
        {
            for($i=0;$i<count($arrayUsuarioRol);$i++)
            {
                $dat = $arrayUsuarioRol[$i]; //toma el id del rol

                if(!in_array($dat, $request->ROLES_USU)) //usuario ni rol esta en tabla USUARIOS_ROL
                {
                    DB::table('USUARIO_ROLES')
                    ->where('ID_ROL', '=', (int)$dat)
                    ->where('ID_USU', '=', (int)$usuario->ID_USU)
                    ->delete();         // return $idRol;        
                }
            }       
        }
        else
        {
            $dat = $stringUsuarioRol;
            if((int)$dat>0)
            {
                DB::table('USUARIO_ROLES')
                ->where('ID_ROL', '=', (int)$dat)
                ->where('ID_USU', '=', (int)$usuario->ID_USU)
                ->delete();         // return $idRol;
            }         
        }
        return $dat;
    }

    public function existenEnUsuarioRoles($idUsuario,$idRol)
    {
        $roles = DB::select("SELECT verificarSiTieneRol($idUsuario,$idRol) as existe");
        return $roles[0]->existe;

    }

    public function getStringUsuarioRol($idusuario)
    {
        $usuarioRoles =  DB::select("SELECT getRolesUsuario($idusuario) as roles");
        return $usuarioRoles[0]->roles;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function actualizarClave(Request $request)
    {
     $usuario = Usuarios::findOrFail($request->ID_USU);
     $passwordEncrypt = bcrypt($request->CLAVE_USU); 
     $usuario->CLAVE_USU = $passwordEncrypt;
     $usuario->save();
    // Roles::find($request->ID_ROL)->delete();
    }
   
    public function desactivar(Request $request)
    {
     $usuario = Usuarios::findOrFail($request->ID_USU);
     $usuario->ESTADO_USU = 0;
     $usuario->save();
     //Usuarios::find($request->ID_USU)->delete();
    }
    public function activar(Request $request)
    {
     $usuario = Usuarios::findOrFail($request->ID_USU);
     $usuario->ESTADO_USU = 1;
     $usuario->save();
    }
}
