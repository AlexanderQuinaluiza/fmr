<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OpcionRoles extends Model
{
    protected $table = 'OPCION_ROLES';
    public $timestamps = false;
    protected $fillable = [
    'ID_MOD',
    'ID_ROL'
    ];
}
