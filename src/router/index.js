import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		name: 'login',
		component: LoginView,
	},
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

router.beforeEach((to, from, next) => {
	const isAuthenticated = !!localStorage.getItem('authToken')

	if (to.path !== '/login' && !isAuthenticated) {
		next({ name: 'login' })
	} else if (to.name === 'login' && isAuthenticated) {
		next({ name: 'home' })
	} else {
		next()
	}
})

export default router
