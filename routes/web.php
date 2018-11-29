<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('contenido/contenido');
});



Route::get('roles', 'RolController@index');
Route::get('roles/byid', 'RolController@rolById');
Route::post('roles/registrar', 'RolController@store');
Route::post('roles/actualizar', 'RolController@update');
Route::post('roles/desactivar', 'RolController@desactivar');
Route::post('roles/activar', 'RolController@activar');
Route::get('roles/fillddl', 'RolController@getRolesToFillDropDownList');
Route::get('roles_up/fillddl', 'RolController@getRolesUpdateToFillDropDownList');


Route::get('usuarios', 'UsuarioController@index');
Route::get('usuarios/byid', 'UsuarioController@usuarioById');
Route::post('usuarios/registrar', 'UsuarioController@store');
Route::post('usuarios/actualizar', 'UsuarioController@update');
Route::post('usuarios/desactivar', 'UsuarioController@desactivar');
Route::post('usuarios/activar', 'UsuarioController@activar');
Route::post('usuarios/actualizarClave', 'UsuarioController@actualizarClave');
Route::get('usuarios/existe', 'UsuarioController@getStringUsuarioRol');



Route::get('clientes', 'ClienteController@index');
Route::get('clientes/byid', 'ClienteController@clienteById');
Route::post('clientes/registrar', 'ClienteController@store');
Route::post('clientes/actualizar', 'ClienteController@update');
Route::post('clientes/desactivar', 'ClienteController@desactivar');
Route::post('clientes/activar', 'ClienteController@activar');

Route::get('presentaciones', 'PresentacionController@index');
Route::get('presentaciones/byid', 'PresentacionController@presentacionById');
Route::get('presentaciones/activas', 'PresentacionController@presentacionesActivas');
Route::post('presentaciones/registrar', 'PresentacionController@store');
Route::post('presentaciones/actualizar', 'PresentacionController@update');
Route::post('presentaciones/desactivar', 'PresentacionController@desactivar');
Route::post('presentaciones/activar', 'PresentacionController@activar');

Route::get('marcas', 'MarcaController@index');
Route::get('marcas/byid', 'MarcaController@marcaById');
Route::get('marcas/activas', 'MarcaController@marcasActivas');
Route::post('marcas/registrar', 'MarcaController@store');
Route::post('marcas/actualizar', 'MarcaController@update');
Route::post('marcas/desactivar', 'MarcaController@desactivar');
Route::post('marcas/activar', 'MarcaController@activar');

Route::get('proveedores', 'ProveedorController@index');
Route::get('proveedores/activos', 'ProveedorController@activos');
Route::get('proveedores/byid', 'ProveedorController@proveedorById');
Route::post('proveedores/registrar', 'ProveedorController@store');
Route::post('proveedores/actualizar', 'ProveedorController@update');
Route::post('proveedores/desactivar', 'ProveedorController@desactivar');
Route::post('proveedores/activar', 'ProveedorController@activar');
Route::get('proveedores/provincias', 'ProveedorController@autocompleteProvincias');
Route::get('proveedores/ciudades', 'ProveedorController@autocompleteCiudades');

Route::get('productos', 'ProductoController@index');
Route::get('productos/activos', 'ProductoController@productosActivos');
Route::get('productos/byid', 'ProductoController@productoById');
Route::get('productos/descuentobyidproducto', 'ProductoController@getPorcentajeDescuento');
Route::post('productos/registrar', 'ProductoController@store');
Route::post('productos/actualizar', 'ProductoController@update');
Route::post('productos/desactivar', 'ProductoController@desactivar');
Route::post('productos/activar', 'ProductoController@activar');

Route::post('ejemplares/registrar', 'EjemplarController@store');
/** routes categorias */
Route::get('categorias', 'CategoriasController@index');
Route::get('categorias/byid', 'CategoriasController@categoriaById');
Route::get('categorias/activas', 'CategoriasController@categoriasActivas');
Route::post('categorias/registrar', 'CategoriasController@store');
Route::post('categorias/actualizar', 'CategoriasController@update');
Route::post('categorias/desactivar', 'CategoriasController@desactivar');
Route::post('categorias/activar', 'CategoriasController@activar');

/**ROUTES AGENCIAS */
Route::get('agencias', 'AgenciasController@index');
Route::get('agencias/byid', 'AgenciasController@agenciaById');
Route::post('agencias/registrar', 'AgenciasController@store');
Route::post('agencias/actualizar', 'AgenciasController@update');
Route::post('agencias/desactivar', 'AgenciasController@desactivar');
Route::post('agencias/activar', 'AgenciasController@activar');
/** ROUTES CAJAS */

