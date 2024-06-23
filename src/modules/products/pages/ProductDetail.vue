<template>
    <section class="product-detail" v-if="productsStore.hasProductDetail">
        <article class="product">
            <div class="product-info">
                <h2>{{ productsStore.productDetail.title }}</h2>
                <div class="product-rating">
                    <img v-for="(i) in rating" :key="i" src="@/assets/svgs/star.svg" alt="Start icon" width="20px" height="20px">
                </div>
                <h3>${{ productsStore.productDetail.price }}</h3>
            </div>
            <div class="product-images">
                <LoadingCard class="loading-card" v-show="!show"/>
                <img :src="productsStore.productDetail.images[0]" :alt="productsStore.productDetail.title" v-show="show" @load="show=true">
                <div
                    v-if="hasImagesProducts" 
                    class="other-images">
                    <img v-for="(image, i) in productsStore.productDetail.images" :key="i" :src="image" alt="Image product">
                </div>
            </div>
            <div class="warranty-category">
                <span>
                    <img src="@/assets/svgs/warranty.svg" alt="Warranty Icon" width="20px" height="20px">
                    {{ productsStore.productDetail.warrantyInformation }}
                </span>
                <span>
                    <img src="@/assets/svgs/tag.svg" alt="Catgory icon" width="20px" height="20px">
                    {{ productsStore.productDetail.category }}
                </span>
            </div>
            <div class="description">
                <h3>Descripción del Producto</h3>
                <p>
                    {{ productsStore.productDetail.description }}
                </p>
            </div>
            <div class="reviews">
                <h3>Opiniones</h3>
                <div class="container-reviews">
                    <div
                        v-for="(review, index) in productsStore.productDetail.reviews"
                        :key="index" 
                        class="review">
                        <div class="header-review">
                            <div class="avatar-name">
                                <img src="@/assets/svgs/comment-icon.svg" :alt="review.reviewerName" width="50px" height="50px">
                                <h4>{{ review.reviewerName }}</h4>
                            </div>
                            <div class="raiting-review">
                                <img v-for="(i) in review.rating" :key="i" src="@/assets/svgs/star.svg" alt="Start icon" width="20px" height="20px">
                            </div>
                        </div>
                        <div class="body-review">
                            <p>{{ review.comment }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <router-link :to="{name: 'product-list'}" class="back-list">
                Volver
            </router-link>
        </article>
    </section>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "../store/products.store";
import LoadingCard from '@/modules/shared/components/LoadingCard.vue';

const productsStore = useProductsStore();
const route = useRoute();
const show = ref(false);

const rating = computed(() => {
    const rating = Math.round(productsStore.productDetail.rating);
    return Array(rating).fill(undefined);
});

const hasImagesProducts = computed(() => productsStore.productDetail.images.length > 1);

watch(
    () => route.params.id,
    () => {
        productsStore.getProduct(route.params.id);
    },
    {
        immediate: true
    }
);

watch(
    () => productsStore.productDetail.images,
    () => {
        show.value = false;
    }
);
</script>

<style scoped>
.back-list {
    position: fixed;
    top: 13rem;
    left: .4rem;
    z-index: 20;
    text-decoration: none;
    background-color: var(--color-secondary);
    color: var(--color-third);
    padding: .4rem .6rem;
    border-radius: .6rem;
    transition: all .5s linear;
}

.back-list:hover {
    background-color: var(--color-primary);
    color: slateblue;
}

.product-detail {
    width: 100%;
    padding: .8rem;
    display: flex;
    justify-content: center;
}
    
.product {
    width: 100%;
    padding: .2rem;
    background-color: white;
}

.product-info {
    display: flex;
    flex-direction: column;
    gap: .6rem;
}

.product-info h2, h3 {
    font-size: 1rem;
    font-weight: 500;
}

.product-images {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: .5rem;
}
    
.product-images img {
    width: 60%;
    filter: drop-shadow(.2rem .2rem .6rem rgba(0, 0, 0, 0.39));
    transition: all .5s ease-in-out;
}

.product-images img:hover {
    transform: rotate(-5deg) scale(1.1);
}

.other-images {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: .5rem;
    width: 100%;
}

.other-images img {
    max-width: 100px;
    min-width: 100px;
}

.warranty-category {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: .6rem;
    margin-bottom: .6rem;
}

.warranty-category > * {
    display: flex;
    align-items: center;
    gap: .5rem;
}

.reviews {
    display: flex;
    flex-direction: column;
    row-gap: .5rem;
    margin-top: 1rem;
    flex-wrap: wrap;
}

.reviews h3 {
    margin-bottom: 1.5rem;
}

.container-reviews {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
}

.review {
    border-bottom: 1px solid gray;
    margin-bottom: 1.5rem;
    padding: .2rem;
}

.header-review {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.body-review {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-left: 1rem;
}

@media screen and (min-width: 466px) {
    .product-images {
        align-items: center;
    }

    .product-images img{
        width: 40%;
    }

    .warranty-category {
        flex-direction: row;
        justify-content: center;
        gap: 1rem;
    }

    .reviews {
        flex-direction: row;
    }

    .container-reviews {
        flex-direction: row;
        justify-content: center;
        gap: 1rem;
        align-items: center;
    }

    .review {
        width: 340px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
}

@media screen and (min-width: 600px) {
    .product-info h2, h3 {
        font-size: 1.3rem;
        font-weight: 500;
    }

    .product-info {
        align-items: center;
    }

    .product-images img{
        width: 30%;
    }
}

@media screen and (min-width: 1000px) {
    .product {
        padding: 1rem;
        width: 70%;
        border-radius: .5rem;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
}
</style>