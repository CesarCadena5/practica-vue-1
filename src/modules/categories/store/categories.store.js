import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getDataApi } from "@/helpers/getDataApi";

export const useCategoriesStore = defineStore('categories', () => {
    const categories = ref([]);
    const loading = ref(false);
    const error = ref('');
    const URL = import.meta.env.VITE_API_URL + '/products/category-list';

    const setLoading = (value) => {
        loading.value = value;
    };

    const setError = (value) => {
        error.value = value;
    };

    const categoriesItems = computed(() => [...categories.value]);

    const getCategories = async () => {
        setLoading(true);
        try {
            categories.value = await getDataApi(URL);
        } catch (errorMsg) {
            setError('Ocurrió un error al obtener las categorías');
        } finally {
            setLoading(false);
        }
    };

    return {
        categoriesItems,
        loading,
        error,

        getCategories
    }
});