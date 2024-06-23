<template>
    <section class="search">
        <div class="debounce">
            <DebounceSearch/>
        </div>
        <div class="products">
            <ProductItem 
                v-for="product in productsStore.productsSearch"
                :key="product.id"
                :product="product"
                />
        </div>
        <PaginationProducts v-if="productsStore.hasProductsSearch" class="pagination-products" typeComponent="product-search"/>
    </section>    
</template>

<script setup>
import DebounceSearch from "../components/DebounceSearch.vue";
import ProductItem from "../components/ProductItem.vue";
import PaginationProducts from "@/modules/products/components/PaginationProducts.vue";
import { useProductsStore } from '../store/products.store';

const productsStore = useProductsStore();
</script>

<style scoped>
.search {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
}

.products {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center; 
    gap: 2.5rem;
    width: 100%;
    margin-top: 2rem;
}

.debounce {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}

.pagination-products {
    margin-bottom: 2rem;
}
</style>