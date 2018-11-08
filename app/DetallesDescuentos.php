<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetallesDescuentos extends Model
{
    //
    protected $table = 'DETALLES_DESCUENTOS';
   // protected  $primaryKey = 'ID_DESC';
    public $timestamps = false;
    protected $fillable = ['ID_PRO', 'ID_DESC', 'ESTADO'];
}
