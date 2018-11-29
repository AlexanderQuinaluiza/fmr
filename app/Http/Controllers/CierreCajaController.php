<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CierreCaja;
use DB;
class CierreCajaController extends Controller
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
    public function store(Request $request)
    {
        $cierreCaja = new CierreCaja;
        $cierreCaja->ID_CAJA = $request->ID_CAJA;
        $cierreCaja->ID_USU = $request->ID_USU;
        $cierreCaja->DEPOSITO = $request->DEPOSITO;
        $cierreCaja->ESTADO_CCJ = 0;
        $cierreCaja->save();
        return $cierreCaja;
    }

    public function getTotalVendidoPorUsuario()
    {
        $ID_USU = $_GET['ID_USU'];
        $totalVentas = DB::select("SELECT fGetTotalVentasByUsuario($ID_USU) as total");
        return 1050.55;//$totalVentas[0]->total;
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $cierreCaja = CierreCaja::findOrFail($request->ID_CCJ);
        $cierreCaja->DESC_CCJ = $request->DESC_CCJ;
        $cierreCaja->CALCULADO_CCJ = $request->CALCULADO_CCJ;
        $cierreCaja->DIFERENCIA_CCJ = $request->DIFERENCIA_CCJ;
        $cierreCaja->RETIRO_CCJ = $request->RETIRO_CCJ;
        $cierreCaja->FECHA_CIERRE_CCJ = $request->FECHA_CIERRE_CCJ;
        $cierreCaja->ESTADO_CCJ = 1;
        $cierreCaja->save();
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
