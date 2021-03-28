import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

//styles
import 'primevue/resources/primevue.min.css'     //core css
import 'primevue/resources/themes/saga-blue/theme.css' //theme

import 'primeicons/primeicons.css'      //icons
import 'primeflex/primeflex.css';
import './App.scss'
import './Custom.css'
// Custom Styling



const app = createApp(App)
app.use(PrimeVue)
app.use(ToastService)
app.use(router).mount('#app')