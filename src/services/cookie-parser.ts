import Cookies from 'js-cookie';

import ICookieParser from './interface/cookie-interface';

export default class CookieParser {
	public getCookies(): ICookieParser {
		const result: ICookieParser = {
			message: Cookies.get('message'),
			type: Cookies.get('type'),
		};

		if (result.message) result.message = result.message.replace(/\+/g, ' ');

		return result;
	}

	public removeCookies() {
		Cookies.remove('message');
		Cookies.remove('type');
	}
}
