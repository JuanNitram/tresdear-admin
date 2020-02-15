import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/auth/Login.vue'
import Dashboard from './views/Dashboard.vue'

import Administradores from './views/admins/Admins.vue'
import AdministradoresNuevo from './views/admins/AdminsNew.vue'

import Projects from './views/projects/Projects.vue'
import ProjectsNuevo from './views/projects/ProjectsNew.vue'

import Sliders from './views/sliders/Sliders.vue'
import SlidersNuevo from './views/sliders/SlidersNuevo.vue'

import Clients from './views/clients/Clients.vue'
import ClientsNew from './views/clients/ClientsNew.vue'

import Prices from './views/prices/Prices.vue'
import PricesNew from './views/prices/PricesNew.vue'

import Sections from './views/sections/Sections.vue'
import SectionsNew from './views/sections/SectionsNew.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        isLogin: true,
        title: 'Login',
        section: 'login'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        title: 'Dashboard',
        section: 'dashboard'
      }
    },
    ////////////////////////////////////////
    {
      path: '/admins',
      name: 'admins',
      component: Administradores,
      meta: {
        requiresAuth: true,
        title: 'Administradores',
        section: 'admins'
      }
    },
    {
      path: '/admins/new',
      name: 'new-admin',
      component: AdministradoresNuevo,
      meta: {
        requiresAuth: true,
        title: 'Nuevo Administrador',
        section: 'admins',
      }
    },
    {
      path: '/admins/edit/:id',
      name: 'edit-admin',
      component: AdministradoresNuevo,
      meta: {
        requiresAuth: true,
        title: 'Editar Administrador',
        section: 'admins'
      }
    },
    ////////////////////////////////////////
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
      meta: {
        requiresAuth: true,
        title: 'Projects',
        section: 'projects'
      }
    },
    {
      path: '/projects/new',
      name: 'new-project',
      component: ProjectsNuevo,
      meta: {
        requiresAuth: true,
        title: 'New Project',
        section: 'projects'
      }
    },
    {
      path: '/projects/edit/:id',
      name: 'edit-project',
      component: ProjectsNuevo,
      meta: {
        requiresAuth: true,
        title: 'Edit Project',
        section: 'projects'
      }
    },
    ////////////////////////////////////////
    {
      path: '/sliders',
      name: 'sliders',
      component: Sliders,
      meta: {
        requiresAuth: true,
        title: 'Sliders',
        section: 'sliders'
      }
    },
    {
      path: '/sliders/new',
      name: 'new-slider',
      component: SlidersNuevo,
      meta: {
        requiresAuth: true,
        title: 'New slider',
        section: 'sliders'
      }
    },
    {
      path: '/sliders/edit/:id',
      name: 'edit-slider',
      component: SlidersNuevo,
      meta: {
        requiresAuth: true,
        title: 'Edit slider',
        section: 'sliders'
      }
    },
    ////////////////////////////////////////
    {
      path: '/sections',
      name: 'sections',
      component: Sections,
      meta: {
        requiresAuth: true,
        title: 'Sections',
        section: 'sections'
      }
    },
    {
      path: '/sections/new',
      name: 'new-section',
      component: SectionsNew,
      meta: {
        requiresAuth: true,
        title: 'New Section',
        section: 'sections'
      }
    },
    {
      path: '/sections/edit/:id',
      name: 'edit-section',
      component: SectionsNew,
      meta: {
        requiresAuth: true,
        title: 'Edit Section',
        section: 'sections'
      }
    },
    ////////////////////////////////////////
    {
      path: '/clients',
      name: 'clients',
      component: Clients,
      meta: {
        requiresAuth: true,
        title: 'Clients',
        section: 'clients'
      }
    },
    {
      path: '/clients/new',
      name: 'new-client',
      component: ClientsNew,
      meta: {
        requiresAuth: true,
        title: 'New Client',
        section: 'clients'
      }
    },
    {
      path: '/clients/edit/:id',
      name: 'edit-client',
      component: ClientsNew,
      meta: {
        requiresAuth: true,
        title: 'Edit client',
        section: 'clients'
      }
    },
    ////////////////////////////////////////
    {
      path: '/prices',
      name: 'prices',
      component: Prices,
      meta: {
        requiresAuth: true,
        title: 'Prices',
        section: 'prices'
      }
    },
    {
      path: '/prices/new',
      name: 'new-price',
      component: PricesNew,
      meta: {
        requiresAuth: true,
        title: 'New Price',
        section: 'prices'
      }
    },
    {
      path: '/prices/edit/:id',
      name: 'edit-price',
      component: PricesNew,
      meta: {
        requiresAuth: true,
        title: 'Edit price',
        section: 'prices'
      }
    },
    ////////////////////////////////////////
    {
        path: '/*',
        redirect: '/dashboard'
    },
  ]
})

router.beforeEach((to, from, next) => {
    next();
});

export default router
