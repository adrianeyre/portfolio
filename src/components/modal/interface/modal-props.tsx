import IDataService from '../../../services/interface/data-service-interface';
import IModalType from '../../../services/interface/modal-type-interface';

export default interface IModalProps {
	data?: IDataService;
	modalType?: IModalType;
	closeModal(): void;
}
