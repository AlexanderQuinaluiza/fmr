<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Marcas extends Model
{
  protected $table = 'MARCAS';
  protected  $primaryKey = 'ID_MAR';
  public $timestamps = false;
  protected $fillable = ['NOMBRE_MAR','ESTADO_MAR'];
}
