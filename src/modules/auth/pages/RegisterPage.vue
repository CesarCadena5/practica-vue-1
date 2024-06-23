<template>
    <AuthSlot 
        title="enviar"
        >
        <template v-slot:form-information>
            <img src="@/assets/svgs/profile-register.svg" class="avatar" alt="Login Image">
                <h2>registrate</h2>
        </template>
        <template v-slot:form-route>
            <router-link :to="{name: 'login'}">¿Ya estás registrado?</router-link>
        </template>
    </AuthSlot>
</template>

<script setup>
import AuthSlot from '../slots/AuthSlot.vue';
</script>