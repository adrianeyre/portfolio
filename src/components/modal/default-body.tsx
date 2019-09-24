import * as React from 'react';
import { Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

import { ITags } from '../../services/data-interface';

const DefaultBody = (props: any) => (
	<div>
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
	</div>
)

export default DefaultBody