<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cajas extends Model
{
    //
    protected $table = 'CAJAS';
    protected  $primaryKey = 'ID_CAJA';
    public $timestamps = false;
    protected $fillable = ['ID_CAJA', 'ID_AGE', 'DESCRIPCION_CAJA','VALOR', 'ESTADO'];
}
