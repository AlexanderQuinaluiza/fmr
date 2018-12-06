<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'USUARIOS';
    protected $primaryKey = 'ID_USU';
    protected $fillable = [
        'NOMBRE_USU', 'CORREO_USU', 'CLAVE_USU',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'CLAVE_USU', 'REMEMBER_TOKEN',
    ];
    public function getAuthPassword()
    {
      return $this->CLAVE_USU;
    }
    public function getAuthIdentifier()
    {
        return $this->ID_USU;
    }


}
