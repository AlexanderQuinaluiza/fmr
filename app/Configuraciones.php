<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Configuraciones extends Model
{
  protected $table = 'CONFIGURACIONES';
  protected  $primaryKey = 'ID_CONF';
  public $timestamps = false;
  protected $fillable = ['NOMBRE_CONF', 'VALOR_CONF'];
}
