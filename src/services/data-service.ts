export default class DataService {
	public async getData(filename: string) {
		const response = await fetch(`./data/${ filename }`);

		return response.json();
	}
}
