<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CierreCaja;
use DB;
use Auth;
class CierreCajaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$cierreCajas = CierreCaja::All()->where('ESTADO_CCJ','=',1);    
        $cierreCajas =  DB::table('CIERRE_CAJA as c')
        ->select('c.ID_CCJ','c.FECHA_CIERRE_CCJ','cj.DESCRIPCION_CAJA as CAJA','u.NOMBRE_USU','u.APELLIDO_USU',
        'c.CONTADO_CCJ','c.CALCULADO_CCJ','c.DIFERENCIA_CCJ')
        ->join('CAJAS as cj','c.ID_CAJA','=','cj.ID_CAJA')
        ->join('USUARIOS as u','c.ID_USU','=','u.ID_USU')
        ->where('c.ESTADO_CCJ', '=', 1)
        ->get();
        return response()->json(['data'=>$cierreCajas],200);
    }

    public function getCierreCajaById()
    {
        $ID_CCJ = $_GET['ID_CCJ'];
        $cierreCajas =  DB::table('CIERRE_CAJA as c')
        ->select('c.ID_CCJ','c.FECHA_CIERRE_CCJ','cj.DESCRIPCION_CAJA as CAJA','u.NOMBRE_USU','u.APELLIDO_USU',
        'c.DEPOSITO','c.CONTADO_CCJ','c.CALCULADO_CCJ','c.DIFERENCIA_CCJ',
        'c.RETIRO_CCJ')
        ->join('CAJAS as cj','c.ID_CAJA','=','cj.ID_CAJA')
        ->join('USUARIOS as u','c.ID_USU','=','u.ID_USU')
        ->where('c.ESTADO_CCJ', '=', 1)
        ->where('c.ID_CCJ','=', $ID_CCJ)
        ->get();
        return response()->json(['data'=>$cierreCajas],200);
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
        $cierreCaja->ID_USU = Auth::user()->ID_USU;
        $cierreCaja->DEPOSITO = $request->DEPOSITO;
        $cierreCaja->ESTADO_CCJ = 0;
        $cierreCaja->save();
        return $cierreCaja;
    }

    public function getTotalVendidoPorUsuario()
    {
        $ID_USU = Auth::user()->ID_USU;
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
        $cierreCaja->CONTADO_CCJ = $request->CONTADO_CCJ;
        $cierreCaja->CALCULADO_CCJ = $request->CALCULADO_CCJ;
        $cierreCaja->DIFERENCIA_CCJ = $request->DIFERENCIA_CCJ;
        $cierreCaja->RETIRO_CCJ = $request->RETIRO_CCJ;
        //$cierreCaja->FECHA_CIERRE_CCJ = $request->FECHA_CIERRE_CCJ;
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
