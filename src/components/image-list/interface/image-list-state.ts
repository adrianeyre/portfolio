import IDataService from '../../../services/interface/data-service-interface';

export default interface ITestimonialsState {
	data?: IDataService[];
	width: string;
	autoWidth: boolean;
}
