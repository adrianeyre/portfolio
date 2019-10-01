import * as React from 'react';
import { Modal as ModalComponent, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faLink, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import IDataService, { ITags } from '../../services/data-interface';

interface IDefaultBody {
	item: IDataService;
	closeModal(): void;
}

const DefaultBody = (props: IDefaultBody) => (
	<div>
		<ModalComponent.Body>
			{ props.item.image && <a href={ props.item.image.link } target="_blank">
			<img src={ props.item.image.filename } />
			</a> }

			{ props.item.tags && <div className="card-tags">
			<FontAwesomeIcon icon={ faTags } />
			{ props.item.tags.map((tag: ITags, tagInbdex: number) => <Badge className="card-tag" key={ `card-tag-${ tagInbdex }` } pill={ true } variant="primary">
				{ tag }
			</Badge>) }
			</div> }

			{ props.item.body && <div>{ props.item.body }</div> }
		</ModalComponent.Body>
		<ModalComponent.Footer>
			{ props.item.link && <a href={ props.item.link } target="_blank" className="btn btn-primary"><FontAwesomeIcon icon={ faLink} /> Link</a> }
			<Button variant="secondary" onClick={ props.closeModal }><FontAwesomeIcon icon={ faTimesCircle} /> Close</Button>
		</ModalComponent.Footer>
	</div>
)

export default DefaultBody