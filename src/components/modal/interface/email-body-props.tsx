import IDataService from '../../../services/interface/data-service-interface';

export default interface IEmailBodyProps {
	item?: IDataService;
	closeModal(): void;
}
