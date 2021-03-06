<?php

namespace App\Http\Controllers;

use App\DetalleVentas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class DetalleVentasController extends Controller
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
        //
        $cantidad = count($data);
        for ($i=0; $i < $cantidad ; $i++) { 
            $detalleVentas = new DetalleVentas;
            $detalleVentas->ID_VEN= $id;
            $ID_PRO = $data[$i]['ID_PRO'];
            $CANTIDAD_PRO = $data[$i]['CANTIDAD'];
            
         
            $detalleVentas->ID_PRO = $ID_PRO;
            $detalleVentas->CANTIDAD_PRO = $CANTIDAD_PRO;
            $detalleVentas->PRECIO_VEN = $data[$i]['PRECIO_VENTA'];
            $detalleVentas->AHORRO = $data[$i]['AHORRO'];
            $detalleVentas->SUBTOTAL = $data[$i]['SUBTOTAL'];
         
            $detalleVentas->save();
        }


    }

  
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DetalleVentas  $detalleVentas
     * @return \Illuminate\Http\Response
     */
    public function destroy(DetalleVentas $detalleVentas)
    {
        //
    }
}
