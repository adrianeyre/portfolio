import IDataService from '../../../services/interface/data-service-interface';
import IModalType from '../../../services/interface/modal-type-interface';

export default interface ISideBarProps {
	data?: IDataService[];
	linksData?: IDataService[];
	scrollToAnchor(anchor: string): void;
	showModal(type: IModalType, data?: IDataService): void;
}
