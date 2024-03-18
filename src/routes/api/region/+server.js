import { json } from '@sveltejs/kit';
import { setCookie } from '$lib/server/CookieHelper';

/**
 * @type {import('@sveltejs/kit').ServerLoad}
 * @returns {Promise<Response>}
 */
export async function POST({ cookies, request }) {
	const body = await request.json();
	console.log('post body', body);
	const region = body.region;
	if (!region) {
		return json({ error: 'Region not found', realms: [] });
	}
	setCookie(cookies, 'region', region);
	return json({ region: region });
}
