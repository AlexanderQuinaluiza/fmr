<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetallePedidos extends Model
{
    protected $table = 'DETALLE_PEDIDO';
    protected  $primaryKey = 'ID_DETALLE_PEDIDO';
    public $timestamps = false;
    protected $fillable = [
    'ID_PED',
    'ID_MAR',
    'ID_PRS',
    'ID_PRO',
    'CANTIDAD_PRO'
    ];
}
