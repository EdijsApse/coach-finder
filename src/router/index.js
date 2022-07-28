import { createRouter, createWebHistory } from 'vue-router';

import LandingPage from '../pages/LandingPage';
import NotFoundPage from '../pages/NotFoundPage';
import CoachListPage from '../pages/coach/ListPage';
import CoachViewPage from '../pages/coach/ViewPage';

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
			name: 'CoachViewPage',
			component: CoachViewPage,
			path: '/coaches/:coachId',
			props: true
		},
		{
			name: 'NotFoundPage',
			component: NotFoundPage,
			path: '/:path(.*)'
		}
	]
})

export default router;