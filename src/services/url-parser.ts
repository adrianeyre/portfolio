interface IURLParser {
	message?: string;
	type?: string;
}

export default class URLParser {
	private allowedTypes = ['message', 'type'];

	public getParams(urlString: string): IURLParser {
		const result: IURLParser = {};
		const urlSplit = urlString.replace('?', '').split('&')

		urlSplit.forEach((url: string) => {
			const data = url.split('=');
			if (data.length === 2 && this.allowedTypes.includes(data[0])) result[data[0]] = data[1].replace(/%20/g, ' ');
		});

		return result;
	}
}

export { IURLParser };
