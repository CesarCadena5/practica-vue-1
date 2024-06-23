<template>
    <div class="select-menu" ref="selectMenu">
        <span v-if="productsStore.error">{{ productsStore.error }}</span>
        <div class="select-btn" @click="toggleFilters">
            <span ref="textBtnDescription" class="select-btn-text">Categorías</span>
            <img src="@/assets/svgs/chevron-down.svg" alt="Categories chevron">
        </div>
        <ul class="options">
            <li
                class="option"
                @click="categorySelected('Lista')">
                <span class="option-text">
                    Categorías
                </span>
            </li>
            <li
                v-for="(category, i) in categoriesStore.categoriesItems"
                :key="i" 
                class="option"
                @click="categorySelected(category)">
                <span class="option-text">
                    {{ category }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useCategoriesStore } from '@/modules/categories/store/categories.store';
import { onMounted, ref } from 'vue';
import { useProductsStore } from '../store/products.store';

const categoriesStore = useCategoriesStore();
const productsStore = useProductsStore();
const textBtnDescription = ref(null);
const selectMenu = ref(null);

const toggleFilters = () => {
    selectMenu.value.classList.toggle("active");
};

const categorySelected = (name = 'Lista') => {
    textBtnDescription.value.textContent = name === 'Lista' ? 'Categorías' : name;
    selectMenu.value.classList.toggle("active");
    productsStore.filterProductsByCategory(name);
};

onMounted(() => {
    categoriesStore.getCategories();
});
</script>
<style scoped>
.select-menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .3rem;
    width: 100%;
    padding: 0 .4rem;
}

.select-btn {
    display: flex;
    height: 40px;
    width: 100%;
    background: #fff;
    padding: 1.2rem;
    font-weight: 400;
    border-radius: .5rem;
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
}

.select-btn img {
    width: 30px;
    height: 30px;
    transition: .4s;
}

.select-menu.active .select-btn img{
    transform: rotate(-180deg);
}

.select-menu .options {
    display: none;
    position: absolute;
    top: 2.7rem;
    width: 95%;
    height: 300px;
    padding: 5px 5px;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    overflow-y: scroll;
    background-color: #fff;
}

.select-menu.active .options{
    display: block;
}

.options .option {
    display: flex;
    width: 100%;
    height: 35px;
    cursor: pointer;
    padding: 0 1rem;
    border-radius: .5rem;
    align-items: center;
    background: #fff;
    transition: all .3s ease-in;
}

.options .option:hover .option-text{
    color: white;
}
    
.options .option:hover {        
    background: var(--color-secondary);
}

.option .option-text {
    font-size: .9rem;
    color: #333;
    transition: all .5s linear;
}

@media screen and (min-width: 410px) {
    .select-btn {
        width: 300px;
    }

    .select-menu .options {
        width: 300px;
    }
}
</style>