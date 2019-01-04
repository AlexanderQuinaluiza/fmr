<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model
{
    protected $table = 'USUARIOS';
    protected  $primaryKey = 'ID_USU';
    public $timestamps = false;
    protected $fillable = [
    'CED_RUC_USU',
    'NOMBRE_USU',
    'APELLIDO_USU',
    'TELEFONO_USU',
    'ALIAS_USU',
    'CLAVE_USU',
    'DIRECCION_USU',
    'CORREO_USU',
    'ESTADO_USU',
    'ID_CAJA'
    ];
    //  'FECHA_REGISTRO_USU'
    //'REMEMBER_TOKEN',
}
