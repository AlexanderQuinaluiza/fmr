<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetalleCompras extends Model
{
    protected $table = 'DETALLE_COMPRAS';
    protected  $primaryKey = 'ID_DETC';
    public $timestamps = false;
    protected $fillable = [
    'ID_PRO',
    'ID_COMP',
    'PRECIO_COMP_SIN',
    'PRECIO_COMP_CON',
    'CANTIDAD_PRO',
    'SUBTOTAL_SIN',
    'SUBTOTAL_CON'
    ];
}
