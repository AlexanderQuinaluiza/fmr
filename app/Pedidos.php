<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pedidos extends Model
{
    protected $table = 'PEDIDOS';
    protected  $primaryKey = 'ID_PED';
    public $timestamps = false;
    protected $fillable = [
    'ID_PRO',
    'ID_PROV',
    'FECHA_PED',
    'OBSERVACION_PED',
    'ESTADO'
    ];
}
