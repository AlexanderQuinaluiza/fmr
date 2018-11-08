<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Proveedores extends Model
{
    protected $table = 'PROVEEDORES';
    protected  $primaryKey = 'ID_PROV';
    public $timestamps = false;
    protected $fillable = [
    'NOMBRE_PROV', 'RUC_PROV','DIRECCION_PROV','CORREO_PROV',
    'TELEFONO_PROV','RAZON_SOCIAL_PROV','NACIONALIDAD_PROV',
    'FECHA_ACTU_INGRESO','USU_INGRESO_PROV',
    'USU_ACTU_PROV','ESTADO_PROV','DEMORA_ENTREGA','PROVINCIA_PROV',
    'CIUDAD_PROV'];
}
