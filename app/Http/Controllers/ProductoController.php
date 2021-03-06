<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Productos;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use App\File;
use Auth;
class ProductoController extends Controller
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
        $productos = Productos::All();    
        return response()->json(['data'=>$productos],200);
    }
    /** funcion agregada para usar en los detalles de descuentos */
    public function productosActivos(){
        $productos = Productos::All()
        ->where('ESTADO_PRO', '=', 1);    
        return response()->json(['data'=>$productos],200);
    }

    public function productoById()
    {
       $id = (int) $_GET['ID_PRO'];
        $producto =  DB::table('PRODUCTOS as p')
        ->select('p.ID_PRO','p.NOMBRE_PRO','p.ID_CAT','p.ID_PRS',
        'p.ID_MAR','p.DESCRIPCION_PRO','p.COSTO_PRO',
        'p.GANANCIA_PRO','p.PRECIO_VENTA_PRO','p.EXISTENCIA_MIN_PRO',
        'p.EXISTENCIA_MAX_PRO','p.ETIQUETAS_PRO','p.UBICACION_PRO', 
        'p.IMAGEN_PRO','p.APLICA_IVA_PRO','p.STOCK_PRO',
        'p.LOTE_PRO','p.LABORATORIO_PRO','p.ESTADO_PRO','p.FECHA_REGISTRO_PRO',
        'p.TIPO_PRO','p.PRECIO_PROMOCIONAL_PRO','p.VENTA_CON_RECETA',
        'u.NOMBRE_USU','u.APELLIDO_USU','m.NOMBRE_MAR as MARCA_PRO','pr.NOMBRE_PRS as PRESENTACION_PRO',
        'c.NOMBRE_CAT as CATEGORIA_PRO')
        ->join('MARCAS as m','p.ID_MAR','=','m.ID_MAR')
        ->join('PRESENTACIONES as pr','p.ID_PRS','=','pr.ID_PRS')
        ->join('CATEGORIAS as c','p.ID_CAT','=','c.ID_CAT')
        ->join('USUARIOS as u','p.USU_REGISTRO','=','u.ID_USU')
        ->where('p.ID_PRO', '=', $id)
        ->get();

        
      return response()->json($producto,200);
     // return "jaja";
    }
/** productos ventas, metodo que se usa en el modulo de ventas */

public function productosVentas()
{
   //$id = (int) $_GET['ID_PRO'];
    $producto =  DB::table('PRODUCTOS as p')
    ->select('p.ID_PRO','p.NOMBRE_PRO','p.ID_CAT','p.ID_PRS',
    'p.ID_MAR','p.DESCRIPCION_PRO','p.COSTO_PRO',
    'p.GANANCIA_PRO','p.PRECIO_VENTA_PRO','p.EXISTENCIA_MIN_PRO',
    'p.EXISTENCIA_MAX_PRO','p.ETIQUETAS_PRO','p.UBICACION_PRO', 
    'p.IMAGEN_PRO','p.APLICA_IVA_PRO','p.STOCK_PRO',
    'p.LOTE_PRO','p.LABORATORIO_PRO','p.ESTADO_PRO','p.FECHA_REGISTRO_PRO',
    'p.TIPO_PRO','p.PRECIO_PROMOCIONAL_PRO','p.VENTA_CON_RECETA',
    'u.NOMBRE_USU','u.APELLIDO_USU','m.NOMBRE_MAR as MARCA_PRO','pr.NOMBRE_PRS as PRESENTACION_PRO',
    'c.NOMBRE_CAT as CATEGORIA_PRO')
    ->join('MARCAS as m','p.ID_MAR','=','m.ID_MAR')
    ->join('PRESENTACIONES as pr','p.ID_PRS','=','pr.ID_PRS')
    ->join('CATEGORIAS as c','p.ID_CAT','=','c.ID_CAT')
    ->join('USUARIOS as u','p.USU_REGISTRO','=','u.ID_USU')
    ->where('p.ESTADO_PRO', '=', 1)
    ->get();
   return response()->json(['data'=>$producto],200);
}

