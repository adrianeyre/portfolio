import IDataService from '../../../services/interface/data-service-interface';

export default interface ISideBarState {
	data?: IDataService[];
	linksData?: IDataService[];
}
