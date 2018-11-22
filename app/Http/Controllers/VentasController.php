<?php

namespace App\Http\Controllers;

use App\Ventas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VentasController extends Controller
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
     * el metodo retorna  0 si no se encuentra abierta la caja aun,.
     *
     * @return \Illuminate\Http\Response
     */
    public function getApertura()
    {
        $id_caja = (int) $_GET['ID_CAJA'];
        $id_user= (int) $_GET['ID_USER'];
        $apertura = DB::select('call spGetApertura("'.$id_caja.'","'.$id_user.'")');
        return $apertura;
        //call spGetApertura(1,1);
    }

    public function getCabeceraFAC(){
        $id_user= (int) $_GET['ID_USER'];
        $cabecera = DB::select('call spGetCabeceraFac("'.$id_user.'")');
        return $cabecera;
    }
    
      /** funcion que retorna el cliente segun el numero de cedula */
      public function clienteFAC()
      {
          $id = (int) $_GET['CEDRUC'];
          $cliente = DB::table('CLIENTES')
           ->select('ID_CLI', 'CED_RUC_CLI', 'NOMBRE_CLI', 'APELLIDO_CLI','DIRECCION_CLI', 'TELEFONO_CLI', 'CORREO_CLI', 'ESTADO_CLI', 'FECHA_REG_CLI')
           ->where('CED_RUC_CLI','=',$id)
           ->get();
          //return response()->json(['data'=>$cliente],200);
          return $cliente;
         
      }

      

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //

        $success = 0;
        $error = null;
        DB::beginTransaction();
        try {
            $data = json_decode($request->detalles, true);
            $ventas = new Ventas;
            $ventas->ID_USU = $request->ID_USU;
            $ventas->ID_CLI = $request->ID_CLI;
            $ventas->ESTADO = "Facturado"; // facturado o anulado
            $ventas->save();
            app('App\Http\Controllers\DetalleVentasController')->store($data,$ventas->ID_VEN);
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
     * @param  \App\Ventas  $ventas
     * @return \Illuminate\Http\Response
     */
    public function show(Ventas $ventas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Ventas  $ventas
     * @return \Illuminate\Http\Response
     */
    public function edit(Ventas $ventas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Ventas  $ventas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ventas $ventas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Ventas  $ventas
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ventas $ventas)
    {
        //
    }
}
