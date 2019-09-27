import Cookies from 'js-cookie';

interface ICookieParser {
	message?: string;
	type?: string;
}

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

export { ICookieParser };
