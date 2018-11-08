<?php

namespace App\Http\Controllers;

use App\Agencias;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use App\File;
class AgenciasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $agencias=Agencias::All();
        return response()->json(['data'=>$agencias],200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $data = json_decode($request->datos, true);
          
        //$producto->ID_MAR = $data['ID_MAR'];
        $recurso= Agencias::findOrFail($data['ID_AGE']);;
        $recurso->NOMBRE_AGE=$data['NOMBRE_AGE'];
        $recurso->RUC_AGE=$data['RUC_AGE'];
        $recurso->CIUDAD_AGE=$data['CIUDAD_AGE'];
        $recurso->TELEFONO_AGE=$data['TELEFONO_AGE'];
        $recurso->CORREO_AGE=$data['CORREO_AGE'];
        $recurso->DIRECCION_AGE=$data['DIRECCION_AGE']; 
       // $recurso->lOGO_AGE=$data['lOGO_AGE'];
        //$recurso->NOMBRE_AGE=$request->get('ESTADO_AGE');
        if(Input::hasFile('LOGO_AGE'))
      {
        $file = Input::file('LOGO_AGE');
		$file->move(public_path().'/recursos_agencia/',$file->getClientOriginalName());
        $recurso->LOGO_AGE='recursos_agencia/'.$file->getClientOriginalName();
        //$recurso->ICO_APP=$file->getClientOriginalName();
            
      }  
      $recurso->save();  
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {  
        $data = json_decode($request->datos, true);
          
        //$producto->ID_MAR = $data['ID_MAR'];
        $recurso= new Agencias;
        $recurso->NOMBRE_AGE=$data['NOMBRE_AGE'];
        $recurso->RUC_AGE=$data['RUC_AGE'];
        $recurso->CIUDAD_AGE=$data['CIUDAD_AGE'];
        $recurso->TELEFONO_AGE=$data['TELEFONO_AGE'];
        $recurso->CORREO_AGE=$data['CORREO_AGE'];
        $recurso->DIRECCION_AGE=$data['DIRECCION_AGE']; 
       // $recurso->lOGO_AGE=$data['lOGO_AGE'];
        //$recurso->NOMBRE_AGE=$request->get('ESTADO_AGE');
        if(Input::hasFile('LOGO_AGE'))
      {
        $file = Input::file('LOGO_AGE');
		$file->move(public_path().'/recursos_agencia/',$file->getClientOriginalName());
        $recurso->LOGO_AGE='recursos_agencia/'.$file->getClientOriginalName();
        //$recurso->ICO_APP=$file->getClientOriginalName();
            
      }  
     $recurso->save(); 
      return response()->json(['data'=>$recurso],200);
      
    }
   

    public function desactivar(Request $request)
    {
     $categoria = Agencias::findOrFail($request->ID_AGE);
     $categoria->ESTADO_AGE = 0;
     $categoria->save();
    //Roles::find($request->ID_CAT)->delete();
    }
    public function activar(Request $request)
    {
     $categoria = Agencias::findOrFail($request->ID_AGE);
     $categoria->ESTADO_AGE = 1;
     $categoria->save();
    }
    public function agenciaById()
    {
        $id = (int) $_GET['ID_AGE'];
        $agencias = Agencias::findOrFail($id);
        return $agencias;
    }
   
}
