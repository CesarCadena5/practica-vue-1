import { createRouter, createWebHashHistory } from "vue-router";
import isAuthenticatedGuard from "@/modules/auth/guards/isAuthenticated";

const routes = [
    {
        path: '/',
        redirect: { name: 'login' }
    },
    {
        path: '/auth',
        name: 'auth',
        component: () => import("@/modules/auth/layouts/AuthLayout.vue"),
        children: [
            {
                path: '',
                name: 'redirect-login',
                redirect: { name: 'login' }
            },
            {
                path: 'login',
                name: 'login',
                component: () => import("@/modules/auth/pages/LoginPage.vue")
            },
            {
                path: 'register',
                name: 'register',
                component: () => import("@/modules/auth/pages/RegisterPage.vue")
            }
        ]
    },
    {
        path: '/products',
        name: 'products',
        beforeEnter: [isAuthenticatedGuard],
        component: () => import("@/modules/products/layouts/ProductsLayout.vue"),
        children: [
            {
                path: '',
                name: 'redirect-product-list',
                beforeEnter: [isAuthenticatedGuard],
                redirect: { name: 'product-list' }
            },
            {
                path: 'list',
                name: 'product-list',
                beforeEnter: [isAuthenticatedGuard],
                component: () => import("@/modules/products/pages/ProductList.vue")
            },
            {
                path: ':id',
                name: 'product-detail',
                beforeEnter: [isAuthenticatedGuard],
                component: () => import("@/modules/products/pages/ProductDetail.vue")
            },
            {
                path: 'shopping-cart',
                name: 'shopping-cart',
                beforeEnter: [isAuthenticatedGuard],
                component: () => import("@/modules/products/pages/ShoppingCart.vue")
            },
            {
                path: 'search-product',
                name: 'search-product',
                beforeEnter: [isAuthenticatedGuard],
                component: () => import("@/modules/products/pages/ProductSearch.vue")
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import("@/modules/shared/pages/404.vue")
    }
];


const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router
