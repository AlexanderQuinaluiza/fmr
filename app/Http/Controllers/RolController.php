<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Roles;
use Illuminate\Support\Facades\DB;
include ("ConfiguracionController.php");
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[ 'NOMBRE_ROL'=>'required|unique:ROLES', 'DESCRIPCION_ROL'=>'required']);
        Roles::create($request->all());
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
