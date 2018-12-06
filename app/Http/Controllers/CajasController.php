<?php

namespace App\Http\Controllers;

use App\Cajas;
use Illuminate\Http\Request;
use DB;
class CajasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cajas = DB::table('CAJAS')
        ->join('AGENCIAS', 'CAJAS.ID_AGE' ,'=','AGENCIAS.ID_AGE' )                  
       ->select('ID_CAJA', 'CAJAS.ID_AGE','AGENCIAS.NOMBRE_AGE as AGENCIA', 'DESCRIPCION_CAJA', 'ESTADO')
       ->where( 'AGENCIAS.ESTADO_AGE','=',1)  
       ->orderBy('ID_CAJA','desc')
       ->get();
       return response()->json(['data'=>$cajas],200);
    }
    public function onlyAgencias(){
        $agencias = DB::table('AGENCIAS')
        ->select('ID_AGE', 'NOMBRE_AGE')
       ->where( 'AGENCIAS.ESTADO_AGE','=',1)  
       ->get();
       return response()->json(['data'=>$agencias],200);

    }

    public function getCajasParaApertura()
    {
       $cajas = DB::table('CAJAS')                
       ->select('ID_CAJA', 'ID_AGE', 'DESCRIPCION_CAJA', 'ESTADO',
       DB::raw("fGetDisponibleCajaAbrir(ID_CAJA) AS DISPONIBLE_ABRIR"))
       ->where( 'ESTADO','=',1)  
       ->orderBy('ID_CAJA','desc')
       ->get();
       return response()->json(['data'=>$cajas],200);
    }

    public function getCajasParaCierre()
    {
       $cajas = DB::table('CIERRE_CAJA as c')
        ->select('c.ID_CCJ','c.ID_CAJA','cj.DESCRIPCION_CAJA as CAJA','c.ID_USU')
        ->join('CAJAS as cj','c.ID_CAJA','=','cj.ID_CAJA')
        ->where('c.ESTADO_CCJ', '=', 0)
        ->orderBy('c.ID_CAJA','desc')
        ->get();
       return response()->json(['data'=>$cajas],200);
    }

    public function store(Request $request)
    {
        $this->validate($request,[ 'DESCRIPCION_CAJA'=>'required|unique:CAJAS','ID_AGE'=>'required']);
        Cajas::create($request->all());
    }

    public function  cajasbyid(){
        $id = (int) $_GET['ID_CAJA'];
        $cajas = Cajas::findOrFail($id);
        return $cajas;
    }
    

    public function update(Request $request)
    {
      $cajas = Cajas::findOrFail($request->ID_CAJA);
      $cajas->DESCRIPCION_CAJA = $request->DESCRIPCION_CAJA;
      $cajas->ID_AGE= $request->ID_AGE;
      //$rol->DESCRIPCION_ROL = $request->DESCRIPCION_ROL;
     // $cajas->ESTADO = 1;
      $cajas->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function desactivar(Request $request)
    {
     $categoria = Cajas::findOrFail($request->ID_CAJA);
     $categoria->ESTADO = 0;
     $categoria->save();
    //Roles::find($request->ID_CAT)->delete();
    }
    public function activar(Request $request)
    {
     $categoria = Cajas::findOrFail($request->ID_CAJA);
     $categoria->ESTADO = 1;
     $categoria->save();
    }
   
}
