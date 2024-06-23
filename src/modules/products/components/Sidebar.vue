<template>
    <nav class="sidebar" ref="sidebar">
        <div class="sidebar-content">
            <div class="user">
                <img src="@/assets/svgs/profile.svg" class="user-avatar" alt="Avatar imagen">
                <p class="user-infos">
                    <span class="item-description">
                        Cesar
                    </span>
                </p>
            </div>
    
            <ul class="side-items">
                <li class="side-item active">
                    <router-link :to="{name: 'product-list'}">
                        <img src="@/assets/svgs/milk.svg" alt="Icono de leche" class="side-item-svg">
                        <span class="item-description">
                            Productos
                        </span>
                    </router-link>
                </li>
                <li class="side-item">
                    <router-link :to="{name: 'search-product'}">
                        <img src="@/assets/svgs/categories.svg" alt="Icono de leche" class="side-item-svg">
                        <span class="item-description">
                            Busqueda
                        </span>
                    </router-link>
                </li>
                <li class="side-item" @click="handleLogout">
                    <router-link to="">
                        <img src="@/assets/svgs/logout.svg" alt="Icono de leche" class="side-item-svg">
                        <span class="item-description">
                            Salir
                        </span>
                    </router-link>
                </li>
            </ul>
    
            <button @click="handleShowMenu"  class="open-btn">
                <img src="@/assets/svgs/chevron.svg" alt="Chevron" class="open-btn-icon side-item-svg">
            </button>
        </div>
    </nav>
</template>

<script setup>
import { getAuth, signOut } from 'firebase/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const sidebar = ref(null);
const route = useRouter();

const handleShowMenu = () => {
    sidebar.value.classList.toggle('open-sidebar');
};

const handleLogout = async () => {
    localStorage.removeItem('authenticated');
    const auth = getAuth();
    await signOut(auth);
    route.replace({name: 'login'});
};
</script>

<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    border-radius: 0 1rem 1rem 0;
    position: sticky;
    top: 0;
    left: 0;
    transition: all .5s linear;
    min-width: 75px;
    z-index: 10;
    background-color: white;
}

.sidebar-content {
    padding: .5rem;
}

.user {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: .3rem;
    margin-bottom: 1.2rem;
}

.user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 20px;
}

.user-infos {
    display: flex;
    flex-direction: column;
}

.user-infos span{
    color: #76bcad;
}

.side-items {
    display: flex;
    flex-direction: column;
    gap: .4rem;
    list-style: none;
}

.side-item {
    border-radius: .7rem;
    padding: .5rem;
    cursor: pointer;
}

.side-item-svg {
    width: 20px;
    height: 20px;
}

.side-item.active {
    background-color: #76bcad;
}

.side-item:hover:not(.active) {
    background-color: #76bcad;
}

.side-item a {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
   
}

.side-item.active a {
    color: white;
}

.side-item a img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 20px;
}

.open-btn-icon {
    position: absolute;
    top: 30px;
    right: -15px;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    border: none;
    cursor: pointer;
}

.open-btn-icon {
    transition: transform .3s ease;
}

.open-sidebar .open-btn-icon {
    transform: rotate(180deg);
}

.item-description {
    width: 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: .9rem;
    transition: width .6s ease-in-out;
    height: 0px;
}

.sidebar.open-sidebar {
    min-width: 140px;
}

.sidebar.open-sidebar .item-description {
    width: 110px;
    height: auto;
}

.sidebar.open-sidebar .side-item a {
    justify-content: flex-start;
    gap: .9rem;
}
</style>