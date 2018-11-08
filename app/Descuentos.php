<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Descuentos extends Model
{
    //
    protected $table = 'DESCUENTOS';
    protected  $primaryKey = 'ID_DESC';
    public $timestamps = false;
    protected $fillable = ['ID_DESC', 'PORCENTAJE_DESC', 'FECHA_INICIO_DESC', 'FECHA_FIN_DESC', 'ESTADO_DESC','DESCRIPCION_DESC'];

}
