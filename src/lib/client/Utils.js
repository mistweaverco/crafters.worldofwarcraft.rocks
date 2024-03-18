/**
 * Fetches JSON from a URI
 * @param {string} uri - The URI to fetch JSON from
 * @returns {Promise<any>} - The promise of the fetch request
 */
export const fetchJson = async (uri) => {
	const result = await fetch(uri);
	const jsonResult = await result.json();
	return jsonResult;
}
