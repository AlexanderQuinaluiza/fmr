<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsuarioRol extends Model
{
    protected $table = 'USUARIO_ROLES';
    public $timestamps = false;
    protected $fillable = [
    'ID_ROL',
    'ID_USU'
    ];
}
