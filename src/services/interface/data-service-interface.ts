import ITags from './tag-interface';
import ISubTitle from './subtitle-interface';
import IPoints from './points-interface';
import IImage from './image-interface';

export default interface IDataService {
	title?: string;
	subTitle?: ISubTitle[];
	body?: string;
	image?: IImage;
	tags?: ITags[];
	points?: IPoints[];
	link?: string;
}
