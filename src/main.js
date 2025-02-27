import './assets/main.css'
import 'animate.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app"

const pinia = createPinia();
const app = createApp(App)
app.use(pinia)
app.use(router)

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);
app.mount('#app')
