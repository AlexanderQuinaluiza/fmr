<?php

namespace App\Http\Controllers;

use App\DevolucionesVentas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;

class DevolucionesVentasController extends Controller
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

    public function index()
    {
        //
        $devoventas = DB::select('call spSelectDevolucionesVentas()');
         return response()->json(['data'=>$devoventas],200);
        //return $devoventas;
    }
    
    public function reporteDevVentas(){
        $devoventas = DB::select('call spSelectRepDevolucionesVentas()');
        return $devoventas;
    }

    public function reporteDevVentasProductos(){
        $devoventas = DB::select('call spSelectRepProductosDevoluciones()');
        return $devoventas;
    }
    

    public function datosComprobante(){
        $id= (int) $_GET['ID_VEN'];
        $venta = DB::select('call spSelectValoresFactura("'.$id.'")');
        $detalles = DB::select('call spSelectDetallesFactura("'.$id.'")');

        return response()->json(['miventa'=>$venta,'detalles'=>$detalles],200);

    }
    public function datosCabeceraFarmacia($id_usu){
        
        $cabecera =DB::select('call spGetCabeceraFac("'.$id_usu.'")');
        // return $apertura;
       return $cabecera;

    }
    public function detallesDevVentas(){
        $id= (int) $_GET['ID_DEV_VEN'];
        $valores =DB::select(' call spSelectDetallesDevVentas("'.$id.'")');
        // return $apertura;
        return response()->json(['data'=>$valores],200);
      // return $valores;
       
    }
    public function datosCabeceraNC($id_dev){
        
        $valores =DB::select('call spSelectDevolucionValores("'.$id_dev.'")');
        // return $apertura;
       return $valores;

    }

    public function detallesNC($id_dev){
        
        $valores =DB::select('call spSelectDetallesDevolucionVentas("'.$id_dev.'")');
        // return $apertura;
       return $valores;

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
        //$miventa = [];
        //$misdetalles=[];
        $error = null;
        DB::beginTransaction();
        try {
//ID_DEV_VEN, ID_VEN, ID_USU, TOTAL_DEV, IVA_DEV, SUBT_IVA, SUBT_CERO, OBSERVACION_DEV, FECHA_DEV
            $data = json_decode($request->detalles, true);
            $devoventas = new DevolucionesVentas;
            $devoventas->ID_VEN = $request->ID_VEN;
            $devoventas->ID_CAJA= $request->ID_CAJA;
            $devoventas->ID_USU = Auth::user()->ID_USU;
            $devoventas->TOTAL_DEV=$request->TOTAL_DEV;
            $devoventas->IVA_DEV=$request->IVA_DEV;
            $devoventas->SUBT_IVA=$request->SUBT_IVA;
            $devoventas->SUBT_CERO=$request->SUBT_CERO;
            $devoventas->OBSERVACION_DEV=$request->OBSERVACION_DEV;
             
            //$devoventas->ESTADO = "Facturado"; // facturado o anulado 
            $devoventas->save();
            app('App\Http\Controllers\DetallesDevController')->store($data,$devoventas->ID_DEV_VEN);
            //app('App\Http\Controllers\EjemplarController')->update($data);
            DB::commit();
          $cabecera=(array)$this->datosCabeceraFarmacia($devoventas->ID_USU);
          $valores=(array)$this->datosCabeceraNC($devoventas->ID_DEV_VEN);
          $detalles=(array)$this->detallesNC($devoventas->ID_DEV_VEN);
          $success = 1;
        } catch (\Exception $e) {
       // $success=0;
        $error = $e->getMessage();
        $success = $error;
        DB::rollback();
        }
 return response()->json(['result'=>$success,'cabfarma'=>$cabecera,'ncvalores'=>$valores,'ncdetalles'=>$detalles],200);
       //return $success;
    }


}
