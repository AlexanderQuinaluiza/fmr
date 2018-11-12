<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetalleVentas extends Model
{
    //ID_DET_VEN, ID_PRO, ID_VEN, CANTIDAD_PRO, PRECIO_VEN

    protected $table = 'DETALLE_VENTAS';
    //protected  $primaryKey = 'ID_VEN';
    public $timestamps = false;
    protected $fillable = ['ID_DET_VEN', 'ID_PRO', 'ID_VEN', 'CANTIDAD_PRO', 'PRECIO_VEN'];

}