Route::get('cajas', 'CajasController@index');
Route::get('cajasParaAbrir', 'CajasController@getCajasParaApertura');
Route::get('cajas/agencias', 'CajasController@onlyAgencias');
Route::post('cajas/registrar', 'CajasController@store');
Route::get('cajas/byid', 'CajasController@cajasbyid');
Route::post('cajas/desactivar', 'CajasController@desactivar');
Route::post('cajas/activar', 'CajasController@activar');
Route::post('cajas/actualizar', 'CajasController@update');
/** ROUTES DESCUENTOS */
/** es necesario comentar las nuevas routas para no confudirse */
Route::get('descuentos', 'DescuentosController@index');
Route::post('descuentos/registrar', 'DescuentosController@store');
Route::get('descuentos/detalles', 'DetallesDescuentosController@getDetallesById');
Route::get('descuentos/productos', 'ProductoController@productosActivos');
Route::post('descuentos/desactivar', 'DescuentosController@desactivar');
Route::post('descuentos/activar', 'DescuentosController@activar');
Route::get('descuentos/byid','DescuentosController@getDescuentoById');
Route::post('descuentos/actualizar','DescuentosController@update');
Route::get('descuentos/productosDescontados','ProductoController@productoDescuentos');

// ROUTES VENTAS 
Route::get('ventas/productosventas', 'ProductoController@productosVentas');
Route::get('ventas/cabecera', 'VentasController@getCabeceraFAC');
Route::get('ventas/apertura', 'VentasController@getApertura');
Route::get('ventas/cliente', 'VentasController@clienteFAC');
Route::get('ventas/ejemplares', 'ProductoController@productoEjemplar');
Route::post('ventas/registrar','VentasController@store');

Route::get('roles', 'RolController@index');
Route::get('roles/byid', 'RolController@rolById');
Route::get('roles/modulos', 'RolController@getModulosDeRol');
Route::get('roles/modulos/update', 'RolController@getModulosUpdate');
Route::post('roles/registrar', 'RolController@store');
Route::post('roles/actualizar', 'RolController@update');
Route::post('roles/desactivar', 'RolController@desactivar');
Route::post('roles/activar', 'RolController@activar');
Route::get('roles/fillddl', 'RolController@getRolesToFillDropDownList');
Route::get('roles_up/fillddl', 'RolController@getRolesUpdateToFillDropDownList');


Route::get('usuarios', 'UsuarioController@index');
Route::get('usuarios/byid', 'UsuarioController@usuarioById');
Route::post('usuarios/registrar', 'UsuarioController@store');
Route::post('usuarios/actualizar', 'UsuarioController@update');
Route::post('usuarios/desactivar', 'UsuarioController@desactivar');
Route::post('usuarios/activar', 'UsuarioController@activar');
Route::post('usuarios/actualizarClave', 'UsuarioController@actualizarClave');
Route::get('usuarios/existe', 'UsuarioController@getStringUsuarioRol');


Route::get('pedidos', 'PedidoController@index');
Route::get('detallepedidos', 'DetallePedidoController@index');
Route::get('pedidos/detalle/byid', 'DetallePedidoController@getDetalleById');
Route::post('pedidos/registrar', 'PedidoController@store');
Route::post('pedidos/pendiente', 'PedidoController@pendiente');
Route::post('pedidos/entregado', 'PedidoController@entregado');

Route::get('modulos', 'ModuloController@index');
Route::get('modulos/byid', 'ModuloController@moduloById');
Route::get('modulos/activos', 'ModuloController@modulosActivos');
Route::post('modulos/registrar', 'ModuloController@store');
Route::post('modulos/actualizar', 'ModuloController@update');
Route::post('modulos/desactivar', 'ModuloController@desactivar');
Route::post('modulos/activar', 'ModuloController@activar');

Route::get('compras', 'CompraController@index');
Route::get('compras/detalle/byid', 'DetalleCompraController@getDetalleById');
Route::get('compras/byid', 'CompraController@getById');
Route::post('compras/registrar', 'CompraController@store');

Route::get('agencias', 'AgenciasController@index');
Route::get('agencias/byid', 'AgenciasController@agenciaById');
Route::post('agencias/registrar', 'AgenciasController@store');
Route::post('agencias/actualizar', 'AgenciasController@update');
Route::post('agencias/desactivar', 'AgenciasController@desactivar');
Route::post('agencias/activar', 'AgenciasController@activar');

Route::get('settings', 'ConfiguracionController@getSetting');

Route::post('devolucion-compra/registrar', 'DevolucionController@store');

Route::get('cierreCaja/ventasPorUsuario', 'CierreCajaController@getTotalVendidoPorUsuario');
Route::post('cierreCaja/registrar', 'CierreCajaController@store');
Route::post('cierreCaja/actualizar', 'CierreCajaController@update');

Route::get('denominacionDinero', 'DenominacionDineroController@index');

