<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ejemplares;
class EjemplarController extends Controller
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
        $ejemplar = new Ejemplares;
        $ejemplar->ID_PRO = $request->ID_PRO;
        $ejemplar->COD_BARRAS_EJM = $request->COD_BARRAS_EJM;
        $ejemplar->FECHA_CADUCIDAD_EJM = $request->FECHA_CADUCIDAD_EJM;
        $ejemplar->save();
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($data)
    {
        $cantidad = count($data);
         
        for ($i=0; $i < $cantidad ; $i++) { 
              $codesbar=(array)$data[$i]['BARCODES'];
              for ($j=0; $j < count($codesbar); $j++) { 
                 $codigo=$codesbar[$j]['CODE_BAR']; 
                
                 $ejemplar= Ejemplares::where('COD_BARRAS_EJM','=', $codigo)->first();
                 $ejemplar->ESTADO=0; 
                 $ejemplar->save();
              }
        
            
        }
    }
}
