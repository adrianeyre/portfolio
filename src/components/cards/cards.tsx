import * as React from 'react';
import { Component } from 'react';
import { Button, Card } from 'react-bootstrap';

import DataService from '../../services/data-service'
import IDataService from '../../services/data-interface'

import 'bootstrap/dist/css/bootstrap.min.css';
import './cards.css';

interface ICardsProps {
	filename: string;
	title?: string;
	body?: string;
}

interface ICardsState {
	data: IDataService[];
}

class Cards extends Component<ICardsProps, ICardsState> {
	private dataService: DataService;

	constructor(props: ICardsProps) {
		super(props);

		this.dataService = new DataService;
		this.handleLink = this.handleLink.bind(this);
	}

	public async componentDidMount() {
		const data = await this.dataService.getData(this.props.filename);
		this.setState(prev => ({ data }));
	}

	public render() {
		return <div className="cards-container">
			{this.props.title && <h1>{this.props.title}</h1>}
			{this.props.body && <h4>{this.props.body}</h4>}
			<div className="row">
				{this.state && this.state.data && this.state.data.map((item: IDataService, i: number) => <div key={i} className="card-item col-md-3">
					<Card>
						{ item.image && <Card.Img variant="top" src={ item.image.filename } /> }
						<Card.Body>
							<Card.Title>{item.title}</Card.Title>
							<Card.Text>{item.body}</Card.Text>
							{ item.link && <div className="card-button">
								<Button onClick={ this.handleLink.bind(this, item.link)}variant="primary">Link</Button>
							</div> }
						</Card.Body>
					</Card>
				</div>)}
			</div>
		</div>
	}

	private handleLink = (link: string) => window.open(link, '_blank');
}

export default Cards;