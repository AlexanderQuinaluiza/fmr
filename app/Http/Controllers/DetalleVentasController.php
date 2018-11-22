<?php

namespace App\Http\Controllers;

use App\DetalleVentas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class DetalleVentasController extends Controller
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
        //
        $cantidad = count($data);
        for ($i=0; $i < $cantidad ; $i++) { 
            $detalleVentas = new DetalleVentas;
            $detalleVentas->ID_VEN= $id;
            $ID_PRO = $data[$i]['ID_PRO'];
            $CANTIDAD_PRO = $data[$i]['CANTIDAD'];
            //$ID_MAR = $data[$i]['ID_MAR'];
            //$ID_PRS = $data[$i]['ID_PRS'];
            //$ID_PROV = $data[$i]['ID_PROV'];
            //$CANTIDAD_PRO = $data[$i]['CANTIDAD_PRO'];
            $detalleVentas->ID_PRO = $ID_PRO;
            $detalleVentas->CANTIDAD_PRO = $CANTIDAD_PRO;
            //$detalleDescuento->ID_MAR = $ID_MAR;
            //$detalleDescuento->ID_PRS = $ID_PRS;
            //$detalleDescuento->ID_PROV = $ID_PROV;
            //$detalleDescuento->CANTIDAD_PRO = $CANTIDAD_PRO;
            $detalleDescuento->save();
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\DetalleVentas  $detalleVentas
     * @return \Illuminate\Http\Response
     */
    public function show(DetalleVentas $detalleVentas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\DetalleVentas  $detalleVentas
     * @return \Illuminate\Http\Response
     */
    public function edit(DetalleVentas $detalleVentas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DetalleVentas  $detalleVentas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DetalleVentas $detalleVentas)
    {
        //
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
