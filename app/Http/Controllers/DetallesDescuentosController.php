<?php

namespace App\Http\Controllers;

use App\DetallesDescuentos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class DetallesDescuentosController extends Controller
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
        $ID_PRO=0;
        $ID_MAR=0;
        $ID_PRS=0;
        $ID_PROV=0;
        $CANTIDAD_PRO=0;
        $cantidad = count($data);
        for ($i=0; $i < $cantidad ; $i++) { 
            $detalleDescuento = new DetallesDescuentos;
            $detalleDescuento->ID_DESC = $id;
            $ID_PRO = $data[$i]['ID_PRO'];
            //$ID_MAR = $data[$i]['ID_MAR'];
            //$ID_PRS = $data[$i]['ID_PRS'];
            //$ID_PROV = $data[$i]['ID_PROV'];
            //$CANTIDAD_PRO = $data[$i]['CANTIDAD_PRO'];
            $detalleDescuento->ID_PRO = $ID_PRO;
            
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
     * @param  \App\DetallesDescuentos  $detallesDescuentos
     * @return \Illuminate\Http\Response
     */
    public function show(DetallesDescuentos $detallesDescuentos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\DetallesDescuentos  $detallesDescuentos
     * @return \Illuminate\Http\Response
     */
    public function edit(DetallesDescuentos $detallesDescuentos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DetallesDescuentos  $detallesDescuentos
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DetallesDescuentos $detallesDescuentos)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DetallesDescuentos  $detallesDescuentos
     * @return \Illuminate\Http\Response
     */
    public function destroy(DetallesDescuentos $detallesDescuentos)
    {
        //
    }
}
