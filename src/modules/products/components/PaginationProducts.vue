<template>
    <section class="pagination">
        <button :disabled="skip < 10" class="btn-pagination" @click="getPreviousProducts">
            <img src="@/assets/svgs/previous.svg" alt="Previous icon">
            Anterior
        </button>
        <button :disabled="showButtonNext" class="btn-pagination" @click="getNextProducts">
            Siguiente
            <img src="@/assets/svgs/next.svg" alt="Next icon">
        </button>
    </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useProductsStore } from '../store/products.store';

const props = defineProps({
    typeComponent: {
        type: String,
        default: 'product-list'
    }
});

const productsStore = useProductsStore();
const skip = ref(0);

const getNextProducts = () => {
    skip.value += 10; 
    props.typeComponent === 'product-list' ? productsStore.getProducts(skip.value) : productsStore.searchProducts(skip.value);
};

const getPreviousProducts = () => {
    skip.value -= 10; 
    props.typeComponent === 'product-list' ? productsStore.getProducts(skip.value) : productsStore.searchProducts(skip.value);
};

const showButtonNext = computed(() => skip.value + 11 > productsStore.totalProducts);
</script>

<style scoped>
.pagination {
    display: flex;
    gap: 1rem;
}

.btn-pagination {
    border: none;
    height: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: .3rem;
    background-color: inherit;
}

.btn-pagination img {
    width: 100%;
    height: 100%;
}
</style>