import { defineAsyncComponent, defineComponent, onMounted, ref } from "vue";
import { useProductsStore } from "../store/products.store";

export default defineComponent({
    components: {
        FiltersProducts: defineAsyncComponent(() => import("../components/FiltersProducts.vue")),
        ProductItem: defineAsyncComponent(() => import("@/modules/products/components/ProductItem.vue")),
        Loading: defineAsyncComponent(() => import("@/modules/shared/components/Loading.vue")),
        PaginationProducts: defineAsyncComponent(() => import("@/modules/products/components/PaginationProducts.vue"))
    },
    setup: () => {
        const skip = ref(0);
        const productsStore = useProductsStore();

        onMounted(() => {
            productsStore.getProducts(skip.value);
        });

        return {
            productsStore
        }
    }
});