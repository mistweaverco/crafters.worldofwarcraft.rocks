/**
 * Get search param from url as number
 * @param {URL} url
 * @param {string} param name
 * @returns {number}
 */
export const getSearchParamAsNumber = (url, param, fallbackValue = 0) => {
	const searchParam = url.searchParams.get(param);
	if (!searchParam) {
		return fallbackValue;
	}
	return parseInt(searchParam, 10);
}
