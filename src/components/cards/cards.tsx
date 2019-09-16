import * as React from 'react';
import { Component } from 'react';
import { Button, Card } from 'react-bootstrap';

import IDataService from '../../services/data-interface'

import 'bootstrap/dist/css/bootstrap.min.css';
import './cards.css';

interface ICardsProps {
	data: IDataService[];
	title?: string;
	body?: string;
}

interface ICardsState {
	data: IDataService[];
}

class Cards extends Component<ICardsProps, ICardsState> {
	constructor(props: ICardsProps) {
		super(props);

		this.handleLink = this.handleLink.bind(this);

		this.state = {
			data: this.props.data,
		}
	}

	public render() {
		return <div className="cards-container">
			{this.props.title && <h1>{this.props.title}</h1>}
			{this.props.body && <h4>{this.props.body}</h4>}
			<div className="row">
				{this.state.data && this.state.data.map((item: IDataService, i: number) => <div key={i} className="card-item col-md-3">
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

	// private handleSubscriptionChange = (data: IDataService[]) => this.setState({ data });
}

export default Cards;