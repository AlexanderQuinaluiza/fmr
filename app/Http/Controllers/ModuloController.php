<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Modulos;
class ModuloController extends Controller
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
        $modulos = Modulos::All();    
        return response()->json(['data'=>$modulos],200);
    }

    public function modulosActivos()
    {
        $modulos = Modulos::All()->where('ESTADO_MOD','>',0);    
        return $modulos;
    }

    public function moduloById()
    {
        $id = (int) $_GET['ID_MOD'];
        $modulo = Modulos::findOrFail($id);
        return $modulo;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $modulo = new Modulos;
        $modulo->NOMBRE_MOD = $request->NOMBRE_MOD;
        $modulo->ICONO_MOD = $request->ICONO_MOD;
        $modulo->URL_MOD = $request->URL_MOD;
        $modulo->ESTADO_MOD = 1;
        $modulo->save();
        return $modulo;
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
        $modulo = Modulos::findOrFail($request->ID_MOD);
        $modulo->NOMBRE_MOD = $request->NOMBRE_MOD;
        $modulo->ICONO_MOD = $request->ICONO_MOD;
        $modulo->URL_MOD = $request->URL_MOD;
        $modulo->save();
    }

    public function desactivar(Request $request)
    {
     $presentacion = Modulos::findOrFail($request->ID_MOD);
     $presentacion->ESTADO_MOD = 0;
     $presentacion->save();
     //Modulos::find($request->ID_MOD)->delete();
    }
    public function activar(Request $request)
    {
     $presentacion = Modulos::findOrFail($request->ID_MOD);
     $presentacion->ESTADO_MOD = 1;
     $presentacion->save();
    }
}
