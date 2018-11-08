<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Usuarios;
use App\UsuarioRol;
use Illuminate\Support\Facades\DB;

include ("ConfiguracionController.php");
class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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
        $password = Hash::make($request->CLAVE_USU);
        $usuario->CLAVE_USU = $password;
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
            //$this->registrarUsuarioRol((int)$value,(int)$usuario->ID_USU);
           // echo $value;
         
         //echo "$key => $value\n";
        }
        $dat = '';
        $stringUsuarioRol = $this->getStringUsuarioRol((int)$usuario->ID_USU);
        $arrayUsuarioRol = explode(",",$stringUsuarioRol);
        if(!empty($arrayUsuarioRol))
        {
            for($i=0;$i<count($arrayUsuarioRol);$i++)
        {
            $dat = $arrayUsuarioRol[$i];

            if(in_array($dat, $request->ROLES_USU)) //usuario ni rol esta en tabla USUARIOS_ROL
            {
             
            }
            else{
                DB::table('USUARIO_ROLES')
                ->where('ID_ROL', '=', (int)$rol)
                ->where('ID_USU', '=', (int)$usuario->ID_USU)
                ->delete();         // return $idRol;

            }
           
        }
            
        }
        else
        {
            $dat = $stringUsuarioRol;
            DB::table('USUARIO_ROLES')
            ->where('ID_ROL', '=', (int)$stringUsuarioRol)
            ->where('ID_USU', '=', (int)$usuario->ID_USU)
            ->delete();         // return $idRol;

        }
        
        
        
        //$someJSON = json_encode($datos);
        // Replace ... with your PHP Object
       
       


        return $dat;
        //$this->getArrayUsuarioRol((int)$usuario->ID_USU) as $idRol
      /**  foreach ($this->getArrayUsuarioRol((int)$usuario->ID_USU) as $idRol) 
        {
          //  $existeUsuarioRol = $this->existenEnUsuarioRoles((int)$usuario->ID_USU,(int)$rol);
          //  in_array("Irix", $request->ROLES_USU)
            
            if(!in_array($idRol, $request->ROLES_USU)) //usuario ni rol esta en tabla USUARIOS_ROL
            {
              DB::table('USUARIO_ROLES')
                ->where('ID_ROL', '=', (int)$idRol[0]->rol)
                ->where('ID_USU', '=', (int)$usuario->ID_USU)
                ->delete();*            // return $idRol;
               // $this->registrarUsuarioRol((int)$rol,(int)$usuario->ID_USU);
            }
        }*/
    }

    public function existenEnUsuarioRoles($idUsuario,$idRol)
    {
        //$idUsuario,$idRol
        //$queries = DB::select("tiene_parametro_ficha($param, $id_est)");
        $roles = DB::select("SELECT verificarSiTieneRol($idUsuario,$idRol) as existe");
        return $roles[0]->existe;

    }

    public function getStringUsuarioRol($idusuario)
    {
        $usuarioRoles =  DB::select("SELECT getRolesUsuario($idusuario) as roles");
        
      /**  DB::table('USUARIO_ROLES as usr')
            ->join('ROLES as r', 'usr.ID_ROL', '=', 'r.ID_ROL')
            ->join('USUARIOS as u', 'usr.ID_USU', '=', 'u.ID_USU')
            ->select('r.ID_ROL as rol')
            ->where('u.ID_USU', '=', $idUsuario)
            ->get();*/
            //json_decode($ssData, true);
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
     $usuario->CLAVE_USU = $request->CLAVE_USU;
     $usuario->save();
    // Roles::find($request->ID_ROL)->delete();
    }
   
    public function desactivar(Request $request)
    {
     $usuario = Usuarios::findOrFail($request->ID_USU);
     $usuario->ESTADO_USU = 0;
     $usuario->save();
    // Roles::find($request->ID_ROL)->delete();
    }
    public function activar(Request $request)
    {
     $usuario = Usuarios::findOrFail($request->ID_USU);
     $usuario->ESTADO_USU = 1;
     $usuario->save();
    }
}
