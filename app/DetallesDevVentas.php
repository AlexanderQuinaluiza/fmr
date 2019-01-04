<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetallesDevVentas extends Model
{
    //
    protected $table = 'DETALLE_DEVOLUCIONES_VENTAS';
    protected  $primaryKey = 'ID_DET_DEV_VEN';
    public $timestamps = false;
    protected $fillable = ['ID_DET_DEV_VEN', 'ID_DEV_VEN', 'CANTIDAD', 'PRECIO_VEN', 'SUBTOTAL', 'PRODUCTO', 'OBSERVACION_DEV','ID_DET_VEN' ];
}
