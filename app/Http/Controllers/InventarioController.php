<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Inventarios;
use Illuminate\Support\Facades\DB;
class InventarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getInventarioByProducto()
    {
        $ID_PRO = $_GET['ID_PRO'];
        $inventarios = DB::table('INVENTARIOS')
        ->select('ID','ID_PRO','ID_TIPO','DOC_REFERENCIA','DESCRIPCION',
        DB::raw('DATE(FECHA_COM) as FECHA_COM'),'CANTIDAD_PRO','VALOR','TOTAL','TIPO_ITEM',
        DB::raw(' IFNULL( CANTIDAD_EXIST, 0 ) AS CANTIDAD_EXIST'),
        DB::raw(' IFNULL( VALOR_EXIST, 0 ) AS VALOR_EXIST'),
        DB::raw(' IFNULL( TOTAL_EXIST, 0 ) AS TOTAL_EXIST')
        )
        ->where('ID_PRO','=',$ID_PRO)
        ->orderBy('ID','ASC')
        ->get();
        //$inventarios = Inventarios::All()->where('ID_PRO','=',$ID_PRO);
        return response()->json(['data'=>$inventarios],200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
