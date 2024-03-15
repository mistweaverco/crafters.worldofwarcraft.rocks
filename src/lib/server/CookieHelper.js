/**
 * Set a cookie
 * @param {import('@sveltejs/kit').Cookies} cookies
 * @param {string} name
 * @param {string} value
 * @returns {void}
 */
export function setCookie(cookies, name, value) {
	cookies.set(name, value, {
		httpOnly: true,
		sameSite: 'strict',
		secure: false,
		path: '/',
		maxAge: 60 * 60 * 24 * 7
	});
}

/**
 * Get a cookies value
	* @param {import('@sveltejs/kit').Cookies} cookies
	* @param {string} name
	* @returns {string | undefined}
	*/
export function getCookie(cookies, name) {
	return cookies.get(name);
}

/**
 * Delete a cookie
 * @param {import('@sveltejs/kit').Cookies} cookies
 * @param {string} name
 * @returns {void}
 */
export function deleteCookie(cookies, name) {
	cookies.delete(name, {
		path: '/'
	});
}

/**
 * Check if a cookie exists
	* @param {import('@sveltejs/kit').Cookies} cookies
	* @param {string} name
	* @returns {boolean}
	*/
export function hasCookie(cookies, name) {
	return !!cookies.get(name);
}
