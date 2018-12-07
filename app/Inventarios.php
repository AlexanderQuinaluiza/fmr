<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inventarios extends Model
{
  protected $table = 'INVENTARIOS';
  protected  $primaryKey = 'ID';
  public $timestamps = false;
  protected $fillable = [
      'ID_PRO',
      'ID_TIPO',
      'DOC_REFERENCIA',
      'DESCRIPCION',
      'FECHA_COM',
      'CANTIDAD_PRO',
      'VALOR',
      'TOTAL',
      'TIPO_ITEM',
      'CANTIDAD_EXIST',
      'VALOR_EXIST',
      'TOTAL_EXIST'
    ];
}
