<?php

namespace App\Http\Controllers;

use App\Comprobantes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class ComprobantesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
     
        $comp= DB::select('call spSelectComprbantesFac()');
         return response()->json(['data'=>$comp],200);
    }

    public function ncFacAnuladas(){
        $comp= DB::select('call spSelectNcFacAnuladas()');
         return response()->json(['data'=>$comp],200);
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
       
    }

}
