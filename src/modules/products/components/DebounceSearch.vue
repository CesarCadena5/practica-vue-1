<template>
    <div class="debounce">
        <input type="text" placeholder="Digita el producto..." v-model="searchTerm">
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useProductsStore } from '../store/products.store';

const productsStore = useProductsStore();
const debounceValue = ref('');
const debounceTimeout = ref();
const skip = ref(0);

const searchTerm = computed({
    get() {
        return debounceValue.value;
    },
    set(value) {
        if (debounceTimeout.value) clearTimeout(debounceTimeout.value);

        debounceTimeout.value = setTimeout(() => {
            debounceValue.value = value;
            productsStore.setSearchTerm(value);
            productsStore.searchProducts(skip.value);
        }, 500);
    }
});

</script>

<style scoped>
.debounce {
    width: 100%;
}

.debounce input {
    outline: none;
    border: 1px solid #c4bdbd;
    border-radius: .2rem;
    padding: .5rem;
    width: 60%;
}
</style>