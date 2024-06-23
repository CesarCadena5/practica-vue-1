import { computed, onMounted } from "vue";
import { defineAsyncComponent, defineComponent, ref } from "vue";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

import loginImage from '@/assets/svgs/login.svg';
import registerImage from '@/assets/svgs/register.svg';
import { useRouter } from "vue-router";

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        }
    },
    components: {
        Loading: defineAsyncComponent(() => import("@/modules/shared/components/Loading.vue"))
    },
    setup: (props) => {
        const loading = ref(false);
        const messageError = ref('');
        const email = ref('');
        const emailError = ref('');
        const password = ref('');
        const passwordError = ref('');
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const route = useRouter();

        const srcImg = computed(() => {
            return props.title === 'login' ? loginImage : registerImage;
        });

        const handleChangeEmail = ({ target }) => {
            if (!regexEmail.test(target.value)) {
                emailError.value = 'El email es incorrecto.';
            } else {
                emailError.value = '';
                email.value = target.value;
            }
        };

        const handleChangePassword = ({ target }) => {
            if (target.value.length < 6) {
                passwordError.value = 'Mínimo 6 carácteres.';
            } else {
                passwordError.value = '';
                password.value = target.value;
            }
        }

        const handleAuth = async () => {
            if (!emailError.value && !passwordError.value) {
                const auth = getAuth();
                loading.value = true;
                try {
                    const res = props.title === 'login' ?
                        await signInWithEmailAndPassword(auth, email.value, password.value) :
                        await createUserWithEmailAndPassword(auth, email.value, password.value);
                    setTimeout(() => {
                        localStorage.setItem('authenticated', true);
                        route.replace({ name: 'product-list' });
                        loading.value = false;
                    }, 1000);
                } catch (error) {
                    messageError.value = error.code;
                    loading.value = false;
                }
            }
        }

        const focusInput = (event) => {
            let parent = event.target.parentNode.parentNode;
            parent.classList.add('focus');
        };

        const blurInput = (event) => {
            let parent = event.target.parentNode.parentNode;
            if (event.target.value === "") {
                parent.classList.remove('focus');
            }
        };

        const addListeners = () => {
            const inputs = document.querySelectorAll('.input');
            inputs.forEach(input => {
                input.addEventListener('focus', focusInput);
                input.addEventListener('blur', blurInput);
            });
        };

        onMounted(() => {
            addListeners();
        });

        return {
            loading,
            messageError,
            email,
            emailError,
            password,
            passwordError,
            srcImg,
            handleAuth,
            handleChangeEmail,
            handleChangePassword
        }
    }
})