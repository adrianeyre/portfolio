import IDataService from '../../../services/interface/data-service-interface'

export default interface INavigationState {
	data?: IDataService[];
	linksData?: IDataService[];
	isCollasped: boolean
}
