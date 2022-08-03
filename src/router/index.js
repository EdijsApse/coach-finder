import { createRouter, createWebHistory } from 'vue-router';

import LandingPage from '../pages/LandingPage';
import NotFoundPage from '../pages/NotFoundPage';
import CoachListPage from '../pages/coach/ListPage';
import CoachViewPage from '../pages/coach/ViewPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import CoachCreatePage from '../pages/coach/CreatePage';

import store from '../store';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'LandingPage',
			component: LandingPage,
			path: '/'
		},
		{
			name: 'CoachListPage',
			component: CoachListPage,
			path: '/coaches'
		},
		{
			name: 'CoachCreatePage',
			component: CoachCreatePage,
			path: '/coaches/create'
		},
		{
			name: 'CoachViewPage',
			component: CoachViewPage,
			path: '/coaches/:coachId',
			props: true
		},
		{
			name: 'LoginPage',
			component: LoginPage,
			path: '/login',
			meta: {
				requiresGuest: true
			}
		},
		{
			name: 'RegisterPage',
			component: RegisterPage,
			path: '/register',
			meta: {
				requiresGuest: true
			}
		},
		{
			name: 'NotFoundPage',
			component: NotFoundPage,
			path: '/:path(.*)'
		}
	]
})

router.beforeEach((to) => {
	const { requiresGuest } = to.meta;

	const isAuth = store.getters.isAuth;

	if (requiresGuest === true && isAuth === true) {
		return false
	}

	return true;
})

export default router;