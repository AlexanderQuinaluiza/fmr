<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Presentaciones;
class PresentacionController extends Controller
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
        $presentaciones = Presentaciones::All();
        return response()->json(['data'=>$presentaciones],200);
    }

    public function presentacionesActivas()
    {
        $presentaciones = Presentaciones::All()->where('ESTADO_PRS','=',1);
        return response()->json(['data'=>$presentaciones],200);
    }

    public function presentacionById()
    {
        $id = (int) $_GET['ID_PRS'];
        $presentacion = Presentaciones::findOrFail($id);
        return $presentacion;
    }

   
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $presentacion = new Presentaciones;
        $presentacion->NOMBRE_PRS = $request->NOMBRE_PRS;
        $presentacion->ESTADO_PRS = 1;
        $presentacion->save();
        return $presentacion;
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
      $presentacion = Presentaciones::findOrFail($request->ID_PRS);
      $presentacion->NOMBRE_PRS = $request->NOMBRE_PRS;
      $presentacion->save();
    }

    public function desactivar(Request $request)
    {
     $presentacion = Presentaciones::findOrFail($request->ID_PRS);
     $presentacion->ESTADO_PRS = 0;
     $presentacion->save();
     //Presentaciones::find($request->ID_PRS)->delete();
    }
    public function activar(Request $request)
    {
     $presentacion = Presentaciones::findOrFail($request->ID_PRS);
     $presentacion->ESTADO_PRS = 1;
     $presentacion->save();
    }
}
