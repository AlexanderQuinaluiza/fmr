<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pedidos;
use App\Proveedores;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Mail;
use App\Mail\EmergencyCallReceived;
use PDF;
use App\Agencias;
class PedidoController extends Controller
{
    public $rutaAdjunto='';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pedidos = DB::table('PEDIDOS as p')
        ->join('PROVEEDORES as pv','pv.ID_PROV','=','p.ID_PROV')
        ->select('p.ID_PED',DB::raw('DATE_FORMAT(p.FECHA_PED, "%d-%b-%Y") as FECHA_PED'),'p.OBSERVACION_PED','p.ESTADO','pv.NOMBRE_PROV',
        'p.ID_PROV','pv.RUC_PROV as ITEMS')
        ->get();
        
        foreach ($pedidos as $pedido) {
           $pedido->ITEMS=
           app('App\Http\Controllers\DetallePedidoController')->index($pedido->ID_PED);
        }
        return response()->json(['data'=>$pedidos],200);
    }

    public function setCredentialMail()
    {
        // $this->changeEnvironmentVariable('MAIL_DRIVER','smtp');
        // $this->changeEnvironmentVariable('MAIL_HOST','smtp.gmail.com');
        // $this->changeEnvironmentVariable('MAIL_PORT','587');
        // $this->changeEnvironmentVariable('MAIL_USERNAME','patriciomanotoa@gmail.com');
        // $this->changeEnvironmentVariable('MAIL_PASSWORD','jSsA1991');

     /**MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=hola
MAIL_PASSWORD=jSsA1991
MAIL_ENCRYPTION=tls*/
    }
   
    /**public function pedidoById()
    {
        $id = (int) $_GET['ID_PED'];
        $pedido =  DB::table('PRODUCTOS as p')
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

       // $producto[0]->PRECIO_PROMOCIONAL_PRO;
       $idproducto = (int)$producto[0]->ID_PRO;
       $precioVenta = (float)$producto[0]->PRECIO_VENTA_PRO;

        $porcentajeDesc = (float)$this->getPorcentajeDescuento($idproducto);
        $descuento = $porcentajeDesc * $precioVenta;
        $precioConDescuento = $precioVenta - $descuento;
        $producto[0]->PRECIO_PROMOCIONAL_PRO = round($precioConDescuento,2);

        //return round($precioConDescuento,2);

       // $id = (int) $_GET['ID_PRO'];
       // $producto = Productos::findOrFail($id);
      return response()->json($producto,200);

        /**->join('PRESENTACIONES pr')
        ->join('CATEGORIAS c')
}*/


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $success = 0;
        $error = null;
        DB::beginTransaction();
        try {
            $data = json_decode($request->datos, true);
            $pedido = new Pedidos;
            $pedido->OBSERVACION_PED = $request->OBSERVACION_PED;
            $pedido->ID_PROV = $request->ID_PROV;
            $pedido->ESTADO = 0;
            $pedido->save();
            app('App\Http\Controllers\DetallePedidoController')->store($data,$pedido->ID_PED);
        DB::commit();
        $success = 1;
        } catch (\Exception $e) {
        $success = 0;
        $error = $e->getMessage();
        DB::rollback();
        }
       return $success;
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
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


    public function pendiente(Request $request)
    {
     $pedido = Pedidos::findOrFail($request->ID_PED);
     $pedido->ESTADO = 0;
     $pedido->save();
     //Pedidos::find($request->ID_PED)->delete();
    }
    public function entregado(Request $request)
    {
     $pedido = Pedidos::findOrFail($request->ID_PED);
     $pedido->ESTADO = 1;
     $pedido->save();
    }

   

