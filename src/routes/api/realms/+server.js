import { json } from '@sveltejs/kit';
import { db } from '$lib/server/Database';

/**
 * @type {import('@sveltejs/kit').ServerLoad}
 * @returns {Promise<Response>}
 */
export async function GET({ url }) {
	const region = url.searchParams.get('region');
	if (!region) {
		return json({ error: 'Region not found', realms: [] });
	}
	const regionDbResult = await db.regions.findUnique({where: {name: region}});
	if (!regionDbResult) {
		return json({ error: 'Region not found', realms: [] });
	}
	const realmsDbResult = await db.realms.findMany({
		where: {
			fk_region_id: regionDbResult.id
		},
		orderBy: {
			name: 'asc'
		}
	});
	return json({ realms: realmsDbResult });
}
