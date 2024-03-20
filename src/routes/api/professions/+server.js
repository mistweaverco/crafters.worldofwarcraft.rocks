import { json } from '@sveltejs/kit';
import { getSearchParamAsNumber } from '$lib/Utils';
// import { db } from '$lib/server/Database';

/**
 * @type {import('@sveltejs/kit').ServerLoad}
 * @returns {Promise<Response>}
 */
export async function GET({ url }) {
	/**
	* @type {number | null}
	*/
	const realmId = getSearchParamAsNumber(url, 'realmId');
	if (!realmId) {
		return json({ error: 'realmId not found' });
	}
	// const characterDbResult = await db.characters.findFirst({where: {fk_realm_id: realmId}});
	// if (!characterDbResult) {
	// 	return json({ error: 'No characters found on this realm' });
	// }
	// const realmsDbResult = await db.realms.findMany({
	// 	where: {
	// 		fk_region_id: regionDbResult.id
	// 	},
	// 	orderBy: {
	// 		name: 'asc'
	// 	}
	// });
	return json({ professions: [] });
}