// public function mail()
// {
//    $name = 'Krunal';
//    Mail::to('chagllaamy@gmail.com')->send(new EmergencyCallReceived($name));

   
//    return 'Email was sent';
// }
public function mail(){

    $data = array('name'=>"Patricio Landa");
    Mail::send('mails.name', $data, function($message) {


      
       $message->to('chagllaamy@gmail.com', 'Amy')->subject
          ('Pedido de medicamentos');
       $message->attach($rutaAdjunto);
       //$message->attach('C:\laravel-master\laravel\public\uploads\test.txt');
       $message->from('patriciomanotoa@gmail.com','Patricio Landa');
    });
    echo "Email Sent with attachment. Check your inbox.";
 }

 public function export_pdf()
 {
    $data = DB::table('PEDIDOS as p')
    ->join('PROVEEDORES as pv','pv.ID_PROV','=','p.ID_PROV')
    ->select('p.ID_PED',DB::raw('DATE_FORMAT(p.FECHA_PED, "%d-%b-%Y") as FECHA_PED'),'p.OBSERVACION_PED','p.ESTADO','pv.NOMBRE_PROV',
    'p.ID_PROV','pv.RUC_PROV as ITEMS')
    ->get();

   // Fetch all customers from database
   //$data = Pedidos::All();
   // Send data to the view using loadView function of PDF facade
   $pdf = PDF::loadView('mails.pedidos', compact('data'));
   // If you want to store the generated pdf to the server then you can use the store function
   $pdf->save(storage_path().'_filename.pdf');
   // Finally, you can download the file using download function
   return $pdf->download('customers.pdf');
 }

 public function enviarCorreoPedidoNoGuardado(Request $request)
 {
    $success = 0;
    $error = null;
    try {
        $agencias=Agencias::All();
        $pedidos = Pedidos::All();
        $proveedor =  Proveedores::All()
        ->where('ID_PROV','=',$request->ID_PROV);
        $nombreProveedor = '';
        $mailProveedor = '';
        $numPedido = (int)$pedidos[count($pedidos)-1]->ID_PED;
        $dias = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
        $meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");             
        $fecha =  $dias[date('w')]." ".date('d')." de ".$meses[date('n')-1]. " del ".date('Y') ;

        $data = json_decode($request->datos, true);
        $pedido = new Pedidos;
        $pedido->OBSERVACION_PED = $request->OBSERVACION_PED;
        $pedido->ID_PROV = $request->ID_PROV;
        $pedido->FECHA_PED = $fecha;
        $pedido->ID_PED = $numPedido+1; 
        foreach ($proveedor as $key => $value) {
            $nombreProveedor = $value->NOMBRE_PROV;
            $mailProveedor = $value->CORREO_PROV;
        }
        $pdf = PDF::loadView('mails.pedidos', compact('pedido','agencias','nombreProveedor','data'));
        $urlFile = public_path().'/recursos_pedidos/'.'PEDIDO'.$pedido->ID_PED.'.pdf';
        $pdf->save($urlFile);

        $rutaAdjunto = $urlFile;
        $nombreAgencia = $agencias[0]->NOMBRE_AGE;
        $data_ = array(
            'name'=> $nombreAgencia,
            'mailOrigen'=> env('MAIL_USERNAME'),
            'nombreDestino'=>$nombreProveedor,
            'emailDestino'=> $mailProveedor,
            'agencia'=>$nombreAgencia);
            Mail::send('mails.name', $data_, function($message) use($data_, $rutaAdjunto) {
            $message->to($data_['emailDestino'], $data_['nombreDestino'])->subject
                ('Pedido de medicamentos - '.$data_['agencia']);
            $message->attach($rutaAdjunto);
            $message->from($data_['mailOrigen'],$data_['name']);
            });
            $success = 1;
        } catch (\Exception $e) {
            $success = $e->getMessage();
            $error = $e->getMessage();
            }
        return $success;
  }


  public function enviarCorreoPedidoGuardado(Request $request)
 {
    $success = 0;
    $error = null;
     try {
        $agencias = Agencias::All();
        $pedidodb = Pedidos::All()->where('ID_PED','=',$request->ID_PED);
        $proveedor =  Proveedores::All()
        ->where('NOMBRE_PROV','=',$request->NOMBRE_PROV);
        $nombreProveedor = $request->NOMBRE_PROV;
        $mailProveedor = '';
        $numPedido = $request->ID_PED;
        $fecha = $request->FECHA_PED;
        $detallesPedido = app('App\Http\Controllers\DetallePedidoController')->getDetalleByIdNoJSON($request->ID_PED);
       $data = json_decode($detallesPedido, true);
        foreach ($proveedor as $key => $value) {
            $mailProveedor = $value->CORREO_PROV;
        }
        $pedido = null;
        foreach ($pedidodb as $key => $value) {
             $pedido = $value;
         }
       $pdf = PDF::loadView('mails.pedidos', compact('pedido','agencias','nombreProveedor','data'));
        $urlFile = public_path().'/recursos_pedidos/'.'PEDIDO'.$pedido->ID_PED.'.pdf';
        $pdf->save($urlFile);

        $rutaAdjunto = $urlFile;
        $nombreAgencia = $agencias[0]->NOMBRE_AGE;
        $data_ = array(
            'name'=> $nombreAgencia,
            'mailOrigen'=> env('MAIL_USERNAME'),
            'nombreDestino'=>$nombreProveedor,
            'emailDestino'=> $mailProveedor,
            'agencia'=>$nombreAgencia);
            Mail::send('mails.name', $data_, function($message) use($data_, $rutaAdjunto) {
            $message->to($data_['emailDestino'], $data_['nombreDestino'])->subject
                ('Pedido de medicamentos - '.$data_['agencia']);
            $message->attach($rutaAdjunto);
            $message->from($data_['mailOrigen'],$data_['name']);
            });
            $success = 1;
        } catch (\Exception $e) {
            $success = $e->getMessage();
            $error = $e->getMessage();
            }
        return $success;
  }



}
