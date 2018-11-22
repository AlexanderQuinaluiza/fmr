<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ejemplares extends Model
{
    protected $table = 'EJEMPLARES';
    protected  $primaryKey = 'ID_EJM';
    public $timestamps = false;
    protected $fillable = [
    'ID_PRO',
    'COD_BARRAS_EJM',
    'FECHA_CADUCIDAD_EJM',
    'ESTADO'
    ];
}
