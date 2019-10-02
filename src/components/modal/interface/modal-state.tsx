import IDataService from '../../../services/interface/data-service-interface';
import IModalType from '../../../services/interface/modal-type-interface';

export default interface IModalState {
	data?: IDataService;
	show: boolean;
	modalType?: IModalType;
}
