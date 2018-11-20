<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DetalleCompras;
use Illuminate\Support\Facades\DB;
class DetalleCompraController extends Controller
{
    public function getDetalleById()
    {
      $ID_COMP = (int)$_GET['ID_COMP'];  
      $detalleCompras = DB::table('DETALLE_COMPRAS as dc')
      ->join('COMPRAS as c','c.ID_COMP','=','dc.ID_COMP')
      ->join('PRODUCTOS as pr','pr.ID_PRO','=','dc.ID_PRO')
      ->select('dc.ID_PRO','pr.NOMBRE_PRO','dc.PRECIO_COMP','dc.CANTIDAD_PRO',
      DB::raw("TRUNCATE(dc.PRECIO_COMP*dc.CANTIDAD_PRO,2) as SUBTOTAL"),
      'dc.INCLUYE_IVA')
      ->where('dc.ID_COMP', '=', $ID_COMP)
      ->get();
      return response()->json(['data'=>$detalleCompras],200);
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
            $PRECIO_COMP = $data[$i]['PRECIO_COMP'];
            $CANTIDAD_PRO = $data[$i]['CANTIDAD_PRO'];
            $INCLUYE_IVA = $data[$i]['INCLUYE_IVA'];
            $detalleCompra->ID_PRO = $ID_PRO;
            $detalleCompra->PRECIO_COMP = $PRECIO_COMP;
            $detalleCompra->CANTIDAD_PRO = $CANTIDAD_PRO;
            $detalleCompra->INCLUYE_IVA = $INCLUYE_IVA;
            $detalleCompra->save();
        }
    }

}
