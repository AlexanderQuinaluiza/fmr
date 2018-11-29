<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Documentos extends Model
{
    protected $table = 'DOCUMENTOS';
    protected  $primaryKey = 'ID_DOC';
    public $timestamps = false;
    protected $fillable = [
    'NUMERO_MIN',
    'NUMERO_MAX',
    'EMPEZAR'
    ];
}
