<?php

namespace App\Http\Controllers;

use App\Ventas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VentasController extends Controller
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
     * el metodo retorna  0 si no se encuentra abierta la caja aun,.
     *
     * @return \Illuminate\Http\Response
     */
    public function getApertura()
    {
        $id_caja = (int) $_GET['ID_CAJA'];
        $id_user= (int) $_GET['ID_USER'];
        $apertura = DB::select('call spGetApertura("'.$id_caja.'","'.$id_user.'")');
        return $apertura;
        //call spGetApertura(1,1);
    }

    public function getCabeceraFAC(){
        $id_user= (int) $_GET['ID_USER'];
        $apertura = DB::select('call spGetApertura("'.$id_caja.'","'.$id_user.'")');
        return $apertura;
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
     * @param  \App\Ventas  $ventas
     * @return \Illuminate\Http\Response
     */
    public function show(Ventas $ventas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Ventas  $ventas
     * @return \Illuminate\Http\Response
     */
    public function edit(Ventas $ventas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Ventas  $ventas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ventas $ventas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Ventas  $ventas
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ventas $ventas)
    {
        //
    }
}
