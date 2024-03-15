import { redirect } from '@sveltejs/kit';
import { deleteCookie } from '$lib/server/CookieHelper';

/**
 * @type {import('@sveltejs/kit').ServerLoad}
 */
export async function load({ cookies }) {
	deleteCookie(cookies, 'accessToken');
	redirect(301, '/');
}

