<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Modulos extends Model
{
    protected $table = 'MODULOS';
    protected  $primaryKey = 'ID_MOD';
    public $timestamps = false;
    protected $fillable = [
    'NOMBRE_MOD',
    'ICONO_MOD',
    'URL_MOD',
    'ESTADO_MOD'
    ];
}
