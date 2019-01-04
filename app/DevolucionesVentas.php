<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DevolucionesVentas extends Model
{
    //
    protected $table = 'DEVOLUCIONES_VENTAS';
    protected  $primaryKey = 'ID_DEV_VEN';
    public $timestamps = false;
    protected $fillable = ['ID_DEV_VEN', 'ID_VEN', 'ID_USU', 'TOTAL_DEV', 'IVA_DEV', 'SUBT_IVA', 'SUBT_CERO', 'OBSERVACION_DEV', 'FECHA_DEV' ];
}
