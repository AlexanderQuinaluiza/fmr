<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Devoluciones;
use Illuminate\Support\Facades\DB;
use Auth;
class DevolucionController extends Controller
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
           // $devolucion->NUMERO_NC = (int)app('App\Http\Controllers\DocumentoController')->getNumeroActualByIdDoc($tipoDocumento);
           
            //$compra->DESCRIPCION_COMP = $request->DESCRIPCION_COMP;
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
