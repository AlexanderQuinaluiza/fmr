<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clientes extends Model
{
    protected $table = 'CLIENTES';
    protected  $primaryKey = 'ID_CLI';
    public $timestamps = false;
    protected $fillable = [
    'CED_RUC_CLI',
    'NOMBRE_CLI',
    'APELLIDO_CLI',
    'DIRECCION_CLI',
    'TELEFONO_CLI',
    'CORREO_CLI',
    'ESTADO_CLI'
    ];
}
