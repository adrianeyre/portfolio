interface ITags {
	name: string;
}

interface IPoints {
	name: string;
}

interface IImage {
	filename: string;
	link?: string;
}

export default interface IDataService {
	title?: string;
	subTitle?: string;
	body?: string;
	image?: IImage;
	tags?: ITags[];
	points?: IPoints[];
	link?: string;
}

export { ITags, IPoints };