<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Compras;
use Illuminate\Support\Facades\DB;
use Auth;
use App\Usuarios;
class CompraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$compras = Compras::All();
        $compras = DB::table('COMPRAS as c')
        ->join('PROVEEDORES as prov','prov.ID_PROV','=','c.ID_PROV')
        ->select('c.ID_COMP','c.ID_PROV','prov.NOMBRE_PROV','c.ID_USU','c.FACTURA_PROV',
        DB::raw('DATE(c.FECHA_COMP) as FECHA_COMP'),'c.DESCRIPCION_COMP','c.TOTAL_COMP')
        ->get();
        return response()->json(['data'=>$compras],200);
    }

    public function getById()
    {
        $ID_COMP = $_GET['ID_COMP'];
        $compra = DB::table('COMPRAS as c')
        ->join('PROVEEDORES as prov','prov.ID_PROV','=','c.ID_PROV')
        ->join('USUARIOS as u','u.ID_USU','=','c.ID_USU')
        ->select('c.ID_COMP','prov.NOMBRE_PROV','u.NOMBRE_USU','u.APELLIDO_USU','c.FACTURA_PROV',
        'c.FECHA_COMP','c.DESCRIPCION_COMP','c.TOTAL_COMP')
        ->where('c.ID_COMP', '=', $ID_COMP)
        ->get();
        return response()->json(['data'=>$compra],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $success = 0;
        DB::beginTransaction();
        try {
            $data = json_decode($request->datos, true);
            $compra = new Compras;
            $compra->ID_PROV = $request->ID_PROV;
            $compra->ID_USU = Auth::user()->ID_USU;
            $compra->FACTURA_PROV = $request->FACTURA_PROV;
            $descripcion = $request->DESCRIPCION_COMP;
            if(empty($descripcion))//si descripcion esta vacio
            {
                $descripcion = 'Compra según documento '.$request->FACTURA_PROV;
            }
            $compra->DESCRIPCION_COMP = $descripcion;
            $compra->TOTAL_COMP = $request->TOTAL_COMP;
            //$compra->DESCUENTO_COMP = $request->DESCUENTO_COMP;
            $usuario = Usuarios::findOrFail(Auth::user()->ID_USU);   
            $compra->ID_CAJA = $usuario->ID_CAJA;
            $compra->save();
            app('App\Http\Controllers\DetalleCompraController')->store($data,$compra->ID_COMP);
        DB::commit();
        $success = 1;
        } catch (\Exception $e) {
        $success = $e->getMessage();
        DB::rollback();
        }
       return $success;
    }

    public function getUltimoPrecioCompra()
    {
        $ID_PRO = $_GET['ID_PRO'];
        $ultimoPrecio = DB::table('DETALLE_COMPRAS as dt')
        ->select('dt.PRECIO_COMP_SIN','dt.PRECIO_COMP_CON')
        ->where('dt.ID_PRO','=',$ID_PRO)
        ->orderBy('dt.ID_DETC', 'desc')
        ->take(1)
        ->get();
        return response()->json(['data'=>$ultimoPrecio],200);
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
