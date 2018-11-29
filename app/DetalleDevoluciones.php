<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetalleDevoluciones extends Model
{
    protected $table = 'DETALLE_DEVOLUCIONES';
    protected  $primaryKey = 'ID_DET_DEV';
    public $timestamps = false;
    protected $fillable = [
    'ID_DEV',
    'ID_PRO',
    'CANTIDAD_PRO_DEV',
    'SUBTOTAL_DEV',
    'IVA_DEV'
    ];
}
