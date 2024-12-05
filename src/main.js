import Vue from 'vue'
import vueClickOutsideElement from 'vue-click-outside-element'
import VueToast from 'vue-toast-notification'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vue-toast-notification/dist/theme-bootstrap.css'
import 'vue2-datepicker/index.css'
import './styles/global.scss'

Vue.config.productionTip = false

Vue.use(VueToast, {
	position: 'top',
})
Vue.use(vueClickOutsideElement)

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
