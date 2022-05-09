import { Modal as ModalComponent, Button, Badge } from 'react-bootstrap';
import { get } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FreeFonts from '@fortawesome/free-solid-svg-icons';
import * as BrandFonts from '@fortawesome/free-brands-svg-icons';

import ILink from '../../services/interface/link-interface';
import IDefaultBody from './interface/default-body-props';

const fonts = {
	free: FreeFonts,
	brand: BrandFonts,
}

const DefaultBody = (props: IDefaultBody) => {
	if (!props.item) return null;

	return <div>
		<ModalComponent.Body>
			{ props.item.image && <a href={ props.item.image.link } rel="noopener noreferrer" target="_blank">
			<img alt={ props.item.image.filename} src={ props.item.image.filename } />
			</a> }

			{ props.item.tags && <div className="card-tags">
			<FontAwesomeIcon icon={ fonts.free.faTags } />
			{ props.item.tags.map((tag: any, tagIndex: number) => <Badge className="card-tag" key={ `card-tag-${ tagIndex }` } pill={ true } bg="primary">
				{ tag }
			</Badge>) }
			</div> }

			{ props.item.body && <div>{ props.item.body }</div> }
		</ModalComponent.Body>
		<ModalComponent.Footer>
			{ props.item.links && props.item.links.map((link: ILink, linkIndex: number) => <a key={ `link-${ linkIndex }` } href={ link.link } rel="noopener noreferrer" target="_blank" className="btn btn-primary">
				{ link.font && <FontAwesomeIcon icon={ get(fonts, link.font) } /> } { link.text }
			</a>) }
			<Button variant="secondary" onClick={ props.closeModal }><FontAwesomeIcon icon={ fonts.free.faTimesCircle} /> Close</Button>
		</ModalComponent.Footer>
	</div>
}

export default DefaultBody
