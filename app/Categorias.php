<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categorias extends Model
{
    //
    protected $table = 'CATEGORIAS';
    protected  $primaryKey = 'ID_CAT';
    public $timestamps = false;
    protected $fillable = ['NOMBRE_CAT','ESTADO_CAT'];
}
