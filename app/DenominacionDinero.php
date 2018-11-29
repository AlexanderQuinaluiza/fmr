<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DenominacionDinero extends Model
{
    protected $table = 'DENOMINACIONES_DINERO';
    protected  $primaryKey = 'ID_DEN';
    public $timestamps = false;
    protected $fillable = [
    'VALOR_DEN',
    'ESTADO_DEN'
    ];
}
