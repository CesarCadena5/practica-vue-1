<template>
    <article class="card-item animate__animated animate__fadeIn" @click="showProductDetail">
        <div class="card-img animate__animated animate__fadeInUp">
            <LoadingCard class="loading-card" v-show="!show"/>
            <img :src="srcImg" :alt="product.title" v-show="show" @load="show=true">
        </div>
        <div class="card-info">
            <h4 class="card-title">{{ product.title }}</h4>
            <div class="animate__animated animate__fadeInUp">
                <h5 class="card-category">{{ product.category }}</h5>
                <h6 class="card-price">${{ product.price }}</h6>
            </div>
            <img class="card-stock animate__animated animate__fadeInUp" :src="stock" alt="Icon stock" width="20px" height="20px">
            <div v-if="inStock" class="animate__animated animate__fadeInUp">
                <h5>Stock: {{ product.stock }}</h5>
                <div>
                    <button class="icon" @click="addItemToCart">
                        <img src="@/assets/svgs/add-item-cart.svg" alt="Icon add">
                    </button>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import CartEmpty from '@/assets/svgs/cart-empty.svg';
import CartNotEmpty from '@/assets/svgs/cart-not-empty.svg';
import LoadingCard from '@/modules/shared/components/LoadingCard.vue';
import { useShoppingCart } from '../store/shopping.cart.store';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const shoppingCartStore = useShoppingCart();
const route = useRouter();
const show = ref(false);

const addItemToCart = (event) => {
    event.stopPropagation();
    const product = {
        id: props.product.id, 
        name: props.product.title, 
        price: props.product.price, 
        stock: props.product.stock,
        img: props.product.images[0],
        totalPrice: props.product.price,
        quantity: 1
    };
    shoppingCartStore.addItemToProducts(product.id, product);
};

const showProductDetail = () => {
    route.push({name: 'product-detail', params: {id: props.product.id}});
};

watch(
    () => props.product.images[0],
    () => {
        show.value = false;
    }
);

const srcImg = computed(() => props.product.images[0] ? props.product.images[0] : '@/assets/svgs/not-found.svg');
const stock = computed(() => props.product.stock > 0 ? CartNotEmpty : CartEmpty);
const inStock = computed(() => props.product.stock > 0);
</script>

<style scoped>
.card-item {
    display: flex;
    flex-direction: column;
    justify-content: end;
    max-height: 220px;
    min-height: 220px;
    height: 100%;
    min-width: 200px;
    max-width: 200px;
    margin-bottom: .4rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    margin: .5rem;
    border-radius: .4rem;
    position: relative;
    cursor: pointer;
}

.card-img {
    position: absolute;
    top: -3.5rem;
    height: 170px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-img img {
    width: 80%;
    height: 90%;
    object-fit: contain;
    filter: drop-shadow(8px 10px 5px rgba(0, 0, 0, 0.5));
    transition: all .3s ease-in;
}

.card-img img:hover {
    transform: rotate(-5deg) scale(1.1);
}

.card-info {
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: .4rem;
    padding: .7rem;
    padding-top: 1rem;
    position: relative;
}

.card-info h4 {
    font-size: .8rem;
}

.card-category {
    background-color: var(--color-secondary);
    padding: .2rem;
    border-radius: .5rem 0;
    font-weight: 500;
    color: var(--color-third);
}

.card-price {
    font-size: .8rem;
    font-weight: 500;
}

.card-info div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: .5rem;
}

.icon{
    border: none;
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.icon img {
    width: 100%;
    height: 100%;
}

@media screen and (min-width: 400px) {
    .card-item {
        min-width: 280px;
        max-width: 280px;
    }
}
</style>