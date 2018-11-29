<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DenominacionDinero;
use DB;
class DenominacionDineroController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $denominacionDinero = DB::table('DENOMINACIONES_DINERO')                
        ->select('ID_DEN', 'VALOR_DEN')
        ->where( 'ESTADO_DEN','=',1)  
        ->orderBy('VALOR_DEN','desc')
        ->get();
        return response()->json(['data'=>$denominacionDinero],200);
    }

    
}
