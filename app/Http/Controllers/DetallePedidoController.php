<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DetallePedidos;
use Illuminate\Support\Facades\DB;
class DetallePedidoController extends Controller
{
    public function index($idPedido)
    {
       // $ID_PED = $_GET['ID_PED'];
        $detallePedidos = 
        DB::select("call pGetPedidos($idPedido)");
      return $detallePedidos;
        //return response()->json(['data'=>$detallePedidos],200);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getDetalleById()
    {
      $ID_PED = (int)$_GET['ID_PED'];  
      $detallePedidos = DB::table('DETALLE_PEDIDO as dt')
      ->join('PEDIDOS as p','p.ID_PED','=','dt.ID_PED')
      ->join('PRODUCTOS as pr','pr.ID_PRO','=','dt.ID_PRO')
      ->join('MARCAS as m','m.ID_MAR','=','dt.ID_MAR')
      ->join('PRESENTACIONES as ps','ps.ID_PRS','=','dt.ID_PRS')
      ->select('dt.ID_PED','p.FECHA_PED','p.OBSERVACION_PED','p.ESTADO','m.NOMBRE_MAR','pr.NOMBRE_PRO','dt.ID_PRO',
      'ps.NOMBRE_PRS','dt.CANTIDAD_PRO')
      ->where('dt.ID_PED', '=', $ID_PED)
      ->get();
      return response()->json(['data'=>$detallePedidos],200);
     // return $detallePedidos;
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
    public function store($data,$id)
    {
        $ID_PRO=0;
        $ID_MAR=0;
        $ID_PRS=0;
        $ID_PROV=0;
        $CANTIDAD_PRO=0;
        $cantidad = count($data);
        for ($i=0; $i < $cantidad ; $i++) { 
            $detallePedido = new DetallePedidos;
            $detallePedido->ID_PED = $id;
            $ID_PRO = $data[$i]['ID_PRO'];
            $ID_MAR = $data[$i]['ID_MAR'];
            $ID_PRS = $data[$i]['ID_PRS'];
            $CANTIDAD_PRO = $data[$i]['CANTIDAD_PRO'];
            $detallePedido->ID_PRO = $ID_PRO;
            $detallePedido->ID_MAR = $ID_MAR;
            $detallePedido->ID_PRS = $ID_PRS;
            $detallePedido->CANTIDAD_PRO = $CANTIDAD_PRO;
            $detallePedido->save();
        }
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
