<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MovimientoCaja;
use App\Cajas;
use Illuminate\Support\Facades\DB;
use App\Usuarios;
use Auth;
class MovimientoCajaController extends Controller
{
    public function getMovimientosCaja()
    {
        $movimientos = DB::table('MOVIMIENTO as m')
        ->join('CAJAS as c','c.ID_CAJA','=','m.CAJ_ID')
        ->select('m.ID','m.TOTAL','m.COMENTARIO','m.FECHA',
        DB::raw('IF(m.TIPO = 2, "Salida", "Entrada") as TIPO'),
        'm.ESTADO','c.DESCRIPCION_CAJA','m.VEN_ID','m.COM_ID',
        'm.NCR_ID','m.DEV_ID')
        ->orderBy('FECHA','DESC')
        ->get();
        return $movimientos;
    }
    public function store(Request $request)
    {
        $success = 0;
        DB::beginTransaction();
        try {
        $movimientoCaja = new MovimientoCaja;
        $movimientoCaja->TOTAL = $request->VALOR_MOV;
        $movimientoCaja->COMENTARIO = $request->DESCRIPCION_MOV;
        $movimientoCaja->TIPO = $request->TIPO_MOV;
        $movimientoCaja->ESTADO = 1;
        $usuario = Usuarios::findOrFail(Auth::user()->ID_USU);
        $movimientoCaja->CAJ_ID = $usuario->ID_CAJA;
        $movimientoCaja->save();

        $cajas = Cajas::findOrFail($movimientoCaja->CAJ_ID);
        //ACTUALIZACIÓN DEL VALOR DE LA CAJA
        if($request->TIPO_MOV==1) //movimiento: entrada dinero
        {
            $cajas->VALOR = $cajas->VALOR + $request->VALOR_MOV;
        }
        else if($request->TIPO_MOV==2) //movimiento: salida dinero
        {
            $cajas->VALOR = $cajas->VALOR - $request->VALOR_MOV;
        }
        $cajas->save();
        DB::commit();
        $success = 1;
        } catch (\Exception $e) {
        $success = $e->getMessage();
        DB::rollback();
        }
        return $success;
    }
}
