/*
 * @Autor: zengjun1.fj
 * @Date: 2024-08-15 16:43:21
 * @LastEditors: zengjun1.fj
 * @LastEditTime: 2024-08-19 10:13:25
 * @Description:
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
