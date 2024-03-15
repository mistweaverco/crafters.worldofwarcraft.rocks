import { hasCookie } from '$lib/server/CookieHelper';

/**
 * @type {import('@sveltejs/kit').ServerLoad}
 * @returns {Promise<{hasAccessTokenCookie: boolean}>}
 */
export async function load({ cookies }) {
	const hasAccessTokenCookie = hasCookie(cookies, 'accessToken');
	return {
		hasAccessTokenCookie: hasAccessTokenCookie
	};
}
