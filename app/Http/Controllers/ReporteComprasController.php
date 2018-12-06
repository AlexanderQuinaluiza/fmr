<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class ReporteComprasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getReporteComprasByFechas()
    {    
        $FECHA_INICIO = $_GET['FECHA_INICIO'];
        $FECHA_FIN = $_GET['FECHA_FIN'];
        $reporteGeneralCompras = DB::select('call pGetReporteGeneralCompras(?,?)',array($FECHA_INICIO,$FECHA_FIN));
        foreach ($reporteGeneralCompras as $reporte) {
            $reporte->ITEMS=
            $this->getDetalleCompraReporte($reporte->ID_COMP);
         }
        return $reporteGeneralCompras;
    }

    public function getDetalleCompraReporte($idCompra)
    {
        $detalleCompras = 
        DB::select("call pGetReporteGeneralComprasDetalle($idCompra)");
      return $detalleCompras;
    }

    public function getReporteComprasByProductos()
    {
        $FECHA_INICIO = $_GET['FECHA_INICIO'];
        $FECHA_FIN = $_GET['FECHA_FIN'];
        $comprasXproducto = 
        DB::select('call pGetReporteComprasProductos(?,?)',array($FECHA_INICIO,$FECHA_FIN));
      return $comprasXproducto;
    }

    public function getEstadisticasCompras()
    {
        $dato = '';
        $estadisticasCompras = 
        DB::select('call pGetEstadisticasCompras()');
        foreach ($estadisticasCompras as $valor) {
            $valor->ITEMS = $this->getEstadisticasComprasByProductos($valor->name);
        }
      //return $estadisticasCompras;
      return  $estadisticasCompras;
    }

    public function getEstadisticasComprasByProductos($mes)
    {
        $estadisticasComprasproducto = 
        DB::select('call pGetEstadisticasComprasProductos(?)',array($mes));
      return $estadisticasComprasproducto;
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
