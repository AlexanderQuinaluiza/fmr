<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Proveedores;
use Illuminate\Support\Facades\DB;
class ProveedorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $proveedores = Proveedores::All();
        return response()->json(['data'=>$proveedores],200);
    }

    public function proveedorById()
    {
        $id = (int) $_GET['ID_PROV'];
        $proveedor = Proveedores::findOrFail($id);
        return $proveedor;
    }

   

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $proveedor = new Proveedores;
        $proveedor->NOMBRE_PROV = $request->NOMBRE_PROV;
        $proveedor->RUC_PROV = $request->RUC_PROV;
        $proveedor->DIRECCION_PROV = $request->DIRECCION_PROV;
        $proveedor->CORREO_PROV = $request->CORREO_PROV;
        $proveedor->TELEFONO_PROV = $request->TELEFONO_PROV;
        $proveedor->RAZON_SOCIAL_PROV = $request->RAZON_SOCIAL_PROV;
        $proveedor->NACIONALIDAD_PROV = $request->NACIONALIDAD_PROV;
        //$proveedor->USU_INGRESO_PROV = $request->USU_INGRESO_PROV;
        $proveedor->USU_ACTU_PROV = $request->USU_ACTU_PROV;
        $proveedor->ESTADO_PROV = 1;
        $proveedor->DEMORA_ENTREGA = $request->DEMORA_ENTREGA;
        $proveedor->PROVINCIA_PROV = $request->PROVINCIA_PROV;
        $proveedor->CIUDAD_PROV = $request->CIUDAD_PROV;
        $proveedor->save();
        return $proveedor;
    }

    function autocompleteProvincias()
    {
        $provinciasProveedor = DB::table('PROVEEDORES')
        ->select(DB::raw("DISTINCT PROVINCIA_PROV as name"))
        ->whereNotNull('PROVINCIA_PROV')
        ->where('PROVINCIA_PROV','<>','')
        ->get();
        return $provinciasProveedor;
        //SELECT DISTINCT PROVINCIA_PROV FROM `PROVEEDORES` WHERE (PROVINCIA_PROV IS NOT NULL AND PROVINCIA_PROV != '')

    }
    function autocompleteCiudades()
    {
        $ciudadesProveedor = DB::table('PROVEEDORES')
        ->select(DB::raw("DISTINCT CIUDAD_PROV as name"))
        ->whereNotNull('CIUDAD_PROV')
        ->where('CIUDAD_PROV','<>','')
        ->get();
        return $ciudadesProveedor;
        
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
        $proveedor = Proveedores::findOrFail($request->ID_PROV);
        $proveedor->NOMBRE_PROV = $request->NOMBRE_PROV;
        $proveedor->RUC_PROV = $request->RUC_PROV;
        $proveedor->DIRECCION_PROV = $request->DIRECCION_PROV;
        $proveedor->CORREO_PROV = $request->CORREO_PROV;
        $proveedor->TELEFONO_PROV = $request->TELEFONO_PROV;
        $proveedor->RAZON_SOCIAL_PROV = $request->RAZON_SOCIAL_PROV;
        $proveedor->NACIONALIDAD_PROV = $request->NACIONALIDAD_PROV;
        $proveedor->USU_ACTU_PROV = $request->USU_ACTU_PROV;
        $proveedor->DEMORA_ENTREGA = $request->DEMORA_ENTREGA;
        $proveedor->PROVINCIA_PROV = $request->PROVINCIA_PROV;
        $proveedor->CIUDAD_PROV = $request->CIUDAD_PROV;
        $proveedor->save();
    }

    public function desactivar(Request $request)
    {
     $proveedor = Proveedores::findOrFail($request->ID_PROV);
     $proveedor->ESTADO_PROV = 0;
     $proveedor->save();
     //Proveedores::find($request->ID_PROV)->delete();
    }
    public function activar(Request $request)
    {
     $proveedor = Proveedores::findOrFail($request->ID_PROV);
     $proveedor->ESTADO_PROV = 1;
     $proveedor->save();
    }
}
