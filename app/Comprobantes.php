<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comprobantes extends Model
{
    //ID_COM, TIPO_DOC, ID_VEN, COM_ID_COM, NUMERO_COM, FECHA_COM, OBSERVACION_COMP
    protected $table = 'COMPROBANTES';
    protected  $primaryKey = 'ID_COM';
    public $timestamps = false;
    protected $fillable = ['ID_COM', 'TIPO_DOC', 'ID_VEN', 'COM_ID_COM', 'NUMERO_COM', 'FECHA_COM', 'OBSERVACION_COMP'];
}
