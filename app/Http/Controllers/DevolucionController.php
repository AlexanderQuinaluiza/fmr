<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Devoluciones;
use Illuminate\Support\Facades\DB;
use Auth;
use App\Usuarios;
class DevolucionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $devoluciones = DB::table('DEVOLUCIONES as d')
        ->join('COMPRAS as c','c.ID_COMP','=','d.ID_COMP')
        ->join('USUARIOS as u','u.ID_USU','=','d.ID_USU')
        ->join('CAJAS as cj','cj.ID_CAJA','=','d.ID_CAJA')
        ->select('d.ID_DEV','u.NOMBRE_USU','u.APELLIDO_USU',
        'd.TOTAL_DEV','d.OBSERVACION_DEV',DB::raw('DATE(d.FECHA_DEV) as FECHA_DEV'),
        'cj.DESCRIPCION_CAJA',
        DB::raw("fGetNombreProveedir(c.ID_PROV) as PROVEEDOR"))
        ->get();
        return response()->json(['data'=>$devoluciones],200);
    }

    public function getById()
    {
        $ID_DEV = $_GET['ID_DEV'];
        $devolucion = DB::table('DEVOLUCIONES as d')
        ->join('COMPRAS as c','c.ID_COMP','=','d.ID_COMP')
        ->join('USUARIOS as u','u.ID_USU','=','d.ID_USU')
        ->join('CAJAS as cj','cj.ID_CAJA','=','d.ID_CAJA')
        ->select('d.ID_DEV','d.NUMERO_NC','u.NOMBRE_USU','u.APELLIDO_USU',
        'd.TOTAL_DEV','d.OBSERVACION_DEV',DB::raw('DATE(d.FECHA_DEV) as FECHA_DEV'),
        'cj.DESCRIPCION_CAJA',
        DB::raw("fGetNombreProveedir(c.ID_PROV) as PROVEEDOR"))
        ->where('d.ID_DEV', '=', $ID_DEV)
        ->get();
        return response()->json(['data'=>$devolucion],200);
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
        $success = 0;
        DB::beginTransaction();
        try {
            $tipoDocumento = 'Nota de crédito';
            $data = json_decode($request->datos, true);
            $devolucion = new Devoluciones;
            $devolucion->TIPO_DOC = $tipoDocumento;
            $devolucion->ID_COMP = (int)$request->ID_COMP;
            $devolucion->ID_USU = Auth::user()->ID_USU;
            $devolucion->TOTAL_DEV = $request->TOTAL_DEV;
            $devolucion->NUMERO_NC = $request->NUM_NOTA_CREDITO;
            $devolucion->FECHA_DEV = $request->FECHA_DEV;
            $observacion = $request->OBSERVACION_DEV;
            if(empty($observacion))//si observacion esta vacio
            {
                $observacion = 'Devolución de compra número '.$request->ID_COMP;
            }
            $devolucion->OBSERVACION_DEV = $observacion; 
            $usuario = Usuarios::findOrFail(Auth::user()->ID_USU);   
            $devolucion->ID_CAJA = $usuario->ID_CAJA;
            $devolucion->save();
            app('App\Http\Controllers\DetalleDevolucionController')->store($data,$devolucion->ID_DEV);
        DB::commit();
        $success = 1;
        } catch (\Exception $e) {
        $success = $e->getMessage();
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
