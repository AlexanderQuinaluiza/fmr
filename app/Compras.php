<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Compras extends Model
{
    protected $table = 'COMPRAS';
    protected  $primaryKey = 'ID_COMP';
    public $timestamps = false;
    protected $fillable = [
    'ID_PROV',
    'ID_USU',
    'FACTURA_PROV',
    'DESCRIPCION_COMP',
    'TOTAL_COMP',
    'IVA_COMP',
    'DESCUENTO_COMP'
    ];
}
