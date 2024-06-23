import { getDataApi } from "@/helpers/getDataApi";
import { defineStore } from "pinia";
import { computed, ref } from "vue";


export const useProductsStore = defineStore('products', () => {
    const products = ref([]);
    const productsSearch = ref([]);
    const productDetail = ref([]);
    const productsCopy = ref([]);
    const totalProducts = ref(0);
    const loading = ref(false);
    const error = ref(false);
    const productSearchTerm = ref('');
    const URL = import.meta.env.VITE_API_URL + '/products';

    const productsItems = computed(() => [...products.value]);
    const hasProducts = computed(() => products.value.length > 0);
    const hasProductsSearch = computed(() => productsSearch.value.length > 0);
    const hasProductDetail = computed(() => Object.keys(productDetail.value).length > 0);

    const setLoading = (value) => {
        loading.value = value;
    };

    const setSearchTerm = (value) => {
        productSearchTerm.value = value;
    };

    const setError = (value) => {
        error.value = value;
    };

    const getProducts = async (skip = 10) => {
        setLoading(true);
        try {
            const { products: productsData, total } = await getDataApi(`${URL}?delay=500&limit=9&skip=${skip}`);
            products.value = productsData;
            productsCopy.value = productsData;
            totalProducts.value = total;
        } catch (error) {
            setError('Ocurrió un error al obtener los productos');
        } finally {
            setLoading(false);
        }
    };

    const searchProducts = async (skip) => {
        setLoading(true);
        try {
            const { products: productsData, total } = await getDataApi(
                `${URL}/search?q=${productSearchTerm.value}&select=title,images,category,price,stock&limit=9&skip=${skip}`
            );
            productsSearch.value = productsData;
            totalProducts.value = total;
        } catch (error) {
            setError('Ocurrió un error al ejecutar la búsqueda del producto');
        } finally {
            setLoading(false);
        }
    };

    const getProduct = async (id = 1) => {
        setLoading(true);
        try {
            productDetail.value = await getDataApi(`${URL}/${id}`);
        } catch (error) {
            setError('Ocurrió un error al obtener el producto');
        } finally {
            setLoading(false);
        }
    }

    const filterProductsByCategory = (category) => {
        setError('');
        products.value = productsCopy.value.filter(product => product.category === category);
        if (products.value.length === 0 && category !== 'Lista') {
            setError(`No existen productos por la categoría ${category}`);
            products.value = productsCopy.value;
        } else if (products.value.length === 0 && category === 'Lista') {
            products.value = productsCopy.value;
        }
    };

    return {
        loading,
        error,
        productsItems,
        productsSearch,
        hasProducts,
        hasProductsSearch,
        productDetail,
        hasProductDetail,
        totalProducts,

        getProducts,
        getProduct,
        filterProductsByCategory,
        searchProducts,
        setSearchTerm
    }
});