<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MovimientoCaja extends Model
{
    protected $table = 'MOVIMIENTO';
    protected  $primaryKey = 'ID';
    public $timestamps = false;
    protected $fillable = [
    'TOTAL',
    'COMENTARIO',
    'FECHA',
    'TIPO',
    'ESTADO',
    'CAJ_ID',
    'VEN_ID',
    'COM_ID',
    'NCR_ID',
    'DEV_ID'
    ];
}
