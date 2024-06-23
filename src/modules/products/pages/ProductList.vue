<template>
    <div class="product-list">
        <div class="loading" v-if="productsStore.loading">
            <Loading/>
        </div>
        <div v-else class="product-items">
            <h2 class="product-title animate__animated animate__fadeInDown">Lista de Productos</h2>
            <FiltersProducts class="filters animate__animated animate__fadeInDown"/>
            <ProductItem
                v-for="product in productsStore.productsItems"
                :key="product.id"
                :product="product"
            />
        </div>
        <PaginationProducts v-if="productsStore.hasProducts" class="pagination-products"/>
    </div>
</template>

<script src="./ProductList.js"></script>

<style scoped>
.product-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    padding-top: .5rem;
    width: 100%;
}

.product-title {
    text-align: center;
}

.product-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center; 
    gap: 2.5rem;
    width: 100%;
    margin-top: 2rem;
}

.filters {
    width: 100%;
    position: relative;
    z-index: 10;
}

.pagination-products {
    margin-bottom: 2rem;
}
</style>