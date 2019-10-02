import IDataService from '../../../services/interface/data-service-interface';
import IModalType from '../../../services/interface/modal-type-interface';

export default interface ILinksProps {
	data?: IDataService[];
	showModal(type: IModalType, data?: IDataService): void;
}
