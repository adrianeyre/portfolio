import IDataService from '../../../services/interface/data-service-interface';

export default interface IDefaultBodyProps {
	item?: IDataService;
	closeModal(): void;
}
