import IImage from './image-interface';
import ILink from './link-interface';

export default interface IDataService {
	title?: string;
	subTitle?: string[];
	body?: string;
	image?: IImage;
	images?: IImage[];
	tags?: string[];
	points?: string[];
	link?: string;
	links?: ILink[];
}
