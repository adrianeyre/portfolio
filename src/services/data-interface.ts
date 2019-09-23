interface ITags {
	name: string;
}

interface IPoints {
	name: string;
}

interface ISubTitle {
	name: string
}

interface IImage {
	filename: string;
	link?: string;
}

export default interface IDataService {
	title?: string;
	subTitle?: ISubTitle[];
	body?: string;
	image?: IImage;
	tags?: ITags[];
	points?: IPoints[];
	link?: string;
}

export { ITags, ISubTitle, IPoints };