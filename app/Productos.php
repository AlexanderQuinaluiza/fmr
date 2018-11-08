<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Productos extends Model
{
    protected $table = 'PRODUCTOS';
    protected  $primaryKey = 'ID_PRO';
    public $timestamps = false;
    protected $fillable = [
    'ID_CAT', 'ID_PRS','ID_MAR','NOMBRE_PRO','DESCRIPCION_PRO',
    'COSTO_PRO','GANANCIA_PRO','PRECIO_VENTA_PRO',
    'EXISTENCIA_MIN_PRO','EXISTENCIA_MAX_PRO','ETIQUETAS_PRO',
    'UBICACION_PRO','IMAGEN_PRO','APLICA_IVA_PRO','STOCK_PRO',
    'LOTE_PRO','LABORATORIO_PRO','ESTADO_PRO',
    'TIPO_PRO','PRECIO_PROMOCIONAL_PRO','VENTA_CON_RECETA','USU_REGISTRO'];
    //'FECHA_REGISTRO_PRO',
}
