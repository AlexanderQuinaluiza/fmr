<?php

namespace App\Http\Controllers;

use App\Categorias;
use Illuminate\Http\Request;

class CategoriasController extends Controller
{
    public function __construct()
    {
       $this->middleware('auth');
    }
    public function index()
    {  
        $categorias=Categorias::All();
        return response()->json(['data'=>$categorias],200);
    }

    public function categoriasActivas()
    {  
        $categorias=Categorias::All()->where('ESTADO_CAT','=',1);
        return response()->json(['data'=>$categorias],200);
    }


    public function categoriaById()
    {
        $id = (int) $_GET['ID_CAT'];
        $categoria = Categorias::findOrFail($id);
        return $categoria;
    }

    public function getCategoriasToFillDropDownList()
    {
      $categorias = DB::table('CATEGORIAS')->select('ID_CAT as id', 'NOMBRE_CAT as text')
      ->where('ESTADO_CAT', '<>', 0)
      ->get();
      return $categorias;
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[ 'NOMBRE_CAT'=>'required|unique:CATEGORIAS']);
        Categorias::create($request->all());
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
      $categoria = Categorias::findOrFail($request->ID_CAT);
      $categoria->NOMBRE_CAT = $request->NOMBRE_CAT;
      //$rol->DESCRIPCION_ROL = $request->DESCRIPCION_ROL;
      $categoria->ESTADO_CAT = 1;
      $categoria->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function desactivar(Request $request)
    {
     $categoria = Categorias::findOrFail($request->ID_CAT);
     $categoria->ESTADO_CAT = 0;
     $categoria->save();
    //Roles::find($request->ID_CAT)->delete();
    }
    public function activar(Request $request)
    {
     $categoria = Categorias::findOrFail($request->ID_CAT);
     $categoria->ESTADO_CAT = 1;
     $categoria->save();
    }
}
