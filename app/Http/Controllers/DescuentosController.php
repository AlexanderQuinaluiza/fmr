<?php

namespace App\Http\Controllers;

use App\Descuentos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DescuentosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $descuentos=Descuentos::All();
        return response()->json(['data'=>$descuentos],200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        //ID_DESC, PORCENTAJE_DESC, FECHA_INICIO_DESC, FECHA_FIN_DESC, ESTADO_DESC, DESCRIPCION_DESC
        $success = 0;
        $error = null;
        DB::beginTransaction();
        try {
            $data = json_decode($request->datos, true);
            $descuentos = new Descuentos;
            $descuentos->DESCRIPCION_DESC = $request->DESCRIPCION_DESC;
            $descuentos->FECHA_INICIO_DESC = $request->FECHA_INICIO_DESC;
            $descuentos->FECHA_FIN_DESC = $request->FECHA_FIN_DESC;
            $descuentos->PORCENTAJE_DESC = $request->PORCENTAJE_DESC;
            $descuentos->ESTADO_DESC = 0;
            $descuentos->save();
            app('App\Http\Controllers\DetallesDescuentosController')->store($data,$descuentos->ID_DESC);
        DB::commit();
        $success = 1;
        } catch (\Exception $e) {
        $success = 0;
        $error = $e->getMessage();
        DB::rollback();
        }
       return $success;
    }

  
    public function update(Request $request)
    {
     
        $success = 0;
        $error = null;
        DB::beginTransaction();
        try {
            /** arrays con datos de los productos id para borrarlos y ingresarlos */
            $dataInsert = json_decode($request->datosInsert, true);
            $dataDelete = json_decode($request->datosDelete, true);

            $descuentos = Descuentos::findOrFail($request->ID_DESC);
            $descuentos->DESCRIPCION_DESC = $request->DESCRIPCION_DESC;
            $descuentos->FECHA_INICIO_DESC = $request->FECHA_INICIO_DESC;
            $descuentos->FECHA_FIN_DESC = $request->FECHA_FIN_DESC;
            $descuentos->PORCENTAJE_DESC = $request->PORCENTAJE_DESC;
            $descuentos->ESTADO_DESC = 0;
            $descuentos->save();
            app('App\Http\Controllers\DetallesDescuentosController')->store($dataInsert,$descuentos->ID_DESC);
            DB::commit();
            app('App\Http\Controllers\DetallesDescuentosController')->delete($dataDelete,$descuentos->ID_DESC);
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
     * Remove the specified resource from storage.
     *
     * @param  \App\Descuentos  $descuentos
     * @return \Illuminate\Http\Response
     */
    public function destroy(Descuentos $descuentos)
    {
        //
    }
}
