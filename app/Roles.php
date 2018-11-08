<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
  protected $table = 'ROLES';
  protected  $primaryKey = 'ID_ROL';
  public $timestamps = false;
  protected $fillable = ['NOMBRE_ROL', 'DESCRIPCION_ROL','ESTADO_ROL'];
}
