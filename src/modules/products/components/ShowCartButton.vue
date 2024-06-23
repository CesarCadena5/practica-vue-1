<template>
    <router-link
        v-if="shoppingCartStore.hasProducts" 
        class="btn-cart" 
        :to="{name: 'shopping-cart'}"
        >
        <img src="@/assets/svgs/shopping-cart.svg" alt="Cart Icon">
        <span class="items-quantity">
            {{ shoppingCartStore.quantityProducts }}
        </span>
    </router-link>
</template>

<script setup>
import { useShoppingCart } from '../store/shopping.cart.store';

const shoppingCartStore = useShoppingCart();
</script>


<style scoped>
.btn-cart {
    text-decoration: none;
    position: fixed;
    bottom: 2rem;
    left: 1rem;
    z-index: 20;
    width: 50px;
    height: 50px;
    border-radius: .4rem;
    border: none;
    background-color: #364461;
    border-radius: 50%;
    padding: .5rem;
    cursor: pointer;
}

.btn-cart img {
    width: 100%;
    height: auto;
}

.items-quantity {
    position: fixed;
    bottom: 5rem;
    left: 2.4rem;
    z-index: 20;
    color: var(--color-secondary);
    font-size: 1.3rem;
    font-weight: 600;
    height: 30px;
}

/* @media screen and (min-width: 600px) {
    .btn-cart {
        top: 2rem !important;
        right: 2rem !important;
    }

    .items-quantity {
        top: 5rem;
        right: 0;
        z-index: 20;
    }
} */
</style>