/**** metodo para extaer la informacion de un producto en base al codigo de barras */
public function productoEjemplar()
{  
    try{
        $id = $_GET['CODEBAR'];
        $producto =  DB::table('PRODUCTOS as p')
        ->select('p.ID_PRO','p.NOMBRE_PRO','p.ID_CAT','p.ID_PRS',
        'p.ID_MAR','p.DESCRIPCION_PRO','p.COSTO_PRO',
        'p.GANANCIA_PRO','p.PRECIO_VENTA_PRO','p.EXISTENCIA_MIN_PRO',
        'p.EXISTENCIA_MAX_PRO','p.ETIQUETAS_PRO','p.UBICACION_PRO', 
        'p.IMAGEN_PRO','p.APLICA_IVA_PRO','p.STOCK_PRO',
        'p.LOTE_PRO','p.LABORATORIO_PRO','p.ESTADO_PRO','p.FECHA_REGISTRO_PRO',
        'p.TIPO_PRO','p.PRECIO_PROMOCIONAL_PRO','p.VENTA_CON_RECETA',
        'u.NOMBRE_USU','u.APELLIDO_USU','m.NOMBRE_MAR as MARCA_PRO','pr.NOMBRE_PRS as PRESENTACION_PRO',
        'c.NOMBRE_CAT as CATEGORIA_PRO','e.COD_BARRAS_EJM')
        ->join('MARCAS as m','p.ID_MAR','=','m.ID_MAR')
        ->join('PRESENTACIONES as pr','p.ID_PRS','=','pr.ID_PRS')
        ->join('CATEGORIAS as c','p.ID_CAT','=','c.ID_CAT')
        ->join('USUARIOS as u','p.USU_REGISTRO','=','u.ID_USU')
        ->join('EJEMPLARES as e', 'e.ID_PRO','=','p.ID_PRO')
        ->where('p.ESTADO_PRO', '=', 1)
        ->where('e.ESTADO', '=', 1)
        ->where('e.COD_BARRAS_EJM','=',$id)
        ->get();
    }catch(Exeption $e){
       $producto='';
    }
       return response()->json(['data'=>$producto],200);
}
/** metodo que se usa en el modulo  de descuentos */
    public function productoDescuentos()
    {
        $id = (int) $_GET['ID_DESC'];
        $producto =  DB::table('PRODUCTOS as p')
        ->select('p.ID_PRO','p.NOMBRE_PRO','p.ID_CAT','p.ID_PRS',
        'p.ID_MAR','p.DESCRIPCION_PRO','p.COSTO_PRO',
        'p.GANANCIA_PRO','p.PRECIO_VENTA_PRO','p.EXISTENCIA_MIN_PRO',
        'p.EXISTENCIA_MAX_PRO','p.ETIQUETAS_PRO','p.UBICACION_PRO', 
        'p.IMAGEN_PRO','p.APLICA_IVA_PRO','p.STOCK_PRO',
        'p.LOTE_PRO','p.LABORATORIO_PRO','p.ESTADO_PRO','p.FECHA_REGISTRO_PRO',
        'p.TIPO_PRO','p.PRECIO_PROMOCIONAL_PRO','p.VENTA_CON_RECETA',
        'u.NOMBRE_USU','u.APELLIDO_USU','m.NOMBRE_MAR as MARCA_PRO','pr.NOMBRE_PRS as PRESENTACION_PRO',
        'c.NOMBRE_CAT as CATEGORIA_PRO')
        ->join('MARCAS as m','p.ID_MAR','=','m.ID_MAR')
        ->join('PRESENTACIONES as pr','p.ID_PRS','=','pr.ID_PRS')
        ->join('CATEGORIAS as c','p.ID_CAT','=','c.ID_CAT')
        ->join('USUARIOS as u','p.USU_REGISTRO','=','u.ID_USU')
        ->join('DETALLES_DESCUENTOS as dd', 'dd.ID_PRO','=','p.ID_PRO')
        ->where('dd.ID_DESC', '=', $id)
        ->get();
         return response()->json(['data'=>$producto],200);
    }
     
    function getPorcentajeDescuento($ID_PRO)
    {
        $descuento = DB::select("SELECT fGetDescuentoByProducto($ID_PRO) as PORCENTAJE_DESC");
        $porcentaje = 0;
        if(count((array)$descuento)>0)
        {
            $porcentaje = $descuento[0]->PORCENTAJE_DESC;
        }
        return $porcentaje;
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
        $producto = new Productos;
        $producto->ID_CAT = $data['ID_CAT'];
        $producto->ID_PRS = $data['ID_PRS'];
        $producto->ID_MAR = $data['ID_MAR'];
        $producto->NOMBRE_PRO = $data['NOMBRE_PRO'];
        $producto->DESCRIPCION_PRO = $data['DESCRIPCION_PRO'];
        $producto->GANANCIA_PRO = $data['GANANCIA_PRO'];
        $producto->EXISTENCIA_MIN_PRO = $data['EXISTENCIA_MIN_PRO'];
        $producto->EXISTENCIA_MAX_PRO = $data['EXISTENCIA_MAX_PRO'];
        $producto->ETIQUETAS_PRO = $data['ETIQUETAS_PRO'];
        $producto->UBICACION_PRO = $data['UBICACION_PRO'];   
        if(Input::hasFile('IMAGEN_PRO'))
        {
        $file = Input::file('IMAGEN_PRO');
		$file->move(public_path().'/recursos_producto/',$file->getClientOriginalName());
        $producto->IMAGEN_PRO ='recursos_producto/'.$file->getClientOriginalName();   
        }
        $producto->APLICA_IVA_PRO = $data['APLICA_IVA_PRO'];
        $producto->LOTE_PRO = $data['LOTE_PRO'];
        $producto->LABORATORIO_PRO = $data['LABORATORIO_PRO'];
        $producto->ESTADO_PRO = 1;
        $producto->TIPO_PRO = $data['TIPO_PRO'];
        $producto->VENTA_CON_RECETA = $data['VENTA_CON_RECETA'];
        $producto->USU_REGISTRO = Auth::user()->ID_USU;
        $producto->save();
        return $producto;
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
        $data = json_decode($request->datos, true);
        $producto = Productos::findOrFail($data['ID_PRO']);
        $producto->ID_CAT = $data['ID_CAT'];
        $producto->ID_PRS = $data['ID_PRS'];
        $producto->ID_MAR = $data['ID_MAR'];
        $producto->NOMBRE_PRO = $data['NOMBRE_PRO'];
        $producto->DESCRIPCION_PRO = $data['DESCRIPCION_PRO'];
        $producto->GANANCIA_PRO = $data['GANANCIA_PRO'];
        $producto->EXISTENCIA_MIN_PRO = $data['EXISTENCIA_MIN_PRO'];
        $producto->EXISTENCIA_MAX_PRO = $data['EXISTENCIA_MAX_PRO'];
        $producto->ETIQUETAS_PRO = $data['ETIQUETAS_PRO'];
        $producto->UBICACION_PRO = $data['UBICACION_PRO'];   
        if(Input::hasFile('IMAGEN_PRO'))
        {
        $file = Input::file('IMAGEN_PRO');
		$file->move(public_path().'/recursos_producto/',$file->getClientOriginalName());
        $producto->IMAGEN_PRO ='recursos_producto/'.$file->getClientOriginalName();   
        }
        $producto->APLICA_IVA_PRO = $data['APLICA_IVA_PRO'];
        $producto->LOTE_PRO = $data['LOTE_PRO'];
        $producto->LABORATORIO_PRO = $data['LABORATORIO_PRO'];
        $producto->TIPO_PRO = $data['TIPO_PRO'];
        $producto->VENTA_CON_RECETA = $data['VENTA_CON_RECETA'];
        $producto->save();
    }
    public function desactivar(Request $request)
    {
     $producto = Productos::findOrFail($request->ID_PRO);
     $producto->ESTADO_PRO = 0;
     $producto->save();
     //Productos::find($request->ID_PRO)->delete();
    }
    public function activar(Request $request)
    {
     $producto = Productos::findOrFail($request->ID_PRO);
     $producto->ESTADO_PRO = 1;
     $producto->save();
    }
    public function actualizarIncluyeIVA($ID_PRO,$APLICA_IVA)
    {
     $producto = Productos::findOrFail($ID_PRO);
     $producto->APLICA_IVA_PRO = $APLICA_IVA;
     $producto->save();
    }
}
