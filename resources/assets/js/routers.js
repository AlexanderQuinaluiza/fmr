import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue';
import Modulo from './components/ModuloComponent.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/modulo',
      name: 'modulo',
      component: Modulo
    }
  ]
})