<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CierreCaja extends Model
{
    protected $table = 'CIERRE_CAJA';
    protected  $primaryKey = 'ID_CCJ';
    public $timestamps = false;
    protected $fillable = [
    'ID_CAJA',
    'ID_USU',
    'DESC_CCJ',
    'CALCULADO_CCJ',
    'DIFERENCIA_CCJ',
    'RETIRO_CCJ',
    'FECHA_APERTURA_CCJ',
    'FECHA_CIERRE_CCJ',
    'ESTADO_CCJ'
    ];
}
