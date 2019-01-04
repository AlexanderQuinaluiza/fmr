<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DetalleDevoluciones;
use Illuminate\Support\Facades\DB;
class DetalleDevolucionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $cantidad = count($data);
        for ($i=0; $i < $cantidad ; $i++) { 
            $detalleDevolucion = new DetalleDevoluciones;
            $detalleDevolucion->ID_DEV = $id;
            $detalleDevolucion->ID_PRO = $data[$i]['ID_PRO'];
            $detalleDevolucion->CANTIDAD_PRO_DEV = $data[$i]['DEVOLVER'];
            $detalleDevolucion->SUBTOTAL_DEV = $data[$i]['SUBTOTAL'];
            //$detalleDevolucion->IVA_DEV = $data[$i]['IVA'];
            $detalleDevolucion->save();
        }
    }

    public function getDetalleById()
    {
      $ID_DEV = (int)$_GET['ID_DEV'];  
      $detalleDevolucion = DB::table('DETALLE_DEVOLUCIONES as dv')
      ->join('DEVOLUCIONES as d','d.ID_DEV','=','dv.ID_DEV')
      ->join('PRODUCTOS as pr','pr.ID_PRO','=','dv.ID_PRO')
      ->select('dv.ID_DET_DEV','pr.NOMBRE_PRO','dv.CANTIDAD_PRO_DEV',DB::raw("fGetPrecioCompraProducto(dv.ID_PRO,d.ID_COMP) as PRECIO"),"dv.SUBTOTAL_DEV")
      ->where('dv.ID_DEV', '=', $ID_DEV)
      ->get();
      return response()->json(['data'=>$detalleDevolucion],200);
    }

    
}
