<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Agencias extends Model
{
    //
    protected $table = 'AGENCIAS';
  protected  $primaryKey = 'ID_AGE';
  public $timestamps = false;
  protected $fillable = ['NOMBRE_AGE', 'DIRECCION_AGE', 'RUC_AGE', 'CIUDAD_AGE', 'TELEFONO_AGE', 'CORREO_AGE', 'LOGO_AGE', 'ESTADO_AGE'];
}
