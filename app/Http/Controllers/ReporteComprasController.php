<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class ReporteComprasController extends Controller
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

    /**Permite obtener el reporte de inventario de productos
     * con el precio promedio de compra
     */
    public function getReporteInventarioCompProductos()
    {
        $inventarioproducto = 
        DB::select('call pGetReporteInventarioProductos()');
      return $inventarioproducto;
    }

    public function getDatosCustomComprasDev()
    {
        $estadisticasCompras = 
        DB::select('call pGetComprasyDevoluciones()');
        $result = array();
      return $estadisticasCompras;
    }
}
