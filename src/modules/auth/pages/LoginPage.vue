<template>
    <AuthSlot 
        title="login" 
        >
        <template v-slot:form-information>
            <img src="@/assets/svgs/profile.svg" class="avatar" alt="Login Image">
            <h2>Bienvenido</h2>
        </template>
        <template v-slot:form-route>
            <router-link :to="{name: 'register'}">¿No estás registrado?</router-link>
        </template>
    </AuthSlot>
</template>

<script setup>
import AuthSlot from '../slots/AuthSlot.vue';
</script>