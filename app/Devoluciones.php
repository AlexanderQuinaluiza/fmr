<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Devoluciones extends Model
{
    protected $table = 'DEVOLUCIONES';
    protected  $primaryKey = 'ID_DEV';
    public $timestamps = false;
    protected $fillable = [
    'TIPO_DOC',
    'ID_COMP',
    'ID_USU',
    'TOTAL_DEV',
    'OBSERVACION_DEV',
    'FECHA_DEV',
    'NUMERO_NC'
    ];
}
