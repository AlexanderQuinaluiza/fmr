<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Clientes;
use App\Configuraciones;
include ("ConfiguracionController.php");
class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
      $clientes=Clientes::All();
      return response()->json(['data'=>$clientes],200);;
    }

    public function clienteById()
    {
        $id = (int) $_GET['ID_CLI'];
        $cliente = Clientes::findOrFail($id);
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
        $this->validate($request,[ 'CED_RUC_CLI'=>'required|unique:CLIENTES',
         'NOMBRE_CLI'=>'required','APELLIDO_CLI'=>'required',
         'DIRECCION_CLI'=>'required','CORREO_CLI'=>'required']);
        Clientes::create($request->all());
    }

   

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $cliente = Clientes::findOrFail($request->ID_CLI);
        $cliente->CED_RUC_CLI = $request->CED_RUC_CLI;
        $cliente->NOMBRE_CLI = $request->NOMBRE_CLI;
        $cliente->APELLIDO_CLI = $request->APELLIDO_CLI;
        $cliente->DIRECCION_CLI = $request->DIRECCION_CLI;
        $cliente->TELEFONO_CLI = $request->TELEFONO_CLI;
        $cliente->CORREO_CLI = $request->CORREO_CLI;
        $cliente->save();
    }

    public function desactivar(Request $request)
    {
     $cliente = Clientes::findOrFail($request->ID_CLI);
     $cliente->ESTADO_CLI = 0;
     $cliente->save();
     //Clientes::find($request->ID_CLI)->delete();
    }
    public function activar(Request $request)
    {
     $cliente = Clientes::findOrFail($request->ID_CLI);
     $cliente->ESTADO_CLI = 1;
     $cliente->save();
    }
}
