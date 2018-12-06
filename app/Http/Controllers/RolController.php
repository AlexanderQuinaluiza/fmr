<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Roles;
use App\OpcionRoles;
use Illuminate\Support\Facades\DB;
class RolController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {  
        $roles=Roles::All();
        return response()->json(['data'=>$roles],200);
    }

    public function rolById()
    {
        $id = (int) $_GET['ID_ROL'];
        $rol = Roles::findOrFail($id);
        return $rol;
    }

    public function getRolesToFillDropDownList()
    {
      $roles = DB::table('ROLES')->select('ID_ROL as id', 'NOMBRE_ROL as text')
      ->where('ESTADO_ROL', '<>', 0)
      ->get();
      return $roles;
    }

    public function getRolesUpdateToFillDropDownList()
    {
      $usuario = (int) $_GET['ID_USU'];
      $roles = DB::table('ROLES as r')
      ->select('r.ID_ROL as id', 'r.NOMBRE_ROL as text',DB::raw("verificarSiTieneRol($usuario,r.ID_ROL) as selected"))
      ->get();
      return response()->json($roles);   
    }

    public function existenEnOpcionRoles($idModulo,$idRol)
    {
        $modulos = DB::select("SELECT verificarSiTieneModulo($idRol,$idModulo) as existe");
        return $modulos[0]->existe;

    }

    public function getStringOpcionesRol($idRol)
    {
        $opcionesRol =  DB::select("SELECT getOpcionesRol($idRol) as modulos");
        return $opcionesRol[0]->modulos;
    }

    public function getModulosDeRol()
    {
        $idRol = (int)$_GET['ID_ROL'];
        $modulosDeRol = DB::table('OPCION_ROLES as op')
        ->join('MODULOS as m','m.ID_MOD','=','op.ID_MOD')
        ->join('ROLES as r','r.ID_ROL','=','op.ID_ROL')
        ->select('m.NOMBRE_MOD as modulo','r.NOMBRE_ROL as rol')
        ->where('op.ID_ROL', '=', $idRol)
        ->get();
        return response()->json(['data'=>$modulosDeRol],200);
    }

    public function getModulosUpdate()
    {
      $rol = (int) $_GET['ID_ROL'];
      $modulos = DB::table('MODULOS as m')
      ->select('m.ID_MOD as id', 'm.NOMBRE_MOD as text',DB::raw("verificarSiTieneModulo($rol,m.ID_MOD) as selected"))
      ->get();
      return response()->json($modulos);   
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rol = new Roles;
        $rol->NOMBRE_ROL = $request->NOMBRE_ROL;
        $rol->DESCRIPCION_ROL = $request->DESCRIPCION_ROL;
        $rol->ESTADO_ROL = 1;
        $rol->save();
        foreach ($request->MODULOS_ROL as $value) {          
                $this->registrarOpcionesRol((int)$value,(int)$rol->ID_ROL);
            }
        return $rol;
    
    }

    public function registrarOpcionesRol($idModulo,$idRol)
    {
        $opcionRol = new OpcionRoles;
        $opcionRol->ID_MOD = $idModulo;
        $opcionRol->ID_ROL = $idRol;
        $opcionRol->save();
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
      $rol = Roles::findOrFail($request->ID_ROL);
      $rol->NOMBRE_ROL = $request->NOMBRE_ROL;
      $rol->DESCRIPCION_ROL = $request->DESCRIPCION_ROL;
      $rol->save();

        foreach ($request->MODULOS_ROL as $modulo) 
        {
            $existeOpcionRol = $this->existenEnOpcionRoles((int)$modulo,(int)$rol->ID_ROL);
            if((int)$existeOpcionRol==0) //modulo ni rol esta en tabla OPCION_ROLES
            {
                $this->registrarOpcionesRol((int)$modulo,(int)$rol->ID_ROL);
            }
        }
        $dat = '';
        //obtiene los módulos que tiene asignado un determinado rol
        $stringOpcionRoles = $this->getStringOpcionesRol((int)$rol->ID_ROL);
        $arrayOpcionRol = explode(",",$stringOpcionRoles);
        if(!empty($arrayOpcionRol)) //si el array no esta vacío
        {
            for($i=0;$i<count($arrayOpcionRol);$i++)
            {
                $dat = $arrayOpcionRol[$i]; //toma el id del modulo
                if(!in_array($dat, $request->MODULOS_ROL)) 
                {
                    DB::table('OPCION_ROLES')
                    ->where('ID_MOD', '=', (int)$dat)
                    ->where('ID_ROL', '=', (int)$rol->ID_ROL)
                    ->delete();              
                }         
            }    
        }
        else
        {
            $dat = $stringOpcionRoles; 
            if((int)$dat>0)
            {
                DB::table('OPCION_ROLES')
                ->where('ID_MOD', '=', (int)$dat)
                ->where('ID_ROL', '=', (int)$rol->ID_ROL)
                ->delete();
            }        
        }
        return $dat;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function desactivar(Request $request)
    {
     $rol = Roles::findOrFail($request->ID_ROL);
     $rol->ESTADO_ROL = 0;
     $rol->save();
    //Roles::find($request->ID_ROL)->delete();
    }
    public function activar(Request $request)
    {
     $rol = Roles::findOrFail($request->ID_ROL);
     $rol->ESTADO_ROL = 1;
     $rol->save();
    }
}
