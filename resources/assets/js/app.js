
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

 

Vue.component('rol_comp', require('./components/RolComponent.vue'));
Vue.component('usuario_comp', require('./components/UsuarioComponent.vue'));
Vue.component('cliente_comp', require('./components/ClienteComponent.vue'));
Vue.component('presentacion_comp', require('./components/PresentacionComponent.vue'));
Vue.component('marca_comp', require('./components/MarcaComponent.vue'));
Vue.component('proveedor_comp', require('./components/ProveedorComponent.vue'));
Vue.component('producto_comp', require('./components/ProductoComponent.vue'));

Vue.component('categoria_comp', require('./components/CategoriaComponent.vue'));
Vue.component('agencia_comp', require('./components/AgenciaComponent.vue'));
Vue.component('caja_comp', require('./components/CajaComponent.vue'));
Vue.component('descuento_comp', require('./components/DescuentoComponent.vue'));

Vue.component('pedido_comp', require('./components/PedidoComponent.vue'));
Vue.component('modulo_comp', require('./components/ModuloComponent.vue'));
Vue.component('compra_comp', require('./components/CompraComponent.vue'));
Vue.component('dev_compra_comp', require('./components/DevCompraComponent.vue'));
Vue.component('cierre_caja_comp', require('./components/CierreCajaComponent.vue'));
Vue.component('cierres_caja_comp', require('./components/CierreCajasComponent.vue'));
Vue.component('configuracion_comp', require('./components/ConfiguracionComponent.vue'));
Vue.component('inventario_comp', require('./components/InventarioComponent.vue'));
Vue.component('estadistica_compras_comp', require('./components/EstadisticasComprasComponent.vue'));
Vue.component('reportes_comp', require('./components/ReportesComponent.vue'));
Vue.component('reporte_compras_comp', require('./components/ReporteComprasComponent.vue'));
Vue.component('reporte_productos_comp', require('./components/ReporteProductosComponent.vue'));
Vue.component('movimiento_caja', require('./components/MovimientoCajaComponent.vue'));
Vue.component('escritorio_comp', require('./components/EscritorioComponent.vue'));
Vue.component('home', require('./components/Home.vue'));

const app = new Vue({
    el: '#app',
    data:{
        menu:1,
        id_usuario: parseInt($('#idUsuario').val()),
    },
});
// import App from './components/App.vue';
// const app = new Vue({
//     router,               // Add this line
//     render: h => h(App)
//   }).$mount('#app')
