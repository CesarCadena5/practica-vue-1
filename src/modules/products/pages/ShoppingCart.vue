<template>
    <section class="cart-container" >
        <article class="cart">
            <div class="cart-title">
                <h3>Productos Agregados</h3>
            </div>
            <section
                v-for="product in shoppingCartStore.products"
                :key="product.id" 
                class="cart-items">
                <div class="item-img">
                    <img :src="product.img" :alt="product.name">
                </div>
                <div class="item-description">
                    <h3>{{ product.name }}</h3>
                    <div class="item-quantity">
                        <button @click="changeQuantityItem(product.id, 'increment')">+</button>
                        <h4>{{ product.quantity }}</h4>
                        <button @click="changeQuantityItem(product.id, 'decrement')">-</button>
                    </div>
                    <h4>Stock: {{ product.stock }}</h4>
                </div>
                <div class="item-price">
                    <h4>${{ product.price }}</h4>
                    <h4>${{ product.totalPrice }}</h4>
                    <button @click="removeItemCart(product.id)">Eliminar</button>
                </div>
            </section>
            <div class="cart-total">
                <h4>Total: {{ shoppingCartStore.total }}</h4>
            </div>
        </article>
    </section>
</template>

<script setup>
import { useShoppingCart } from "../store/shopping.cart.store";

const shoppingCartStore = useShoppingCart();

const changeQuantityItem = (id, type) => {
    shoppingCartStore.addQuantityProduct(id, type);
};

const removeItemCart = (id) => {
    shoppingCartStore.deleteItemToProducts(id);
};
</script>

<style scoped>
.cart-container {
    align-items: center;
    width: 100%;
    height: 100vh;
    padding: .3rem;
}

.cart {
    width: 100%;
    max-height: 500px;
    border-radius: .6rem;
    background-color: white;
    margin: 0 auto;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: .5rem;
    font-size: .6rem;
    overflow-y: auto;
}

.cart-title {
    border: 1px solid rgb(214, 209, 209);
    background-color: rgb(243, 244, 246);
    border-radius: .4rem .4rem 0 0;
    padding: .7rem 1rem;
}

.cart-items {
    display: flex;
    border: 1px solid rgb(214, 209, 209);
    border-top: none;
    padding: .7rem .3rem;
}

.item-img {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: end;
}

.item-img img {
    width: 100%;
    height: 100%;
}

.item-description {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: .5rem;
}

.item-quantity {
    display: flex;
    align-items: center;
    gap: .2rem;
    margin-top: .3rem;
}

.item-price {
    display: flex;
    flex-direction: column;
    justify-content: end;
}

.cart-total {
    border: 1px solid rgb(214, 209, 209);
    border-top: none;
    background-color: rgb(243, 244, 246);
    border-radius: 0 0 .4rem .4rem;
    padding: .7rem 1rem;
}

.close {
    position: absolute;
    top: 2rem;
    right: 2rem;
    height: 52px;
    border-radius: 0 .3rem 0 0;
    display: flex;
    align-items: center;
}

.close img {        
    transition: transform .4s linear;
}

.close img:hover {
    transform: rotate(180deg);
}

button {
    border: 1px solid rgb(214, 209, 209);
    border-radius: .3rem;
    padding: 7px 7px;
    cursor: pointer;
    transition: all .4s linear;
    font-size: inherit;
    background-color: white;
}

button:hover {
    background-color: rgb(245, 242, 242);
}

@media screen and (min-width: 500px) {
    .cart {
        font-size: .9rem;
    }

    .item-img {
        width: 17%;
    }

    .item-description { 
        width: 60%;
    }

    button {
        padding: .2rem .7rem;
    }
}

@media screen and (min-width: 600px) {
    .cart {
        width: 80%;
        font-size: 1rem;
    }

    .item-img {
        width: 17%;
    }

    .item-description { 
        width: 60%;
    }
}

@media screen and (min-width: 800px) {
    .cart {
        width: 50%;
    }

    .item-img {
        width: 20%;
    }

    .item-description { 
        width: 60%;
    }
}
</style>