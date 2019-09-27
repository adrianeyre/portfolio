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
	font?: string;
	link?: string;
	type?: string;
}

enum IModalType {
	data = 0,
	email = 1,
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

export { ITags, ISubTitle, IPoints, IModalType };