<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pedidos;
use Illuminate\Support\Facades\DB;
class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pedidos = DB::table('PEDIDOS as p')
        ->join('PROVEEDORES as pv','pv.ID_PROV','=','p.ID_PROV')
        ->select('p.ID_PED',DB::raw('DATE_FORMAT(p.FECHA_PED, "%d-%b-%Y") as FECHA_PED'),'p.OBSERVACION_PED','p.ESTADO','pv.NOMBRE_PROV',
        'p.ID_PROV','pv.RUC_PROV as ITEMS')
        ->get();
        
        foreach ($pedidos as $pedido) {
           $pedido->ITEMS=
           app('App\Http\Controllers\DetallePedidoController')->index($pedido->ID_PED);
        }
        return response()->json(['data'=>$pedidos],200);
    }

    /**public function pedidoById()
    {
        $id = (int) $_GET['ID_PED'];
        $pedido =  DB::table('PRODUCTOS as p')
        ->select('p.ID_PRO','p.NOMBRE_PRO','p.ID_CAT','p.ID_PRS',
        'p.ID_MAR','p.DESCRIPCION_PRO','p.COSTO_PRO',
        'p.GANANCIA_PRO','p.PRECIO_VENTA_PRO','p.EXISTENCIA_MIN_PRO',
        'p.EXISTENCIA_MAX_PRO','p.ETIQUETAS_PRO','p.UBICACION_PRO', 
        'p.IMAGEN_PRO','p.APLICA_IVA_PRO','p.STOCK_PRO',
        'p.LOTE_PRO','p.LABORATORIO_PRO','p.ESTADO_PRO','p.FECHA_REGISTRO_PRO',
        'p.TIPO_PRO','p.PRECIO_PROMOCIONAL_PRO','p.VENTA_CON_RECETA',
        'u.NOMBRE_USU','u.APELLIDO_USU','m.NOMBRE_MAR as MARCA_PRO','pr.NOMBRE_PRS as PRESENTACION_PRO',
        'c.NOMBRE_CAT as CATEGORIA_PRO')
        ->join('MARCAS as m','p.ID_MAR','=','m.ID_MAR')
        ->join('PRESENTACIONES as pr','p.ID_PRS','=','pr.ID_PRS')
        ->join('CATEGORIAS as c','p.ID_CAT','=','c.ID_CAT')
        ->join('USUARIOS as u','p.USU_REGISTRO','=','u.ID_USU')
        ->where('p.ID_PRO', '=', $id)
        ->get();

       // $producto[0]->PRECIO_PROMOCIONAL_PRO;
       $idproducto = (int)$producto[0]->ID_PRO;
       $precioVenta = (float)$producto[0]->PRECIO_VENTA_PRO;

        $porcentajeDesc = (float)$this->getPorcentajeDescuento($idproducto);
        $descuento = $porcentajeDesc * $precioVenta;
        $precioConDescuento = $precioVenta - $descuento;
        $producto[0]->PRECIO_PROMOCIONAL_PRO = round($precioConDescuento,2);

        //return round($precioConDescuento,2);

       // $id = (int) $_GET['ID_PRO'];
       // $producto = Productos::findOrFail($id);
      return response()->json($producto,200);

        /**->join('PRESENTACIONES pr')
        ->join('CATEGORIAS c')
}*/


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $success = 0;
        $error = null;
        DB::beginTransaction();
        try {
            $data = json_decode($request->datos, true);
            $pedido = new Pedidos;
            $pedido->OBSERVACION_PED = $request->OBSERVACION_PED;
            $pedido->ID_PROV = $request->ID_PROV;
            $pedido->ESTADO = 0;
            $pedido->save();
            app('App\Http\Controllers\DetallePedidoController')->store($data,$pedido->ID_PED);
        DB::commit();
        $success = 1;
        } catch (\Exception $e) {
        $success = 0;
        $error = $e->getMessage();
        DB::rollback();
        }
       return $success;
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
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

    public function pendiente(Request $request)
    {
     $pedido = Pedidos::findOrFail($request->ID_PED);
     $pedido->ESTADO = 0;
     $pedido->save();
     //Pedidos::find($request->ID_PED)->delete();
    }
    public function entregado(Request $request)
    {
     $pedido = Pedidos::findOrFail($request->ID_PED);
     $pedido->ESTADO = 1;
     $pedido->save();
    }
}
