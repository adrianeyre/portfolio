import IDataService from '../../../services/interface/data-service-interface';

export default interface ITextProps {
	data?: IDataService[];
	page?: JSX.Element;
	imageName?: string;
	imagePosition?: 'left' | 'right' | undefined;
	imageRadius?: string;
}
