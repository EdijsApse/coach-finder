import { createRouter, createWebHistory } from 'vue-router';

import LandingPage from '../pages/LandingPage';
import NotFoundPage from '../pages/NotFoundPage';
import CoachListPage from '../pages/coach/ListPage';
import CoachViewPage from '../pages/coach/ViewPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import CoachCreatePage from '../pages/coach/CreatePage';
import MessagesListPage from '../pages/messages/ListPage';

import store from '../store';
import helpers from '../helpers';

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
			path: '/coaches',
			props: true
		},
		{
			name: 'CoachQueryListPage',
			component: CoachListPage,
			path: '/coaches/q-:q',
			props: true
		},
		{
			name: 'CoachCreatePage',
			component: CoachCreatePage,
			path: '/coaches/create',
			meta: {
				requiresAuth: true
			}
		},
		{
			name: 'CoachViewPage',
			component: CoachViewPage,
			path: '/coaches/:coachId',
			props: true
		},
		{
			name: 'MessagesPage',
			component: MessagesListPage,
			path: '/messages',
			meta: {
				requiresAuth: true
			}
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

router.beforeEach(async (to, from, next) => {
	const userLoaded = store.getters.userRefreshed;

	if (userLoaded !== true) {
		await helpers.refreshUserFromToken().finally(() => {
			store.dispatch('userRefreshed');
		});
	}

	const { requiresGuest, requiresAuth } = to.meta;

	const isAuth = store.getters.isAuth;

	if (requiresGuest === true && isAuth === true) {
		return next({ name: 'LandingPage' });
	}

	if (requiresAuth === true && isAuth !== true) {
		return next({ name: 'LoginPage' });
	}

	return next();
})

export default router;