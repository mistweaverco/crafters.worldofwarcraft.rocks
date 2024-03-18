import {
	getCookie,
	hasCookie,
} from '$lib/server/CookieHelper';

/**
 * @typedef {Object} CraftersSearchServerLoad
 * @property {boolean} hasAccessTokenCookie - If the access token cookie is present
 * @property {string | undefined} region - The region selected by the user
 */

/**
 * @type {import('@sveltejs/kit').ServerLoad}
 * @returns {Promise<CraftersSearchServerLoad>}
 */
export async function load({ cookies }) {
	const hasAccessTokenCookie = hasCookie(cookies, 'accessToken');
	const region = getCookie(cookies, 'region');
	return {
		hasAccessTokenCookie: hasAccessTokenCookie,
		region: region
	};
}
