<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Presentaciones extends Model
{
  protected $table = 'PRESENTACIONES';
  protected  $primaryKey = 'ID_PRS';
  public $timestamps = false;
  protected $fillable = ['NOMBRE_PRS','ESTADO_PRS'];
}
