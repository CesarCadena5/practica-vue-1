<template>
    <section>
        <Sidebar/>
        <ShowCartButton/>
        <router-view class="content-products"></router-view>
    </section>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import ShowCartButton from '../components/ShowCartButton.vue';
</script>

<style scoped>
section {
    display: flex;
    position: relative;
}

.content-products {
    background-color: rgb(241 245 249);
}
</style>