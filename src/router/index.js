import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import Home from '@/views/index.vue';
import Auth from '@/views/auth/Auth.vue';
import Login from '@/views/auth/login.vue';
import Logout from '@/views/auth/logout.vue';
import AgentIndex from '@/views/settings/agents/index.vue';
import UserIndex from '@/views/settings/users/index.vue'



const routes = [
    {
        path: '/auth',
        name: 'Auth',
        component: Auth,
        meta: { layout: 'auth' },
        children: [
            {
                path: 'login',
                name: 'Login',
                component: Login,
            },
            {
                path: '/logout',
                name: 'Logout',
                component: Logout,
            },
        ],
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/index2',
        name: 'index2',
        component: () => import('@/views/index2.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/operation/shipments',
        name: 'tickets-list',
        component: () => import('../views/operation/tickets/list.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    // testing route starts
    {
        path: '/operation/shipments/test',
        name: 'tickets-list-test',
        component: () => import('../views/operation/tickets/test.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    // test component ends
    // undispatches parcels starts
    {
        path: '/operation/undispatch',
        name: 'undispatches-list',
        component: () => import('../views/operation/undispatches/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    // undispatches parcels ends 
    {
        path: '/operation/dispatches',
        name: 'dispatches-list',
        component: () => import('../views/operation/dispatches/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/operation/dispatches/parcel-movements',
        name: 'dispatches-parcel-movements-list',
        component: () => import('../views/operation/dispatches/parcel-movements/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/operation/manifests',
        name: 'sales-preview',
        component: () => import('../views/operation/sales/preview.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/operation/consolidations',
        name: 'consolidations-list',
        component: () => import('../views/operation/consolidations/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
   
    // {
    //     path: '/operation/un-consolidations',
    //     name: 'unconsolidations-list',
    //     component: () => import('../views/operation/unconsolidations/index.vue'),
    //     meta: { layout: 'app', requiresAuth: true },
    // },

    {
        path: '/operation/report/sales',
        name: 'sales-report',
        component: () => import('../views/operation/sales/preview.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/operation/report/routes/sales',
        name: 'routes-sales-report',
        component: () => import('../views/operation/sales/routes_sales.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/operation/report/agent/sales',
        name: 'agent-sales-report',
        component: () => import('../views/operation/sales/agent_sales.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/operation/report/collections',
        name: 'collections-report-route-wise',
        component: () => import('../views/operation/collections/route-wise/preview.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/operation/report/collections/dispatch',
        name: 'collections-report',
        component: () => import('../views/operation/collections/agent-wise/preview.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/operation/collections',
        name: 'collections',
        component: () => import('../views/operation/collections/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/operation/report/sales/summary',
        name: 'sales-summary',
        component: () => import('../views/operation/sales/summary/preview.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },


    // Offload route starts
    {
        path: '/operation/offloads',
        name: 'offloads-list',
        component: () => import('../views/operation/offloads/preview.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    // offload route ends
    {
        path: '/operation/dispatch',
        name: 'dispatches-report',
        component: () => import('../views/operation/dispatches/dispatch_report/preview.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/operation/vehicle-dispatch/:vehicleId',
        name: 'vehicle-dispatches-report',
        component: () => import('../views/operation/dispatches/dispatch_report/vehicle_dispatch.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/settings/branches',
        name: 'setting-branch-index',
        component: () => import('../views/settings/branches/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/settings/offices',
        name: 'setting-office-index',
        component: () => import('../views/settings/offices/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/settings/users',
        name: 'setting-user_management-users-index',
        component: UserIndex,
        meta: { layout: 'app', requiresAuth: true },

    },

    {
        path: '/settings/user_management/permissions',
        name: 'setting-user_management-assign-permissions-index',
        component: () => import('../views/settings/permissions/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },


    {
        path: '/settings/agents',
        name: 'setting-agent-index',
        component: AgentIndex,
        meta: { layout: 'app', requiresAuth: true },
    },


    {
        path: '/settings/assign/agents-office',
        name: 'setting-assign-agent-office-index',
        component: () => import('../views/settings/agents/assign-office/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/settings/user_management/permissions/list',
        name: 'setting-user_management-permissions-index',
        component: () => import('../views/settings/permissions/auto_generate/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },

    //Routers for service points 
    {
        path: '/settings/service_points/list',
        name: 'setting-service_points-index',
        component: () => import('../views/settings/service_points/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    {
        path: '/settings/agents_service_points/list',
        name: 'setting-agents_service_points-index',
        component: () => import('../views/settings/service_points/assign_agents_service_points//index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },


    //Routes for entitiess (agents)
    {
        path: '/entities/companies/agents',
        name: 'entities-companies-agents-index',
        component: () => import('../views/entities/companies/agents/index.vue'),
        meta: { layout: 'app', requiresAuth: false },
    },
    //Routes for sub_entity
    {
        path: '/entities/companies/sub_entity',
        name: 'entities-companies-sub_entity-index',
        component: () => import('../views/entities/companies/sub_entity/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    //Routes for entity_company_details
    {
        path: '/entities/companies/entity_company_details',
        name: 'entities-companies-entity_company_details-index',
        component: () => import('../views/entities/companies/entity_company_details/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    //Routes for company_entity
    {
        path: '/entities/companies/company_entity',
        name: 'entities-companies-company_entity-index',
        component: () => import('../views/entities/companies/company_entity/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
    //Routes for company_entity
    {
        path: '/entities/companies/company_entity_category',
        name: 'entities-companies-company_entity_category-index',
        component: () => import('../views/entities/companies/company_entity_category/index.vue'),
        meta: { layout: 'app', requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

// router.beforeEach((to, from, next) => {
//     const token = sessionStorage.getItem('token');
//     const tokenExpiry = sessionStorage.getItem('tokenExpiry');
//     const loggedIn = !!token;

//     if (token && tokenExpiry) {
//       const now = new Date().getTime();
//       if (now > tokenExpiry) {
//         store.dispatch('logout');
//         next({ name: 'Login' });
//       }
//     }

//     // Check for authentication
//     if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
//       next({ name: 'Login' });
//     } else if (to.name === 'Logout') {
//       store.commit('setLayout', 'login');  // Set the login layout on logout
//       next();
//     } else {
//       // Set the layout according to the route meta information
//       store.commit('setLayout', to.meta.layout || 'app');
//       next();
//     }
//   });

router.beforeEach((to, from, next) => {

    store.dispatch('checkAuthentication');

    const loggedIn = store.getters.isAuthenticated;
    console.log("Route being accessed:", to.path);
    console.log("Route meta:", to.meta);
    console.log("User permissions:", store.getters.userPermissions);
    console.log("Is authenticated:", loggedIn);
    console.log("Token expiry:", store.state.tokenExpiry);
    console.log("Current Time:", new Date().getTime());

    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next({ name: 'Login', query: { redirect: to.fullPath } });
    } else if (to.name === 'Logout') {
        store.commit('setLayout', 'login');
        next();
    } else {
        store.commit('setLayout', to.meta.layout || 'app');
        if (loggedIn) {
            store.dispatch('updateLastActionTime');
        }
        next();
    }
});


export default router;
