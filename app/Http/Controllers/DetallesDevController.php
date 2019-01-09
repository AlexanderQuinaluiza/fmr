<?php

namespace App\Http\Controllers;

use App\DetallesDevVentas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;
class DetallesDevController extends Controller
{
    public function __construct()
    {
       $this->middleware('auth');
    }
   
    public function getMenu(){
       // $rol=  $_GET['ROL'];
        $id=Auth::user()->ID_USU;
        $mimenu = DB::select('call spSelectMenuUser("'.$id.'")');
        //$detalles = DB::select('call spSelectDetallesFactura("'.$id.'")');

        return response()->json(['menu'=>$mimenu],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($data,$id_dev)
    {
        //ID_DET_DEV_VEN, ID_DEV_VEN, CANTIDAD, PRECIO_VEN, SUBTOTAL, PRODUCTO, OBSERVACION_DEV
        $cantidad = count($data);
        for ($i=0; $i < $cantidad ; $i++) { 
            $deDevVentas = new DetallesDevVentas;
            $deDevVentas->ID_DEV_VEN= $id_dev;
            $ID_PRO = $data[$i]['ID_PRO'];
            $CANTIDAD_PRO = $data[$i]['CANTIDAD'];
            
         
            $deDevVentas->PRODUCTO= $ID_PRO;
            $deDevVentas->CANTIDAD = $CANTIDAD_PRO;
            $deDevVentas->PRECIO_VEN = $data[$i]['PRECIO_VENTA'];
            $deDevVentas->OBSERVACION_DEV = $data[$i]['OBSERV'];
            $deDevVentas->SUBTOTAL = $data[$i]['SUBTOTAL'];
            $deDevVentas->ID_DET_VEN = $data[$i]['ID_DET_VEN'];
         
            $deDevVentas->save();
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\DetallesDevVentas  $detallesDevVentas
     * @return \Illuminate\Http\Response
     */
    public function show(DetallesDevVentas $detallesDevVentas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\DetallesDevVentas  $detallesDevVentas
     * @return \Illuminate\Http\Response
     */
    public function edit(DetallesDevVentas $detallesDevVentas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DetallesDevVentas  $detallesDevVentas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DetallesDevVentas $detallesDevVentas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DetallesDevVentas  $detallesDevVentas
     * @return \Illuminate\Http\Response
     */
    public function destroy(DetallesDevVentas $detallesDevVentas)
    {
        //
    }
}
