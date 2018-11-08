<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Marcas;
class MarcaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $marcas = Marcas::All();
        return response()->json(['data'=>$marcas],200);
    }

    public function marcasActivas()
    {
        $marcas = Marcas::All()->where('ESTADO_MAR','=',1);
        return response()->json(['data'=>$marcas],200);
    }

    public function marcaById()
    {
        $id = (int) $_GET['ID_MAR'];
        $marca = Marcas::findOrFail($id);
        return $marca;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $marca = new Marcas;
        $marca->NOMBRE_MAR = $request->NOMBRE_MAR;
        $marca->ESTADO_MAR = 1;
        $marca->save();
        return $marca;
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
        $marca = Marcas::findOrFail($request->ID_MAR);
        $marca->NOMBRE_MAR = $request->NOMBRE_MAR;
        $marca->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function desactivar(Request $request)
    {
     $marca = Marcas::findOrFail($request->ID_MAR);
     $marca->ESTADO_MAR = 0;
     $marca->save();
     //Presentaciones::find($request->ID_PRS)->delete();
    }
    public function activar(Request $request)
    {
     $marca = Marcas::findOrFail($request->ID_MAR);
     $marca->ESTADO_MAR = 1;
     $marca->save();
    }
}
