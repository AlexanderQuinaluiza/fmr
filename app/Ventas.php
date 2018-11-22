<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ventas extends Model
{
    //ID_VEN, ID_USU, ID_CLI, FECHA_VEN, DESCRIPCION_VEN, IVA_VEN, TOTAL_VEN, ESTADO, SUBT_IVA, SUBT_CERO, TOTAL_DESC
    
    protected $table = 'VENTAS';
    protected  $primaryKey = 'ID_VEN';
    public $timestamps = false;
    protected $fillable = ['ID_VEN', 'ID_USU', 'ID_CLI', 'FECHA_VEN', 'DESCRIPCION_VEN', 'IVA_VEN', 'TOTAL_VEN', 'ESTADO','SUBT_IVA', 'SUBT_CERO', 'TOTAL_DESC'];
}
