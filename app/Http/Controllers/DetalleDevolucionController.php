<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DetalleDevoluciones;
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
            $detalleDevolucion->CANTIDAD_PRO_DEV = $data[$i]['DEVUELTO'];
            $detalleDevolucion->SUBTOTAL_DEV = $data[$i]['SUBTOTAL'];
            $detalleDevolucion->IVA_DEV = $data[$i]['IVA'];
            $detalleDevolucion->save();
        }
    }

    
}
