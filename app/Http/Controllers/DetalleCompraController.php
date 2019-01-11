<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DetalleCompras;
use Illuminate\Support\Facades\DB;
class DetalleCompraController extends Controller
{
    public function __construct()
    {
       $this->middleware('auth');
    }
    
    public function getDetalleById()
    {
      $ID_COMP = (int)$_GET['ID_COMP'];  
      $detalleCompras = DB::table('DETALLE_COMPRAS as dc')
      ->join('COMPRAS as c','c.ID_COMP','=','dc.ID_COMP')
      ->join('PRODUCTOS as pr','pr.ID_PRO','=','dc.ID_PRO')
      ->select('dc.ID_PRO','pr.NOMBRE_PRO','dc.PRECIO_COMP_SIN','dc.PRECIO_COMP_CON','dc.CANTIDAD_PRO',
      "dc.SUBTOTAL_CON","dc.SUBTOTAL_SIN")
      ->where('dc.ID_COMP', '=', $ID_COMP)
      ->get();
      foreach ($detalleCompras as $compra) {
         $compra->DEVUELTO = $this->getNumProductosDevuelto($ID_COMP,$compra->ID_PRO);
      }
      return response()->json(['data'=>$detalleCompras],200);
    }

    public function getNumProductosDevuelto($idCompra,$idProducto)
    {
      $cantidad_devuelto = DB::select("SELECT fgetNumProductoDevuelto($idCompra,$idProducto) as cantidad");
      return $cantidad_devuelto[0]->cantidad;
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
        $PRECIO_COMP=0;
        $CANTIDAD_PRO=0;
        $INCLUYE_IVA=0;
        $cantidad = count($data);
        for ($i=0; $i < $cantidad ; $i++) 
        { 
            $detalleCompra = new DetalleCompras;
            $detalleCompra->ID_COMP = $id;
            $ID_PRO = $data[$i]['ID_PRO'];
            $APLICA_IVA = $data[$i]['APLICA_IVA'];
            $detalleCompra->ID_PRO = $ID_PRO;
            $detalleCompra->PRECIO_COMP_SIN = $data[$i]['PRECIO_SIN_IVA'];
            $detalleCompra->PRECIO_COMP_CON = $data[$i]['PRECIO_CON_IVA'];
            $detalleCompra->CANTIDAD_PRO = $data[$i]['CANTIDAD_PRO'];
            app('App\Http\Controllers\ProductoController')->actualizarIncluyeIVA($ID_PRO,$APLICA_IVA);
            $detalleCompra->save();
        }
    }

}
