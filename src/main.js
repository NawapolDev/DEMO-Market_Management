import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import Vuelidate from 'vuelidate'


createApp(App).use(store).use(router).mount('#app')
