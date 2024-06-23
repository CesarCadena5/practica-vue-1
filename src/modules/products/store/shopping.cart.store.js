import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useShoppingCart = defineStore('shopping-cart', () => {
    const products = ref([]);
    const total = ref(0);
    const showShoppingCart = ref(false);

    const hasProducts = computed(() => products.value.length > 0);

    const toggleShowCart = () => {
        showShoppingCart.value = !showShoppingCart.value;
    };

    const quantityProducts = computed(() => products.value.length);

    const addItemToProducts = (id, product) => {
        const productSearch = products.value.find(product => product.id === id);

        if (!productSearch) {
            products.value.unshift(product);
            total.value += product.totalPrice;
        }
    };

    const deleteItemToProducts = (id) => {
        const product = products.value.find(product => product.id === id);

        if (product) {
            total.value -= product.totalPrice;
            products.value = products.value.filter(product => product.id !== id);
        }
    };

    const addQuantityProduct = (id, type = "increment") => {
        const product = products.value.find(product => product.id === id);

        if (product && type === "increment" && product.stock > 0 && product.quantity < product.stock) {
            product.quantity += 1;
            product.totalPrice = parseFloat((product.price * product.quantity).toFixed(2));
        } else if (product && type === "decrement" && product.stock > 0 && product.quantity > 0) {
            product.quantity -= 1;
            product.totalPrice = parseFloat((product.totalPrice - product.price).toFixed(2));
        }

        total.value = products.value.reduce((acc, cur) => acc + cur.totalPrice, 0);
    };

    return {
        products,
        quantityProducts,
        total,
        showShoppingCart,
        hasProducts,

        addItemToProducts,
        deleteItemToProducts,
        toggleShowCart,
        addQuantityProduct
    }
});