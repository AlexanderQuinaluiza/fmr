<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CierreCaja;
use App\Cajas;
use DB;
use Auth;
use App\MovimientoCaja;
class CierreCajaController extends Controller
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
        //$cierreCajas = CierreCaja::All()->where('ESTADO_CCJ','=',1);    
        $cierreCajas =  DB::table('CIERRE_CAJA as c')
        ->select('c.ID_CCJ','c.FECHA_CIERRE_CCJ','cj.DESCRIPCION_CAJA as CAJA','u.NOMBRE_USU','u.APELLIDO_USU',
        'c.CONTADO_CCJ','c.CALCULADO_CCJ','c.DIFERENCIA_CCJ')
        ->join('CAJAS as cj','c.ID_CAJA','=','cj.ID_CAJA')
        ->join('USUARIOS as u','c.ID_USU','=','u.ID_USU')
        ->where('c.ESTADO_CCJ', '=', 1)
        ->get();
        return response()->json(['data'=>$cierreCajas],200);
    }

    public function getCierreCajaById()
    {
        $ID_CCJ = $_GET['ID_CCJ'];
        $cierreCajas =  DB::table('CIERRE_CAJA as c')
        ->select('c.ID_CCJ','c.FECHA_CIERRE_CCJ','cj.DESCRIPCION_CAJA as CAJA','u.NOMBRE_USU','u.APELLIDO_USU',
        'c.CONTADO_CCJ','c.CALCULADO_CCJ','c.DIFERENCIA_CCJ',
        'c.RETIRO_CCJ')
        ->join('CAJAS as cj','c.ID_CAJA','=','cj.ID_CAJA')
        ->join('USUARIOS as u','c.ID_USU','=','u.ID_USU')
        ->where('c.ESTADO_CCJ', '=', 1)
        ->where('c.ID_CCJ','=', $ID_CCJ)
        ->get();
        return response()->json(['data'=>$cierreCajas],200);
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
        $cajas = Cajas::findOrFail($request->ID_CAJA);
        $cierreCaja = new CierreCaja;
        $cierreCaja->ID_CAJA = $request->ID_CAJA;
        $cierreCaja->ID_USU = Auth::user()->ID_USU;
        $cierreCaja->CONTADO_CCJ = $request->CONTADO_CCJ;
        $cierreCaja->CALCULADO_CCJ = $cajas->VALOR;
        $cierreCaja->DIFERENCIA_CCJ = $cajas->VALOR - $request->CONTADO_CCJ;
        $cierreCaja->RETIRO_CCJ = $request->RETIRO_CCJ;
        $cierreCaja->ESTADO_CCJ = 1;
        $cierreCaja->save();

        //Registro en movimiento caja
        $movimientoCaja = new MovimientoCaja;
        $movimientoCaja->TOTAL = $cierreCaja->RETIRO_CCJ;
        $movimientoCaja->COMENTARIO = 'Cierre de caja';
        $movimientoCaja->TIPO = 2; //salida de dinero
        $movimientoCaja->ESTADO = 1;
        $movimientoCaja->CAJ_ID = $request->ID_CAJA;
        $movimientoCaja->save();

        //actualizo valor de caja
        $cajas->VALOR = $cajas->VALOR - $request->RETIRO_CCJ;
        $cajas->save();
        DB::commit();
        $success = 1;
        } catch (\Exception $e) {
        $success = $e->getMessage();
        DB::rollback();
        }
        return $success;
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
