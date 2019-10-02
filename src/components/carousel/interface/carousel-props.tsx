import IDataService from '../../../services/interface/data-service-interface';
import IModalType from '../../../services/interface/modal-type-interface';

export default interface ICarouselProps {
	title?: string;
	body?: string;
	data?: IDataService[];
	screenWidth: number;
	showModal(type: IModalType, data?: IDataService): void;
}
